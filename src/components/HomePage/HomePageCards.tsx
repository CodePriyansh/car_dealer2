"use client";
import CarCards from "./CarCards";
function HomePageCards({cars}) {

  return (
    <>
      {cars.length < 1 ? (
        <div className="text-center"> There is no car added!</div>
      ) : (
        <div className="container_space large_layout w-full grid md1:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-6 md:bg-f7f7f7 py-4">
          {cars.map((car:any, index:number) => (
            <CarCards car={car} key={index} />
          ))}
        </div>
        
      )}
    </>
  );
}

export default HomePageCards;
