import React, { useRef, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { verifyOtp, sendOtp } from "@/services/firebase/firebaseAuthService"; // Import sendOtp and verifyOtp functions
import styles from "../SignUp/styles.module.css";
import { useRouter } from "next/navigation";
import Button from "../Common/Button";

const OtpVerification = ({ mobileNumber }) => {
  const [otp, setOtp] = useState(["", "", "", "", "",``]);
  const [seconds, setSeconds] = useState(56);
  const [isOtpEntered, setIsOtpEntered] = useState(false);
  const inputRefs = useRef([]);
  const router = useRouter();

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [seconds]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        console.log(index )
        inputRefs.current[index + 1].focus();
      }

      if (newOtp.every((digit) => digit !== "")) {
        setIsOtpEntered(true);
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index > 0) {
      if (!otp[index]) {
        inputRefs.current[index - 1].focus();
      }
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      setIsOtpEntered(false);
    }
  };

  const handleResend = () => {
    sendOtp(`+91${mobileNumber}`)
      .then(() => {
        console.log("OTP resent successfully");
        setSeconds(59);
        setOtp(["", "", "", "", "", ""]);
        setIsOtpEntered(false);
        inputRefs.current[0].focus();
        toast.success("OTP resent successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to resend OTP. Please try again.");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    try {
      const user = await verifyOtp(otpValue);
      console.log("OTP verified successfully", user);

      // Call the login API here
      // const response = await loginApi({ mobileNumber, user });
      toast.success("OTP verified successfully!");
      console.log("Login API called with mobile number:", mobileNumber);

      // Redirect to the next page
      router.push("/");
    } catch (error) {
      console.error("OTP verification failed", error);
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <div className="flex flex-col">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex gap-4 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-12 h-12 text-xl text-center font-semibold border outline-none border-primary rounded"
            />
          ))}
        </div>
        {!isOtpEntered && (
          <div className="flex gap-4 items-center mb-4 flex-col text-base">
            <span className="text-lg text-primary">
              00:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
            <button
              type="button"
              className="bg-none border-none  text-greyy cursor-pointer font-semibold"
              onClick={handleResend}
            >
              Resend OTP
            </button>
          </div>
        )}
        {isOtpEntered && (
          <button type="submit">
            <Button otherStyles="sm:w-[350px] w-full mx-auto uppercase">
              Done
            </Button>
          </button>
        )}
      </form>
    </div>
  );
};

export default OtpVerification;
