
"use client"

import React from 'react'
import signup from '../../assets/signup_login.png'
import LoginForm from './LoginForm'
import styles from "../SignUp/styles.module.css";
import Image from "next/image";
import { Images } from "@/assets/Images";
import Button from "@/components/Common/Button/index";
import { useRouter } from 'next/navigation';

export default function Login() {
    const router=useRouter()
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
           {/* Top headings */}
           <Image
                src={Images.myCar}
                alt="logo"
                width={32}
                height={32}
                className="w-8 h-8 sm:w-12 sm:h-12 mx-auto"
              />
              <p className={styles.subheading}>My Car</p>
              <p className={styles.heading}>Signup Account</p>
            <LoginForm/>
            
            {/* Bottom info */}
            <div className="flex items-center flex-col mt-6 ">
                <p className={styles.info_text}>Have an Account?</p>
                <p
                  className={`${styles.info_text} underline cursor-pointer`}
                  onClick={()=>router.push('/signup')}
                >
                  SIGNUP
                </p>
              </div>
        </div>
       
    </div>
  )
}
