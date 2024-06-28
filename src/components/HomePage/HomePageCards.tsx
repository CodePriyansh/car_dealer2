"use client";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import instance from "@/network/axios";
import CarCards from "./CarCards";
function HomePageCards() {
  const [cars, setCars] = useState([]);
  const cookies = new Cookies();

  //   const fetchCars =  () => {
  //     let token = cookies.get("token");
  //     const response =  instance.get("/api/cars/all", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     response.then(res=>console.log(res))
  //     setCars(response);
  //   };
  //   useEffect(() => {
  //     fetchCars();
  //   }, []);

  useEffect(() => {
    setCars([1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 1, 11, 21, 34, 5, 6, 7, 8]);
  }, []);

  return (
    <div className="container_space large_layout w-full grid md1:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-6 md:bg-f7f7f7 py-10">
      {cars.map((car, index) => (
        <CarCards car={car} key={index} />
      ))}
    </div>
  );
}

export default HomePageCards;
