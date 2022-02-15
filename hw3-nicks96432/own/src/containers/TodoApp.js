import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TodoItem from "../components/TodoItem";
class TodoApp extends React.Component {
	constructor() {
		super();
		this.state = {
			todoItems: [],
			displayingItems: [],
			todoDetail: "",
			key: 0,
			active: 0,
			allButton: true,
			activeButton: false,
			completeButton: false,
		};
	}
	handleInput = (e) => {
		this.setState({ todoDetail: e.target.value });
	};
	handleEnter = (e) => {
		if (e.key === "Enter" && this.state.todoDetail.length) {
			let tmpItems = this.state.todoItems;
			tmpItems.push({ detail: this.state.todoDetail, key: this.state.key, active: true });
			let tmpDisplaying = tmpItems;
			if (this.state.activeButton) tmpDisplaying = tmpDisplaying.filter((el) => el.active);
			else if (this.state.completeButton)
				tmpDisplaying = tmpDisplaying.filter((el) => !el.active);
			this.setState((prevState) => ({
				todoItems: tmpItems,
				displayingItems: tmpDisplaying,
				todoDetail: "",
				key: prevState.key + 1,
				active: prevState.active + 1,
			}));
		}
	};
	clearCompleted = () => {
		let tmpItems = this.state.todoItems.filter((e) => e.active);
		let tmpDisplaying = this.state.displayingItems.filter((e) => e.active);
		this.setState({ todoItems: tmpItems, displayingItems: tmpDisplaying });
	};
	filterAll = () => {
		this.setState({
			displayingItems: this.state.todoItems,
			allButton: true,
			activeButton: false,
			completeButton: false,
		});
	};
	filterActive = () => {
		this.setState({
			displayingItems: this.state.todoItems.filter((e) => e.active),
			allButton: false,
			activeButton: true,
			completeButton: false,
		});
	};
	filterCompleted = () => {
		this.setState({
			displayingItems: this.state.todoItems.filter((e) => !e.active),
			allButton: false,
			activeButton: false,
			completeButton: true,
		});
	};
	handleXBottonClick = (e) => {
		let todoid = e.target.parentNode.id;
		todoid = parseInt(todoid);
		let tmpItems = this.state.todoItems;
		const index = tmpItems.findIndex((el) => el.key === todoid);
		const isActive = tmpItems[index].active;
		tmpItems.splice(index, 1);
		let tmpDisplaying = tmpItems;
		if (this.state.activeButton) tmpDisplaying = tmpDisplaying.filter((el) => el.active);
		else if (this.state.completeButton)
			tmpDisplaying = tmpDisplaying.filter((el) => !el.active);
		this.setState({
			todoItems: tmpItems,
			displayingItems: tmpDisplaying,
			active: isActive ? this.state.active - 1 : this.state.active,
		});
	};
	handleComplete = (e) => {
		let todoid = e.target.parentNode.parentNode.id;
		todoid = parseInt(todoid);
		let tmpItems = this.state.todoItems;
		const index = tmpItems.findIndex((el) => el.key === todoid);
		let tmpDisplaying = this.state.displayingItems;
		const displayingIndex = tmpDisplaying.findIndex((el) => el.key === todoid);
		if (
			(this.state.activeButton && tmpItems[index].active) ||
			(this.state.completeButton && !tmpItems[index].active)
		)
			tmpDisplaying.splice(displayingIndex, 1);
		tmpItems[index].active = !tmpItems[index].active;
		this.setState({
			todoItems: tmpItems,
			displayingItems: tmpDisplaying,
			active: !tmpItems[index].active ? this.state.active - 1 : this.state.active + 1,
		});
	};
	render() {
		return (
			<>
				<Header text="todos" />
				<div className="todo-app__main">
					<input
						onChange={this.handleInput}
						onKeyUp={this.handleEnter}
						placeholder="What needs to be done?"
						type="text"
						className="todo-app__input"
						value={this.state.todoDetail}
					/>
					<div className="todo-app__list">
						{this.state.displayingItems.map((e) => (
							<TodoItem
								detail={e.detail}
								key={e.key}
								ID={e.key}
								active={e.active}
								xButtonClick={this.handleXBottonClick}
								completeClick={this.handleComplete}
							/>
						))}
					</div>
				</div>
				{this.state.todoItems.length ? (
					<Footer
						activeCount={this.state.active}
						filterAll={this.filterAll}
						filterActive={this.filterActive}
						filterCompleted={this.filterCompleted}
						clearCompleted={this.clearCompleted}
					/>
				) : undefined}
			</>
		);
	}
}

export default TodoApp;
