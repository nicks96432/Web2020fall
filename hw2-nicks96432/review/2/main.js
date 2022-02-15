const input = document.getElementById("todo-input");
const main = document.getElementById("todo-main");
const but_ALL = document.getElementById("button_ALL");
const but_Active = document.getElementById("button_Active");
const but_Completed = document.getElementById("button_Completed");
const but_Clear = document.getElementById("button_Clear");

var todoListData = [];
var tmp_id = 0
var todoCount = document.getElementById("todo-count");
var id_count = -1;

var todo_list = document.createElement("ul");
todo_list.setAttribute("class", "todo-app__list");
todo_list.setAttribute("id", "todo-list");


function clean_tmp() {
    var element = document.getElementById("item" + tmp_id)
    element.parentNode.removeChild(element);
    for (i = 0; i < todoListData.length; ++i) {
        if (todoListData[i].id === tmp_id) {
            todoListData.splice(i, 1);
            break;
        }
    }
}

function refresh_count() {
    todoCount.innerText = todoListData.filter(ele => !ele.isComplete).length;
}

function refresh_display() {
    todoListData.forEach(ele => {
        var tmp_item = document.getElementById("item" + ele.id);
        tmp_item.style = "display:";
    });
    // but_ALL.style = "outline:None";
    // but_Active.style = "outline:None";
    // but_Completed.style = "outline:None";
}

var TodoItem = function(node, id, mission) {
    this.id = id;
    this.isComplete = false;

    this.itemNode = document.createElement("li");
    const wrapper = document.createElement("div");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    const h1 = document.createElement("h1");
    const x_img = document.createElement("img");


    x_img.setAttribute("src", "./img/x.png");
    x_img.setAttribute("class", "todo-app__item-x")
    h1.setAttribute("class", "todo-app__item-detail");
    h1.innerHTML = mission;
    label.setAttribute("for", id);
    checkbox.setAttribute("id", id);
    checkbox.setAttribute("type", "checkbox");
    wrapper.setAttribute("class", "todo-app__checkbox");
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    this.itemNode.setAttribute("class", "todo-app__item");
    this.itemNode.setAttribute("id", "item" + this.id);
    this.itemNode.appendChild(wrapper);
    this.itemNode.appendChild(h1);
    this.itemNode.appendChild(x_img);
    node.appendChild(this.itemNode);

    checkbox.addEventListener("click", () => {
        this.isComplete = !this.isComplete;
        refresh_count();
        if (this.isComplete) {
            this.itemNode.style["textDecoration"] = "line-through";
            this.itemNode.style["opacity"] = 0.5;
        } else {
            this.itemNode.style["textDecoration"] = "";
            this.itemNode.style["opacity"] = 1;
        }
    })
    x_img.addEventListener("click", () => {
        tmp_id = this.id;
        clean_tmp();
        refresh_count();
    })
}



input.addEventListener('keyup', event => {
    if (event.keyCode === 13 && event.target.value !== '')  {
        if (id_count === -1) {
            main.appendChild(todo_list);
        }
        id_count += 1;
        const newItem = new TodoItem(todo_list, id_count, event.target.value);
        todoListData.push(newItem);
        event.target.value = '';
        refresh_count();
    }
});

but_ALL.addEventListener('click', () => {
    refresh_display();
    // but_ALL.style = "outline:solid blue";
});

but_Active.addEventListener('click', event => {
    refresh_display();
    (todoListData.filter(ele => ele.isComplete)).forEach( e => {
        var tmp_item = document.getElementById("item" + e.id);
        tmp_item.style = "display:None";
    })
    // but_Active.style = "outline:solid blue";

})

but_Completed.addEventListener('click', event => {
    refresh_display();
    (todoListData.filter(ele => !ele.isComplete)).forEach( e => {
        var tmp_item = document.getElementById("item" + e.id);
        tmp_item.style = "display:None";
    })
    // but_Completed.style = "outline:solid blue";

})

but_Clear.addEventListener('click', event => {
    (todoListData.filter(ele => ele.isComplete)).forEach( e => {
        tmp_id = e.id;
        clean_tmp();
    })
})

