import Login from '@/components/Login'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  return (
    <>
     <div id="recaptcha-container"></div>
     <Login/>
     </>
  )
}
