import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

function Article({ article }) {

    const { topicId, articleId } = useParams()
    let navigate = useNavigate();

    function getContent() {
        if (articleId === article.id) return <div className='article-content-wrapper'>
            <ReactMarkdown>
                {article.content}
            </ReactMarkdown>
        </div>
    }

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
            {/* <div className={articleId === article.id ? "article-content-wrapper " : "article-content-wrapper hidden"}>
                {article.content}
            </div> */}
            {getContent()}
        </div>
    )
}

export default Article