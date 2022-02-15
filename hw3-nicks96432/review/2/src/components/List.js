import React from "react";
import DeleteImg from "../img/x.png"
//import Input from "/Input";
import Footer from "./Footer";


class List extends React.Component {
    constructor(props){
        super(props);
        this.itemleft = 0;
        this.list = [];
        this.select = "all";
        this.itemCompleted = 0;
        this.listID = 0;
        this.state = {value:'', itemleft: 0, select:"all"};
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.hid = {visibility: "hidden"};
    }
    
    click_x(id){
        var item = this.list.find(x => x.index === id);
        if(item.isCompleted === true)  this.itemCompleted = this.itemCompleted - 1;
        else this.itemleft -= 1;
        item.isExist = false;
        if(this.itemCompleted === 0) this.hid = {visibility: "hidden"};
        this.showlist();
        this.setState({itemleft: this.itemleft});
    }
    click_box(id){
        var item = this.list.find(x => x.index === id);
        if(item.isCompleted === true) {
            item.class = "todo-app__item-detail"
            item.isCompleted = false;
            this.itemCompleted -= 1;
            this.itemleft += 1;
        }
        else{
            item.class = "todo-app__item-detail_c"
            item.isCompleted = true;
            this.itemCompleted += 1;
            this.itemleft -= 1;
        }
        this.setState({itemleft: this.itemleft});
        if(this.itemCompleted === 0) this.hid = {visibility: "hidden"};
        else this.hid = {visibility: "visible"};
        this.showlist();
    }
    showlist(){
        if (this.select === "all"){
            this.listItem = this.list.filter(ele => ele.isExist ).map((e) => (
                <li className="todo-app__item">
                    <div className="todo-app__checkbox">
                        <input type="checkbox" id={e.index} onClick={this.click_box.bind(this,e.index)} checked={e.isCompleted}/>
                        <label htmlFor={e.index}></label>
                    </div>
                    <h1 className={e.class}>{e.detail}</h1>
                    <img src={DeleteImg} className="todo-app__item-x" onClick={this.click_x.bind(this, e.index)}/>
                </li>
            )
            );
        }else if (this.select === "completed"){
            this.listItem = this.list.filter(ele => (ele.isCompleted && ele.isExist) ).map((e) => (
                <li className="todo-app__item">
                    <div className="todo-app__checkbox">
                        <input type="checkbox" id={e.index} onClick={this.click_box.bind(this,e.index)} checked={e.isCompleted}/>
                        <label htmlFor={e.index}></label>
                    </div>
                    <h1 className={e.class}>{e.detail}</h1>
                    <img src={DeleteImg} className="todo-app__item-x" onClick={this.click_x.bind(this, e.index)}/>
                </li>
            )
            );
        }else if (this.select === "active"){
            this.listItem = this.list.filter(ele => (!ele.isCompleted && ele.isExist)).map((e) => (
                <li className="todo-app__item">
                    <div className="todo-app__checkbox">
                        <input type="checkbox" id={e.index} onClick={this.click_box.bind(this,e.index)} checked={e.isCompleted}/>
                        <label htmlFor={e.index}></label>
                    </div>
                    <h1 className={e.class}>{e.detail}</h1>
                    <img src={DeleteImg} className="todo-app__item-x" onClick={this.click_x.bind(this, e.index)}/>
                </li>
            )
            );
        }
        this.listshow = (
            <ul className="todo-app__list">
                {this.listItem}
            </ul>
        )
    }
    clearCompleted(){
        
        this.isCompleted = 0;
        this.list.forEach(item => {
           
            if(item.isExist === true && item.isCompleted === true){
                this.click_x(item.index);
            }
        });
        
        this.showlist();
    }
    additem(det){
        this.setState({itemleft: this.itemleft + 1});
        this.list.push({detail: det, isCompleted: false, isExist: true, class:"todo-app__item-detail", index: this.listID});
        this.listID = this.listID + 1;
        this.itemleft += 1;
        this.setState({itemleft: this.itemleft - 1});
        this.showlist();
    }
    handleKeyUp(event){
        if (event.keyCode === 13 && event.target.value !== '') {
            this.additem(this.state.value);
            this.setState({value: ''});
        }else{
            this.setState({value: event.target.value});
        }
    };
    Select(s){
        this.select = s;
        this.showlist();
        this.setState({select: s});
    };
    render(){
        return(
            <section className="todo-app__main">
                <input className="todo-app__input" 
                   placeholder="What needs to be done?" 
                   onChange={this.handleKeyUp} 
                   onKeyUp={this.handleKeyUp} 
                   value = {this.state.value}
                />
                <ul className="todo-app__list" id="todo-list">
                {this.listshow}
                </ul>
                <Footer left={this.itemleft}
                        all_f={this.Select.bind(this, "all")}
                        active_f={this.Select.bind(this, "active")}
                        completed_f={this.Select.bind(this, "completed")}
                        clear_completed_f={this.clearCompleted.bind(this)}
                        hid={this.hid}
                />
            </section> 
        );
    }


}
export default List;

