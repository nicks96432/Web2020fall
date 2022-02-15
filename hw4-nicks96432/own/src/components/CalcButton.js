import React from "react";
import PropTypes from "prop-types";

function showNotImplemented() {
	console.warn("This function is not implemented yet.");
}

const CalcButton = (props) => {
	const { className, children, onClick, style } = props;
	const extraClass = className || "";
	return (
		<button
			className={`calc-btn ${extraClass}`}
			style={style}
			onClick={() => {
				onClick(children);
			}}
		>
			{children}
		</button>
	);
};

CalcButton.propTypes = {
	className: PropTypes.string,
	children: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	style: PropTypes.object,
};

CalcButton.defaultProps = {
	onClick: showNotImplemented,
};

export default CalcButton;
