import React from 'react'
import styles from './styles.module.css'
import SignupForm from './SignupForm'

export default function Signup() {
  return (
    <div className={styles.wrapper}>
        <div className={styles.left_wrapper}>
            <img src='' alt='signup-car-image'/>
        </div>
        <div className={styles.right_wrapper}>
            <p className={styles.subheading}>My Car</p>
            <p className={styles.heading}>Signup Account</p>
            <SignupForm/>
        </div>
    </div>
  )
}
