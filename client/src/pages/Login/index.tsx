import React, { useState, useEffect } from 'react'

import './index.scss'
import { message } from 'antd';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { loginRoute } from '../../utils/APIRoute';


const Register: React.FC = () => {

    // 消息弹窗样式
    const navigate = useNavigate()
    const [text, setText] = useState({
        username: '',
        password: '',
    })

    // 检查localStorage，有user就重定向到Chat
    // useEffect(() => {
    //     if (localStorage.getItem('chat-app-user')) {
    //         navigate("/")
    //     }
    // }, [])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleValidation = () => {
        const { username, password } = text
        if (username.trim() === '') {
            message.error("username can't be empty")
            return false
        } else if (password.trim() === '') {
            message.error("password can't be empty")
            return false
        }
        return true
    }
    const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        if (handleValidation()) {


            try {

                const res = await axios.post(loginRoute, text)
                const { data } = res
                if (res.status === 200) {
                    message.success(data.msg)
                    localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                    navigate("/")
                }
            } catch (error: any) {
                if (error.response && error.response.status === 400) {
                    message.error(error.response.data.msg);
                } else {
                    console.log(error);
                }
            }

        }
    }

    return (
        <div className='register'>
            <div className="card">
                <form >
                    <h1>MEET</h1>
                    <input type="text" placeholder='username' name='username' onChange={handleChange} />
                    <input type="password" placeholder='password' name='password' onChange={handleChange} />
                    <button onClick={handleSubmit}>Login</button>
                    <span>Don't have an account? <Link to="/register" style={{ textDecoration: "none", color: '#9a7af1' }}>Register</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Register