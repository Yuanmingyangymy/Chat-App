import React from 'react'
import './index.scss'


interface welType {
    currentUser: any
}
const Welcome: React.FC<welType> = ({ currentUser }) => {
    return (
        <div className='welcome'>
            <img src="/assets/robot.gif" alt="" />
            <h1>Welcome! <span>{currentUser?.username}</span></h1>
            <h2>Chat With Someone Left👈!</h2>
        </div>
    )
}

export default Welcome