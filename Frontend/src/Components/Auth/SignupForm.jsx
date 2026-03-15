import React, { useState } from "react";
import { IconAt, IconLock, IconEye, IconEyeOff, IconArrowNarrowRight, IconBrandGoogle } from "@tabler/icons-react";
import { Checkbox, Text, Loader, Stack } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import axios from 'axios';

const SignupForm = ({ toggleAuth, isPasswordFocused, setIsPasswordFocused, onSignupSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!signupEmail.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(signupEmail)) {
      newErrors.email = "Invalid email";
    }

    // Password validation (min 8 chars, at least 1 symbol, 1 uppercase, 1 number)
    if (!signupPassword) {
      newErrors.password = "Password is required";
    } else {
      if (signupPassword.length < 8) {
        newErrors.password = "Minimum 8 characters length";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(signupPassword)) {
        newErrors.password = "Must contain at least 1 symbol (!@#$)";
      } else if (!/\d/.test(signupPassword)) {
        newErrors.password = "Must contain at least 1 number";
      } else if (!/[A-Z]/.test(signupPassword)) {
        newErrors.password = "Must contain at least 1 uppercase letter";
      }
    }

    if (!acceptedTerms) newErrors.terms = "You must accept the boarding protocols";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      notifications.show({ title: 'Validation Failed', message: 'Please correct the highlighted fields.', color: 'red' });
      return;
    }
    
    setLoading(true);
    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      const payload = {
        name: fullName,
        email: signupEmail,
        password: signupPassword,
        role: "CANDIDATE"
      };

      const response = await axios.post("http://localhost:8080/api/auth/register", payload);
      
      // Update this notification as per requirement to let user know about OTP step incoming
      notifications.show({ 
        title: 'Registration Successful', 
        message: 'Your account has been created! Please verify your email.', 
        color: 'green' 
      });
      // Trigger OTP view without toggling back to Login
      onSignupSuccess(signupEmail);
    } catch (error) {
      let errorMsg = 'Failed to create profile. Please try again.';
      if (error.response?.data) {
        if (typeof error.response.data === 'string') errorMsg = error.response.data;
        else if (error.response.data.message) errorMsg = error.response.data.message;
      }
      notifications.show({ title: 'Registration Failed', message: errorMsg, color: 'red' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack gap={0} mb={10}>
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">
          Start <span className="text-bright-sun-400">Here</span>
        </h1>
        <p className="text-mine-shaft-500 text-xs font-bold uppercase tracking-widest mt-1">
          Join the collective
        </p>
      </Stack>

      <form className="space-y-2" onSubmit={handleSignup} noValidate>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-mine-shaft-400 uppercase tracking-widest ml-1">
              First Name
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value); if(errors.firstName) setErrors({...errors, firstName: ''}) }}
              placeholder="Alex"
              className={`w-full bg-mine-shaft-900/40 border ${errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-mine-shaft-800 focus:border-bright-sun-400/40'} rounded-xl py-2.5 pl-4 pr-4 text-sm font-bold text-white outline-none transition-all placeholder:text-mine-shaft-700 shadow-xl`}
            />
            {errors.firstName && <p className="text-red-500 text-[9px] font-bold mt-1 px-1">{errors.firstName}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-mine-shaft-400 uppercase tracking-widest ml-1">
              Last Name
            </label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => { setLastName(e.target.value); if(errors.lastName) setErrors({...errors, lastName: ''}) }}
              placeholder="Doe"
              className={`w-full bg-mine-shaft-900/40 border ${errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-mine-shaft-800 focus:border-bright-sun-400/40'} rounded-xl py-2.5 pl-4 pr-4 text-sm font-bold text-white outline-none transition-all placeholder:text-mine-shaft-700 shadow-xl`}
             />
             {errors.lastName && <p className="text-red-500 text-[9px] font-bold mt-1 px-1">{errors.lastName}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-mine-shaft-400 uppercase tracking-widest ml-1">
            Work Email
          </label>
          <div className="relative group">
            <IconAt size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-bright-sun-400/50 group-focus-within:text-bright-sun-400 z-10 transition-colors" />
            <input
              type="email"
              required
              value={signupEmail}
              onChange={(e) => { setSignupEmail(e.target.value); if(errors.email) setErrors({...errors, email: ''}) }}
              placeholder="alex@beonboard.com"
              className={`w-full bg-mine-shaft-900/40 border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-mine-shaft-800 focus:border-bright-sun-400/40'} rounded-xl py-2.5 pl-12 pr-4 text-sm font-bold text-white outline-none transition-all placeholder:text-mine-shaft-700 shadow-xl`}
            />
          </div>
          {errors.email && <p className="text-red-500 text-[9px] font-bold mt-1 px-1">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-mine-shaft-400 uppercase tracking-widest ml-1">
            Secure Pass
          </label>
          <div className="relative group">
            <IconLock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-bright-sun-400/50 group-focus-within:text-bright-sun-400 z-10 transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={signupPassword}
              onChange={(e) => { setSignupPassword(e.target.value); if(errors.password) setErrors({...errors, password: ''}) }}
              placeholder="Min 8 chars, 1 symbol"
              className={`w-full bg-mine-shaft-900/40 border ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-mine-shaft-800 focus:border-bright-sun-400/40'} rounded-xl py-2.5 pl-12 pr-12 text-sm font-bold text-white outline-none transition-all placeholder:text-mine-shaft-700 shadow-xl`}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-mine-shaft-700 hover:text-bright-sun-400 transition-colors"
            >
              {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-[9px] font-bold mt-1 px-1">{errors.password}</p>}
        </div>

        <div className="py-2 scale-90 origin-left">
          <Checkbox
            checked={acceptedTerms}
            onChange={(e) => { setAcceptedTerms(e.currentTarget.checked); if(errors.terms) setErrors({...errors, terms: ''}) }}
            label={<Text size="xs" fw={700} c={errors.terms ? "red.5" : "gray.6"}>I accept the boarding protocols</Text>}
            styles={{
              input: { backgroundColor: "transparent", borderColor: errors.terms ? "#ef4444" : "#374151", borderRadius: "4px" },
            }}
          />
          {errors.terms && <p className="text-red-500 text-[9px] font-bold mt-1 pl-7">{errors.terms}</p>}
        </div>

        <button disabled={loading} type="submit" className="group relative w-full bg-bright-sun-400 text-mine-shaft-950 py-3 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-bright-sun-500 transition-all active:scale-[0.98] shadow-[0_15px_30px_-10px_rgba(250,230,45,0.3)] mt-1 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? <Loader color="black" size="sm" /> : <span>Create Profile</span>}
          {!loading && <IconArrowNarrowRight size={22} className="group-hover:translate-x-1 transition-transform" />}
        </button>

        <div className="flex items-center gap-4 opacity-80">
          <div className="flex-1 h-px bg-mine-shaft-500"></div>
          <span className="text-[9px] font-black text-mine-shaft-400 uppercase tracking-widest">Or Join With</span>
          <div className="flex-1 h-px bg-mine-shaft-500"></div>
        </div>

        <button type="button" className="w-full bg-white/5 border border-white/10 text-white py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-[0.98]">
          <IconBrandGoogle size={18} />
          <span>Google Protocol</span>
        </button>
      </form>

      <div className="mt-3 text-center">
        <button
          onClick={toggleAuth}
          className="text-mine-shaft-500 hover:text-bright-sun-400 text-[10px] font-black uppercase tracking-[0.1em] transition-colors"
        >
          Have Account?{" "}
          <span className="text-bright-sun-400 border-b border-bright-sun-400 pb-0.5 ml-2">
            Authenticate
          </span>
        </button>
      </div>
    </>
  );
};

export default SignupForm;
