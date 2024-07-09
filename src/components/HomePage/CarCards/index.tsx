import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Images } from "@/assets/Images";
import moment from "moment";
import Link from "next/link";
import instance from "@/network/axios";
import { toast } from "react-toastify";
import { setLocalStorage } from "@/constants/constants";
export default function CarCards({ car, onDelete }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/car_details/${car._id}`);
  };

  const handleDelete = async (carId) => {
    try {
      const response = await instance.delete(`/api/cars/delete/${carId}`);
      if (response.status === 200) {
        toast.success("Car deleted successfully!");
        if (onDelete) {
          onDelete(carId);
        }
      }
    } catch (error) {
      toast.error("Failed to delete car. Please try again.");
      console.error("Delete car error:", error);
    }
  };

  return (
    <div className={styles.card_wrapper}>
      <div className={styles.status_tag}>
        <div className={car.sold ? styles.status_sold : styles.status_avail}>
          <Image src={Images.availSoldSymbol} alt="Sell"></Image>
          {car.sold ? "Sold" : "Avail"}
        </div>
      </div>
      <Link href={`/car_details/${car._id}`} passHref>
        <div className={styles.card_img_wrapper}>
          <img
            className="w-full h-full"
            src={car?.images?.front_image || Images.demoCarfrom}
            alt="image"
          />
        </div>
      </Link>

      <div className={styles.car_header}>
        <div
          className={styles.header_left}
        >{`${car.company} ${car.modelName} ${car.variant}`}</div>
        <div className={styles.header_right}>
          <Link href={`/car-details/${car._id}`} passHref>
            <Image src={Images.cardView} alt="view" width={24} height={24} />
          </Link>
          <Link href={`/edit-car/${car._id}`} passHref>
            <Image
              onClick={() => setLocalStorage("step", 1)}
              src={Images.cardEdit}
              alt="edit"
              width={24}
              height={24}
            />
          </Link>

          <Image
            src={Images.cardDelete}
            alt="image"
            width={24}
            height={24}
            onClick={() => handleDelete(car._id)}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      <div className={styles.card_price_row}>
        <div className={styles.price_left}>₹{car.price}</div>
        <div className={styles.price_right}>
          {moment(car?.registrationDate).format("DD/MM/YYYY")}
        </div>
      </div>

      <div className={`${styles.features_row}`}>
        <div className={styles.feature_item}>
          {car?.yearOfManufacture.split("-")[0]}
        </div>
        {[car?.transmission, car?.color, car?.fuelType]?.map((item, index) => {
          return (
            <div key={index.toString()} className={styles.feature_item}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
