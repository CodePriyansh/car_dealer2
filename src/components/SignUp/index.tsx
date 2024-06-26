
"use client"

import React from 'react'
import styles from './styles.module.css'
import SignupForm from './SignupForm'
import signup from '../../assets/signup_login.png'

export default function Signup() {

 
  return (
    <div className={styles.wrapper}>
      <div id="recaptcha-container"></div>

        <div className={styles.left_wrapper}>
            <div className='w-full h-full lg:flex hidden'  style={{
                    backgroundImage: `url(${signup.src})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat:"no-repeat"
                }}></div>
                
        </div>
        <div className={styles.right_wrapper}>
          
            <SignupForm/>
            
        </div>
       
    </div>
  )
}
