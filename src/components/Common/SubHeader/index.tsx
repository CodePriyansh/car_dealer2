"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import Button from "../Button";
import Image from "next/image";
import { Images } from "@/assets/Images";
import { useRouter } from "next/navigation";

export default function SubHeader() {
  const router = useRouter();
  const [activeMidFilter, setActiveMidFilter] = useState("car");
  return (
    <div className={`${styles.wrapper} large_layout`}>
      {/* left  */}
      <div className={styles.left}>
        <div className={styles.field_style}>
          <Image src={Images.search} alt="img" className="w-[18px] h-[18px]" />
          <input className={styles.search_input} type="text" />
        </div>
        <div className={styles.responsive_filter_icon}>
          <Image
            src={Images.responsiveFilter}
            alt="img"
            className="w-[24px] h-[24px]"
          />
        </div>
      </div>

      {/* mid  */}
      <div className={styles.mid}>
        <div className={styles.mid_btn_wrapper}>
          <Button
            otherStyles={`uppercase md:w-[215px] w-1/2 m-[1px] ${activeMidFilter==='car'?'bg-primary text-white':'bg-transparent !text-subHeading'}`}
            onclick={() => setActiveMidFilter("car")}
          >
            cars
          </Button>
          <button
            className={`md:w-[190px] w-1/2 m-[1px] uppercase text-20 font-bold font-rajdhani rounded-[50px] ${activeMidFilter==='bike'?'text-white bg-primary':'text-subHeading bg-transparent'}`}
            onClick={() => setActiveMidFilter("bike")}
          >
            bike
          </button>
        </div>
      </div>

      {/* right  */}
      <div className={styles.right}>
        <Button otherStyles={styles.clear_fil_btn}>
          <Image
            src={Images.clearFilter}
            alt="img"
            className="w-[18px] h-[18px]"
          />
          clear filter
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
