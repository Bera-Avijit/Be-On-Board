import React, { useState } from "react";
import { IconDeviceMobileMessage, IconArrowNarrowRight } from "@tabler/icons-react";
import { Loader, Stack } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import axios from 'axios';

const OtpForm = ({ email, onVerificationSuccess, toggleAuth, setIsPasswordFocused }) => {
  const [loading, setLoading] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) {
      setError("Please enter the complete 6-digit code.");
      notifications.show({ title: 'Validation Failed', message: 'Please enter the valid 6-digit code.', color: 'red' });
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/auth/verify", {
        email: email,
        code: otpCode
      });
      // Store tokens from backend AuthResponse
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("userName", response.data.name);
      localStorage.setItem("userEmail", response.data.email);
      localStorage.setItem("userRole", response.data.role);

      notifications.show({ 
        title: 'Verification Successful!', 
        message: 'Your profile is now fully authenticated.', 
        color: 'green' 
      });
      onVerificationSuccess();
    } catch (error) {
      let errorMsg = 'Failed to verify code. Please try again.';
      if (error.response?.data) {
        if (typeof error.response.data === 'string') errorMsg = error.response.data;
        else if (error.response.data.message) errorMsg = error.response.data.message;
      }
      notifications.show({ title: 'Verification Failed', message: errorMsg, color: 'red' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack gap={0} mb={32}>
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
          Verify <span className="text-bright-sun-400">Identity</span>
        </h1>
        <p className="text-mine-shaft-500 text-sm font-bold uppercase tracking-widest mt-3 leading-snug">
          We sent a secure transmission to <br/><span className="text-white normal-case tracking-normal">{email}</span>
        </p>
      </Stack>

      <form className="space-y-6" onSubmit={handleVerify}>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-mine-shaft-400 uppercase tracking-widest ml-1">
            Authentication Code
          </label>
          <div className="relative group">
            <IconDeviceMobileMessage size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-bright-sun-400/50 group-focus-within:text-bright-sun-400 z-10 transition-colors" />
            <input
              type="text"
              required
              maxLength={6}
              value={otpCode}
              onChange={(e) => { setOtpCode(e.target.value.replace(/\D/g, '')); if(error) setError("") }} 
              placeholder="000000"
              className={`w-full text-center tracking-[1em] text-2xl bg-mine-shaft-900/40 border ${error ? 'border-red-500 focus:border-red-500' : 'border-mine-shaft-800 focus:border-bright-sun-400/40'} rounded-xl py-4 pr-4 pl-8 font-black text-bright-sun-400 outline-none transition-all placeholder:text-mine-shaft-700/50 shadow-xl`}
              onFocus={() => setIsPasswordFocused && setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused && setIsPasswordFocused(false)}
            />
          </div>
          {error && <p className="text-red-500 text-[10px] font-bold mt-1 text-center">{error}</p>}
        </div>

        <button disabled={loading} type="submit" className="group relative w-full bg-bright-sun-400 text-mine-shaft-950 py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-bright-sun-500 transition-all active:scale-[0.98] shadow-[0_15px_30px_-10px_rgba(250,230,45,0.3)] disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? <Loader color="black" size="sm" /> : <span>Confirm Access</span>}
          {!loading && <IconArrowNarrowRight size={22} className="group-hover:translate-x-1 transition-transform" />}
        </button>
      </form>

      <div className="mt-8 text-center space-y-4">
        <button
          className="text-mine-shaft-500 hover:text-bright-sun-400 text-[10px] font-black uppercase tracking-[0.1em] transition-colors"
        >
          Didn't receive it?{" "}
          <span className="text-bright-sun-400 border-b border-bright-sun-400 pb-0.5 ml-2">
            Resend Code
          </span>
        </button>
        <br/>
        <button
          onClick={toggleAuth}
          className="text-mine-shaft-600 hover:text-white text-[9px] font-black uppercase tracking-[0.1em] transition-colors"
        >
          Back to Login
        </button>
      </div>
    </>
  );
};

export default OtpForm;
