"use client";

import React, { useEffect, useState, memo } from "react";
import styles from "../AddCar/styles.module.css";

import { Images } from "@/assets/Images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import instance from "@/network/axios";
import ClipSpinner from "../Common/Spinner";
import AddBikeForm from "./AddBikeForm";

const AddBike = ({ params }: { params: { id: string } }) => {
  const [Loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const bikeId = params?.id;
  const [bikeData, setBikeData] = useState<any>(null);
  useEffect(() => {
    if (bikeId) {
      fetchBikeDetails();
    } else {
      setLoading(false);
    }
  }, [bikeId]);

  const fetchBikeDetails = async () => {
    try {
      const response = await instance.get(`/api/bikes/bike-by-id/${bikeId}`);
      setBikeData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bike details:", error);
      setLoading(false);
    }
  };




  const handleBack = () => {
    if ("") {
      if (window.confirm("Are you sure you want to go back? You will lose your entered data.")) {
        router.back();
      }
    } else {
      router.back();
    }
  };



  if (Loading && bikeId) {
    return <ClipSpinner loading={Loading} />;
  }

  return (
    <div className={`container_space large_layout ${styles.wrapper}`}>
      <div
        className="sm:hidden md:left-16 left-0 flex gap-2 items-center cursor-pointer"
        onClick={handleBack}
      >
        <Image
          src={Images.backArrow}
          alt="back-arrow"
          width={32}
          height={32}
          className="md:w-8 md:h-8 w-6 h-6"
        />
        <p className="text-secondary text-base font-rajdhani uppercase font-medium">
          Back
        </p>
      </div>
      <div className={styles.form_wrapper}>
        <p className={styles.heading}>{bikeId ? "Edit Bike" : "Add Bike"}</p>

        {/* need to optimize code bcoz back iis used multiple times */}
        <div
          className="hidden sm:flex md:left-16 left-0 sm:top-1 gap-2 items-center cursor-pointer"
          onClick={handleBack}
        >
          <Image
            src={Images.backArrow}
            alt="back-arrow"
            width={32}
            height={32}
            className="md:w-8 md:h-8 w-6 h-6"
          />
          <p className="text-secondary text-base font-rajdhani uppercase font-medium">
            Back
          </p>
        </div>
        {/* steper / */}
          <AddBikeForm bikeData={bikeData}/>
      </div>
    </div>
  );
};

export default memo(AddBike);
