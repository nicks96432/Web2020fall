import React from "react";
import X from "../img/x.png";
class TodoItem extends React.Component {
	render() {
		return (
			<div className="todo-app__item" id={this.props.ID}>
				<div className="todo-app__checkbox">
					<input readOnly checked={!this.props.active} type="checkbox" />
					<label onClick={this.props.completeClick} />
				</div>
				<div className="todo-app__item-detail">{this.props.detail}</div>
				<input
					className="todo-app__item-x"
					type="image"
					src={X}
					alt="X"
					onClick={this.props.xButtonClick}
				/>
			</div>
		);
	}
}
export default TodoItem;
