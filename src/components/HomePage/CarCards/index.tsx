import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

export default function CarCards({ car }) {

  const router = useRouter();
  const handleClick = () => {
    router.push(`/car/${car._id}`);
  };
  return (
    <div className={`border rounded-lg p-4 ${styles.carCard}`} onClick={handleClick}>
      <img src={car.images.front_image} alt={car.name} className="w-full h-40 object-cover" />
      <div className="flex justify-between mt-2">
        <h3 className="text-lg font-bold">{car.name}</h3>
        <span className={`px-2 py-1 rounded-full text-white ${car.status === 'Sold' ? 'bg-red-500' : 'bg-green-500'}`}>
          {car.status || "Sold"}
        </span>
      </div>
      <p className="text-orange-500 font-bold">{car.price}</p>
      <div className="flex space-x-2 text-gray-500 text-sm mt-2">
        <span>{car.modelYearMonth}</span>
        <span>{car.transmission}</span>
        <span>{car.color}</span>
        <span>{car.fuelType}</span>
      </div>
    </div>
  );
}
