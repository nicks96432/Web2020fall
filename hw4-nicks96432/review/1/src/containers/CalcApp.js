import React from 'react';

import CalcButton from '../components/CalcButton';

// 計算機 App
var fixed = (num) => {
	if(Number.isInteger(num)){
		if((num.toString().length) <= 8) return num;
		else return num % 100000000;
	}
	else{
		if((num.toString().length) <= 8) return num;
		if(num > 1) return Number(num.toPrecision(7));
		else return Number(num.toFixed(6));
	}
}

class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			imaNumber: 0,
			previousNumber: null,
			previosOperator: "None",
			dotExist: false,
			digitAfterDot: 0,
			dotDisplayed: false,
			displayPrevious: false
    };
  }

  resetState = () => {
		// TODO
		return () => {
			this.setState((state) => ({
				imaNumber: 0,
				previousNumber: null,
				previousOperator: "None",
				dotExist: false,
				digitAfterDot: 0,
				dotDisplayed: false,
				displayPrevious: false
			}));
		}
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
	}
	clickNumber = (i) => {
		return () => {
			this.setState((state) => ({dotDisplayed: false}));
			if(!this.state.dotExist) {
				this.setState((state) =>　({
					imaNumber: fixed(state.imaNumber * 10 + i),
					displayPrevious: false

				}));
			}
			else {
				var temp = (this.state.imaNumber >= 0) ? (i * (10**(-this.state.digitAfterDot))) : (- i * (10**(-this.state.digitAfterDot)));
				this.setState((state) =>　({
					imaNumber: fixed(state.imaNumber + temp),
					digitAfterDot : state.digitAfterDot + 1,
					displayPrevious: false

				}));
				// console.log(i * (10**(-this.state.digitAfterDot)));

			}
		}
	}

	clickOperator = (operator) => {
		return () => {
			if(this.state.displayPrevious){
				this.setState((state) => ({
					previosOperator: operator,
				}));
			}
			else {
				if(this.state.previosOperator === "None") {
					this.setState((state) => ({
						previousNumber: state.imaNumber,
					}));
				}
				else if(this.state.previosOperator === "Plus") {
					this.setState((state) => ({
						previousNumber: fixed(state.imaNumber + state.previousNumber),
					}));
				}
				else if(this.state.previosOperator === "Subtract") {
					this.setState((state) => ({
						previousNumber: fixed(state.previousNumber - state.imaNumber),
					}));
				}
				else if(this.state.previosOperator === "Multiply") {
					this.setState((state) => ({
						previousNumber: fixed(state.imaNumber * state.previousNumber),
					}));
				}
				else if(this.state.previosOperator === "Divide") {
					this.setState((state) => ({
						previousNumber: fixed(state.previousNumber / state.imaNumber),
					}));
				}
				this.setState((state) => ({
					imaNumber: 0,
					previosOperator: operator,
					dotExist: false,
					digitAfterDot: 0,
					// dotDisplayed: false,
					displayPrevious: true
				}));
			}
		}
	}

	clickDot = () => {
		return () => {
			if(!this.state.dotExist){
				this.setState((state) => ({
					dotDisplayed: true,
					dotExist: true,
					digitAfterDot: state.digitAfterDot + 1,
					displayPrevious: false

				}));
			}
		}
	}
	
	clickEqual = () => {
		return () => {
			if(this.state.previosOperator === "None") {
				this.setState((state) => ({
					previousNumber: state.imaNumber,
				}));
			}
			else if(this.state.previosOperator === "Plus") {
				this.setState((state) => ({
					previousNumber: fixed(state.imaNumber + state.previousNumber),
				}));
			}
			else if(this.state.previosOperator === "Subtract") {
				this.setState((state) => ({
					previousNumber: fixed(state.previousNumber - state.imaNumber),
				}));
			}
			else if(this.state.previosOperator === "Multiply") {
				this.setState((state) => ({
					previousNumber: fixed(state.imaNumber * state.previousNumber),
				}));
			}
			else if(this.state.previosOperator === "Divide") {
				this.setState((state) => ({
					previousNumber: fixed(state.previousNumber / state.imaNumber),
				}));
			}
			this.setState((state) => ({
				imaNumber: 0,
				previosOperator: "None",
				dotExist: false,
				digitAfterDot: 0,
				dotDisplayed: false,
				displayPrevious: true
			}));
		}
	}

	clickPercent = () => {
		if(this.state.dotExist) {
			this.setState((state) => ({
				digitAfterDot : state.digitAfterDot + 2
			}));
		}
		else {
			if (this.state.imaNumber % 100 !== 0) {
				this.setState((state) => ({
					digitAfterDot : (state.imaNumber % 10 === 0) ? 2 : 3 ,
					dotExist: true
				}));
			}
		}
		this.setState((state) => ({
				imaNumber: state.imaNumber * 0.01,
				dotDisplayed: false
		}));
	}

	clickPlusMinus = () => {
		this.setState((state) => ({
			imaNumber: - state.imaNumber,
		}));
	}
	display() {
		return this.state.displayPrevious?this.state.previousNumber:this.state.imaNumber;
	}

	displayDot() {
		return(this.state.dotDisplayed?".":"");
	}

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.display()}{this.displayDot()}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState()}>C</CalcButton>
            <CalcButton onClick={this.clickPlusMinus}>+/-</CalcButton>
            <CalcButton onClick={this.clickPercent}>%</CalcButton>
            <CalcButton className="calc-operator" onClick={this.clickOperator("Divide")}>÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.clickNumber(7)}>7</CalcButton>
            <CalcButton className="calc-number" onClick={this.clickNumber(8)}>8</CalcButton>
            <CalcButton className="calc-number" onClick={this.clickNumber(9)}>9</CalcButton>
            <CalcButton className="calc-operator"  onClick={this.clickOperator("Multiply")}>×</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.clickNumber(4)}>4</CalcButton>
            <CalcButton className="calc-number" onClick={this.clickNumber(5)}>5</CalcButton>
            <CalcButton className="calc-number" onClick={this.clickNumber(6)}>6</CalcButton>
            <CalcButton className="calc-operator"  onClick={this.clickOperator("Subtract")}>-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.clickNumber(1)}>1</CalcButton>
            <CalcButton className="calc-number" onClick={this.clickNumber(2)}>2</CalcButton>
            <CalcButton className="calc-number" onClick={this.clickNumber(3)}>3</CalcButton>
            <CalcButton className="calc-operator"  onClick={this.clickOperator("Plus")}>+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="bigger-btn" onClick={this.clickNumber(0)}>0</CalcButton>
            <CalcButton className="calc-number" onClick={this.clickDot()}>.</CalcButton>
            <CalcButton className="calc-operator_equal" onClick={this.clickEqual()}>=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
