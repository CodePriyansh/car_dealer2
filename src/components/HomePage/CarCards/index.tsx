import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Images } from "@/assets/Images";
import moment from 'moment';
export default function CarCards({ car }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/car/${car._id}`);
  };

  return (
    <div className={styles.card_wrapper}>
      <div className={styles.status_tag}>
        <div
          className={
            car.sold ? styles.status_sold : styles.status_avail
          }
        >
          <Image src={Images.availSoldSymbol} alt="Sell"></Image>
          {car.sold ? "Sold" : "Avail"}
        </div>
      </div>
      <div className={styles.card_img_wrapper} onClick={handleClick}>
        <img src={ car?.images?.front_image ||  Images.demoCarfrom} alt="image" />
      </div>

      <div className={styles.car_header}>
        <div className={styles.header_left}>{`${car.company} ${car.modelName} ${car.variant}`}</div>
        <div className={styles.header_right}>
          <Image src={Images.cardEdit} alt="image" width={24} height={24} />
          <Image src={Images.cardView} alt="image" width={24} height={24} />
          <Image src={Images.cardDelete} alt="image" width={24} height={24} />
        </div>
      </div>

      <div className={styles.card_price_row}>
        <div className={styles.price_left}>₹{car.price}</div>
        <div className={styles.price_right}>{moment(car?.registrationDate).format('DD/MM/YYYY')}</div>
      </div>

      <div className={`${styles.features_row}`}>

      <div className={styles.feature_item}>
                {car?.yearOfManufacture.split("-")[0]}
              </div>
        {[ car?.transmission, car?.color, car?.fuelType]?.map(
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
