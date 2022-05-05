import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import TopicList from "../Topic/TopicList"
import Modal from '../Modal/Modal'
import TopicForm from '../Topic/TopicForm';
import { topicService } from '../../services/topicService'
// import Blur from './Blur';

function Sidebar() {
    let navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [topics, setTopics] = useState([])
    const [active, setActive] = useState(false)

    const [onDelete, setOnDelete] = useState(false)
    const [onEdit, setOnEdit] = useState(false)

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
        let _topics = topics.filter((t) => t.label.toLowerCase().includes(value.toLowerCase()))
        setTopicsFiltered(_topics)
    }

    function toggleActive() {
        if (active) setActive(false)
        else setActive(true)
    }

    function changeMode(mode) {
        if (mode === "edit") {
            setOnEdit(!onEdit)
            setOnDelete(false)
        } else if (mode === "delete") {
            setOnEdit(false)
            setOnDelete(!onDelete)
        }
    }

    return (
        <div className='sidebar'>
            <h1 className='menu-header' onClick={() => navigate("/topic")}>myWiki</h1>
            <i className={active ? 'bi bi-x burger' : 'bi bi-list burger'} onClick={() => toggleActive()}></i>
            <div className='sidebar-topics-wrapper' aria-expanded={!active}>
                <TopicList topics={topicsFiltered} onEdit={onEdit} onDelete={onDelete} setActive={setActive}></TopicList>
                <div className='sidebar-footer-wrapper'>
                    <input type={"text"} className="searchBar" onChange={onChange} placeholder="Suchen"></input>
                    <button className='btn-add-topic' onClick={() => { setShow(true) }}>+ Topic hinzufügen</button>
                    <div className='sidebar-footer-menu'>
                        <button onClick={() => changeMode("edit")} className='btn-add-topic pt5 yellow bi bi-pencil'></button>
                        <button onClick={() => changeMode("delete")} className='btn-add-topic pt5 red bi bi-trash'></button>
                        <button className='btn-add-topic pt5 green bi bi-person'></button>
                    </div>
                </div>
            </div>
            {/* {active === true ? <Blur></Blur> : null} */}
            <Modal title="Topic erstellen" onClose={() => closeModal()} show={show}>
                <TopicForm closeModal={closeModal}></TopicForm>
            </Modal>
        </div>
    )
}

export default Sidebar