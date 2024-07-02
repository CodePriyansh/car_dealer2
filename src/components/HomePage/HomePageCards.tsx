"use client";
import Cookies from "universal-cookie";
import CarCards from "./CarCards";
import CarApi from "./CarApi";
function HomePageCards({cars,setCars}) {

 
  return (
    <>
        <CarApi selectedOptions={null} initial={true} setCars={setCars}/>
      {cars.length < 1 ? (
        <div className="text-center"> There is no car added!</div>
      ) : (
        <div className="container_space large_layout w-full grid md1:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-6 md:bg-f7f7f7 py-4">
          {cars.map((car, index) => (
            <CarCards car={car} key={index} />
          ))}
        </div>
        
      )}
    </>
  );
}

export default HomePageCards;
