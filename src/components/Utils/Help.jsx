import React from 'react'
// import ReactMarkdown from 'react-markdown'

function Help() {
    return (
        <div className='help-wrapper'>
            <h1 className='help-header'>MD cheat sheet</h1>
            {/* <div className='grid-2-columns'> */}
            <div>
                # H1<br />
                ## H2<br />
                ### H3<br />
                #### H4<br />
                ##### H5<br />
                ###### H6<br />
                <br />
                1. First ordered list item<br />
                2. Another item<br />
                ⋅⋅* Unordered sub-list.<br />
                1. Actual numbers don't matter, just that it's a number<br />
                ⋅⋅1. Ordered sub-list<br />
                4. And another item.<br />
                ⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).
                <br /><br />
                ⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅<br />
                ⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅<br />
                ⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)<br />
                <br />
                * Unordered list can use asterisks<br />
                - Or minuses<br />
                + Or pluses<br />

                <br />
                [I'm an inline-style link](https://www.google.com)

                <br />                <br />

                ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

                <br />                <br />

                Inline `code` has `back-ticks around` it.

                <br />                <br />

                ```javascript                <br />
                var s = "JavaScript syntax highlighting";                <br />
                alert(s);                <br />
                ```
            </div>
            {/* <div>
                    <ReactMarkdown>{"# H1 "}</ReactMarkdown>
                    <ReactMarkdown>{"## H2 "}</ReactMarkdown>
                    <ReactMarkdown>{"1. First ordered list item"}</ReactMarkdown>
                    <ReactMarkdown>{"2. Another item"}</ReactMarkdown>
                    <ReactMarkdown>{"⋅⋅* Unordered sub-list"}</ReactMarkdown>
                    <ReactMarkdown>{"1. Actual numbers don't matter, just that it's a number"}</ReactMarkdown>
                    <ReactMarkdown>{"⋅⋅1. Ordered sub-list"}</ReactMarkdown>
                    <ReactMarkdown>{"4. And another item"}</ReactMarkdown>
                </div> */}
            {/* </div> */}
        </div>
    )
}

export default Help