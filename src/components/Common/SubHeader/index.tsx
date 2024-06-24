"use client";
import React from "react";
import styles from "./styles.module.css";
import Button from "../Button";
import Image from "next/image";
import { Images } from "@/assets/Images";
import { useRouter } from "next/navigation";

export default function SubHeader() {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.field_style}>
          <Image src={Images.search} alt="img" className="w-[18px] h-[18px]" />
          <input className={styles.search_input} type="text" />
        </div>
      </div>
      <div className={styles.mid}>mid</div>
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
