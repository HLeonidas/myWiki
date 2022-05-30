import React, { useState } from 'react'
import TextInputWithValidation from "../Inputs/TextInputValidation";
import { topicService } from '../../services/topicService';
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom';

function ArticleForm({ closeModal, edit }) {

  const { topicId } = useParams()

  let formValidationInfoDEMO = {
    label: {
      valid: true,
      msg: "",
    },
    content: {
      valid: true,
      msg: "",
    },
    form: {
      valid: false,
      msg: "",
    }
  };

  if (!edit) {
    edit = {
      label: "",
      content: ""
    }
  }

  const [article, setTopic] = useState(edit);

  const [formValidationInfo, setFormValidationInfo] = useState(
    formValidationInfoDEMO
  );

  const validateField = (name, value) => {
    let validationInfo;

    switch (name) {
      case "label":
        validationInfo = checkLabel(value);
        break;
      case "content":
        validationInfo = checkContent(value);
        break;
      default:
    }

    let newFormValidationInfo = {
      ...formValidationInfo,
      [name]: validationInfo,
    };

    newFormValidationInfo = checkForm(newFormValidationInfo);
    setFormValidationInfo(newFormValidationInfo);
  };

  function checkForm(newFormValidationInfo) {
    let valid = true;
    let msg = "ok";
    let validationInfo;

    for (let key in newFormValidationInfo) {
      if (!newFormValidationInfo[key].valid && key !== "form") {
        valid = false;
        msg = "not ok";
      }
    }

    validationInfo = { valid, msg };
    newFormValidationInfo["form"] = validationInfo;

    return newFormValidationInfo;
  }

  const onChange = (event) => {
    const { name, value } = event.target;
    setTopic({ ...article, [name]: value });
    validateField(name, value);
  };

  function checkLabel(value) {
    let msg = "";
    let valid = true;
    if (!value) {
      msg = "Label eingeben!";
      valid = false;
    }
    return { valid, msg };
  }

  function checkContent(value) {
    let msg = "";
    let valid = true;
    if (!value) {
      msg = "";
      valid = false;
    }
    return { valid, msg };
  }

  function createArticle() {
    let _article = { ...article, creationDate: new Date() }
    topicService.addArticle(topicId, _article)
      .then((id) => {
        _article.id = id
        closeModal(_article)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function updateArticle() {
    let _article = { ...article, editationDate: new Date() }
    topicService.updateArticle(topicId, _article)
      .then(() => {
        closeModal(_article)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function submit() {
    if (edit.id) {
      updateArticle()
    } else {
      createArticle()
    }
  }

  return (
    <div className='form-wrapper'>
      <TextInputWithValidation
        formObject={article}
        objectKey="label"
        label="Label"
        placeholder="Cloud"
        formValidationInfo={formValidationInfo}
        onChange={onChange}
      ></TextInputWithValidation>

      <div className="scroll max-height-400 article-form-input-content">
        <div>
          <label className="inputLabel">Inhalt</label>
          <textarea onChange={onChange} value={article.content} name="content" placeholder='# Heading' className='text-area-content' rows="10"></textarea>
        </div>
        <div className='ml5 article-form-vorschlag'>
          <label htmlFor={`inputCtrl_content`} className="inputLabel">Vorschau</label>
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </div>


      <button className='btn-create-object'
        disabled={!formValidationInfo["form"]?.valid}
        onClick={() => submit()}>
        {edit.id ? "aktualisieren" : "erstellen"}
      </button>
    </div>
  )
}

export default ArticleForm