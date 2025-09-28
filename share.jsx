/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import authImg from "../../assets/images/auth.png";
import axios from "axios";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Spinner from "./../../components/Spinner";
import SeoData from "../../SEO/SeoData";

const ForgotPassword = () => {
    //hooks->
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [userFound, setUserFound] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    //form submission handler
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (email === "test@test.com" || email === "store@flipkart.com") {
            toast.error(
                "Functionality is disabled for testing account! Please create a new one!"
            );
            setEmail("");
            setConfirmPassword("");
            setPassword("");
            return;
        }
        setIsSubmitting(true);
        try {
            if (userFound) {
                if (password !== confirmPassword) {
                    toast.error("Password does not match!");
                    return;
                }
                const response = await axios.post(
                    `${import.meta.env.VITE_SERVER_URL
                    }/api/v1/auth/forgot-password`,
                    {
                        email,
                        password,
                    }
                );
                if (response.status === 200) {
                    setUserFound(false);
                    toast.success("Password Reset Successfully!", {
                        toastId: "passwordReset",
                    });
                    navigate("/login");
                }
            } else {
                const response = await axios.post(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/user-exist`,
                    {
                        email,
                    }
                );

                if (response.status === 200) {
                    setUserFound(true);
                }
            }
        } catch (error) {
            console.error("Error:", error);
            //user not registered
            error.response?.status === 401 &&
                error.response.data?.errorType === "invalidUser" &&
                toast.error("User not Found!");
            //server error
            error.response?.status === 500 &&
                toast.error(
                    "Something went wrong! Please try after sometime."
                ) &&
                navigate("/forgot-password");
        } finally {
            setIsSubmitting(false);
        }
    };

    // display content
    return (
        <>
            <SeoData
                title="Forgot Password - Existing User"
                description="Forgot Password"
            />

            <div className="min-h-screen flex items-center justify-center bg-white px-4">
                <div
                    className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl border border-[#54B1CE]/30 bg-white flex flex-col md:flex-row overflow-hidden animate-fade-in transition-transform duration-300 hover:scale-[1.015] relative"
                    style={{
                        boxShadow:
                            "0 8px 32px 0 rgba(84,177,206,0.12), 0 1.5px 6px 0 rgba(14,116,144,0.08)",
                    }}
                >
                    {/* Left Side (Info/Brand) */}
                    <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-[#54B1CE]/10 p-8">
                        <h2 className="text-3xl font-bold text-[#54B1CE] mb-2">
                            Forgot Password
                        </h2>
                        <p className="text-base text-gray-600 text-center mb-6">
                            Forgot your password? No worries, we've got you covered!
                        </p>
                        <img
                            src="/ForgotCode.png"
                            alt="auth"
                            className="w-56 h-56 object-contain"
                        />
                    </div>
                    {/* Right Side (Form) */}
                    <div className="flex-1 flex flex-col justify-center p-6 sm:p-10">
                        {/* Heading for mobile */}
                        <div className="flex flex-col items-center gap-2 md:hidden mb-4">
                            <h2 className="text-2xl font-bold text-[#54B1CE] mt-2">
                                Forgot Password
                            </h2>
                            <p className="text-sm text-gray-600 text-center">
                                Forgot your password? No worries, we've got you covered!
                            </p>
                        </div>
                        {/* Auth image for mobile */}
                        <div className="flex justify-center md:hidden mb-4">
                            <img
                                src={authImg}
                                alt="auth"
                                className="w-32 h-32 object-contain"
                            />
                        </div>
                        {/* Forgot Password Form */}
                        <div className="w-full">
                            <form
                                action="/login"
                                method="post"
                                className="flex flex-col gap-5"
                                onSubmit={handleFormSubmit}
                            >
                                <div className="relative">
                                    <input
                                        autoComplete="on"
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-4 pr-3 py-2 w-full rounded-lg bg-white border border-[#54B1CE]/50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#54B1CE] focus:shadow-[0_0_0_4px_rgba(84,177,206,0.10)] transition text-base"
                                        placeholder="Email address"
                                        required
                                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                    />
                                </div>
                                {userFound && (
                                    <>
                                        <div className="relative">
                                            <input
                                                autoComplete="off"
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="pl-4 pr-10 py-2 w-full rounded-lg bg-white border border-[#54B1CE]/50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#54B1CE] focus:shadow-[0_0_0_4px_rgba(84,177,206,0.10)] transition text-base"
                                                placeholder="New Password"
                                                required
                                                minLength="5"
                                            />
                                            <span
                                                className="absolute right-3 top-2.5 text-[#54B1CE] hover:text-[#0e7490] cursor-pointer transition-colors duration-200"
                                                onClick={handlePasswordToggle}
                                            >
                                                {!showPassword ? <AiFillEye size={18} /> : <AiFillEyeInvisible size={18} />}
                                            </span>
                                        </div>
                                        <div className="relative">
                                            <input
                                                autoComplete="off"
                                                id="confirm_password"
                                                name="confirm_password"
                                                value={confirmPassword}
                                                type={showPassword ? "text" : "password"}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="pl-4 pr-10 py-2 w-full rounded-lg bg-white border border-[#54B1CE]/50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#54B1CE] focus:shadow-[0_0_0_4px_rgba(84,177,206,0.10)] transition text-base"
                                                placeholder="Confirm Password"
                                                required
                                            />
                                            <span
                                                className="absolute right-3 top-2.5 text-[#54B1CE] hover:text-[#0e7490] cursor-pointer transition-colors duration-200"
                                                onClick={handlePasswordToggle}
                                            >
                                                {!showPassword ? <AiFillEye size={18} /> : <AiFillEyeInvisible size={18} />}
                                            </span>
                                        </div>
                                    </>
                                )}
                                <div className="text-xs text-gray-500 text-center">
                                    By continuing, you agree to SSG&apos;s Terms of Use and Privacy Policy.
                                </div>
                                <button
                                    className="w-full bg-gradient-to-r from-[#54B1CE] to-[#0e7490] hover:from-[#0e7490] hover:to-[#54B1CE] text-white font-semibold py-2.5 rounded-lg shadow-lg transition-all duration-300 uppercase tracking-wide text-base focus:outline-none focus:ring-2 focus:ring-[#54B1CE] focus:ring-offset-2 animate-gradient-x"
                                    type="submit"
                                >
                                    {userFound ? "Reset Password" : "Submit"}
                                </button>
                            </form>
                        </div>
                        {isSubmitting && (
                            <div className="flex items-center justify-center mt-6">
                                <Spinner />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
