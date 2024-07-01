import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Images } from "@/assets/Images";

export default function CarCards({ car }) {
  const router = useRouter();

  // const handleClick = () => {
  //   router.push(`/car/${car._id}`);
  // };

  let status = "Avail" ? "Sold" : "Avail";
  return (
    <div className={styles.card_wrapper}>
      <div className={styles.status_tag}>
        <div
          className={
            status === "Sold" ? styles.status_avail : styles.status_sold
          }
        >
          <Image src={Images.availSoldSymbol} alt="Sell"></Image>{" "}
          {car.status === "Avail" ? "Avail " : "Sold "}
        </div>
      </div>
      <div className={styles.card_img_wrapper}>
        <Image src={Images.demoCarfrom} alt="image" />
      </div>

      <div className={styles.car_header}>
        <div className={styles.header_left}>{car.company + car.modelName + car.variant}</div>
        <div className={styles.header_right}>
          <Image src={Images.cardEdit} alt="image" width={24} height={24} />
          <Image src={Images.cardView} alt="image" width={24} height={24} />
          <Image src={Images.cardDelete} alt="image" width={24} height={24} />
        </div>
      </div>

      <div className={styles.card_price_row}>
        <div className={styles.price_left}>₹{car.price}</div>
        <div className={styles.price_right}>20/05/2024</div>
      </div>

      <div className={`${styles.features_row}`}>
        {[car?.yearOfManufacture, car?.transmission, car?.color, car?.fuelType]?.map(
          (item, index) => {
            return (
              <div key={index.toString()} className={styles.feature_item}>
                {item}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
