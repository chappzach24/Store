import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import './output.css';
import  Navbar  from './components/Navbar';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="">
            <Navbar /> 
          <Outlet />
      </main>
    </div>
  );
};

export default App;