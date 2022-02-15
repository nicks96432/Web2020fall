import React, { Component } from "react";
import ListItem from "./ListItem";
export default class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        switch(this.props.filter) {
            case "active":
                this.selectedItems = this.props.items.filter(item => !item.completed);
                break;
            case "completed":
                this.selectedItems = this.props.items.filter(item => item.completed);
                break;
            default:
                this.selectedItems = this.props.items;
                break;   
        }
        this.list = this.selectedItems.map( e => 
            <ListItem 
                key={e.id} 
                item={e} 
                onChange={this.props.checkItem}
                deleteItem={this.props.deleteItem} />
        );
        // console.log(this.list);
        return (
            <section className="todo-app__main">
                <input 
                    id="todo_input" 
                    className="todo-app__input" 
                    placeholder="What needs to be done?" 
                    onKeyUp={this.props.pressKey} />
                <ul className="todo-app__list" id="todo_list">
                    {this.list}
                </ul>
            </section>
        );
    }
    
};