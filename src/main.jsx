import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/Home/index.jsx'
import Detail from './pages/Detail/index.jsx'
import Favorite from './pages/Favorite/index.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/detail/:id",
    element: <Detail />
  },
  {
    path: "/favorite",
    element: <Favorite />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
