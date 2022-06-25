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
    const [latestArticles, setLatestArticles] = useState([])
    const { topicId } = useParams()
    const [show, setShow] = useState(false);

    useEffect(() => {
        topicService.getArticleOfTopic(topicId)
            .then((data) => {
                UpdateArticles(data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [topicId])

    function closeModal(article) {
        UpdateArticles([...articles, ...latestArticles, article])
        // setArticles([...articles, ])
        setShow(false)
    }

    function UpdateArticles(data) {
        let sortedByDate = [...data].sort((a, b) => a.date < b.date ? 1 : -1)
        setLatestArticles(sortedByDate.slice(0, 3))
        setArticles(sortedByDate.slice(3, sortedByDate.length).sort((a, b) => a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1))
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

        // setArticles(_articles)

        let _articlesLatest = [];

        for (let a of latestArticles) {
            if (a.id === newArticle.id) {
                _articles.push(newArticle)
            } else {
                _articles.push(a)
            }
        }

        UpdateArticles([..._articles, ..._articlesLatest])

        // setLatestArticles(_articles)

    }

    function deleteArticle(article) {
        let _articles = [];

        for (let a of articles) {
            if (a.id !== article.id) _articles.push(a)
        }

        // setArticles(_articles)

        let _articlesLatest = [];

        for (let a of latestArticles) {
            if (a.id !== article.id) _articles.push(a)
        }

        // setLatestArticles(_articles)
        UpdateArticles([..._articles, ..._articlesLatest])

    }

    // function getLatestCreatedArticles() {
    // if (!articles) return [];


    // let latestCraeted = [...articles].sort((a, b) => a.date < b.date ? 1 : -1).slice(0, 3)

    // for (var i = 0; i < articles.length; i++) {

    //     if (articles[i].id === 5) {

    //         articles.slice(i, 1);
    //     }

    // }
    // setArticles(articles)
    // return latestCraeted;
    // }

    return (
        <div className='article-list-wrapper'>

            <button className='btn-create-article' onClick={() => setShow(true)}>
                <i className='bi bi-plus'></i>
            </button>

            {latestArticles.length === 0 ? <NoObjectsHere Title={"Keine Artikel vorhanden"} msg={"Erstellen Sie Artikel!"}></NoObjectsHere> : null}

            {latestArticles.length !== 0 ? <h3 style={{ paddingLeft: "2px", marginBottom: "12px" }}>Zuletzt erstellte Artikel</h3> : null}
            {latestArticles.map((a) => <Article key={a.id} updateArticle={updateArticle} deleteArticle={deleteArticle} article={a}></Article>)}

            {articles.length !== 0 ? <h3 style={{ paddingLeft: "2px", marginBottom: "12px" }}>Alle Artikel</h3> : null}
            {articles.map((a) => <Article key={a.id} updateArticle={updateArticle} deleteArticle={deleteArticle} article={a}></Article>)}


            <Modal title="Artikel erstellen" key={"createArticleModal"} onClose={() => setShow(false)} show={show}>
                <ArticleForm closeModal={closeModal} ></ArticleForm>
            </Modal>
        </div>
    )
}

export default ArticleList