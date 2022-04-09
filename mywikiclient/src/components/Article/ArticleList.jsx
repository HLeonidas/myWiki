import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { topicService } from '../../services/topicService'
import Modal from '../Modal/Modal'
import Article from './Article'
import ArticleForm from './ArticleForm'
// import ArticleForm from './ArticleForm'

function ArticleList() {

    const [articles, setArticles] = useState([])

    const { topicId } = useParams()
    const [show, setShow] = useState(false);


    useEffect(() => {
        topicService.getArticleOfTopic(topicId)
            .then((data) => {
                setArticles(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [topicId])

    return (
        <div className='article-list-wrapper'>
            {articles.map((a) => <Article article={a}></Article>)}
            <button className='btn-create-article' onClick={() => setShow(true)}>
                <i className='bi bi-plus'></i>
            </button>
            <Modal title="Artikel erstellen" onClose={() => setShow(false)} show={show}>
                <ArticleForm></ArticleForm>
            </Modal>
        </div>
    )
}

export default ArticleList