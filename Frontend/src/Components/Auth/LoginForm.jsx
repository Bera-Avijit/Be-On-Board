import React, { useState } from "react";
import { IconAt, IconLock, IconEye, IconEyeOff, IconChevronRight, IconBrandGoogle } from "@tabler/icons-react";
import { Checkbox, Anchor, Loader, Stack } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginForm = ({ toggleAuth, isPasswordFocused, setIsPasswordFocused }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!loginEmail.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(loginEmail)) {
      newErrors.email = "Invalid email";
    }
    
    if (!loginPassword) newErrors.password = "Password is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      notifications.show({ title: 'Validation Failed', message: 'Please enter both email and password.', color: 'red' });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email: loginEmail,
        password: loginPassword
      });
      // Store tokens and user string
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("userName", response.data.name);
      localStorage.setItem("userEmail", response.data.email);
      localStorage.setItem("userRole", response.data.role);
      
      notifications.show({ title: 'Success!', message: 'Identity verified successfully.', color: 'green' });
      setTimeout(() => window.location.href = "/", 500);
    } catch (error) {
      notifications.show({ 
        title: 'Authentication Failed', 
        message: error.response?.data?.message || 'Invalid credentials or server error.', 
        color: 'red' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack gap={0} mb={24}>
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
          Login <span className="text-bright-sun-400">Now</span>
        </h1>
        <p className="text-mine-shaft-500 text-sm font-bold uppercase tracking-widest mt-3">
          Professional Ecosystem
        </p>
      </Stack>

      <form className="space-y-4" onSubmit={handleLogin} noValidate>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-mine-shaft-400 uppercase tracking-[0.2em] ml-1">
              Email Address
            </label>
            <div className="relative group">
              <IconAt size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-bright-sun-400/50 group-focus-within:text-bright-sun-400 z-10 transition-colors" />
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => { setLoginEmail(e.target.value); if(errors.email) setErrors({...errors, email: ''}) }}
                placeholder="alex@example.com"
                className={`w-full bg-mine-shaft-900/40 border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-mine-shaft-800 focus:border-bright-sun-400/40'} rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold text-white outline-none transition-all placeholder:text-mine-shaft-700 shadow-xl`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-[9px] font-bold mt-1 px-1">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-mine-shaft-400 uppercase tracking-[0.2em] ml-1">
              Password
            </label>
            <div className="relative group">
              <IconLock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-bright-sun-400/50 group-focus-within:text-bright-sun-400 z-10 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                value={loginPassword}
                onChange={(e) => { setLoginPassword(e.target.value); if(errors.password) setErrors({...errors, password: ''}) }}
                placeholder="••••••••"
                className={`w-full bg-mine-shaft-900/40 border ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-mine-shaft-800 focus:border-bright-sun-400/40'} rounded-xl py-3.5 pl-12 pr-12 text-sm font-bold text-white outline-none transition-all placeholder:text-mine-shaft-700 shadow-xl`}
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
        </div>

        <div className="flex items-center justify-between px-1 scale-90 origin-left">
          <Checkbox
            label="Stay Authenticated"
            size="xs"
            styles={{
              label: { color: "#81848aff", fontWeight: 700, paddingLeft: "8px" },
              input: { backgroundColor: "transparent", borderColor: "#374151", borderRadius: "4px" },
            }}
          />
          <Anchor href="#" size="xs" fw={900} c="bright-sun.4" className="uppercase tracking-wide hover:brightness-125 transition-all">
            Forgot?
          </Anchor>
        </div>

        <button disabled={loading} type="submit" className="group relative w-full bg-bright-sun-400 text-mine-shaft-950 py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-bright-sun-500 transition-all active:scale-[0.98] shadow-[0_15px_30px_-10px_rgba(250,230,45,0.3)] mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? <Loader color="black" size="sm" /> : <span>Validate Identity</span>}
          {!loading && <IconChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />}
        </button>

        <div className="flex items-center gap-4 opacity-70">
          <div className="flex-1 h-px bg-mine-shaft-500"></div>
          <span className="text-[9px] font-black text-mine-shaft-400 uppercase tracking-widest">Or Access With</span>
          <div className="flex-1 h-px bg-mine-shaft-500"></div>
        </div>

        <button type="button" className="w-full bg-white/5 border border-white/10 text-white py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-[0.98]">
          <IconBrandGoogle size={18} />
          <span>Google Protocol</span>
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={toggleAuth}
          className="text-mine-shaft-500 hover:text-bright-sun-400 text-[10px] font-black uppercase tracking-[0.1em] transition-colors"
        >
          No Account?{" "}
          <span className="text-bright-sun-400 border-b border-bright-sun-400 pb-0.5 ml-2">
            Register Now
          </span>
        </button>
      </div>
    </>
  );
};

export default LoginForm;
