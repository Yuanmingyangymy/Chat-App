import React, { useState } from 'react'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { SmileOutlined, SendOutlined } from '@ant-design/icons';
import './index.scss'
interface chatInputType {
    handleSendMsg: any
}
const ChatInput: React.FC<chatInputType> = ({ handleSendMsg }) => {

    // 控制emoji框展开
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(!open)
    }
    const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
        let message = msg

        message += emojiData.emoji
        setMsg(message)
    }

    // 保存输入内容
    const [msg, setMsg] = useState('')

    // 发送信息
    const sendChat = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (msg.trim().length > 0) {
            handleSendMsg(msg)
            setMsg('')
        }
    }
    return (
        <div className="chatInput">
            <div className="emojiBox">
                <SmileOutlined className='emoji' onClick={handleOpen} />

                {
                    open &&
                    <EmojiPicker onEmojiClick={handleEmojiClick} />

                }
            </div>

            <div className="inputArea">
                <form onSubmit={sendChat}>
                    <input type="text" placeholder='send what you want to say~'
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)} />
                    <button type='submit'><SendOutlined /></button>
                </form>


            </div>
        </div>
    )
}

export default ChatInput