import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { authRoutes, protectedRoutes } from './routes'
import Layout from './components/Routes/Layout'


function App() {

  return (
    <div>
      <Routes>
        {
          authRoutes.map((route, index) => <Route key={index} path={route.path} element={route.element} />)
        }
        <Route element={<Layout />}>
          {
            protectedRoutes.map((route, index) => <Route key={index} path={route.path} element={route.element} />)
          }
        </Route>
      </Routes>
    </div>
  )
}

export default App