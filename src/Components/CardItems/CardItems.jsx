import React from 'react';
import './CardItems.css'

export default function CardItems({ list, renderItem }) {
    return (
        <div id="divContainer">
            {list.map((item, index) => (
                <div key={index} id="cardItem">
                    {renderItem(item)}
                </div>
            ))}
        </div>
    );
}
