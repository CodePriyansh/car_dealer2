
"use client"
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { Images } from "@/assets/Images";
import Button from "../Button";
import { getLocalStorage } from "@/constants/constants";

function Header() {
  
      const [user, setUser] = useState(null)  
  useEffect(() =>{
      setUser(getLocalStorage('user'))
  })
  return (
    <div className={`container_space large_layout ${styles.wrapper}`}>
      <div>
        <Image src={Images.logo} alt="logo" width={65} height={65} />
      </div>

      <div className={styles.right_part}>
        <Button otherStyles="bg-secondary text-white upercase sm:px-6 sm:h-fit sm:py-3">
          <Image src={Images.subscription} alt="subscription" width={24} height={24} />
          <p>SUBSCRIBTION</p>
        </Button>

        <Image src={Images.menu} alt="menu" width={25} height={25} className="cursor-pointer" />
        <Image src={Images.notification} alt="notification" width={25} height={25} className="cursor-pointer"/>
        <div className="flex items-center gap-[14px]">
          <div
            className="w-[60px] h-[60px] rounded-[50%] bg-gray-400
          "
          >
            <Image src={user?.profileImage || Images.demoProfile } alt="profile image"/>
             
          </div>
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
        <Image src={Images.userProfile} alt="subscription" width={20} height={20} />
        </div>
      </div>
    </div>
  );
}

export default Header;
