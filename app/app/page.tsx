import React from 'react'
import dynamic from 'next/dynamic'
import SearchBar from '../components/SearchInput'


const Aurora = dynamic(() => import("../components/lightraysbg"), { ssr: false })

function Page() {
  return (
    <div className='flex justify-center items-center min-h-screen relative overflow-hidden h-full '>

      <div className="absolute top-0 left-0 w-full h-full">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen px-4 relative z-10">
        <div className="text-center p-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Welcome to Dev Explorer
            </h1>
            <span className="inline-block">🚀</span>
          </div>
          <h2 className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8">
            Search for GitHub profiles below using their username
          </h2>
        </div>
        <div className="w-full max-w-md mx-auto">
          <SearchBar />
        </div>
      </div>

    </div>
  )
}

export default Page