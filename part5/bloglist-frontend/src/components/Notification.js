import React from 'react'

const Notification = ({ message, isError }) => {

    const type = isError ? "error" : "notification"
    return(
        <div className={type}>
            {message}
        </div>
    )
}

export default Notification