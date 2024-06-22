"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Step1 from "./Step1";
import Step2 from "./Step2";

const AddCarForm = () => {
  const [showActiveStep, setShowActiveStep] = useState(1);
  const [valuesObj, setValuesObj] = useState({});

  console.log(valuesObj, "---------valuesObj");

  useEffect(()=>{
    if(valuesObj && showActiveStep === 2){
      console.log(valuesObj)
    }
  },[valuesObj])
  return (
    <div className={styles.wrapper}>
      <div className={styles.form_wrapper}>
        <p className={styles.heading}>Add Car</p>
        {showActiveStep === 1 && (
          <Step1
            setValuesObj={setValuesObj}
            setShowActiveStep={setShowActiveStep}
          />
        )}
        {showActiveStep === 2 && (
          <Step2
            setValuesObj={setValuesObj}
            setShowActiveStep={setShowActiveStep}
          />
        )}
      </div>
    </div>
  );
};

export default AddCarForm;
