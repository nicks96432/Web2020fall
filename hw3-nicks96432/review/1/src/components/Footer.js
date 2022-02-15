import React from "react";
import FooterFilterBtn from "./FooterFilterBtn";
export default ({items, clearCompleted, filter, selectFilter}) => {
    let leftNum = items.filter(item => !item.completed).length;
    let completedNum = items.length - leftNum;
    return(
        <footer className="todo-app__footer" id="todo-footer">
            <div className="todo-app__total">{leftNum} left</div>
            <ul className="todo-app__view-buttons">
                <FooterFilterBtn id="all" filter={filter} onClick={selectFilter}/>
                <FooterFilterBtn id="active" filter={filter} onClick={selectFilter}/>
                <FooterFilterBtn id="completed" filter={filter} onClick={selectFilter}/>
            </ul>
            <div className="todo-app__clean">
                <button 
                    id="clear" 
                    style={completedNum > 0 ? {visibility: "visible"}: {visibility: "hidden"}}
                    onClick={clearCompleted}>
                        Clear Completed
                </button>
            </div>
        </footer>
    )
}