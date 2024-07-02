import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-4 m-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Home Page 💁</h1>
      <div className="space-y-4">
        <div
          onClick={() => navigate("/formone")}
          className="block bg-orange-500 text-white py-2 px-4 rounded cursor-pointer"
        >
          Form Page 1
        </div>
        <div
          onClick={() => navigate("/formtwo")}
          className="block border border-gray-300 bg-white-500 black-white py-2 px-4 rounded cursor-pointer"
        >
          Form Page 2
        </div>
        <div
          onClick={() => navigate("/formthree")}
          className="block bg-green-500 text-white py-2 px-4 rounded cursor-pointer"
        >
          Form Page 3
        </div>
      </div>
    </div>
  );
};

export default Home;
