import React from "react";

import CalcButton from "../components/CalcButton";

// 計算機 App
class CalcApp extends React.Component {
	constructor() {
		super();
		this.state = {
			display: "0",
			formula: "",
			operator: "",
			operatorClicked: false,
			tmp: "",
			tmpOperator: "",
		};
	}

	componentDidMount = () => {
		document.addEventListener("keydown", this.handleKeyboardInput);
	};

	componentWillUnmount = () => {
		document.removeEventListener("keydown", this.handleKeyboardInput);
	};

	handleKeyboardInput = (e) => {
		let { key } = e;
		if (key === "Enter") key = "=";
		if (/^[0-9.]$/.test(key)) this.handleNumberClick(key);
		else if (/[+\-*/=]/.test(key)) {
			e.preventDefault();
			this.handleOperator(key);
		} else if (key === "Escape") this.resetState();
	};

	handleNumberClick = (num) => {
		const { display, operator, operatorClicked } = this.state;
		if (display === "0" || operatorClicked) {
			this.setState((prevState) => ({
				display: num,
				formula: prevState.operator !== "=" ? prevState.formula + prevState.operator : "",
				operator: operator === "=" ? "=" : "",
				operatorClicked: false,
			}));
		} else if (display.length < 8)
			this.setState((prevState) => ({ display: prevState.display + num }));
	};

	handleOperator = (oper) => {
		let { formula, display, operator, operatorClicked } = this.state;
		if (oper === "÷") oper = "/";
		else if (oper === "x") oper = "*";
		let tmp = display;
		let tmpOperator = operator.charAt(operator.length - 1);
		if (oper === "=") {
			if (operator.match(/[+\-*/]/)) {
				formula = eval(formula + (this.state.tmpOperator === "" ? operator : "") + display); // eslint-disable-line
			} else if (operator === "=") {
				// eslint-disable-next-line
				formula = eval(display + this.state.tmpOperator + this.state.tmp);
				tmp = this.state.tmp;
				tmpOperator = this.state.tmpOperator;
			} else if (formula.charAt(formula.length - 1).match(/[+\-*/]/)) {
				tmpOperator = formula.charAt(formula.length - 1);
				formula = eval(formula + display); // eslint-disable-line
			} else if (!tmpOperator.length) {
				formula = display;
				tmp = "";
			}
			display = formula;
		} else if (/[+\-*/]$/.test(formula)) {
			formula = eval(formula + display); // eslint-disable-line
			display = formula;
		} else if (!operatorClicked) {
			formula += display;
		}
		this.setState({
			display: display,
			formula: formula,
			operator: oper,
			operatorClicked: true,
			tmp: oper === "=" ? tmp : "",
			tmpOperator: oper === "=" ? tmpOperator : "",
		});
	};

	handlePM = () => {
		let { display } = this.state;
		if (display.indexOf("-") !== -1) display = display.slice(1);
		else display = "-" + display;
		this.setState({ display: display });
	};

	resetState = () => {
		this.setState({
			display: "0",
			formula: "",
			operator: "",
			operatorClicked: false,
			tmp: "",
			tmpOperator: "",
		});
	};

	showNotImplemented() {
		console.warn("This function is not implemented yet.");
	}

	render() {
		return (
			<div className="calc-app">
				<div className="calc-container">
					<div className="calc-output">
						<div className="calc-display">{this.state.display}</div>
					</div>
					<div className="calc-row">
						<CalcButton onClick={this.resetState}>AC</CalcButton>
						<CalcButton onClick={this.handlePM}>+/-</CalcButton>
						<CalcButton onClick={this.showNotImplemented}>%</CalcButton>
						<CalcButton onClick={this.handleOperator} className="calc-operator">
							÷
						</CalcButton>
					</div>
					<div className="calc-row">
						<CalcButton onClick={this.handleNumberClick} className="calc-number">
							7
						</CalcButton>
						<CalcButton onClick={this.handleNumberClick} className="calc-number">
							8
						</CalcButton>
						<CalcButton onClick={this.handleNumberClick} className="calc-number">
							9
						</CalcButton>
						<CalcButton onClick={this.handleOperator} className="calc-operator">
							x
						</CalcButton>
					</div>
					<div className="calc-row">
						<CalcButton onClick={this.handleNumberClick} className="calc-number">
							4
						</CalcButton>
						<CalcButton onClick={this.handleNumberClick} className="calc-number">
							5
						</CalcButton>
						<CalcButton onClick={this.handleNumberClick} className="calc-number">
							6
						</CalcButton>
						<CalcButton onClick={this.handleOperator} className="calc-operator">
							-
						</CalcButton>
					</div>
					<div className="calc-row">
						<CalcButton onClick={this.handleNumberClick} className="calc-number">
							1
						</CalcButton>
						<CalcButton onClick={this.handleNumberClick} className="calc-number">
							2
						</CalcButton>
						<CalcButton onClick={this.handleNumberClick} className="calc-number">
							3
						</CalcButton>
						<CalcButton onClick={this.handleOperator} className="calc-operator">
							+
						</CalcButton>
					</div>
					<div className="calc-row">
						<CalcButton
							onClick={this.handleNumberClick}
							className="bigger-btn calc-number"
						>
							0
						</CalcButton>
						<CalcButton onClick={this.showNotImplemented} className="calc-number">.</CalcButton>
						<CalcButton onClick={this.handleOperator} className="calc-operator">
							=
						</CalcButton>
					</div>
				</div>
			</div>
		);
	}
}

export default CalcApp;
