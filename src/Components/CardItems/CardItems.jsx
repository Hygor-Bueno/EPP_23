import React from 'react';
import './CardItems.css'

export default function CardItems({ list, renderItem }) {
    return (
        <div id="divContainer">
            {list.map((item, index) => (
                <div key={index} id="cardItem">
                    {console.log(item)}
                    {renderItem(item)}
                </div>
            ))}
        </div>
    );
}
