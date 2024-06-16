
"use client"
// pages/login.tsx
import React from 'react';
import LoginForm from './LoginForm';
import Image from 'next/image';
import signup from '../../assets/signup_login.png';
import styles from '../../components/SignUp/styles.module.css'; 
import { Images } from '@/assets/Images'
import { useRouter } from 'next/navigation';


export default function LoginPage() {
    const router = useRouter();

  const handleSignupClick = () => {
    router.push('/signup');
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.left_wrapper}>
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${signup.src})`,
            backgroundSize: 'contain',
            backgroundPosition: 'top',
            backgroundRepeat: "no-repeat"
          }}
        ></div>
      </div>
      <div className={styles.right_wrapper}>
        <Image src={Images.myCar} alt="logo" width={32} height={32} className="w-8 h-8 sm:w-12 sm:h-12" />
        <p className={styles.subheading}>My Car</p>
        <p className={styles.heading}>Login</p>
        <LoginForm />
        <div className='flex items-center flex-col mt-6'>
          <p className={styles.info_text}>Don&#39;t Have an Account?</p>
          <p className={`${styles.info_text} underline cursor-pointer`} onClick={handleSignupClick} >login</p>
        </div>
      </div>

    </div>
  );
}
