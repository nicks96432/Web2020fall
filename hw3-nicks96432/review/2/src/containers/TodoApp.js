import React, { Component } from "react";
import Header from "../components/Header";
import List from "../components/List";





class TodoApp extends Component {
 
    render() {
        return (
            <>
                <Header text="todos" />
                <List />
            </>
        );
    }
}


export default TodoApp;