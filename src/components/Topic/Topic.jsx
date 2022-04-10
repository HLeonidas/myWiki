import React from 'react'
import { useNavigate } from "react-router-dom";

function Topic({ topic }) {
    let navigate = useNavigate();
    // const { topicId } = useParams()

    function getFontColor(col) {
        if (col === undefined) return "#FFFFFF"
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
        if (col === undefined) return "#FFFFFF"
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

    function isSelected() {
        // if (topicId === topic.id) return true
        return false
    }

    return (
        <div className={isSelected() ? 'line-wrapper topic-list-entry-wrapper selected' : 'line-wrapper topic-list-entry-wrapper'} onClick={() => navigate("/topic/" + topic.id)} key={topic.id}>
            <div className='symbol-wrapper' style={{ background: topic.color, borderColor: LightenDarkenColor(topic.color, -20), color: getFontColor(topic.color) }}>
                <i className={'topic-symbol bi ' + topic.symbol}></i>
            </div>
            <p className='label-wrapper'>
                {topic.label}
            </p>
        </div>
    )
}

export default Topic