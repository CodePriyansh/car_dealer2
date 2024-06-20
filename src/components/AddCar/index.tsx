"use client";

import React, { useState } from "react";

import styles from "./styles.module.css";
import Step1 from "./Step1";
import Step2 from "./Step2";

const AddCarForm = () => {
  const [showActiveStep, setShowActiveStep] = useState(1);

  return (
    <div className={styles.wrapper}>
      <div className={styles.form_wrapper}>
        <p className={styles.heading}>Add Car</p>
        {showActiveStep === 1 ? <Step1 setShowActiveStep={setShowActiveStep}/> : <Step2 setShowActiveStep={setShowActiveStep}/>}
      </div>
    </div>
  );
};

export default AddCarForm;
