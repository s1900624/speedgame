import React from 'react';
import './circle.css'

const Circle = ({active, bgColor, clickHandler}) => {
    return (
        <div onClick={clickHandler} className={'circle ' + bgColor + ' ' + active}>

        </div>
    )
}

export default Circle;