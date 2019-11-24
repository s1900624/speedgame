import React from 'react';
import './circle.css'

const Circle = ({active, bgColor, clickHandler, text}) => {
    return (
        <div
            onClick={clickHandler}
            className={`circle ${bgColor} ${active}`}>
            {text}
        </div>
    )
}

export default Circle;