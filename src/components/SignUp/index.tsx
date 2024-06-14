import React from 'react'
import styles from './styles.module.css'
import SignupForm from './SignupForm'
// import  {Images } from '@/assets/Images'
import signup from '../../assets/signup_login_image.png'
import logo from '../../assets/my_car.png'
import Image from 'next/image'
import { url } from 'inspector'

export default function Signup() {
  return (
    <div className={styles.wrapper}>
        <div className={styles.left_wrapper}>
            <div className='w-full h-full'  style={{
                    backgroundImage: `url(${signup.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'left'
                }}></div>
        </div>
        <div className={styles.right_wrapper}>
        <Image src={logo} alt="Logo" width={100} height={100} className="mx-auto mb-4" />
            <p className={styles.subheading}>My Car</p>
            <p className={styles.heading}>Signup Account</p>
            <SignupForm/>
        </div>
    </div>
  )
}
