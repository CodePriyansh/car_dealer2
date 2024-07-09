"use client";

import React, { useEffect, useState, memo } from "react";
import design from "./styles.module.css";
import styles from "./styles.module.css";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { Images } from "@/assets/Images";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import instance from "@/network/axios";
import ClipSpinner from "../Common/Spinner";
import { setLocalStorage } from "@/constants/constants";

const AddCarForm = ({ params }: { params: { id: string } }) => {
  const currentStep = localStorage.getItem("step");
  const [showActiveStep, setShowActiveStep] = useState<number>(
    parseInt(currentStep) ?? 1
  );
  const [carData, setCarData] = useState<any>(null);
  const [Loading, setLoading] = useState<boolean>(true);
  const [stepsData, setStepsData] = useState<any>(null);
  const router = useRouter();
  const carId = params?.id;
  console.log("current step", currentStep);

  useEffect(() => {
    // console.log("useEffect", "r");

    const fetchCarDetails = async () => {
      try {
        const response = await instance.get(`/api/cars/car-by-id/${carId}`);
        // console.log(response.data.data[0]);
        // console.log(Object.values(response.data.data[0].images));
        setTimeout(() => {
          setLoading(false);
          setStepsData(response.data.data);
          setCarData(response.data.data[0]);
        }, 1000);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    if (carId) {
      fetchCarDetails();
    }
  }, [carId]);

  const handleEditSubmit = async (data: FormData) => {
    try {
      const response = await instance.put(
        `/api/update-car/${carData._id}`,
        data
      );
      console.log(response);
      console.log(response.data.data);
      // router.push("/"); // Redirect to the homepage or another page
    } catch (error) {
      console.error("Error updating car data:", error);
    }
  };

  if (Loading && carId) {
    return <ClipSpinner loading={Loading} />;
  }

  const handleBack = (step: string) => {
    console.log("step", step);
    if (step.toString() === "2") {
      setShowActiveStep(1);
      localStorage.setItem("step", "1");
    } else {
      router.back();
    }
  };

  console.log("showActiveStep", showActiveStep);

  return (
    <div className={`container_space large_layout ${styles.wrapper}`}>
      <div
        className="sm:hidden md:left-16 left-0 flex gap-2 items-center cursor-pointer"
        onClick={() => router.back()}
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
        <p className={styles.heading}>{carId ? "Edit Car" : "Add Car"}</p>

        {/* need to optimize code bcoz back iis used multiple times */}
        <div
          className="hidden sm:flex md:left-16 left-0 sm:top-1 gap-2 items-center cursor-pointer w-fit"
          onClick={() => handleBack(currentStep)}
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
        <div className="flex justify-center items-center w-fit mx-auto sm:my-4 my-10 relative">
          <div className={styles.line1} />

          <p className={`${styles.common_step} ${styles.step1}`}>Step1</p>
          <div
            className={`${styles.circle1} ${
              stepsData === null
                ? "bg-white "
                : "bg-primary justify-center flex "
            }`}
            // onClick={() => setShowActiveStep(1)}
          >
            {stepsData === null ? (
              ""
            ) : (
              <Image src={Images.whiteTick} alt="white-tick" />
            )}
          </div>
          <p className={`${styles.common_text} ${styles.car_details}`}>
            Car Details
          </p>

          <div
            className={`${styles.line2} ${
              stepsData === null ? "bg-line" : "bg-primary"
            }`}
          />

          <p className={`${styles.common_step} ${styles.step2}`}>Step2</p>
          <div
            className={styles.circle2}
            // onClick={() => setShowActiveStep(2)}
          />
          <p className={`${styles.common_text} ${styles.photo_vedio}`}>
            Photos/Video
          </p>

          <div className={design.line3} />
        </div>

        {showActiveStep === 1 && parseInt(currentStep) === 1 ? (
          <Step1
            showActiveStep={showActiveStep}
            setShowActiveStep={setShowActiveStep}
            setStepsData={setStepsData}
            carData={carData}
          />
        ) : (
          <Step2
            showActiveStep={showActiveStep}
            setShowActiveStep={setShowActiveStep}
            stepsData={stepsData}
            carData={carData}
            handleEditSubmit={handleEditSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default memo(AddCarForm);
