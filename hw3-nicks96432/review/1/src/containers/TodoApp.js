import React, { Component } from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Footer from "../components/Footer";

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftNum: 0, 
            completedNum: 0, 
            items: [], 
            nextId: 0,
            filter: "all"
        };
    }
    pressKey = (event) => {
        if(event.keyCode === 13 && event.target.value !== "") {
            let newItems = this.state.items;
            newItems.push({id: this.state.nextId, detail: event.target.value, completed: false});
            event.target.value = "";
            this.setState( state => ({
                items: newItems,
                nextId: state.nextId + 1
            }));
        }
    };

    checkItem = (event) => {
        // console.log(`onChange ${event.target}`);
        let id = event.target.id;
        let index = this.state.items.findIndex(item => `${item.id}` === id);
        let newItems = this.state.items;
        // console.log(newItems[index]);
        newItems[index].completed = !newItems[index].completed;
        this.setState({items: newItems});
    }

    deleteItem = (id) => {
        let index = this.state.items.findIndex(item => item.id === id);
        let newItems = this.state.items;
        // console.log(index);
        newItems.splice(index, 1);
        this.setState({items: newItems});
    }

    clearCompleted = () => {
        let newItems = this.state.items;
        for (let completedItem of this.state.items.filter(item => item.completed)) {
            let index = this.state.items.findIndex(item => item === completedItem);
            newItems.splice(index, 1);
        }
        this.setState({items: newItems});
    }

    selectFilter = (event) => {
        let id = event.target.id;
        if (this.state.filter !== id) {
            this.setState({filter: id})
        }
    }

    render() {
        return (
            <>
                <Header text="TODOS" />
                <Section 
                    items={this.state.items}
                    nextId={this.state.nextId}
                    pressKey={this.pressKey}
                    checkItem={this.checkItem}
                    deleteItem={this.deleteItem}
                    filter={this.state.filter}/>
                <Footer 
                    items={this.state.items} 
                    clearCompleted={this.clearCompleted} 
                    filter={this.state.filter}
                    selectFilter={this.selectFilter}/>
            </>
        );
    }
}

export default TodoApp;
