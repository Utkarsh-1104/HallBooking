import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
const Login = React.lazy(() => import('./components/misc/Login'))
const SuperAdminPage = React.lazy(() => import('./components/superAdmin/SuperAdminDashboard'))
const LandingPage = React.lazy(() => import('./components/misc/LandingPage'))
const AdminDashboard = React.lazy(() => import('./components/admin/AdminDashboard'))
const AdminSettings = React.lazy(() => import('./components/superAdmin/AdminSettings'))
const HallSettings = React.lazy(() => import('./components/superAdmin/HallSettings'))
const AdminRegister = React.lazy(() => import('./components/superAdmin/AdminRegister'))
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Suspense fallback="...loading"><Login /></Suspense>} />
          <Route path="/adminpage" element={<Suspense fallback="...loading"><AdminDashboard /></Suspense>} />
          <Route path="/superadminpage" element={<Suspense fallback={"...loading"}><SuperAdminPage /></Suspense> }></Route>
          <Route path="/superadminpage/adminsettings" element={<Suspense fallback={"...loading"}><AdminSettings /></Suspense> }></Route>
          <Route path="/superadminpage/hallsettings" element={<Suspense fallback={"...loading"}><HallSettings /></Suspense> }></Route>
          <Route path="/superadminpage/adminsettings/addadmin" element={<Suspense fallback={"...loading"}><AdminRegister /></Suspense> }></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
    </>
  )
}

export default App
