import React, { useState } from 'react'
import { topicService } from '../../services/topicService';
import TextInputWithValidation from "../Inputs/TextInputValidation";

function TopicForm({ closeModal }) {

    let formValidationInfoDEMO = {
        label: {
            valid: false,
            msg: "",
        },
        symbol: {
            valid: true,
            msg: "",
        },
        color: {
            valid: true,
            msg: "",
        },
        form: {
            valid: true,
            msg: "",
        }
    };

    const [topic, setTopic] = useState({
        label: "Cloud",
        color: "#FFFFFF",
        symbol: "bi-cloud",
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
        setTopic({ ...topic, [name]: value });
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

    function getFontColor(col) {
        if (col[0] === "#") {
            col = col.slice(1);
        }

        var num = parseInt(col, 16);

        var r = (num >> 16);
        var b = ((num >> 8) & 0x00FF);
        var g = (num & 0x0000FF);

        if (r + b + g > 382) {
            return "black"
        } else {
            return "white"
        }
    }

    function LightenDarkenColor(col, amt) {
        var usePound = false;
        if (col[0] === "#") {
            col = col.slice(1);
            usePound = true;
        }

        var num = parseInt(col, 16);

        var r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if (r < 0) r = 0;

        var b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255) b = 255;
        else if (b < 0) b = 0;

        var g = (num & 0x0000FF) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }

    function createTopic() {
        topicService.create(topic)
            .then(() => {
                closeModal(topic)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='form-wrapper'>
            <TextInputWithValidation
                formObject={topic}
                objectKey="label"
                label="Label"
                placeholder="Cloud"
                formValidationInfo={formValidationInfo}
                onChange={onChange}
            ></TextInputWithValidation>

            <div className="grid-2-columns">

                <TextInputWithValidation
                    formObject={topic}
                    objectKey="symbol"
                    label="Symbol"
                    placeholder="bi-time"
                    formValidationInfo={formValidationInfo}
                    onChange={onChange}
                ></TextInputWithValidation>

                <TextInputWithValidation
                    formObject={topic}
                    objectKey="color"
                    label="Farbe"
                    placeholder="bi-time"
                    formValidationInfo={formValidationInfo}
                    type="color"
                    onChange={onChange}
                // additionalClass="ml5"
                ></TextInputWithValidation>
            </div>

            <div className="line-wrapper">


                <div className='symbol-wrapper symbol-form' style={{ background: topic.color, borderColor: LightenDarkenColor(topic.color, -20), color: getFontColor(topic.color) }}>
                    <i className={'topic-symbol bi ' + topic.symbol}></i>
                </div>

                <button className='btn-create-object'
                    disabled={!formValidationInfo["form"]?.valid}
                    onClick={() => createTopic()}>
                    erstellen
                </button>
            </div>
        </div>
    )
}

export default TopicForm