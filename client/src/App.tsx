import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Login from './pages/Login';
import Chat from './pages/Chat';
import Register from './pages/Register';
import SetAvatar from './pages/SetAvatar'
const App: React.FC = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Chat />,
        },
        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/setAvatar",
            element: <SetAvatar />
        }
    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default App