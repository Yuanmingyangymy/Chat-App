import React, { useState, useEffect, useRef } from 'react'

import './index.scss'
import ChatInput from '../ChatInput';
import axios from 'axios';
import { getAllMessageRoute, sendMessageRoute, host } from '../../utils/APIRoute';
import { v4 as uuidv4 } from 'uuid';

interface chatBoxType {
    currentChat: any
    currentUser: any
    socket: any
}




const ChatBox: React.FC<chatBoxType> = ({ currentChat, currentUser, socket }) => {
    type msgType = {
        fromSelf: boolean,
        message: string
    }[]
    // 存放将要展示的信息
    const [messages, setMessages] = useState<msgType>([])
    // 获取与当前聊天对象的信息数据
    const fetchMsgs = async () => {
        const res = await axios.post(getAllMessageRoute, {
            from: currentUser?._id,
            to: currentChat?._id
        })
        setMessages(res.data)
    }
    useEffect(() => {
        fetchMsgs()
    }, [currentChat])




    // 发送消息
    const handleSendMsg = async (msg: string) => {
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: msg
        })
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        })

        const msgs = [...messages]
        msgs.push({ fromSelf: true, message: msg })
        setMessages(msgs)
    }

    // 接受到消息，放入messages中
    type arrivalType = {
        fromSelf: boolean,
        message: string
    }
    const [arrivalMsg, setArrivalMsg] = useState<arrivalType>()
    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-receive", (msg: string) => {
                setArrivalMsg({ fromSelf: false, message: msg })
            })
        }
    }, [])
    useEffect(() => {
        arrivalMsg && setMessages((prev) => [...prev, arrivalMsg])
    }, [arrivalMsg])
    console.log('messages', messages);

    // 有消息更新就滚动窗口
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <div className="chatBox">
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`} alt="avatar" />
                    </div>
                    <div className="username">
                        <h3>{currentChat?.username}</h3>
                    </div>
                </div>

            </div>
            <div className="chat-messages">
                {
                    messages?.map((message) => {
                        return (
                            <div ref={scrollRef} key={uuidv4()}>
                                <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                                    <div className="content">
                                        <p>
                                            {message.message}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </div>
    )
}

export default ChatBox