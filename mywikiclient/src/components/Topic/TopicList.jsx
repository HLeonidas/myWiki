import React, { useEffect, useState } from 'react'
import { topicService } from '../../services/topicService'
import Topic from './Topic'

function TopicList() {

    const [topics, setTopics] = useState([])

    useEffect(() => {
        topicService.getAll()
            .then((data) => {
                setTopics(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className='topic-wrapper'>
            <h2 className='topic-list-header'>Topics</h2>
            {topics.length === 0 ? <p>loading</p> : null}
            {topics.map((t) => <Topic topic={t}></Topic>)}
        </div>
    )
}

export default TopicList