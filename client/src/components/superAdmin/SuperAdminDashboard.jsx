import AdminRegister from "./AdminRegister" 

const SuperAdminDashboard = () => {
  return (
    <div className='bg-black h-screen font-[Roboto] flex flex-col items-center justify-center '>
      <div>
        <h1 className='text-white text-center font-[Poppins] '>Super Admin Page</h1>
        <AdminRegister />
      </div>
    </div>
  )
}

export default SuperAdminDashboard