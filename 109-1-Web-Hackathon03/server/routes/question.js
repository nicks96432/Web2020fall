import Question from "../models/Question";
import Answer from "../models/Answer";

exports.GetContents = async (_, res) => {
	const sendData = (data) => res.status(200).send({ message: "success", contents: data });
	const sendError = () => res.status(403).send({ message: "error", contents: [] });
	// TODO : get questions from mongodb and return to frontend
	Question.find()
		.sort({ questionID: 1 })
		.exec((err, res) => {
			if (err) sendError();
			else sendData(res);
		});
};

exports.CheckAns = async (req, res) => {
	const sendData = (data) => {
		res.status(200).send({ message: "success", score: data });
	};
	const sendError = () => {
		res.status(403).send({ message: "error", score: -1 });
	};
	// TODO : get answers from mongodb, and check answers coming from frontend and return score to frontend
	Answer.find()
		.sort({ questionID: 1 })
		.exec((err, res) => {
			if (err) {
				sendError();
				return;
			}
			const userAns = req.body.ans;
			const realAns = [...res];
			if (userAns.length !== realAns.length) {
				sendError();
				return;
			}
			let score = 0;
			for (let i in userAns) {
				if (userAns[i].questionID !== realAns[i].questionID) {
					sendError();
					return;
				}
				if (userAns[i].option === realAns[i].answer) ++score;
			}
			sendData(score);
		});
};
