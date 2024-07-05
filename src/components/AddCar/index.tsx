"use client";

import React, { useState } from "react";
import design from "./styles.module.css";
import styles from "./styles.module.css";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { Images } from "@/assets/Images";
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

const AddCarForm = () => {
  const [showActiveStep, setShowActiveStep] = useState<number>(1);
  const [stepsData, setStepsData] = useState<any>(null);
  const router = useRouter()
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
        <p className={styles.heading}>Add Car</p>

         {/* need to optimize code bcoz back iis used multiple times */}
        <div
          className="hidden sm:flex md:left-16 left-0 sm:top-1 gap-2 items-center cursor-pointer"
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
              stepsData===null? "bg-line" : "bg-primary"
            }`}
          />

          <p className={`${styles.common_step} ${styles.step2}`}>Step2</p>
          <div
            className={styles.circle2}
            onClick={() => setShowActiveStep(2)}
          />
          <p className={`${styles.common_text} ${styles.photo_vedio}`}>
            Photos/Video
          </p>

          <div className={design.line3} />
        </div>

        {showActiveStep === 1 ? (
          <Step1
            setShowActiveStep={setShowActiveStep}
            setStepsData={setStepsData}
          />
        ) : (
          <Step2 setShowActiveStep={setShowActiveStep} stepsData={stepsData} />
        )}
      </div>
    </div>
  );
};

export default AddCarForm;
