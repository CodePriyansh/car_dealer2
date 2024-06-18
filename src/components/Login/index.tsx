
"use client"

import React, { useEffect, useState } from 'react'
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
           
           <LoginForm/>
            
           
        </div>
       
    </div>
  )
}
