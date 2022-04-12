import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import getDateAsString from '../../Helpers/DateAsString';

function Article({ article }) {

    const { topicId, articleId } = useParams()
    let navigate = useNavigate();

    function toggleOpen() {
        if (articleId === article.id) navigate("/topic/" + topicId)
        else navigate("/topic/" + topicId + "/article/" + article.id)
    }



    return (
        <div className={articleId === article.id ? 'article-wrapper' : 'article-wrapper boxShadow'} >
            <div className='line-wrapper article-header-wrapper' onClick={() => toggleOpen()}>
                <h2 className='article-header' >{article.label}</h2>
                <i className={articleId === article.id ? "bi bi-chevron-right btn-chevron rotation" : "bi bi-chevron-right btn-chevron "}></i>
            </div>
            <div className='article-content-wrapper' aria-expanded={!(articleId === article.id)}>
                <ReactMarkdown>
                    {article.content}
                </ReactMarkdown>
                <div className='article-footer-wrapper line-wrapper'>
                    <p className='article-footer-p'>Erstellt am: {getDateAsString(article.creationDate)}</p>
                </div>
            </div>
        </div>
    )
}

export default Article