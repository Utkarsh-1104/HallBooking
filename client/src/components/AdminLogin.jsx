
const AdminLogin = () => {
  return (
    <div className='bg-black h-screen flex justify-center'>
      <form action="" method="post">
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-white text-3xl font-bold">Admin Login</h1>
          <input type="text" name="username" id="username" placeholder="Username" className="p-2 m-2" />
          <input type="password" name="password" id="password" placeholder="Password" className="p-2 m-2" />
          <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-md m-2">Login</button>
        </div> 
      </form>
    </div>
  )
}

export default AdminLogin