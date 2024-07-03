"use client";
import CarCards from "./CarCards";
function HomePageCards({cars}) {

  return (
    <>
      {cars.length < 1 ? (
        <div className="text-center"> There is no car added!</div>
      ) : (
        <>
        <p className="text-para font-bold block mt-2 sm:text-[24px] font-rajdhani container_space large_layout">{cars.length} Cars</p>
        <div className="container_space large_layout w-full grid md1:grid-cols-3 sm:grid-cols-2 grid-cols-1  sm:gap-6 gap-4 md:bg-f7f7f7 sm:pb-4 py-2">

          {cars.map((car:any, index:number) => (
            <CarCards car={car} key={index} />
          ))}
        </div>
        </>
        
      )}
    </>
  );
}

export default HomePageCards;
