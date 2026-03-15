import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconAt,
  IconLock,
  IconUser,
  IconChevronRight,
  IconArrowNarrowRight,
  IconEye,
  IconEyeOff,
  IconCheck,
  IconBrandGoogle,
} from "@tabler/icons-react";
import Lottie from "lottie-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Button,
  Checkbox,
  Text,
  Anchor,
  Paper,
  Stack,
  Transition,
  Loader
} from "@mantine/core";
import { notifications } from '@mantine/notifications';
import LoginForm from "../Components/Auth/LoginForm";
import SignupForm from "../Components/Auth/SignupForm";
import OtpForm from "../Components/Auth/OtpForm";

// --- Assets (Using extremely stable and high-quality URLs) ---
const LOGIN_LOTTIE_URL =
  "https://assets10.lottiefiles.com/packages/lf20_q5pk6p1k.json"; // Dynamic business/rocket
const SIGNUP_LOTTIE_URL =
  "https://assets9.lottiefiles.com/packages/lf20_m6cu96ze.json"; // Networking/Growth

// --- Component ---
const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname === "/login");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // OTP Workflow State
  const [otpEmail, setOtpEmail] = useState(null); // If null, show Signup UI. If string, show OTP UI.

  // Tracking mouse for "Eyes following cursor" effect
  const handleMouseMove = (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 50;
    const y = (e.clientY - window.innerHeight / 2) / 50;
    setMousePos({ x, y });
  };

  // Sync state with URL
  useEffect(() => {
    setIsLogin(location.pathname === "/login");
  }, [location.pathname]);

  const toggleAuth = () => {
    const target = isLogin ? "/signup" : "/login";
    setOtpEmail(null); // Reset OTP state if navigating
    navigate(target);
  };

  const onSignupSuccess = (email) => {
    setOtpEmail(email); // Transition to OTP view
  };

  const onOtpSuccess = () => {
    // Verified successfully. Route to landing page and force reload to update header state natively
    setTimeout(() => window.location.href = "/", 500);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="w-screen h-screen bg-[#050505] flex font-['Poppins'] select-none overflow-hidden relative"
    >
      {/* Immersive Background Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-bright-sun-400/5 blur-[120px] rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-mine-shaft-800/20 blur-[150px] rounded-full"></div>
      </div>

      {/* --- Main Content Layout --- */}
      <div className="w-full h-full flex relative">
        {/* 1. Login Form Half (Left/Center) */}
        <div className="absolute md:relative left-0 top-0 w-full md:w-1/2 h-full flex flex-col items-center justify-center p-6 md:p-12 z-10 pointer-events-none">
          <motion.div
            animate={
              isLogin
                ? { opacity: 1, scale: 1, filter: "blur(0px)", pointerEvents: "auto" }
                : { opacity: 0, scale: 0.95, filter: "blur(10px)", pointerEvents: "none" }
            }
            className="w-full max-w-sm pointer-events-auto"
          >
            <LoginForm 
              toggleAuth={toggleAuth} 
              isPasswordFocused={isPasswordFocused}
              setIsPasswordFocused={setIsPasswordFocused} 
            />
          </motion.div>
        </div>

        {/* 2. Signup Form Half (Right/Center) */}
        <div className="absolute md:relative right-0 top-0 w-full md:w-1/2 h-full flex flex-col items-center justify-center p-6 md:p-12 z-10 pointer-events-none">
          <motion.div
            animate={
              !isLogin
                ? { opacity: 1, scale: 1, filter: "blur(0px)", pointerEvents: "auto" }
                : { opacity: 0, scale: 0.95, filter: "blur(10px)", pointerEvents: "none" }
            }
            className="w-full max-w-sm pointer-events-auto"
          >
            <AnimatePresence mode="wait">
              {otpEmail ? (
                <motion.div
                  key="otp-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <OtpForm 
                    email={otpEmail} 
                    onVerificationSuccess={onOtpSuccess}
                    toggleAuth={toggleAuth}
                    setIsPasswordFocused={setIsPasswordFocused}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="signup-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <SignupForm 
                    toggleAuth={toggleAuth} 
                    isPasswordFocused={isPasswordFocused}
                    setIsPasswordFocused={setIsPasswordFocused}
                    onSignupSuccess={onSignupSuccess}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* --- 3. THE CURVY SLIDING PANEL --- */}
        <motion.div
          initial={false}
          animate={
            isLogin
              ? {
                  x: "100%",
                  borderTopLeftRadius: "15rem",
                  borderBottomLeftRadius: "15rem",
                  borderTopRightRadius: "0rem",
                  borderBottomRightRadius: "0rem",
                }
              : {
                  x: "0%",
                  borderTopLeftRadius: "0rem",
                  borderBottomLeftRadius: "0rem",
                  borderTopRightRadius: "15rem",
                  borderBottomRightRadius: "15rem",
                }
          }
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 120,
            mass: 1,
          }}
          className="absolute top-0 left-0 w-1/2 h-full bg-[#080808] z-50 overflow-hidden hidden md:flex flex-col items-center justify-center p-12 border-x border-bright-sun-400/5 shadow-[0_0_100px_rgba(0,0,0,1)]"
        >
          {/* Deep Thematic Interior Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,230,45,0.05)_0%,transparent_100%)] opacity-60"></div>

          <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
            {/* Compact Brand Identity */}
            <div className="absolute top-0 flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 6 }}
                className="w-12 h-12 bg-bright-sun-400 rounded-2xl flex items-center justify-center text-mine-shaft-950 shadow-[0_10px_30px_-5px_rgba(250,230,45,0.5)]"
              >
                <IconCheck size={28} stroke={4} />
              </motion.div>
              <span className="text-2xl font-black text-white uppercase tracking-tighter italic">
                BeOn<span className="text-bright-sun-400">Board</span>
              </span>
            </div>

            {/* Interactive Lottie Illustration */}
            <div className="w-full max-w-[380px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? "login-lottie" : "signup-lottie"}
                  initial={{ opacity: 0, scale: 0.9, x: isLogin ? 50 : -50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.1, x: isLogin ? -50 : 50 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Lottie
                    animationData={null}
                    path={isLogin ? LOGIN_LOTTIE_URL : SIGNUP_LOTTIE_URL}
                    loop={true}
                    className="w-full h-auto drop-shadow-[0_0_60px_rgba(250,230,45,0.1)]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Tagline Space (Reduced size to prevent scroll) */}
            <div className="mt-8 text-center w-full space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? "lt" : "st"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-1"
                >
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">
                    FIND THE <span className="text-bright-sun-400">JOB</span>
                  </h2>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic opacity-60">
                    MADE FOR YOU
                  </h2>
                </motion.div>
              </AnimatePresence>
              <p className="text-mine-shaft-600 font-bold uppercase tracking-[0.6em] text-[9px] pt-4 border-t border-mine-shaft-800/20 w-fit mx-auto">
                PROFESSIONAL PLATFORM
              </p>
            </div>

            {/* --- THE INTEGRATED PRIVACY BOT --- */}
            <div className="absolute bottom-[20px] flex flex-col items-center">
              <motion.div
                animate={
                  isPasswordFocused
                    ? { y: 0, opacity: 1, scale: 1 }
                    : { y: 10, opacity: 0, scale: 0.9 }
                }
                className="bg-mine-shaft-900/80 backdrop-blur-md border border-mine-shaft-800 px-4 py-2 rounded-xl mb-4"
              >
                <p className="text-[9px] font-black text-bright-sun-400 uppercase tracking-widest">
                  Privacy Shield Logged
                </p>
              </motion.div>

              <div className="relative w-20 h-20 bg-mine-shaft-900 rounded-[2.2rem] flex items-center justify-center border-4 border-mine-shaft-800 shadow-2xl overflow-hidden">
                {/* Cyber Eyes */}
                <div className="flex gap-4">
                  <motion.div
                    animate={
                      isPasswordFocused
                        ? { height: 2, scaleX: 1.8 }
                        : { height: 14, x: mousePos.x, y: mousePos.y }
                    }
                    className="w-2.5 bg-bright-sun-400 rounded-full shadow-[0_0_10px_rgba(250,230,45,0.8)]"
                  />
                  <motion.div
                    animate={
                      isPasswordFocused
                        ? { height: 2, scaleX: 1.8 }
                        : { height: 14, x: mousePos.x, y: mousePos.y }
                    }
                    className="w-2.5 bg-bright-sun-400 rounded-full shadow-[0_0_10px_rgba(250,230,45,0.8)]"
                  />
                </div>

                {/* Hands */}
                <motion.div
                  initial={false}
                  animate={isPasswordFocused ? { y: 20 } : { y: 100 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="absolute inset-0 flex items-center justify-center gap-2"
                >
                  <div className="w-9 h-14 bg-[#0d0d0d] border-2 border-bright-sun-400/30 rounded-full shadow-2xl"></div>
                  <div className="w-9 h-14 bg-[#0d0d0d] border-2 border-bright-sun-400/30 rounded-full shadow-2xl"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
