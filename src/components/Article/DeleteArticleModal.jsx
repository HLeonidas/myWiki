import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { topicService } from '../../services/topicService';
import TextInputWithValidation from '../Inputs/TextInputValidation';

function DeleteArticleModal({ closeModal, article }) {

    let formValidationInfoDEMO = {
        label: {

            valid: false,
            msg: '"' + article.label + '" eingeben um den Artikel zu löschen',
        }
    };

    const { topicId, articleId } = useParams()
    const [articleForm, setArticleForm] = useState({
        label: ""
    });

    const [formValidationInfo, setFormValidationInfo] = useState(
        formValidationInfoDEMO
    );

    const onChange = (event) => {
        const { name, value } = event.target;
        setArticleForm({ ...articleForm, [name]: value });
        validateName(name, value);
    };

    function validateName(name, value) {
        let newValidationInfo = {
            valid: false,
            msg: '"' + article.label + '" eingeben um den Artikel zu löschen'
        }

        if (value.toLowerCase() === article.label.toLowerCase()) {
            newValidationInfo = {
                valid: true,
                msg: "",
            }
        }

        setFormValidationInfo({ ...formValidationInfo, [name]: newValidationInfo });
    }

    function deleteArticle() {
        topicService.deleteArticle(topicId, articleId)
            .then(() => {
                closeModal(article);
            })
            .catch((err) => {
                //TODO toast
                console.log(err);
            })
    }

    return (
        <div>
            <div className='form-wrapper'>
                <TextInputWithValidation
                    formObject={articleForm}
                    objectKey="label"
                    label="Label"
                    formValidationInfo={formValidationInfo}
                    onChange={onChange}
                ></TextInputWithValidation>

                <button className='btn-create-object'
                    disabled={!formValidationInfo["label"]?.valid}
                    onClick={() => deleteArticle()}>
                    löschen
                </button>
            </div>
        </div>
    )
}

export default DeleteArticleModal