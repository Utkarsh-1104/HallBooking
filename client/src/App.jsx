import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
const Login = React.lazy(() => import('./components/misc/Login'))
const SuperAdminPage = React.lazy(() => import('./components/superAdmin/SuperAdminDashboard'))
const LandingPage = React.lazy(() => import('./components/misc/LandingPage'))
const AdminDashboard = React.lazy(() => import('./components/admin/AdminDashboard'))
const AdminSettings = React.lazy(() => import('./components/superAdmin/AdminSettings'))
const HallSettings = React.lazy(() => import('./components/superAdmin/HallSettings'))
const AdminRegister = React.lazy(() => import('./components/superAdmin/AdminRegister'))
const ViewSingleAdmin = React.lazy(() => import('./components/superAdmin/ViewSingleAdmin'))
const EditAdminsPage = React.lazy(() => import('./components/superAdmin/EditAdmin'))
const AddHall = React.lazy(() => import('./components/superAdmin/AddHall'))
const ViewSingleHall = React.lazy(() => import('./components/superAdmin/ViewSingleHall'))
const EditHallsPage = React.lazy(() => import('./components/superAdmin/EditHall'))
const SingleHallForAdmin = React.lazy(() => import('./components/admin/SingleHallForAdmin'))
import Loader from "./ui/Loader"
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
          <Route path="/login" element={<Suspense fallback={<Loader />}><Login /></Suspense>} />
          <Route path="/adminpage" element={<Suspense fallback={<Loader />}><AdminDashboard /></Suspense>} />
          <Route path="/superadminpage" element={<Suspense fallback={<Loader />}><SuperAdminPage /></Suspense> }></Route>
          <Route path="/superadminpage/adminsettings" element={<Suspense fallback={<Loader />}><AdminSettings /></Suspense> }></Route>
          <Route path="/superadminpage/hallsettings" element={<Suspense fallback={<Loader />}><HallSettings /></Suspense> }></Route>
          <Route path="/superadminpage/adminsettings/addadmin" element={<Suspense fallback={<Loader />}><AdminRegister /></Suspense> }></Route>
          <Route path="/superadminpage/adminsettings/viewadmin" element={<Suspense fallback={<Loader />}><ViewSingleAdmin /></Suspense> }></Route>
          <Route path="/superadminpage/adminsettings/editadmin" element={<Suspense fallback={<Loader />}><EditAdminsPage /></Suspense> }></Route>
          <Route path="/superadminpage/adminsettings/addhall" element={<Suspense fallback={<Loader />}><AddHall /></Suspense> }></Route>
          <Route path="/superadminpage/hallsettings/viewhall" element={<Suspense fallback={<Loader />}><ViewSingleHall /></Suspense> }></Route>
          <Route path="/superadminpage/hallsettings/edithall" element={<Suspense fallback={<Loader />}><EditHallsPage /></Suspense> }></Route>
          <Route path="/adminpage/hallsettings/viewhalladmin" element={<Suspense fallback={<Loader />}><SingleHallForAdmin /></Suspense> }></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
    </>
  )
}

export default App
