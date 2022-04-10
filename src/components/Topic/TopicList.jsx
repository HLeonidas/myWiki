import React from 'react'
import Spinner from '../Utils/Spinner'
import Topic from './Topic'

function TopicList({ topics, active, setActive }) {
    return (
        <div className={'topic-wrapper scroll'}>
            <h2 className='topic-list-header'>Topics</h2>
            {topics.length === 0 ? <Spinner></Spinner> : null}
            {topics.map((t) => <Topic topic={t} setActive={setActive}></Topic>)}
        </div>
    )
}

export default TopicList