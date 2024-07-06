"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import instance from "@/network/axios";
import { MdEdit, MdOutlineDeleteOutline } from "react-icons/md";
import CarCards from "../CarCards";
import styles from "./styles.module.css";
import Header from "@/components/Common/Header";

const CarDetails = ({ params }: { params: { id: string } }) => {
  const [car, setCar] = useState(null);
  const [car2, setCar2] = useState(null);
  const { id } = params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await instance.get(`/api/cars/car-by-id/${id}`);
        console.log(response.data.data[0]);
        console.log(response.data.data[0]);
        console.log(Object.values(response.data.data[0].images));
        setCar(response.data.data[0]);
        setCar2(response.data.data);
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

  return (<>
    <Header/>
    <div className="mx-auto p-4 text-5xl container_space large_layout">
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
          <div className="flex ovr mt-4 overflow-x-auto custome-scrollbar justify-center md:justify-start">
            {Object.values(car.images).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Car part ${index + 1}`}
                className="w-14 h-14 md:w-20 md:h-16 m-2 rounded-lg cursor-pointer"
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
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
        </div>
      </div>
      <>
        <div className="flex flex-col gap-4  md:flex-row w-full h-full bg-white text-black">
          {/* Left Panel (Car Overview) */}
          <div className="md:w-3/5 p-4 border border-gray-300 rounded-lg h-full">
            <h1 className="text-2xl font-bold mb-4">Car Overview</h1>
            <div className="bg-white p-4">
              {car2.map((car) => (
                <div
                  key={car.id}
                  className="mb-2 p-2 border-b border-gray-200 text-black"
                >
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                    <div className="flex flex-col mb-2">
                      <p className={styles.overview_headings}>Company:</p>
                      <p className={styles.overview_values}>{car.company}</p>
                    </div>
                    <div className="flex flex-col mb-2">
                      <p className={styles.overview_headings}>Model:</p>
                      <p className={styles.overview_values}>{car.model}</p>
                    </div>
                    <div className="flex flex-col mb-2">
                      <p className={styles.overview_headings}>Variant:</p>
                      <p className={styles.overview_values}>{car.variant}</p>
                    </div>
                    <div className="flex flex-col mb-2">
                      <p className={styles.overview_headings}>
                        Year of Manufacture:
                      </p>
                      <p className={styles.overview_values}>
                        {car.yearOfManufacture}
                      </p>
                    </div>
                    <div className="flex flex-col mb-2">
                      <p className={styles.overview_headings}>
                        Registration Date:
                      </p>
                      <p className={styles.overview_values}>
                        {car.registrationDate}
                      </p>
                    </div>
                    <div className="flex flex-col mb-2">
                      <p className={styles.overview_headings}>Number Plate:</p>
                      <p className={styles.overview_values}>
                        {car.numberPlate}
                      </p>
                    </div>
                    <div className="flex flex-col mb-2">
                      <p className={styles.overview_headings}>Color:</p>
                      <p className={styles.overview_values}>{car.color}</p>
                    </div>
                    <div className="flex flex-col mb-2">
                      <p className={styles.overview_headings}>Transmission:</p>
                      <p className={styles.overview_values}>
                        {car.transmission}
                      </p>
                    </div>
                    <div className="flex flex-col mb-2">
                      <p className={styles.overview_headings}>Fuel Type:</p>
                      <p className={styles.overview_values}>{car.fuelType}</p>
                    </div>
                    <div className="flex flex-col mb-2">
                      <p className={styles.overview_headings}>
                        Cubic Capacity:
                      </p>
                      <p className={styles.overview_values}>
                        {car.cubicCapacity} cc
                      </p>
                    </div>
                    <div className="flex flex-col mb-2">
                      <p className={styles.overview_headings}>
                        Approx. Km Driven:
                      </p>
                      <p className={styles.overview_values}>
                        {car.averageApproxKmDriven}
                      </p>
                    </div>
                    <div className="flex flex-col mb-2">
                      <p className={styles.overview_headings}>
                        Air Conditioner:
                      </p>
                      <p className={styles.overview_values}>
                        {car.airConditioner ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className="flex flex-col mb-2">
                      <p className={styles.overview_headings}>Power Window:</p>
                      <p className={styles.overview_values}>
                        {car.powerWindow ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className="flex flex-col mb-2">
                      <p className={styles.overview_headings}>Owner:</p>
                      <p className={styles.overview_values}>{car.owner}</p>
                    </div>
                    <div className="flex flex-col mb-2">
                      <p className={styles.overview_headings}>Insurance:</p>
                      <p className={styles.overview_values}>{car.insurance}</p>
                    </div>
                    <div className="flex flex-col mb-2">
                      <p className={styles.overview_headings}>
                        Insurance Validity:
                      </p>
                      <p className={styles.overview_values}>
                        {car.insuranceValidity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel (Scratch & Dent) */}
          <div className="md:w-2/5 p-4 flex flex-col items-start border border-gray-300 rounded-lg">
            <h1 className="text-black mt-5 font-bold text-2xl md:text-xl">
              Scratch & Dent
            </h1>
            <div className="mt-5">
              <p className="text-black text-[20px]">Dent on Left Gate</p>
              <div className="mt-3">
                <img
                  src={car.interiorImages[0]}
                  alt="Dent on Left Gate"
                  className="rounded-sm"
                />
              </div>
              <div className="mt-5 hidden md:block">
                <button
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  style={{ width: "100%" }}
                >
                  Repair
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similarly Added Cars */}
        <div className="bg-white w-full border">
          <h1 className="text-black font-bold pl-3 text-2xl">
            Similarly Added
          </h1>
          <div className="flex overflow-x-auto p-4 bg-[#F7F9FD] w-full sm:w-1/3">
            {car2.map((car, index) => (
              <CarCards car={car} key={index} />
            ))}
          </div>
        </div>
      </>
    </div>
    </>
  );
};

export default CarDetails;
