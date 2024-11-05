/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom"
import image from "../../assets/image.png"

const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="max-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow max-h-fit lg:mb-[5rem] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-20 py-12">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2 lg:pr-8">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                Book Halls with Ease
              </h1>
              <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                Welcome to LNCT Group's hall booking system. Streamline your event planning process by easily reserving halls across our campuses.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row sm:justify-start gap-5">
                <div className="rounded-md shadow">
                  <button onClick={() => {navigate('/login')}} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 md:py-4 md:text-lg md:px-10 transition-all duration-300 ease-in-out transform hover:scale-105">
                    Get Started
                  </button>
                </div>
                <div className="rounded-md shadow">
                  <button onClick={() => {navigate('/viewbookings')}} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 text-white bg-[#E17833] md:py-4 md:text-lg md:px-10">
                    View Bookings
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2">
              <img 
                className="rounded-lg shadow-xl"
                src={image}
                alt="LNCT Campus Hall"
              />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 ">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} LNCT Group of Colleges. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage