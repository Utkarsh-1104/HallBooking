import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
const Login = React.lazy(() => import('./components/misc/Login'))
const SuperAdminPage = React.lazy(() => import('./components/superAdmin/SuperAdminDashboard'))
import LandingPage from './components/misc/LandingPage'
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
const AvailableHalls = React.lazy(() => import('./components/hall/AvailableHalls'))
const BookHall = React.lazy(() => import('./components/hall/BookHall'))
const MyProfile = React.lazy(() => import('./components/misc/Profile'))
const EditProfile = React.lazy(() => import('./components/admin/EditProfile'))
const MyBookings = React.lazy(() => import('./components/misc/MyBookings'))
const BookingRequests = React.lazy(() => import('./components/superAdmin/BookingRequests'))
const ViewBookings = React.lazy(() => import('./components/misc/ViewBookings'))
import Loader from "./ui/Loader"
import Navbar from './components/misc/Navbar'
import { Suspense } from "react"
import { RecoilRoot } from "recoil"

function App() {
  return (
    <>
    <RecoilRoot>
      <BrowserRouter basename="/">
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
          <Route path="/availablehalls" element={<Suspense fallback={<Loader />}><AvailableHalls /></Suspense> }></Route>
          <Route path="/bookhall" element={<Suspense fallback={<Loader />}><BookHall /></Suspense> }></Route>
          <Route path="/myprofile" element={<Suspense fallback={<Loader />}><MyProfile /></Suspense> }></Route>
          <Route path="/editprofile" element={<Suspense fallback={<Loader />}><EditProfile /></Suspense>}></Route>
          <Route path="/mybookings" element={<Suspense fallback={<Loader />}><MyBookings /></Suspense> }></Route>
          <Route path="/superadminpage/bookingrequests" element={<Suspense fallback={<Loader />}><BookingRequests /></Suspense> }></Route>
          <Route path="/viewbookings" element={<Suspense fallback={<Loader />}><ViewBookings /></Suspense> }></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
    </>
  )
}

export default App
