import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import getDateAsString from '../../Helpers/DateAsString';
import Modal from '../Modal/Modal';
import ArticleForm from './ArticleForm';
import DeleteArticleModal from './DeleteArticleModal';

function Article({ article, updateArticle, deleteArticle }) {

    const { topicId, articleId } = useParams()
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    let navigate = useNavigate();

    function toggleOpen() {
        if (articleId === article.id) navigate("/topic/" + topicId)
        else navigate("/topic/" + topicId + "/article/" + article.id)
    }

    function getInfo() {
        if (article.editationDate) {
            return <p className='article-footer-p'>Zuletzt editiert am: {getDateAsString(article.editationDate) || getDateAsString(article.editationDate)}</p>
        } else {
            return <p className='article-footer-p'>Erstellt am: {getDateAsString(article.creationDate)}</p>
        }
    }

    function closeModalEdit(_a) {
        setShow(false)
        if (_a) {
            updateArticle(_a)
        }
    }


    function closeModalDelete(_a) {
        setShowDelete(false)
        if (_a) {
            deleteArticle(_a)
        }
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
                <div className='article-footer-wrapper'>
                    {getInfo()}
                    <button className='article-footer-btn' onClick={() => setShow(true)}>bearbeiten</button>
                    <button className='article-footer-delete-btn' onClick={() => setShowDelete(true)}><i className="bi bi-trash"></i></button>
                </div>
            </div>

            <Modal title="Artikel bearbeiten" onClose={() => closeModalEdit()} show={show}>
                <ArticleForm closeModal={closeModalEdit} edit={article}></ArticleForm>
            </Modal>

            <Modal title="Artikel löschen" onClose={() => closeModalDelete()} show={showDelete}>
                <DeleteArticleModal closeModal={closeModalDelete} article={article}></DeleteArticleModal>
            </Modal>
        </div>
    )
}

export default Article