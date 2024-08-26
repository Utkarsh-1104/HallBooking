
const Login = () => {
  return (
    <div className='bg-black h-screen text-white flex items-center justify-center'>
      <div className="h-fit w-fit flex flex-col items-center ">
        <h1 className="text-3xl ">Login</h1>
        <p className="text-xl font-[100] pt-2 ">Welcome <span className="underline underline-offset-4">user</span>, please login to continue. </p>
        <input type="text" placeholder="Username" className="w-96 h-12 ps-3 mt-8 mb-4 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none " />
        <input type="password" name="superPass" placeholder="Password" id="superPass" className="w-96 h-12 ps-3 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none" />
        <button className="w-96 h-16 mt-10 text-2xl text-white bg-black border border-white rounded hover:bg-white hover:text-black focus:outline-none " type="submit">Login</button>
      </div>
    </div> 
  )
}

export default Login