
"use client"

import React from 'react'
import signup from '../../assets/signup_login.png'
import login from '../../assets/responsive-login.png'
import LoginForm from './LoginForm'
import styles from "../SignUp/styles.module.css";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Images } from '@/assets/Images';

export default function Login() {
    const router=useRouter()
  
  return (
    <div className={styles.wrapper}>
      <div id="recaptcha-container"></div>

        <div className={`${styles.left_wrapper}`}>
            <div className='w-full h-full lg:flex hidden'  style={{
                    backgroundImage: `url(${signup.src})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'bottom',
                    backgroundRepeat:"no-repeat"
                }}></div>
            <div className='w-full h-[50vh] flex lg:hidden absolute bottom-0 z-10' style={{
                    backgroundImage: `url(${login.src})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'bottom',
                    backgroundRepeat:"no-repeat"
                }}></div>
        </div>
        <div className={`${styles.right_wrapper} !justify-start !mt-10 md:mt-0 md:!justify-center`}>
           
           <LoginForm/>
            
           
        </div>
       
    </div>
  )
}
