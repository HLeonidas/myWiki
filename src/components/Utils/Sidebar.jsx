import React from 'react'
import { useNavigate } from 'react-router-dom';
import TopicList from "../Topic/TopicList"

function Sidebar() {
    let navigate = useNavigate();

    return (
        <div className='sidebar'>
            <h1 className='menu-header' onClick={() => navigate("/topic")}>myWiki</h1>
            <TopicList></TopicList>
            <div>
                <button className='btn-add-topic'>+ Topic hinzufügen</button>
            </div>
        </div>
    )
}

export default Sidebar