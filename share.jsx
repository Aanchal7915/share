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






















<!--    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cafe Menu</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Georgia', serif;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: #ffffff;
            line-height: 1.6;
            min-height: 100vh;
        }

        .menu-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #666;
            padding-bottom: 20px;
        }

        /* --- CSS for the Logo --- */
        .logo {
            width: 150px; /* Adjust size as needed */
            height: auto;
            margin-bottom: 15px;
            border-radius: 50%; /* Makes the image circular */
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2); /* Subtle glow effect */
        }
        /* --------------------------- */

        .cafe-title {
            font-size: 3em;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            letter-spacing: 2px;
        }

        .subtitle {
            font-size: 1.2em;
            color: #cccccc;
            font-style: italic;
        }

        .menu-section {
            margin-bottom: 35px;
            background: rgba(255,255,255,0.03);
            border-radius: 10px;
            padding: 25px;
            border: 1px solid #444;
        }

        .section-title {
            font-size: 1.8em;
            color: #ffffff;
            margin-bottom: 20px;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 2px solid #888;
            padding-bottom: 10px;
        }

        .menu-grid {
            display: grid;
            gap: 15px;
        }

        .menu-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px dotted #666;
            transition: all 0.3s ease;
        }

        .menu-item:hover {
            background: rgba(255,255,255,0.05);
            padding-left: 10px;
            border-radius: 5px;
        }

        .menu-item:last-child {
            border-bottom: none;
        }

        .item-name {
            font-size: 1.1em;
            color: #ffffff;
            font-weight: 500;
        }
        
        /* Style for the size/description appended to the name */
        .item-name span {
            font-size: 0.9em;
            color: #aaa;
            margin-left: 8px;
        }

        .item-price {
            font-size: 1.1em;
            color: #cccccc;
            font-weight: bold;
            min-width: 60px;
            text-align: right;
        }

        .price-symbol {
            color: #aaa;
            font-size: 0.9em;
        }

        .subsection {
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid #555;
        }

        .subsection-title {
            font-size: 1.2em;
            color: #dddddd;
            margin-bottom: 10px;
            font-style: italic;
        }

        .special-item {
            background: rgba(255,255,255,0.05);
            border-radius: 5px;
            padding: 8px;
            border-left: 4px solid #888;
        }
        
        .special-section {
            background: rgba(136, 136, 136, 0.1);
            border: 1px solid #666;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            text-align: center;
        }

        .entertainment-title {
            color: #ffcc00; /* Gold color for visibility */
            font-size: 1.5em;
            margin-bottom: 10px;
        }
        
        .entertainment-price {
            font-size: 1.4em;
            color: #ffffff;
            font-weight: bold;
        }

        @media (max-width: 600px) {
            .cafe-title {
                font-size: 2.2em;
            }
            
            .menu-container {
                padding: 20px 15px;
            }
            
            .menu-section {
                padding: 20px 15px;
            }
            
            .section-title {
                font-size: 1.5em;
            }
        }
    </style>
</head>
<body>
    <div class="menu-container">
        <div class="header">
            <!--Ensure the image URL has a fallback or is a reliable placeholder  -->
            <img src="logo.jpg" alt="Cafe Logo" class="logo" onerror="this.onerror=null; this.src='https://placehold.co/150x150/555/FFF?text=Cafe+Logo';">
            <h1 class="cafe-title">CAFE MENU</h1>
            <p class="subtitle">Fresh • Delicious • Authentic</p>
        </div>

        <!-- ☕ Hot Beverages Section -->
        <div class="menu-section">
            <h2 class="section-title">☕ Hot Beverages</h2>
            <div class="menu-grid">
                <div class="menu-item">
                    <span class="item-name">Hot Coffee</span>
                    <span class="item-price"><span class="price-symbol">₹</span>40</span>
                </div>
                <div class="menu-item">
                    <span class="item-name">Hot Chocolate</span>
                    <span class="item-price"><span class="price-symbol">₹</span>50</span>
                </div>
                <div class="menu-item">
                    <span class="item-name">Chai</span>
                    <span class="item-price"><span class="price-symbol">₹</span>20</span>
                </div>
                <div class="menu-item">
                    <span class="item-name">Ice Tea</span>
                    <span class="item-price"><span class="price-symbol">₹</span>30</span>
                </div>
                <div class="menu-item">
                    <span class="item-name">Lemon Tea</span>
                    <span class="item-price"><span class="price-symbol">₹</span>30</span>
                </div>
                <div class="menu-item">
                    <span class="item-name">Green Tea</span>
                    <span class="item-price"><span class="price-symbol">₹</span>40</span>
                </div>
            </div>

            <!-- Cold Coffee Selection -->
            <div class="subsection">
                <h3 class="subsection-title">Cold Coffee Selection</h3>
                <div class="menu-grid">
                    <!-- Updated Cold Coffee Prices -->
                    <div class="menu-item">
                        <span class="item-name">Cold Coffee <span>(Small)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>49</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Cold Coffee <span>(Large)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <!-- New Cold Coffee Flavors -->
                    <div class="menu-item special-item">
                        <span class="item-name">Hazelnut Cold Coffee <span>(Small)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>59</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Hazelnut Cold Coffee <span>(Large)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Irish Cold Coffee <span>(Small)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>59</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Irish Cold Coffee <span>(Large)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Caramel Cold Coffee <span>(Small)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>59</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Caramel Cold Coffee <span>(Large)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Frappé <span>(Small)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>59</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Frappé <span>(Large)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Cold Coffee with Ice Cream</span>
                        <span class="item-price"><span class="price-symbol">₹</span>80</span>
                    </div>
                </div>
            </div>

            <!-- Refreshing Drinks (Updated Prices) -->
            <div class="subsection">
                <h3 class="subsection-title">Refreshing Drinks</h3>
                <div class="menu-grid">
                    <div class="menu-item special-item">
                        <span class="item-name">Mint Soda</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Masala Lemon</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Watermelon Juice</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Apple Juice</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 🥤 Shakes & Smoothies Section (Updated Prices) -->
        <div class="menu-section">
            <h2 class="section-title">🥤 Shakes & Smoothies</h2>
            <div class="menu-grid">
                <div class="menu-item">
                    <span class="item-name">Vanilla Shake</span>
                    <span class="item-price"><span class="price-symbol">₹</span>50</span>
                </div>
                <div class="menu-item">
                    <span class="item-name">Butter Scotch Shake</span>
                    <span class="item-price"><span class="price-symbol">₹</span>50</span>
                </div>
                <div class="menu-item">
                    <span class="item-name">Banana Shake</span>
                    <span class="item-price"><span class="price-symbol">₹</span>50</span>
                </div>
                <div class="menu-item">
                    <span class="item-name">Mango Shake</span>
                    <span class="item-price"><span class="price-symbol">₹</span>50</span>
                </div>
                <!-- Updated Shake Prices -->
                <div class="menu-item special-item">
                    <span class="item-name">Oreo Shake</span>
                    <span class="item-price"><span class="price-symbol">₹</span>69</span>
                </div>
                <div class="menu-item special-item">
                    <span class="item-name">KitKat Shake</span>
                    <span class="item-price"><span class="price-symbol">₹</span>79</span>
                </div>
                <div class="menu-item special-item">
                    <span class="item-name">Black Current Shake</span>
                    <span class="item-price"><span class="price-symbol">₹</span>79</span>
                </div>
                <div class="menu-item special-item">
                    <span class="item-name">Milk Shake</span>
                    <span class="item-price"><span class="price-symbol">₹</span>99</span>
                </div>
            </div>
        </div>

        <!-- 🍽️ Main Courses Section -->
        <div class="menu-section">
            <h2 class="section-title">🍽️ Main Courses</h2>
            
            <div class="subsection">
                <h3 class="subsection-title">Sandwiches</h3>
                <div class="menu-grid">
                    <div class="menu-item">
                        <span class="item-name">Sandwich</span>
                        <span class="item-price"><span class="price-symbol">₹</span>59</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Tandoori Sandwich</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Veggie Grilled Sandwich</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Paneer Sandwich</span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Butter Special Sandwich</span>
                        <span class="item-price"><span class="price-symbol">₹</span>99</span>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <h3 class="subsection-title">Pasta Selection</h3>
                <div class="menu-grid">
                    <div class="menu-item">
                        <span class="item-name">White Sauce Pasta</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Red Sauce Pasta</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Pink Sauce Pasta</span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Mix Sauce Pasta</span>
                        <span class="item-price"><span class="price-symbol">₹</span>89</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Alfredo Pasta</span>
                        <span class="item-price"><span class="price-symbol">₹</span>119</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Cheese Pasta</span>
                        <span class="item-price"><span class="price-symbol">₹</span>99</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 🇮🇳 Indian Specialties Section (Includes Dosa, Idli, Maggi) -->
        <div class="menu-section">
            <h2 class="section-title">🇮🇳 Indian Specialties</h2>
            
            <div class="subsection">
                <h3 class="subsection-title">Dosa Varieties <span>(+₹10 Price Increase)</span></h3>
                <div class="menu-grid">
                    <!-- Dosa Prices increased by ₹10 -->
                    <div class="menu-item special-item">
                        <span class="item-name">Plain Dosa</span>
                        <span class="item-price"><span class="price-symbol">₹</span>59</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Butter Dosa</span>
                        <span class="item-price"><span class="price-symbol">₹</span>89</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Masala Dosa</span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Cheese Dosa</span>
                        <span class="item-price"><span class="price-symbol">₹</span>109</span>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <h3 class="subsection-title">Idli & Uttapam</h3>
                <div class="menu-grid">
                    <div class="menu-item">
                        <span class="item-name">Plain Idli <span>(2 Pcs)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>49</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Veg Idli</span>
                        <span class="item-price"><span class="price-symbol">₹</span>59</span>
                    </div>
                    <!-- New Uttapam Flavors -->
                    <div class="menu-item">
                        <span class="item-name">Uttapam - Onion</span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Uttapam - Tomato</span>
                        <span class="item-price"><span class="price-symbol">₹</span>99</span>
                    </div>
                </div>
            </div>

            <!-- Hotdogs & More subsection removed as requested -->
            
            <div class="subsection">
                <h3 class="subsection-title">Maggi Corner</h3>
                <div class="menu-grid">
                    <div class="menu-item">
                        <span class="item-name">Plain Maggi</span>
                        <span class="item-price"><span class="price-symbol">₹</span>39</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Veggie Maggi</span>
                        <span class="item-price"><span class="price-symbol">₹</span>49</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Paneer Maggi</span>
                        <span class="item-price"><span class="price-symbol">₹</span>59</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Cheese Maggi</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Butter Maggi</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Tandoori Maggi</span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 🥗 Light Bites Section (Includes Calzone, Momos, Fries, Dips) -->
        <div class="menu-section">
            <h2 class="section-title">🥗 Light Bites & Sides</h2>
            
            <div class="subsection">
                <h3 class="subsection-title">Calzone Bites</h3>
                <div class="menu-grid">
                    <div class="menu-item">
                        <span class="item-name">Corn Calzone</span>
                        <span class="item-price"><span class="price-symbol">₹</span>59</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Veggie Calzone</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Paneer Calzone</span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Cheese Calzone</span>
                        <span class="item-price"><span class="price-symbol">₹</span>89</span>
                    </div>
                </div>
            </div>
            
            <!-- New Momos Section -->
            <div class="subsection">
                <h3 class="subsection-title">Steamed & Fried Momos</h3>
                <div class="menu-grid">
                    <div class="menu-item">
                        <span class="item-name">Veg Momos <span>(Half Plate/5 Pcs)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>30</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Veg Momos <span>(Full Plate/10 Pcs)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>50</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Fried Veg Momos <span>(Half Plate/5 Pcs)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>40</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Fried Veg Momos <span>(Full Plate/10 Pcs)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>60</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Paneer Momos <span>(Half Plate/5 Pcs)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>50</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Paneer Momos <span>(Full Plate/10 Pcs)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>70</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Fried Paneer Momos <span>(Half Plate/5 Pcs)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>60</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Fried Paneer Momos <span>(Full Plate/10 Pcs)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>80</span>
                    </div>
                </div>
            </div>

            <!-- New Fries & Potatoes Section -->
            <div class="subsection">
                <h3 class="subsection-title">Fries & Potatoes</h3>
                <div class="menu-grid">
                    <div class="menu-item">
                        <span class="item-name">French Fries</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Fries with Dip</span>
                        <span class="item-price"><span class="price-symbol">₹</span>89</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Potato Nuggets</span>
                        <span class="item-price"><span class="price-symbol">₹</span>9</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Corn Crunchy</span>
                        <span class="item-price"><span class="price-symbol">₹</span>110</span>
                    </div>
                </div>
            </div>
            
            <!-- New Dip Section -->
            <div class="subsection">
                <h3 class="subsection-title">Extra Dips</h3>
                <div class="menu-grid">
                    <div class="menu-item">
                        <span class="item-name">Spice Dip</span>
                        <span class="item-price"><span class="price-symbol">₹</span>20</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Achari Dip</span>
                        <span class="item-price"><span class="price-symbol">₹</span>20</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Cheese Dip</span>
                        <span class="item-price"><span class="price-symbol">₹</span>20</span>
                    </div>
                </div>
            </div>


            <div class="subsection">
                <h3 class="subsection-title">Sweet Treats</h3>
                <div class="menu-grid">
                    <!-- Starbell removed as requested -->
                    <div class="menu-item">
                        <span class="item-name">Chilli Potato</span>
                        <span class="item-price"><span class="price-symbol">₹</span>149</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Honey Chilli Potato</span>
                        <span class="item-price"><span class="price-symbol">₹</span>169</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Paneer 65</span>
                        <span class="item-price"><span class="price-symbol">₹</span>149</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 🎱 New Entertainment Section -->
        <div class="menu-section special-section">
            <h2 class="section-title entertainment-title">🎱 Entertainment</h2>
            <div class="menu-grid">
                <div class="menu-item">
                    <span class="item-name">8 Ball Pool <span>(Per Hour)</span></span>
                    <span class="item-price entertainment-price"><span class="price-symbol">₹</span>250</span>
                </div>
            </div>
        </div>
        
    </div>
</body>
</html> 






























gemini    



















<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cafe Menu</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Georgia', serif;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: #ffffff;
            line-height: 1.6;
            min-height: 100vh;
        }

        .menu-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #666;
            padding-bottom: 20px;
        }

        /* --- CSS for the Logo --- */
        .logo {
            width: 150px; /* Adjust size as needed */
            height: auto;
            margin-bottom: 15px;
            border-radius: 50%; /* Makes the image circular */
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2); /* Subtle glow effect */
        }
        /* --------------------------- */

        .cafe-title {
            font-size: 3em;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            letter-spacing: 2px;
        }

        .subtitle {
            font-size: 1.2em;
            color: #cccccc;
            font-style: italic;
        }

        .menu-section {
            margin-bottom: 35px;
            background: rgba(255,255,255,0.03);
            border-radius: 10px;
            padding: 25px;
            border: 1px solid #444;
        }

        .section-title {
            font-size: 1.8em;
            color: #ffffff;
            margin-bottom: 20px;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 2px solid #888;
            padding-bottom: 10px;
        }

        .menu-grid {
            display: grid;
            gap: 15px;
        }

        .menu-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px dotted #666;
            transition: all 0.3s ease;
        }

        .menu-item:hover {
            background: rgba(255,255,255,0.05);
            padding-left: 10px;
            border-radius: 5px;
        }

        .menu-item:last-child {
            border-bottom: none;
        }

        .item-name {
            font-size: 1.1em;
            color: #ffffff;
            font-weight: 500;
        }
        
        /* Style for the size/description appended to the name */
        .item-name span {
            font-size: 0.9em;
            color: #aaa;
            margin-left: 8px;
        }
        
        /* New style for multi-price items */
        .item-name.multi-price {
            flex-grow: 1;
            margin-right: 10px;
        }

        .multi-price-container {
            display: flex;
            gap: 15px; /* Space between prices */
            font-size: 1.0em;
            color: #cccccc;
            font-weight: bold;
            text-align: right;
            min-width: 180px; /* Ensure enough space for 3 prices */
            justify-content: flex-end;
        }

        .item-price {
            font-size: 1.1em;
            color: #cccccc;
            font-weight: bold;
            min-width: 60px;
            text-align: right;
        }

        .price-symbol {
            color: #aaa;
            font-size: 0.9em;
        }

        .subsection {
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid #555;
        }

        .subsection-title {
            font-size: 1.2em;
            color: #dddddd;
            margin-bottom: 10px;
            font-style: italic;
        }

        .price-header {
            display: flex;
            justify-content: flex-end;
            gap: 15px;
            color: #ffcc00; /* Highlight the size header */
            font-size: 0.9em;
            margin-bottom: 5px;
            padding-right: 5px; /* Align with prices */
            border-bottom: 1px solid #ffcc00;
        }
        
        .price-header > div {
            min-width: 50px; /* Ensure prices align with headers */
            text-align: right;
        }

        .special-item {
            background: rgba(255,255,255,0.05);
            border-radius: 5px;
            padding: 8px;
            border-left: 4px solid #888;
        }
        
        .special-section {
            background: rgba(136, 136, 136, 0.1);
            border: 1px solid #666;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            text-align: center;
        }

        .entertainment-title {
            color: #ffcc00; /* Gold color for visibility */
            font-size: 1.5em;
            margin-bottom: 10px;
        }
        
        .entertainment-price {
            font-size: 1.4em;
            color: #ffffff;
            font-weight: bold;
        }

        @media (max-width: 600px) {
            .cafe-title {
                font-size: 2.2em;
            }
            
            .menu-container {
                padding: 20px 15px;
            }
            
            .menu-section {
                padding: 20px 15px;
            }
            
            .section-title {
                font-size: 1.5em;
            }
            
            .multi-price-container {
                gap: 5px; /* Smaller gap for mobile */
                min-width: unset;
                flex-direction: column; /* Stack prices vertically for narrow screens */
                align-items: flex-end;
            }
            
            .price-header {
                display: none; /* Hide header on small screens */
            }
            
            /* Adjust individual prices for stacked mobile view */
            .multi-price-container > div {
                font-size: 0.9em;
                min-width: unset;
            }
            
            /* Add size label to stacked prices for mobile readability */
            .multi-price-container .price-small::before { content: 'S: '; color: #aaa; }
            .multi-price-container .price-regular::before { content: 'R: '; color: #aaa; }
            .multi-price-container .price-large::before { content: 'L: '; color: #aaa; }
        }
    </style>
</head>
<body>
    <div class="menu-container">
        <div class="header">
                        <img src="https://placehold.co/150x150/555/FFF?text=Cafe+Logo" alt="Cafe Logo" class="logo" onerror="this.onerror=null; this.src='https://placehold.co/150x150/555/FFF?text=Cafe+Logo';">
            <h1 class="cafe-title">CAFE MENU</h1>
            <p class="subtitle">Fresh • Delicious • Authentic</p>
        </div>

                <div class="menu-section">
            <h2 class="section-title">☕ Hot Beverages</h2>
            <div class="menu-grid">
                <div class="menu-item">
                    <span class="item-name">Hot Coffee</span>
                    <span class="item-price"><span class="price-symbol">₹</span>40</span>
                </div>
                <div class="menu-item">
                    <span class="item-name">Hot Chocolate</span>
                    <span class="item-price"><span class="price-symbol">₹</span>50</span>
                </div>
                <div class="menu-item">
                    <span class="item-name">Chai</span>
                    <span class="item-price"><span class="price-symbol">₹</span>20</span>
                </div>
                <div class="menu-item">
                    <span class="item-name">Ice Tea</span>
                    <span class="item-price"><span class="price-symbol">₹</span>30</span>
                </div>
                <div class="menu-item">
                    <span class="item-name">Lemon Tea</span>
                    <span class="item-price"><span class="price-symbol">₹</span>30</span>
                </div>
                <div class="menu-item">
                    <span class="item-name">Green Tea</span>
                    <span class="item-price"><span class="price-symbol">₹</span>40</span>
                </div>
            </div>

                        <div class="subsection">
                <h3 class="subsection-title">Cold Coffee Selection</h3>
                <div class="menu-grid">
                                        <div class="menu-item">
                        <span class="item-name">Cold Coffee <span>(Small)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>49</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Cold Coffee <span>(Large)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                                        <div class="menu-item special-item">
                        <span class="item-name">Hazelnut Cold Coffee <span>(Small)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>59</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Hazelnut Cold Coffee <span>(Large)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Irish Cold Coffee <span>(Small)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>59</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Irish Cold Coffee <span>(Large)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Caramel Cold Coffee <span>(Small)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>59</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Caramel Cold Coffee <span>(Large)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Frappé <span>(Small)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>59</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Frappé <span>(Large)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Cold Coffee with Ice Cream</span>
                        <span class="item-price"><span class="price-symbol">₹</span>80</span>
                    </div>
                </div>
            </div>

                        <div class="subsection">
                <h3 class="subsection-title">Refreshing Drinks</h3>
                <div class="menu-grid">
                    <div class="menu-item special-item">
                        <span class="item-name">Mint Soda</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Masala Lemon</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Watermelon Juice</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Apple Juice</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                </div>
            </div>
        </div>

                <div class="menu-section">
            <h2 class="section-title">🥤 Shakes & Smoothies</h2>
            <div class="menu-grid">
                <div class="menu-item">
                    <span class="item-name">Vanilla Shake</span>
                    <span class="item-price"><span class="price-symbol">₹</span>50</span>
                </div>
                <div class="menu-item">
                    <span class="item-name">Butter Scotch Shake</span>
                    <span class="item-price"><span class="price-symbol">₹</span>50</span>
                </div>
                <div class="menu-item">
                    <span class="item-name">Banana Shake</span>
                    <span class="item-price"><span class="price-symbol">₹</span>50</span>
                </div>
                <div class="menu-item">
                    <span class="item-name">Mango Shake</span>
                    <span class="item-price"><span class="price-symbol">₹</span>50</span>
                </div>
                                <div class="menu-item special-item">
                    <span class="item-name">Oreo Shake</span>
                    <span class="item-price"><span class="price-symbol">₹</span>69</span>
                </div>
                <div class="menu-item special-item">
                    <span class="item-name">KitKat Shake</span>
                    <span class="item-price"><span class="price-symbol">₹</span>79</span>
                </div>
                <div class="menu-item special-item">
                    <span class="item-name">Black Current Shake</span>
                    <span class="item-price"><span class="price-symbol">₹</span>79</span>
                </div>
                <div class="menu-item special-item">
                    <span class="item-name">Milk Shake</span>
                    <span class="item-price"><span class="price-symbol">₹</span>99</span>
                </div>
            </div>
        </div>

                <div class="menu-section">
            <h2 class="section-title">🍽️ Main Courses</h2>
            
            <div class="subsection">
                <h3 class="subsection-title">Sandwiches</h3>
                <div class="menu-grid">
                    <div class="menu-item">
                        <span class="item-name">Sandwich</span>
                        <span class="item-price"><span class="price-symbol">₹</span>59</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Tandoori Sandwich</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Veggie Grilled Sandwich</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Paneer Sandwich</span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Butter Special Sandwich</span>
                        <span class="item-price"><span class="price-symbol">₹</span>99</span>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <h3 class="subsection-title">Pasta Selection</h3>
                <div class="menu-grid">
                    <div class="menu-item">
                        <span class="item-name">White Sauce Pasta</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Red Sauce Pasta</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Pink Sauce Pasta</span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Mix Sauce Pasta</span>
                        <span class="item-price"><span class="price-symbol">₹</span>89</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Alfredo Pasta</span>
                        <span class="item-price"><span class="price-symbol">₹</span>119</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Cheese Pasta</span>
                        <span class="item-price"><span class="price-symbol">₹</span>99</span>
                    </div>
                </div>
            </div>
        </div>

                <div class="menu-section">
            <h2 class="section-title">🍕 Pizza Corner</h2>
            
                        <div class="subsection">
                <h3 class="subsection-title">Exotica Pizza <span>(Small 7" / Regular 10" / Large 13")</span></h3>
                <div class="price-header">
                    <div class="price-small">S (7")</div>
                    <div class="price-regular">R (10")</div>
                    <div class="price-large">L (13")</div>
                </div>
                <div class="menu-grid">
                    <div class="menu-item special-item">
                        <span class="item-name multi-price">Veg Supreme Pizza <span>(Onion, Capsicum, Tomato, Mushroom, Jalapenos, Black Olive & Sweet Corn with extra cheese)</span></span>
                        <div class="multi-price-container">
                            <div class="price-small"><span class="price-symbol">₹</span>210</div>
                            <div class="price-regular"><span class="price-symbol">₹</span>330</div>
                            <div class="price-large"><span class="price-symbol">₹</span>550</div>
                        </div>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name multi-price">Veg Wonder Pizza <span>(Mushroom, Sweet Corn, Red Paprika & Paneer with extra cheese)</span></span>
                        <div class="multi-price-container">
                            <div class="price-small"><span class="price-symbol">₹</span>210</div>
                            <div class="price-regular"><span class="price-symbol">₹</span>330</div>
                            <div class="price-large"><span class="price-symbol">₹</span>550</div>
                        </div>
                    </div>
                </div>
            </div>

                        <div class="subsection">
                <h3 class="subsection-title">Classic Pizza <span>(Small 7" / Regular 10" / Large 13")</span></h3>
                <div class="price-header">
                    <div class="price-small">S (7")</div>
                    <div class="price-regular">R (10")</div>
                    <div class="price-large">L (13")</div>
                </div>
                <div class="menu-grid">
                    <div class="menu-item">
                        <span class="item-name multi-price">Margherita Pizza <span>(Double Cheese)</span></span>
                        <div class="multi-price-container">
                            <div class="price-small"><span class="price-symbol">₹</span>130</div>
                            <div class="price-regular"><span class="price-symbol">₹</span>250</div>
                            <div class="price-large"><span class="price-symbol">₹</span>400</div>
                        </div>
                    </div>
                    <div class="menu-item">
                        <span class="item-name multi-price">Fresh Veggie Pizza</span>
                        <div class="multi-price-container">
                            <div class="price-small"><span class="price-symbol">₹</span>130</div>
                            <div class="price-regular"><span class="price-symbol">₹</span>250</div>
                            <div class="price-large"><span class="price-symbol">₹</span>400</div>
                        </div>
                    </div>
                    <div class="menu-item">
                        <span class="item-name multi-price">Country Delight Pizza</span>
                        <div class="multi-price-container">
                            <div class="price-small"><span class="price-symbol">₹</span>130</div>
                            <div class="price-regular"><span class="price-symbol">₹</span>250</div>
                            <div class="price-large"><span class="price-symbol">₹</span>400</div>
                        </div>
                    </div>
                    <div class="menu-item">
                        <span class="item-name multi-price">Farm Fresh Pizza <span>(Onion, Capsicum, Mushroom)</span></span>
                        <div class="multi-price-container">
                            <div class="price-small"><span class="price-symbol">₹</span>130</div>
                            <div class="price-regular"><span class="price-symbol">₹</span>250</div>
                            <div class="price-large"><span class="price-symbol">₹</span>400</div>
                        </div>
                    </div>
                </div>
            </div>

                        <div class="subsection">
                <h3 class="subsection-title">Zesty Veggie Pizza <span>(Small 7" / Regular 10" / Large 13")</span></h3>
                <div class="price-header">
                    <div class="price-small">S (7")</div>
                    <div class="price-regular">R (10")</div>
                    <div class="price-large">L (13")</div>
                </div>
                <div class="menu-grid">
                    <div class="menu-item special-item">
                        <span class="item-name multi-price">Spicy Paneer Pizza <span>(Paneer, Capsicum, Red Paprika)</span></span>
                        <div class="multi-price-container">
                            <div class="price-small"><span class="price-symbol">₹</span>150</div>
                            <div class="price-regular"><span class="price-symbol">₹</span>350</div>
                            <div class="price-large"><span class="price-symbol">₹</span>500</div>
                        </div>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name multi-price">Veggie Deluxe Pizza <span>(Onion, Capsicum, Sweet Corn, Paneer, Mushroom)</span></span>
                        <div class="multi-price-container">
                            <div class="price-small"><span class="price-symbol">₹</span>150</div>
                            <div class="price-regular"><span class="price-symbol">₹</span>350</div>
                            <div class="price-large"><span class="price-symbol">₹</span>500</div>
                        </div>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name multi-price">Veg Mexican Pizza <span>(Paneer, Capsicum, Red Paprika)</span></span>
                        <div class="multi-price-container">
                            <div class="price-small"><span class="price-symbol">₹</span>150</div>
                            <div class="price-regular"><span class="price-symbol">₹</span>350</div>
                            <div class="price-large"><span class="price-symbol">₹</span>500</div>
                        </div>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name multi-price">Veg Italian Pizza <span>(Jalapeno, Black Olive, Sweet Corn)</span></span>
                        <div class="multi-price-container">
                            <div class="price-small"><span class="price-symbol">₹</span>150</div>
                            <div class="price-regular"><span class="price-symbol">₹</span>350</div>
                            <div class="price-large"><span class="price-symbol">₹</span>500</div>
                        </div>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name multi-price">Hot & Shot Pizza <span>(Jalapeno, Red Paprika, Capsicum)</span></span>
                        <div class="multi-price-container">
                            <div class="price-small"><span class="price-symbol">₹</span>150</div>
                            <div class="price-regular"><span class="price-symbol">₹</span>350</div>
                            <div class="price-large"><span class="price-symbol">₹</span>500</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <h3 class="subsection-title">Veg Single Pizza</h3>
                <div class="menu-grid">
                    <div class="menu-item">
                        <span class="item-name">Onion Pizza</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Capsicum Pizza</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Tomato Pizza</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Corn Pizza</span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Paneer Pizza</span>
                        <span class="item-price"><span class="price-symbol">₹</span>89</span>
                    </div>
                </div>
            </div>

        </div>
                        <div class="menu-section">
            <h2 class="section-title">🇮🇳 Indian Specialties</h2>
            
            <div class="subsection">
                <h3 class="subsection-title">Dosa Varieties <span>(+₹10 Price Increase)</span></h3>
                <div class="menu-grid">
                                        <div class="menu-item special-item">
                        <span class="item-name">Plain Dosa</span>
                        <span class="item-price"><span class="price-symbol">₹</span>59</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Butter Dosa</span>
                        <span class="item-price"><span class="price-symbol">₹</span>89</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Masala Dosa</span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Cheese Dosa</span>
                        <span class="item-price"><span class="price-symbol">₹</span>109</span>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <h3 class="subsection-title">Idli & Uttapam</h3>
                <div class="menu-grid">
                    <div class="menu-item">
                        <span class="item-name">Plain Idli <span>(2 Pcs)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>49</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Veg Idli</span>
                        <span class="item-price"><span class="price-symbol">₹</span>59</span>
                    </div>
                                        <div class="menu-item">
                        <span class="item-name">Uttapam - Onion</span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Uttapam - Tomato</span>
                        <span class="item-price"><span class="price-symbol">₹</span>99</span>
                    </div>
                </div>
            </div>

            
            <div class="subsection">
                <h3 class="subsection-title">Maggi Corner</h3>
                <div class="menu-grid">
                    <div class="menu-item">
                        <span class="item-name">Plain Maggi</span>
                        <span class="item-price"><span class="price-symbol">₹</span>39</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Veggie Maggi</span>
                        <span class="item-price"><span class="price-symbol">₹</span>49</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Paneer Maggi</span>
                        <span class="item-price"><span class="price-symbol">₹</span>59</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Cheese Maggi</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Butter Maggi</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Tandoori Maggi</span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                </div>
            </div>
        </div>

                <div class="menu-section">
            <h2 class="section-title">🥗 Light Bites & Sides</h2>
            
            <div class="subsection">
                <h3 class="subsection-title">Calzone Bites</h3>
                <div class="menu-grid">
                    <div class="menu-item">
                        <span class="item-name">Corn Calzone</span>
                        <span class="item-price"><span class="price-symbol">₹</span>59</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Veggie Calzone</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Paneer Calzone</span>
                        <span class="item-price"><span class="price-symbol">₹</span>79</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Cheese Calzone</span>
                        <span class="item-price"><span class="price-symbol">₹</span>89</span>
                    </div>
                </div>
            </div>
            
                        <div class="subsection">
                <h3 class="subsection-title">Steamed & Fried Momos</h3>
                <div class="menu-grid">
                    <div class="menu-item">
                        <span class="item-name">Veg Momos <span>(Half Plate/5 Pcs)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>30</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Veg Momos <span>(Full Plate/10 Pcs)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>50</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Fried Veg Momos <span>(Half Plate/5 Pcs)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>40</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Fried Veg Momos <span>(Full Plate/10 Pcs)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>60</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Paneer Momos <span>(Half Plate/5 Pcs)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>50</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Paneer Momos <span>(Full Plate/10 Pcs)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>70</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Fried Paneer Momos <span>(Half Plate/5 Pcs)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>60</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Fried Paneer Momos <span>(Full Plate/10 Pcs)</span></span>
                        <span class="item-price"><span class="price-symbol">₹</span>80</span>
                    </div>
                </div>
            </div>

                        <div class="subsection">
                <h3 class="subsection-title">Fries & Potatoes</h3>
                <div class="menu-grid">
                    <div class="menu-item">
                        <span class="item-name">French Fries</span>
                        <span class="item-price"><span class="price-symbol">₹</span>69</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Fries with Dip</span>
                        <span class="item-price"><span class="price-symbol">₹</span>89</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Potato Nuggets</span>
                        <span class="item-price"><span class="price-symbol">₹</span>9</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Corn Crunchy</span>
                        <span class="item-price"><span class="price-symbol">₹</span>110</span>
                    </div>
                </div>
            </div>
            
                        <div class="subsection">
                <h3 class="subsection-title">Extra Dips</h3>
                <div class="menu-grid">
                    <div class="menu-item">
                        <span class="item-name">Spice Dip</span>
                        <span class="item-price"><span class="price-symbol">₹</span>20</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Achari Dip</span>
                        <span class="item-price"><span class="price-symbol">₹</span>20</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Cheese Dip</span>
                        <span class="item-price"><span class="price-symbol">₹</span>20</span>
                    </div>
                </div>
            </div>


            <div class="subsection">
                <h3 class="subsection-title">Sweet Treats</h3>
                <div class="menu-grid">
                                        <div class="menu-item">
                        <span class="item-name">Chilli Potato</span>
                        <span class="item-price"><span class="price-symbol">₹</span>149</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name">Honey Chilli Potato</span>
                        <span class="item-price"><span class="price-symbol">₹</span>169</span>
                    </div>
                    <div class="menu-item special-item">
                        <span class="item-name">Paneer 65</span>
                        <span class="item-price"><span class="price-symbol">₹</span>149</span>
                    </div>
                </div>
            </div>
        </div>

                <div class="menu-section special-section">
            <h2 class="section-title entertainment-title">🎱 Entertainment</h2>
            <div class="menu-grid">
                <div class="menu-item">
                    <span class="item-name">8 Ball Pool <span>(Per Hour)</span></span>
                    <span class="item-price entertainment-price"><span class="price-symbol">₹</span>250</span>
                </div>
            </div>
        </div>
        
    </div>
</body>
</html>

