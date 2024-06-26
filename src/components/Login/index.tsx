
"use client"

import React from 'react'
import signup from '../../assets/signup_login.png'
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

        <div className={`${styles.left_wrapper} !flex`}>
            <div className='w-full h-full md:flex hidden'  style={{
                    backgroundImage: `url(${signup.src})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'bottom',
                    backgroundRepeat:"no-repeat"
                }}></div>
                <Image src={Images.responsiveLogin} alt='login' className='w-full h-fit flex md:hidden absolute bottom-0 z-10'/>
        </div>
        <div className={`${styles.right_wrapper} !justify-start !mt-10 md:mt-0 md:!justify-center`}>
           
           <LoginForm/>
            
           
        </div>
       
    </div>
  )
}
