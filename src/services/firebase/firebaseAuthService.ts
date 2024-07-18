// services/firebaseAuthService.ts
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { app } from "./firebaseConfig";

const auth = getAuth(app);

export const sendOtp = async (phoneNumber: string) => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier  = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
            console.log('recaptcha resolved..')
        }
    });
  }

  const appVerifier = window.recaptchaVerifier;

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;
    return confirmationResult.verificationId;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const verifyOtp = async (otp: string) => {
  try {
    const result = await window.confirmationResult.confirm(otp);
    return result.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export { auth };