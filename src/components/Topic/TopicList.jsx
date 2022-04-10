import React from 'react'
import Spinner from '../Utils/Spinner'
import Topic from './Topic'

function TopicList({ topics }) {
    return (
        <div className='topic-wrapper'>
            <h2 className='topic-list-header'>Topics</h2>
            {topics.length === 0 ? <Spinner></Spinner> : null}
            {topics.map((t) => <Topic topic={t}></Topic>)}
        </div>
    )
}

export default TopicList