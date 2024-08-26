import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
const Login = React.lazy(() => import('./components/misc/Login'))
const SuperAdminPage = React.lazy(() => import('./components/superAdmin/SuperAdminDashboard'))
const LandingPage = React.lazy(() => import('./components/misc/LandingPage'))
const AdminDashboard = React.lazy(() => import('./components/admin/AdminDashboard'))
import Navbar from './components/misc/Navbar'
import { Suspense } from "react"
import { RecoilRoot } from "recoil"

function App() {
  return (
    <>
    <RecoilRoot>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<LandingPage />} />
          <Route path="/login" element={<Suspense fallback="...loading"><Login /></Suspense>} />
          <Route path="/adminpage" element={<Suspense fallback="...loading"><AdminDashboard /></Suspense>} />
          <Route path="/superadminpage" element={<Suspense fallback={"...loading"}><SuperAdminPage /></Suspense> }></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
    </>
  )
}

export default App
