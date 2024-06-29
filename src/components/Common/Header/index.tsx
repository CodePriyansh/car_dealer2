"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { Images } from "@/assets/Images";
import Button from "../Button";
import { getLocalStorage } from "@/constants/constants";
import ProfileDropdown from "./ProfileDropdown";

interface props{
  page:string;
}
const Header: React.FC<props> = ({page='other'})=> {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getLocalStorage("user"));
  }, []);

  return (
    <div className={`container_space large_layout ${styles.wrapper} ${page === 'addCar'? 'md:flex hidden':'flex' }`}>
      <div >
        <Image src={Images.logo} alt="logo" width={40} height={40} className="sm:min-w-[65px] min-w-12" />
      </div>

      {/* Desktop View */}
      <div className={styles.right_part}>
        <Button otherStyles="bg-secondary text-white uppercase sm:px-6 sm:h-fit sm:py-3">
          <Image src={Images.subscription} alt="subscription" width={24} height={24} />
          <p>SUBSCRIPTION</p>
        </Button>

        <Image src={Images.menu} alt="menu" width={25} height={25} className="cursor-pointer" />
        <Image src={Images.notification} alt="notification" width={25} height={25} className="cursor-pointer" />

        <div className="flex items-center gap-[14px]">
          <ProfileDropdown user={user} />
          <div>
            <p className={styles.name}>Austin Robertson</p>
            <p className={styles.role}>Admin</p>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      
      <div className={styles.responsive_right_part}>
        <div className={styles.responsive_subscription}>
          <Image src={Images.subscription} alt="subscription" width={20} height={20} />
        </div>
        <div className={styles.responsive_profile}>
          <ProfileDropdown user={user} />
        </div>
      </div>
      

      
    </div>
  );
}

export default Header;
