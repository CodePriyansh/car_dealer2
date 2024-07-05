"use client"
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import instance from "@/network/axios";
import { MdEdit, MdOutlineDeleteOutline } from "react-icons/md";



const CarDetails = ({ params }: { params: { id: string } }) => {
  const [car, setCar] = useState(null);
  const { id } = params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await instance.get(`/api/cars/car-by-id/${id}`);
        console.log(response.data.data[0])
        console.log(Object.values(response.data.data[0].images))
        setCar(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast.error("Failed to fetch car details");
      }
    };

    if (id) {
      fetchCarDetails();
    }
  }, [id]);

  if (!car) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 text-5xl">
     <div className="w-full h-full flex flex-col md:flex-row bg-white">
      {/* Left Section (Images) */}
      <div className="w-full md:w-3/5 h-full p-4 flex flex-col items-center">
        {/* Main Image */}
        <img
          src={Object.values(car.images)[currentImageIndex]}
          alt={`Car part ${currentImageIndex + 1}`}
          className="w-full rounded-lg"
          style={{ height: "300px" }}
        />
        {/* Thumbnail Images */}
        <div className="flex flex-wrap mt-4 justify-center md:justify-start">
          {Object.values(car.images).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Car part ${index + 1}`}
              className="w-20 h-20 md:w-24 md:h-24 m-2 rounded-lg cursor-pointer"
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Right Section (Details) */}
      <div className="w-full md:w-2/5 h-full p-4 flex flex-col justify-between">
        <div className="border border-gray-300 rounded-lg shadow-lg p-4 ">
          {/* Car Title */}
          <h1 className="text-black font-rajdhani font-bold text-xl leading-7  ">
            2016 Volkswagen Ameo HIGHLINE 1.2L
          </h1>

          {/* Car Details (Km, Owner, Fuel, Transmission) */}
          <div className="flex flex-wrap space-x-4 text-[#737373] text-sm md:text-base mb-4">
            <span>6540 Km</span>
            <span>First Owner</span>
            <span>Petrol</span>
            <span>Manual</span>
          </div>
          <hr className="my-2" />
          {/* Car Price */}
          <h1 className="text-[#ff751a] mt-2 font-bold text-lg md:text-2xl">
            Rs. 45,10,000
          </h1>
          {/* Action Buttons (Edit, Delete) */}
          <div className="flex justify-center mt-4 space-x-4">
            <button className="flex items-center justify-center w-40 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm md:text-base px-4 md:px-5 py-2.5">
              <MdEdit className="text-blue w-5 h-5 md:w-6 md:h-6 mr-2" />
              <span className="">Edit</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center w-40 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm md:text-base px-4 md:px-5 py-2.5"
            >
              <MdOutlineDeleteOutline className="text-red w-5 h-5 md:w-6 md:h-6 mr-2" />
              <span className="">Delete</span>
            </button>
            <button className="flex md:hidden bg-red-700 items-center justify-center w-32 md:w-40 text-white hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm md:text-base px-3 md:px-5 py-2.5">
              <span className="inline-block">Sold</span>
            </button>
          </div>
        </div>
        {/* Car Description */}
        <div className="border border-gray-300 rounded-lg mt-5 p-4 md:flex md:flex-col md:items-start">
          <h1 className="text-black font-bold text-lg md:text-2xl mb-2">
            Description
          </h1>
          <p className="text-[#737373] text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CarDetails;
