import React, {useState} from 'react';
import CalcButton from '../components/CalcButton';

// 計算機 App
function CalcApp() {
	const [CurStatus, setCurStatus] = useState({display: '0', formula: '0'})
	const [operatorStatus, setOperatorStatus] = useState(0)

	const resetState = () => {
		setCurStatus({display: '0', formula: '0'})
		setOperatorStatus(0)
	}

	const click_operator = (s) => {
		let c;
		if (s === 'divide')
			c = '/';
		else if (s === 'multiply')
			c = '*';
		else if (s === 'subtract')
			c = '-';
		else if (s === 'add')
			c = '+';

		let l = CurStatus.formula.slice(-1)
		console.log('l = ', l)
		if (l === '/' || l === '*' || l === '-' || l === '+'){
			let newFormula = CurStatus.formula.slice(0, -1)
			setCurStatus((state) => ({...state, formula: newFormula + c}))
			return;			
		}

		if (operatorStatus === 0){
			setCurStatus((state) => ({...state, formula: state.formula + c}))
		}
		else if (operatorStatus === 2 || operatorStatus === 5){
			let ans = eval(CurStatus.formula).toString()
			let int_length = ans.split('.')[0].length
			let deciLength = 7 - int_length
			if (deciLength >= 0)
				ans = roundAccurately(ans, deciLength).toString()
			else if (int_length >= 9) {
				alert("Digit Number over 8! \rClick 'AC' to restart!")
				return;
			}
			setCurStatus({display: ans, formula: ans + c})
			setOperatorStatus(1)				
		}
		else if (operatorStatus === 3){
			setCurStatus((state) => ({...state, formula: state.display + c}))
		}
		setOperatorStatus(1) // operator clicked waiting for operant
	}

	const click_operant = (s) => {
		if (CurStatus.display.length >= 8 && (operatorStatus === 0 || operatorStatus === 2 || operatorStatus === 5))
			return
		if (operatorStatus === 0 || operatorStatus === 2 || operatorStatus === 5){
			if (CurStatus.display === '0'){
				setCurStatus({display: s, formula: s})
			}
			else{
				setCurStatus({display: CurStatus.display + s, formula: CurStatus.formula + s})
			}			
		}
		else if (operatorStatus === 1){
			setOperatorStatus(2) // clicked second operant
			setCurStatus({display: s, formula: CurStatus.formula + s})
		}
		else if (operatorStatus === 3){
			setOperatorStatus(0)
			setCurStatus({display: s, formula: s})
		}
		else if (operatorStatus === 4) {
			setCurStatus({display: CurStatus.display + s, formula: CurStatus.formula + '.' + s})
			setOperatorStatus(5)
		}
	}

	const click_equal = () => {
		let ans = eval(CurStatus.formula).toString()
		let int_length = ans.split('.')[0].length
		let deciLength = 7 - int_length
		if (deciLength >= 0)
			ans = roundAccurately(ans, deciLength).toString()
		else if (int_length >= 9) {
			alert("Digit Number over 8! \rClick 'AC' to restart!")
			return;
		}
		setCurStatus({display: ans, formula: ans})
		setOperatorStatus(3) // client just clicked equal
	}

	const click_percentage = () => {
		alert("This function is not implemented yet!")
	}

	const click_dot = () => {
		if (operatorStatus === 4 || operatorStatus === 5 || CurStatus.display.slice(-1) === '.')
			return
		else if (operatorStatus === 1) {
			setCurStatus({display: '0.', formula: CurStatus.formula + '0.'})
			setOperatorStatus(2)
		}
		else{
			setCurStatus({display: CurStatus.display + '.', formula: CurStatus.formula})
			setOperatorStatus(4) // clicked a dot
		}
	}

	const roundAccurately = (number, decimalPlaces) => Number(Math.round(number + 'e' + decimalPlaces) + 'e-' + decimalPlaces)

	return (
		<div className="calc-app">
			<div className="calc-container">
				<div className="calc-output">
					<div className="calc-display">{CurStatus.display}</div>
				</div>
				<div className="calc-row">
					<CalcButton onClick={ () => resetState()}>AC</CalcButton>
					<CalcButton onClick={ () => click_percentage()}>+/-</CalcButton>
					<CalcButton onClick={ () => click_percentage()}>%</CalcButton>
					<CalcButton className="calc-operator" onClick={ () => click_operator('divide')}>÷</CalcButton>
				</div>
				<div className="calc-row">
					<CalcButton className="calc-number" onClick={ () => click_operant('7')}>7</CalcButton>
					<CalcButton className="calc-number" onClick={ () => click_operant('8')}>8</CalcButton>
					<CalcButton className="calc-number" onClick={ () => click_operant('9')}>9</CalcButton>
					<CalcButton className="calc-operator" onClick={ () => click_operator('multiply')}>x</CalcButton>
				</div>
				<div className="calc-row">
					<CalcButton className="calc-number" onClick={ () => click_operant('4')}>4</CalcButton>
					<CalcButton className="calc-number" onClick={ () => click_operant('5')}>5</CalcButton>
					<CalcButton className="calc-number" onClick={ () => click_operant('6')}>6</CalcButton>
					<CalcButton className="calc-operator" onClick={ () => click_operator('subtract')}>-</CalcButton>
				</div>
				<div className="calc-row">
					<CalcButton className="calc-number" onClick={ () => click_operant('1')}>1</CalcButton>
					<CalcButton className="calc-number" onClick={ () => click_operant('2')}>2</CalcButton>
					<CalcButton className="calc-number" onClick={ () => click_operant('3')}>3</CalcButton>
					<CalcButton className="calc-operator" onClick={ () => click_operator('add')}>+</CalcButton>
				</div>
				<div className="calc-row">
					<CalcButton className="bigger-btn" onClick={ () => click_operant('0')}>0</CalcButton>
					<CalcButton className="calc-number" onClick={ () => click_dot()}>.</CalcButton>
					<CalcButton className="calc-operator" onClick={ () => click_equal()}>=</CalcButton>
				</div>
			</div>
		</div>
	)
}
export default CalcApp;
