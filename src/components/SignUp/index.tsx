
"use client"

import React from 'react'
import styles from './styles.module.css'
import SignupForm from './SignupForm'
// import  {Images } from '@/assets/Images'
import signup from '../../assets/signup_login.png'
export default function Signup() {

 
  return (
    <div className={styles.wrapper}>
        <div className={styles.left_wrapper}>
            <div className='w-full h-full'  style={{
                    backgroundImage: `url(${signup.src})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'top',
                    backgroundRepeat:"no-repeat"
                }}></div>
        </div>
        <div className={styles.right_wrapper}>
          
            <SignupForm/>
            
        </div>
       
    </div>
  )
}
