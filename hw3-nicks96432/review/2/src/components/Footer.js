import React from "react";
export default ({left, all_f, active_f, completed_f, clear_completed_f, hid}) => {
    //    const {text} = props // expected to be { text: "" }
    
    return (
        <footer className="todo-app__footer" id="todo-footer">
                <div className="todo-app__total" id="todo-total">{left} left</div>
                <ul className="todo-app__view-buttons">
                    <button onClick={all_f}>All</button>
                    <button onClick={active_f}>Active</button>
                    <button onClick={completed_f}>Completed</button>
                </ul>
                <div className="todo-app__clean" id="clean">
                    <button onClick={clear_completed_f} style={hid}>Clear completed</button>
                </div>
        </footer> 
    );
};
