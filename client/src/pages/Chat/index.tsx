import React, { useState, useEffect, useRef } from 'react'
import './index.scss'

import axios from 'axios'
import { allUsersRoute, host } from '../../utils/APIRoute'
import { useNavigate } from 'react-router-dom'
import Contacts from '../../components/Contacts'
import Welcome from '../../components/Welcome'
import ChatBox from '../../components/ChatBox'

// 退出登录按钮
import { FloatButton } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
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

    // 加载状态
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login")
        } else {
            setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user')!))

        }
    }, [])


    const fetchUsers = async () => {

        if (currentUser) {
            if (currentUser?.isAvatarImageSet === false) {
                navigate("/setAvatar")
            } else {
                const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`)

                setContacts(data)
                setIsLoading(true)

            }
        }


    }
    useEffect(() => {

        fetchUsers()
    }, [currentUser])

    const handleChatChange = (chat: any) => {
        setCurrentChat(chat)
    }

    // 退出登录
    const handleLogOut = () => {
        localStorage.removeItem("chat-app-user")
        navigate("/login")
    }
    return (
        <div className="chat">
            <div className="container">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
                {
                    isLoading && currentChat === undefined ? (
                        <Welcome currentUser={currentUser} />
                    ) : (
                        <ChatBox currentChat={currentChat} currentUser={currentUser} />
                    )

                }
            </div>
            <FloatButton onClick={handleLogOut} icon={<CloseCircleOutlined />} tooltip={<div style={{ color: "#5154b8" }}>LogOut</div>} />
        </div>
    )
}

export default Chat