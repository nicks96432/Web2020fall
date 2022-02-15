import React from "react";
import XImgSource from '../img/x.png';
export default({item, onChange, deleteItem}) => {
    return(
        <li className="todo-app__item">
            <div className="todo-app__checkbox">
                <input id={item.id} type="checkbox" onChange={onChange} checked={item.completed}/>
                <label htmlFor={item.id} />
            </div>
            <h1 className="todo-app__item-detail" 
                style={item.completed? {textDecoration: "line-through", opacity: 0.5}:
                                        {textDecoration: "none", opacity: 1.0}}>
                {item.detail}
            </h1>
            <img className="todo-app__item-x" src={XImgSource} alt="X" onClick={() => deleteItem(item.id)}/>
        </li>
    );
}