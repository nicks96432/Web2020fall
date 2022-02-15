import React from "react";

export class Footer extends React.Component {
	render() {
		return (
			<footer className="todo-app__footer">
				<div className="todo-app__total">{this.props.activeCount} left</div>
				<div className="todo-app__view-buttons">
					<button defaultChecked={true} onClick={this.props.filterAll}>All</button>
					<button onClick={this.props.filterActive}>Active</button>
					<button onClick={this.props.filterCompleted}>Completed</button>
				</div>
				<div className="todo-app__clean">
					<button onClick={this.props.clearCompleted}>Clear Completed</button>
				</div>
			</footer>
		);
	}
}

export default Footer;
