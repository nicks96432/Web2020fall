import React, { useState, useEffect } from "react";
import axios from "axios";

const API_ROOT = "http://localhost:4000/api";
const instance = axios.create({ baseURL: API_ROOT });

const Question = () => {
	const [complete, setComplete] = useState(false); // true if answered all questions
	const [contents, setContents] = useState([]); // to store questions
	const [ans, setAns] = useState([]); // to record your answers
	const [score, setScore] = useState(0); // Your score
	const [current_question, setCurrentQuestion] = useState(0); // index to current question

	const next = async () => {
		// TODO : switch to the next question,
		// and check answers to set the score after you finished the last question
		if (ans[current_question] === undefined) ans[current_question] = -1;
		if (current_question < contents.length - 1) setCurrentQuestion(current_question + 1);
		else {
			const {
				message,
				data: { score },
			} = await instance.post("/checkAns", { ans: ans });
			if (message === "error") console.error("checkAns Error");
			setScore(score);
			setComplete(true);
		}
	};

	const choose = (index) => {
		// TODO : update 'ans' for the option you clicked
		let newAns = [...ans];
		newAns[current_question] = {
			questionID: contents[current_question].questionID,
			option: index + 1,
		};
		setAns(newAns);
	};

	const getQuestions = async () => {
		// TODO : get questions from backend
		const {
			message,
			data: { contents: questions },
		} = await instance.get("/getContents");
		if (message === "error") console.error("getContents Error");
		else setContents(questions);
	};

	useEffect(() => {
		if (!contents.length) getQuestions();
	});

	// TODO : fill in the rendering contents and logic
	return (
		<div id="quiz-container">
			{contents.length ? (
				<>
					<div id="question-box">
						<div className="question-box-inner">
							{`Question ${contents[current_question].questionID} of ${contents.length}`}
						</div>
					</div>
					<div id="question-title">
						{!complete
							? contents[current_question].question
							: `Your Score : ${score} / ${contents.length}`}
					</div>
					{!complete ? (
						<>
							<div id="options">
								{contents[current_question].options.map((option, index) => (
									<div
										className="each-option"
										key={index}
										onClick={() => choose(index)}
									>
										<input
											type="radio"
											checked={
												ans[current_question] !== undefined &&
												ans[current_question].option === index + 1
											}
											readOnly
										/>
										<span>{option}</span>
									</div>
								))}
							</div>
							<div id="actions" onClick={next}>
								NEXT
							</div>
						</>
					) : (
						<div></div>
					)}
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default Question;
