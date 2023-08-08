import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Buffer } from 'buffer'
import './index.scss'
import { message } from 'antd'
import { setAvatarRoute } from '../../utils/APIRoute'
import { useNavigate } from 'react-router-dom'

const SetAvatar: React.FC = () => {

    // 生成头像的开源source
    const api = "https://api.multiavatar.com/45678945"

    const [avatars, setAvatars] = useState<string[]>()
    const [isLoading, setIsLoading] = useState(true)
    const [select, setSelect] = useState<number>()
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('chat-app-user')) {
            navigate("/login")
        }
    }, [])
    // 通过初次加载获取头像数据
    useEffect(() => {
        const fetchData = async () => {
            const data = [];
            try {
                for (let i = 0; i < 4; i++) {
                    const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                    const buffer = new Buffer(image.data);
                    data.push(buffer.toString("base64"));
                }
                setAvatars(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [])

    // 设置头像，发送请求
    const setProfilePic = async () => {
        if (select === undefined) {
            message.error("please choose one")
        } else {
            const user = await JSON.parse(localStorage.getItem('chat-app-user')!)
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars && avatars[select]
            })

            // isSet是后台返回的数据；表示用户头像已设置，表示状态true
            if (data.isSet) {
                user.isAvatarImageSet = true
                user.avatarImage = data.image
                localStorage.setItem("chat-app-user", JSON.stringify(user))
                message.success('Great!')
                navigate("/")
            } else {
                message.error("please try again")
            }
        }
    }
    return (
        <div className="setAvatar">
            {
                isLoading
                    ?
                    <>
                        <img src="/assets/loader.gif" alt="loader" className='loader' />

                    </>
                    : (
                        <>
                            <div className="title">
                                <h1>Pick Your Profile Picture</h1>
                            </div>
                            <div className="avatars">
                                {
                                    avatars?.map((avatar, index) => {
                                        return (
                                            <div className={`avatar ${select === index ? "select" : ""}`} key={index} >
                                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelect(index)} />
                                            </div>
                                        )

                                    })
                                }
                            </div>


                            <button onClick={setProfilePic}>Like This!</button>
                        </>



                    )
            }


        </div>
    )
}

export default SetAvatar