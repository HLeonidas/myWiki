import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import TopicList from "../Topic/TopicList"
import Modal from '../Modal/Modal'
import TopicForm from '../Topic/TopicForm';
import { topicService } from '../../services/topicService'

function Sidebar() {
    let navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [topics, setTopics] = useState([])

    const [topicsFiltered, setTopicsFiltered] = useState([])

    useEffect(() => {
        topicService.getAll()
            .then((data) => {
                setTopics(data)
                setTopicsFiltered(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    function closeModal(topic) {
        setShow(false)
        if (topic) {
            setTopics([...topics, topic])
            setTopicsFiltered([...topicsFiltered, topic])
        }
    }

    function onChange(event) {
        const { value } = event.target;
        let _topics = topics.filter((t) => t.label.includes(value))
        setTopicsFiltered(_topics)
    }

    return (
        <div className='sidebar'>
            <h1 className='menu-header' onClick={() => navigate("/topic")}>myWiki</h1>
            <TopicList topics={topicsFiltered}></TopicList>
            <div className='sidebar-footer-wrapper'>
                <input type={"text"} className="searchBar" onChange={onChange} placeholder="Suchen"></input>
                <button className='btn-add-topic' onClick={() => { setShow(true) }}>+ Topic hinzufügen</button>
                <div>menu</div>
            </div>
            <Modal title="Topic erstellen" onClose={() => closeModal()} show={show}>
                <TopicForm closeModal={closeModal}></TopicForm>
            </Modal>
        </div>
    )
}

export default Sidebar