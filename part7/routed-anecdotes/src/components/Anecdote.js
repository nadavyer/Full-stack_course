import React from 'react'
import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdote }) => {
    return (
        <div>
            <h3> {anecdote.content} </h3>
            <div>
                <p>
                    has {anecdote.votes} votes
                </p>
            </div>
            <div>
                <p>
                    for more info see {anecdote.info}
                </p>
            </div>
        </div>
    )
}

export default Anecdote