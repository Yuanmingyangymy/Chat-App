import React, { useState, useEffect } from 'react'
import './index.scss'

import axios from 'axios'
import { allUsersRoute } from '../../utils/APIRoute'
import { useNavigate } from 'react-router-dom'
import Contacts from '../../components/Contacts'
import Welcome from '../../components/Welcome'
const Chat: React.FC = () => {
    const navigate = useNavigate()
    const [contacts, setContacts] = useState()
    // 获取当前登录用户的信息，之后将其id传给后台，筛选出其他用户在展示到聊天框里面
    interface userType {
        _id: string,
        username: string,
        password: string,
        isAvatarImageSet: boolean,
        avatarImage: string
    }
    const [currentUser, setCurrentUser] = useState<userType>()
    // 选择当前聊天对象
    const [currentChat, setCurrentChat] = useState<[]>()
    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login")
        } else {
            setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user')!))

        }
    }, [])
    if (currentUser?.isAvatarImageSet === false) {
        navigate("/setAvatar")
    }
    const fetchUsers = async () => {

        if (currentUser) {
            if (currentUser?.isAvatarImageSet === false) {
                navigate("/setAvatar")
            } else {
                const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`)
                console.log(data);

                setContacts(data)

            }
        }


    }
    useEffect(() => {

        fetchUsers()
    }, [])

    const handleChatChange = (chat: any) => {
        setCurrentChat(chat)
    }
    return (
        <div className="chat">
            <div className="container">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
                <Welcome currentUser={currentUser} />
            </div>
        </div>
    )
}

export default Chat