
"use client"

import React from 'react'
import styles from './styles.module.css'
import SignupForm from './SignupForm'
// import  {Images } from '@/assets/Images'
import signup from '../../assets/signup_login.png'
import Image from 'next/image'
import { url } from 'inspector'
import { Images } from '@/assets/Images'
import { useRouter } from 'next/navigation';
export default function Signup() {

  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };
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
          <Image src={Images.myCar} alt='logo' width={32} height={32} className='w-8 h-8 sm:w-12 sm:h-12'/>
            <p className={styles.subheading}>My Car</p>
            <p className={styles.heading}>Signup Account</p>
            <SignupForm/>
            <div className='flex items-center flex-col mt-6'>
          <p className={styles.info_text}>Have an Account?</p>
          <p className={`${styles.info_text} underline cursor-pointer`} onClick={handleLoginClick} >login</p>
        </div>
        </div>
       
    </div>
  )
}
