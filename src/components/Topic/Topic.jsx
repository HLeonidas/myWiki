import React from 'react'
import { useNavigate } from "react-router-dom";

function Topic({ topic }) {
    let navigate = useNavigate();

    return (
        <div className='line-wrapper topic-list-entry-wrapper' onClick={() => navigate("/topic/" + topic.id)} key={topic.id}>
            <div className='symbol-wrapper' style={{ background: topic.color }}>
                <i className={'topic-symbol bi ' + topic.symbol}></i>
            </div>
            <p className='label-wrapper'>
                {topic.label}
            </p>
        </div>
    )
}

export default Topic