import React from 'react'
// import Spinner from '../Utils/Spinner'
import Topic from './Topic'

function TopicList({ topics, active, setActive, onEdit, onDelete, removeTopic }) {
    return (
        <div className={'topic-wrapper scroll'}>
            <h2 className='topic-list-header' key={"topicHeader"}>Topics</h2>
            {topics.length === 0 ? <h2>Keine Topics</h2> : null}
            {topics.map((t) => <Topic key={t.id} onEdit={onEdit} onDelete={onDelete} topic={t} setActive={setActive} removeTopic={removeTopic}></Topic>)}
        </div>
    )
}

export default TopicList