import React from 'react'

const FetchError = ({message, onRetry}) =>( 
    <div>
        <p>something error happens. {message} </p>
        <button onClick={onRetry}>Retry</button>
    </div>
)

export default FetchError;