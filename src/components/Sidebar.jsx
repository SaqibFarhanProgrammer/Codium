import React from 'react'

function Sidebar() {
  return ( 
    <aside className="w-64 fixed min-h-screen bg-black text-white p-6 border-r border-gray-800">
      <h2 className="text-xl font-semibold mb-8">Dashboard</h2>

      <nav className="flex flex-col gap-4">
        <button className="text-left px-3 py-2 rounded hover:bg-white hover:text-black transition">
          Home
        </button>

        <button className="text-left px-3 py-2 rounded hover:bg-white hover:text-black transition">
          Posts
        </button>

        <button className="text-left px-3 py-2 rounded hover:bg-white hover:text-black transition">
          Profile
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar
