import React, { useState, useEffect } from 'react'

import './index.scss'
import { message } from 'antd';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { registerRoute } from '../../utils/APIRoute';


const Register: React.FC = () => {

    // 消息弹窗样式
    // const msgCss = {
    //     position: "bottom-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    // }
    const navigate = useNavigate()
    const [text, setText] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
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
        const { username, password, confirmPassword, email } = text
        if (password !== confirmPassword) {
            message.error("password must be same to the confirmPassword!")
            return false
        } else if (username.length < 3) {
            message.error("username must be more than three words!")
            return false
        } else if (email.length < 3) {
            message.error("email must be more than three words!")
            return false
        } else if (password.length < 6) {
            message.error("password must be more than six words!")
            return false
        } else if (email.trim() === '') {
            message.error("email is not expected to be null")
            return false
        }
        return true
    }
    const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        if (handleValidation()) {
            const { confirmPassword, ...info } = text
            console.log(info);


            try {
                const res = await axios.post(registerRoute, info)
                console.log(res);

                const { data } = res
                console.log(data);


                if (res.status === 409) {
                    message.error(data.msg)
                } else if (res.status === 200) {
                    message.success(data.msg)
                    navigate("/login")
                }
            } catch (err: any) {
                if (err.response && err.response.status === 409) {
                    message.error(err.response.data)
                } else {
                    throw err
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
                    <input type="password" placeholder='confirmPassword' name='confirmPassword' onChange={handleChange} />
                    <input type="text" placeholder='email' name='email' onChange={handleChange} />
                    <button onClick={handleSubmit} type='button'>Register</button>
                    <span>Already have a account ? <Link to="/login" style={{ textDecoration: "none", color: '#9a7af1' }}>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Register