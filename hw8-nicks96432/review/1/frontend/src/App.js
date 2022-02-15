import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import { Button, Input, message, Tag } from "antd";

import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  USER_QUERY,
  CREATE_MESSAGE_MUTATION,
  USER_SUBSCRIPTION,
} from "./graphql";

function App() {
  const [user, setUser] = useState("");
  const [to, setTo] = useState("");
  const [body, setBody] = useState("");

  const bodyRef = useRef(null);

  const { loading, refetch, data, subscribeToMore } = useQuery(USER_QUERY, {
    variables: { user: user },
  });
  const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION);

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s;
      const content = {
        content: msg,
        duration: 0.5,
      };

      switch (type) {
        case "success":
          message.success(content);
          break;
        case "info":
          message.info(content);
          break;
        case "danger":
        default:
          message.error(content);
          break;
      }
    }
  };

  useEffect(() => {
    refetch();
    const unsubscribe = subscribeToMore({
      document: USER_SUBSCRIPTION,
      variables: { user: user },
      updateQuery: (prev, { subscriptionData }) => {
        console.log("prev", prev);
        if (!subscriptionData.data) return prev;
        const newPost = subscriptionData.data.message.data;
        console.log("all", [newPost, prev.messages]);
        return {
          ...prev,
          messages: [...prev.messages, newPost],
        };
      },
    });
    return () => unsubscribe();
  }, [subscribeToMore, user]);

  return (
    console.log("data", data),
    (
      <div className="App">
        <div className="App-title">
          <h1>Simple Chat</h1>
        </div>
        <div className="App-messages">
          {!data || !data.messages ? (
            <p style={{ color: "#ccc" }}>
              {loading ? "No messages..." : "Loading..."}
            </p>
          ) : (
            data.messages.map(({ from, body, to }, i) => (
              <>
                {from === user ? (
                  <p className="App-message" align="right" key={i}>
                    {`${body}   `}
                    <Tag color="red"> to {to}</Tag>
                  </p>
                ) : (
                  <p className="App-message" key={i}>
                    <Tag color="blue"> from {from}</Tag>
                    {body}
                  </p>
                )}
              </>
            ))
          )}
        </div>
        <Input
          placeholder="User"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={{ marginBottom: 10 }}
        ></Input>
        <Input
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={{ marginBottom: 10 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              bodyRef.current.focus();
            }
          }}
        ></Input>
        <Input.Search
          rows={4}
          value={body}
          ref={bodyRef}
          enterButton="Send"
          onChange={(e) => setBody(e.target.value)}
          placeholder="Type a message here..."
          onSearch={(msg) => {
            if (!msg || !user || !to) {
              displayStatus({
                type: "error",
                msg: "Please enter from, to and a message body.",
              });
              return;
            }
            createMessage({
              variables: {
                from: user,
                body: body,
                to: to,
              },
            });
            setBody("");
          }}
        ></Input.Search>
      </div>
    )
  );
}

export default App;
