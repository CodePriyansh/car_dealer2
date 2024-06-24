import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { Images } from "@/assets/Images";
import Button from "../Button";

function Header() {
  return (
    <div className={styles.wrapper}>
      <div>
        <Image src={Images.logo} alt="logo" width={85} height={85} />
      </div>

      <div className={styles.right_part}>
        <Button otherStyles="bg-secondary text-white upercase px-6 h-fit py-3">
          <Image src={Images.subscription} alt="subscription" width={24} height={24} />
          SUBSCRIBTION
        </Button>

        <Image src={Images.menu} alt="menu" width={25} height={25} className="cursor-pointer" />
        <Image src={Images.notification} alt="notification" width={25} height={25} className="cursor-pointer"/>
        <div className="flex items-center gap-[14px]">
          <div
            className="w-[60px] h-[60px] rounded-[50%] bg-gray-400
          "
          ></div>
          <div>
            <p className={styles.name}>Austin Robertson</p>
            <p className={styles.role}>Admin</p>
          </div>
        </div>
      </div>

      <div className={styles.responsive_right_part}>
        <div className={styles.responsive_subscription}>
        <Image src={Images.subscription} alt="subscription" width={20} height={20} />

        </div>
        <div className={styles.responsive_profile}>

        </div>
      </div>
    </div>
  );
}

export default Header;
