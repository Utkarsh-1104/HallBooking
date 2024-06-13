import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminLogin from './components/AdminLogin'
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar'
import SuperAdminLogin from './components/SuperAdminLogin'
import { Suspense } from "react"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/adminlogin" element={<Suspense fallback="...loading"><AdminLogin /></Suspense> } />
          <Route path="/superadminlogin" element={<Suspense fallback="...loading" ><SuperAdminLogin /></Suspense>} />
          {/* <LandingPage />
          <AdminLogin />
          <SuperAdminLogin /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
