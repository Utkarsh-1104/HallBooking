import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
const AdminLogin = React.lazy(() => import('./components/AdminLogin'))
const SuperAdminLogin = React.lazy(() => import('./components/SuperAdminLogin'))
const AdminPage = React.lazy(() => import('./components/AdminPage'))
const SuperAdminPage = React.lazy(() => import('./components/SuperAdminPage'))
const LandingPage = React.lazy(() => import('./components/LandingPage'))
import Navbar from './components/Navbar'
import { Suspense } from "react"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/adminlogin" element={<Suspense fallback="...loading"><AdminLogin /></Suspense> } />
          <Route path="/superadminlogin" element={<Suspense fallback="...loading"><SuperAdminLogin /></Suspense>} />
          <Route path="/adminpage" element={<Suspense fallback={"...loading"} ><AdminPage /></Suspense> } />
          <Route path="/superadminpage" element={<Suspense fallback={"...loading"}><SuperAdminPage /></Suspense> }></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
