
const Navbar = () => {
  return (
    <div>
        <nav className='bg-[#454343] text-white px-16 py-4 flex justify-between items-center'>
            <h1 className='font-[Poppins] text-3xl '>Navbar</h1>
            <div className="font-[Poppins] flex gap-8 text-[1rem] ">
              <h3 className="hover:text-[red] cursor-pointer " onClick={() => {console.log("cliked")}} >Home</h3>
              <h3 className="hover:text-[red] cursor-pointer " >Admin Login</h3>
              <h3 className="hover:text-[red] cursor-pointer " >Super Admin Login</h3>
              <h3 className="hover:text-[red] cursor-pointer " >Something</h3>
            </div>
        </nav>
    </div>
  )
}

export default Navbar