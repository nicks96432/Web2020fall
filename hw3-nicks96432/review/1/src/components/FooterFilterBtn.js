import React from "react";
export default ({id, filter, onClick}) => {
    return (
        <button 
            id={id} 
            className={id === filter ? "button-selected" : ""}
            onClick={onClick} >
            {id[0].toUpperCase() + id.slice(1)}
        </button>
    );
}