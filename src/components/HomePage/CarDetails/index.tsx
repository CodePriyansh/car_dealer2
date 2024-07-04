"use client"
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import instance from "@/network/axios";



const CarDetails = ({ params }: { params: { id: string } }) => {
  const [car, setCar] = useState(null);
  const { id } = params;

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await instance.get(`/api/cars/car-by-id/${id}`);
        setCar(response.data.data);
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
     make your details design here
  </div>
  );
};

export default CarDetails;
