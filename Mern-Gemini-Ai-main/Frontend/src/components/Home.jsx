

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Prompt from './Prompt';

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='h-screen overflow-hidden text-white flex flex-col md:flex-row bg-[#1e1e1e]'>

      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 bg-[#232327] transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 z-50 md:hidden`}
      >
        <Sidebar />
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-white"
        >
          ✕
        </button>
      </div>

      {/* Sidebar for desktop */}
      <div className='w-64 bg-[#232327] hidden md:block'>
        <Sidebar />
      </div>

      {/* Prompt */}
      <div className='flex flex-col w-full overflow-y-auto relative'>
        <Prompt sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
    </div>
  );
};

export default Home;

