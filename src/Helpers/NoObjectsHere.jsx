import React from 'react'

function NoObjectsHere({ Title, msg }) {
    return (
        <div className='ml5'>
            <h1>{Title || "Wählen Sie ein Topic aus!"}</h1>
            <p>{msg}</p>
        </div>
    )
}

export default NoObjectsHere