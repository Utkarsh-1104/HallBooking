import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div>
        <nav className='bg-[#454343] text-white px-16 py-4 flex justify-between items-center'>
            <h1 className='font-[Poppins] text-3xl '>Navbar</h1>
            <div className="font-[Poppins] flex gap-8 text-[1rem] ">
              <h3 className="hover:text-[red] cursor-pointer " onClick={() => {navigate('/')} } >Home</h3>
              <h3 className="hover:text-[red] cursor-pointer " onClick={() => {navigate('adminlogin')}} >Admin Login</h3>
              <h3 className="hover:text-[red] cursor-pointer " onClick={() => {navigate('/superadminlogin')}} >Super Admin Login</h3>
              <h3 className="hover:text-[red] cursor-pointer " >Something</h3>
            </div>
        </nav>
    </div>
  )
}

export default Navbar