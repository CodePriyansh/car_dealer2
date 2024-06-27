"use client";

import React, { useState } from "react";
import design from "./styles.module.css";
import styles from "./styles.module.css";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { Images } from "@/assets/Images";
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';

const AddCarForm = () => {
  const [showActiveStep, setShowActiveStep] = useState<number>(1);
  const [stepsData, setStepsData] = useState<any>(null);
  return (
    <div className={styles.wrapper}>
      <div className={styles.form_wrapper}>
        <p className={styles.heading}>Add Car</p>

        {/* steper / */}
        <div className="flex justify-center items-center w-fit mx-auto my-12 relative">
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
            // onClick={() => setShowActiveStep(2)}
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
