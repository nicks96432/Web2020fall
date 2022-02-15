const inputBox = document.getElementsByClassName("todo-app__input").item(0);
const todoList = document.getElementsByClassName("todo-app__list").item(0);
const footer = document.getElementsByClassName("todo-app__footer").item(0);
const buttons = document.getElementsByClassName("todo-app__view-buttons").item(0);
let todoCount = 0;
let active = false,
	completed = false;
const createTodoItem = (detail) => {
	// <div class="todo-app__item">
	const newTodoItem = document.createElement("div");
	newTodoItem.className = "todo-app__item";
	// 		<div class="todo-app__checkbox">
	const todoCheckboxDiv = document.createElement("div");
	todoCheckboxDiv.className = "todo-app__checkbox";
	// 			<input type="checkbox">
	const todoCheckbox = document.createElement("input");
	todoCheckbox.type = "checkbox";
	// 				<label></label>
	const todoCheckboxLabel = document.createElement("label");
	todoCheckboxLabel.onclick = () => {
		let checkbox = todoCheckboxDiv.firstElementChild;
		checkbox.checked = !checkbox.checked;
		if (checkbox.checked) {
			todoCount--;
			todoItemDetail.classList.add("todo-app__item-Finished");
			if (active) {
				newTodoItem.style.opacity = "0";
				setTimeout(() => {
					newTodoItem.style.display = "none";
				}, 200);
			}
		} else {
			todoCount++;
			todoItemDetail.classList.remove("todo-app__item-Finished");
			if (completed) {
				newTodoItem.style.opacity = "0";
				setTimeout(() => {
					newTodoItem.style.display = "none";
				}, 200);
			}
		}
		footer.firstElementChild.innerText = `${todoCount} left`;
		setTimeout(() => {
			if (todoCount != todoList.childElementCount)
				footer.lastElementChild.style.removeProperty("visibility");
			else footer.lastElementChild.style.visibility = "hidden";
		}, 200);
	};
	todoCheckboxDiv.append(todoCheckbox, todoCheckboxLabel);
	// 			<div class="todo-app__item-detail">
	const todoItemDetail = document.createElement("div");
	todoItemDetail.className = "todo-app__item-detail";
	todoItemDetail.innerText = detail;
	// 			<input class="todo-app__item-x" src="img/x.png" type="img">
	const xButton = document.createElement("input");
	xButton.className = "todo-app__item-x";
	xButton.src = "img/x.png";
	xButton.type = "image";
	xButton.onclick = () => {
		xButton.disabled = true;
		if (!todoCheckbox.checked) todoCount--;
		footer.firstElementChild.innerText = `${todoCount} left`;
		newTodoItem.style.opacity = "0";
		setTimeout(() => {
			newTodoItem.remove();
			if (todoCount == todoList.childElementCount)
				footer.lastElementChild.style.visibility = "hidden";
			if (!todoList.childElementCount) footer.style.display = "none";
		}, 200);
	};
	newTodoItem.append(todoCheckboxDiv, todoItemDetail, xButton);
	newTodoItem.style.opacity = "0";
	return newTodoItem;
};
/* inputBox enter */
inputBox.onkeyup = (e) => {
	if (e.key === "Enter" && inputBox.value) {
		todoCount++;
		footer.style.removeProperty("display");
		let newTodoItem = createTodoItem(inputBox.value);
		inputBox.value = "";
		footer.firstElementChild.innerText = `${todoCount} left`;
		if (completed) {
			newTodoItem.style.display = "none";
			newTodoItem.style.opacity = "0";
		}
		todoList.appendChild(newTodoItem);
		if (!completed)
			setTimeout(() => {
				newTodoItem.style.opacity = "1";
			}, 10);
	}
};
/* All */
buttons.firstElementChild.onclick = () => {
	buttons.firstElementChild.classList.add("all-active");
	buttons.childNodes[3].classList.remove("active-active");
	buttons.childNodes[5].classList.remove("completed-active");
	active = false;
	completed = false;
	todoList.childNodes.forEach((e) => {
		if (e.firstChild) {
			e.style.removeProperty("display");
			setTimeout(() => {
				e.style.opacity = "1";
			}, 50);
		}
	});
};
/* Active */
buttons.childNodes[3].onclick = () => {
	buttons.firstElementChild.classList.remove("all-active");
	buttons.childNodes[3].classList.add("active-active");
	buttons.childNodes[5].classList.remove("completed-active");
	active = true;
	completed = false;
	todoList.childNodes.forEach((e) => {
		if (e.firstChild && e.firstChild.firstChild.checked) {
			e.style.opacity = "0";
			setTimeout(() => {
				e.style.display = "none";
			}, 200);
		} else if (e.firstChild && !e.firstChild.firstChild.checked) {
			e.style.removeProperty("display");
			setTimeout(() => {
				e.style.opacity = "1";
			}, 10);
		}
	});
};
/* Completed */
buttons.childNodes[5].onclick = () => {
	buttons.firstElementChild.classList.remove("all-active");
	buttons.childNodes[3].classList.remove("active-active");
	buttons.childNodes[5].classList.add("completed-active");
	active = false;
	completed = true;
	todoList.childNodes.forEach((e) => {
		if (e.firstChild && !e.firstChild.firstChild.checked) {
			e.style.opacity = "0";
			setTimeout(() => {
				e.style.display = "none";
			}, 200);
		} else if (e.firstChild && e.firstChild.firstChild.checked) {
			e.style.removeProperty("display");
			e.style.opacity = "1";
		}
	});
};
/* Clear Completed */
footer.lastElementChild.onclick = () => {
	let completedTodo = [];
	todoList.childNodes.forEach((e) => {
		if (e.firstChild && e.firstChild.firstChild.checked) {
			e.style.opacity = "0";
			completedTodo.push(e);
		}
	});
	setTimeout(() => {
		completedTodo.forEach((e) => e.remove());
		if (todoCount == todoList.childElementCount)
			footer.lastElementChild.style.setProperty("visibility", "hidden");
		if (!todoList.childElementCount) footer.style.display = "none";
	}, 200);
};
