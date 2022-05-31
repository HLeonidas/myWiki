import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NoObjectsHere from '../../Helpers/NoObjectsHere'
import { topicService } from '../../services/topicService'
import Modal from '../Modal/Modal'
// import Spinner from '../Utils/Spinner'
import Article from './Article'
import ArticleForm from './ArticleForm'

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

    function closeModal(article) {
        setArticles([...articles, article])
        setShow(false)
    }

    function updateArticle(newArticle) {
        let _articles = [];

        for (let a of articles) {
            if (a.id === newArticle.id) {
                _articles.push(newArticle)
            } else {
                _articles.push(a)
            }
        }

        setArticles(_articles)
    }

    function deleteArticle(article) {
        let _articles = [];

        for (let a of articles) {
            if (a.id !== article.id) _articles.push(a)
        }

        setArticles(_articles)
    }

    return (
        <div className='article-list-wrapper'>

            <button className='btn-create-article' onClick={() => setShow(true)}>
                <i className='bi bi-plus'></i>
            </button>

            {articles.map((a) => <Article key={a.id} updateArticle={updateArticle} deleteArticle={deleteArticle} article={a}></Article>)}

            {articles.length === 0 ? <NoObjectsHere Title={"Keine Artikel vorhanden"} msg={"Erstellen Sie Artikel!"}></NoObjectsHere> : null}

            <Modal title="Artikel erstellen" key={"createArticleModal"} onClose={() => setShow(false)} show={show}>
                <ArticleForm closeModal={closeModal} ></ArticleForm>
            </Modal>
        </div>
    )
}

export default ArticleList