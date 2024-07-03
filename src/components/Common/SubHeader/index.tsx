"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import Button from "../Button";
import Image from "next/image";
import { Images } from "@/assets/Images";
import { useRouter } from "next/navigation";
import FilterDrawer from "@/components/HomePage/FilterDrawer";
import CarApi from "@/components/HomePage/CarApi";

export default function SubHeader({ setCars, setSelectedOptions,setClickMobileClear }) {
  const router = useRouter();
  const [activeMidFilter, setActiveMidFilter] = useState("car");
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div className={`${styles.wrapper} container_space large_layout`}>
      {/* left  */}
      <div className={styles.left}>
        <div className={styles.field_style}>
          <Image
            src={Images.search}
            alt="img"
            className="sm:w-[18px] sm:h-[18px] h-4 w-4"
          />
          <input
            className={styles.search_input}
            type="text"
            placeholder="Search....."
          />
        </div>
        <div
          className={styles.responsive_filter_icon}
          onClick={() =>{ setOpenDrawer(true)
            setClickMobileClear(false)
          }}
        >
          <Image
            src={Images.responsiveFilter}
            alt="img"
            className="sm:w-[18px] sm:h-[18px] h-4 w-4 "
          />
        </div>
      </div>

      {openDrawer && (
        <FilterDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} setCars={setCars}/>
      )}

      {/* mid  */}
      <div className={styles.mid}>
        <div className={styles.mid_btn_wrapper}>
          <Button
            otherStyles={`uppercase md:w-[215px] w-1/2 m-[1px] ${
              activeMidFilter === "car"
                ? "bg-primary text-white"
                : "bg-transparent !text-subHeading"
            }`}
            onclick={() => setActiveMidFilter("car")}
          >
            cars
          </Button>
          <button
            className={`md:w-[190px] w-1/2 m-[1px] uppercase text-20 font-bold font-rajdhani rounded-[50px] ${
              activeMidFilter === "bike"
                ? "text-white bg-primary"
                : "text-subHeading bg-transparent"
            }`}
            onClick={() => setActiveMidFilter("bike")}
          >
            bike
          </button>
        </div>
      </div>

      {/* right  */}
      <div className={styles.right}>
        <Button
          otherStyles={styles.clear_fil_btn}
          onclick={() => {
            setSelectedOptions({
              carType: [],
              color: [],
              priceRange: [0,0],
              modelName: "",
              company: "",
              modelYear: "",
            });
          }}
        >
          <Image
            src={Images.clearFilter}
            alt="img"
            className="w-[18px] h-[18px]"
          />
          clear filter
          <CarApi selectedOptions={null} initial={true} setCars={setCars} />
        
        </Button>
        <Button
          otherStyles={styles.fill_btn}
          onclick={() => router.push("/addcar")}
        >
          <Image
            src={Images.whitePlus}
            alt="img"
            className="w-[18px] h-[18px]"
          />
          Add car
        </Button>
        <Button otherStyles={styles.fill_btn}>
          <Image
            src={Images.whitePlus}
            alt="img"
            className="w-[18px] h-[18px]"
          />
          Add bike
        </Button>
      </div>
    </div>
  );
}
