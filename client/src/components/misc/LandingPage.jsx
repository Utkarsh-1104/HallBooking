/* eslint-disable react/no-unescaped-entities */

import { useNavigate } from "react-router-dom"

const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="max-h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <main className="flex-grow max-h-fit lg:mb-[4.7rem] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-20 py-12">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2 lg:pr-8">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                Book Halls with Ease
              </h1>
              <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                Welcome to LNCT Group's hall booking system. Streamline your event planning process by easily reserving halls across our campuses.
              </p>
              <div className="mt-10 sm:flex sm:justify-start">
                <div className="rounded-md shadow">
                  <button onClick={() => {navigate('/login')}} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2">
              <img 
                className="rounded-lg shadow-xl"
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3"
                alt="LNCT Campus Hall"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        {/* <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Why Choose Our Booking System?</h2>
              <p className="mt-4 text-lg text-gray-500">Simplify your event planning with our state-of-the-art hall booking system.</p>
            </div>
            <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
              {[
                { name: 'Easy Booking', description: 'Book halls with just a few clicks' },
                { name: 'Real-time Availability', description: 'Check hall availability in real-time' },
                { name: 'Multiple Campuses', description: 'Access halls across all LNCT campuses' },
                { name: 'Customizable Options', description: 'Tailor the hall setup to your needs' },
                { name: 'Instant Confirmation', description: 'Receive immediate booking confirmations' },
                { name: 'Support Team', description: '24/7 support for all your queries' },
              ].map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <svg className="absolute h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="ml-9 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-9 text-base text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div> */}
      </main>

      {/* Footer */}
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