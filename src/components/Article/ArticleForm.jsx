import React, { useState } from 'react'
import TextInputWithValidation from "../Inputs/TextInputValidation";
import { topicService } from '../../services/topicService';
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom';

function ArticleForm({ closeModal }) {

  const { topicId } = useParams()

  let formValidationInfoDEMO = {
    label: {
      valid: false,
      msg: "",
    },
    content: {
      valid: true,
      msg: "",
    },
    form: {
      valid: true,
      msg: "",
    }
  };

  const [article, setTopic] = useState({
    label: "",
    content: ""
  });

  const [formValidationInfo, setFormValidationInfo] = useState(
    formValidationInfoDEMO
  );

  const validateField = (name, value) => {
    let validationInfo;

    switch (name) {
      case "label":
        validationInfo = checkLabel(value);
        break;
      case "symbol":
        validationInfo = checkSymbol(value);
        break;
      case "color":
        validationInfo = checkColor(value);
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

  function checkColor(value) {
    let msg = "";
    let valid = true;
    if (!value) {
      msg = "";
      valid = false;
    }
    return { valid, msg };
  }

  function checkSymbol(value) {
    let msg = "";
    let valid = true;
    if (!value) {
      msg = "";
      valid = false;
    }
    return { valid, msg };
  }

  function createTopic() {
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

      <div className="grid-2-columns scroll max-height-400">
        <div>
          <label className="inputLabel">Inhalt</label>
          <textarea onChange={onChange} name="content" placeholder='# Heading' className='text-area-content' rows="10"></textarea>
        </div>
        <div className='ml5'>
          <label htmlFor={`inputCtrl_content`} className="inputLabel">Vorschau</label>
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </div>

      <button className='btn-create-object'
        disabled={!formValidationInfo["form"]?.valid}
        onClick={() => createTopic()}>
        erstellen
      </button>
    </div>
  )
}

export default ArticleForm