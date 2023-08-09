import React, { useEffect, useState } from 'react'
import './index.scss'



interface contactsType {
    contacts: any,
    currentUser: any,
    changeChat: any
}
const Contacts: React.FC<contactsType> = ({ contacts, currentUser, changeChat }) => {


    const [currentUserName, setCurrentUserName] = useState<string>()
    const [currentUserImage, setCurrentUserImage] = useState<string>()
    const [currentSelect, setCurrentUserSelect] = useState<number>()
    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username)
        }
    }, [currentUser])

    // 选择聊天对象
    const changeCurrentChat = (index: number, contact: any) => {
        setCurrentUserSelect(index)
        changeChat(contact)
    }
    return (
        <>
            {
                currentUserImage && currentUserName && (
                    <div className='box'>
                        <div className="title">
                            <h1>MEET</h1>
                        </div>
                        <div className="contacts">

                            {
                                contacts?.map((contact: any, index: number) => {
                                    return (
                                        <div className={`contact ${index === currentSelect ? "selected" : ""}`} key={contact._id} onClick={() => changeCurrentChat(index, contact)}>
                                            <div className="avatar">
                                                <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                            </div>
                                            <div className="username">
                                                <h3>{contact.username}</h3>
                                            </div>
                                        </div>

                                    )
                                })

                            }
                        </div>
                        <div className="current-user">
                            <div className="avatar">
                                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                            </div>
                            <div className="username">
                                <h2>{currentUserName}</h2>
                            </div>
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default Contacts