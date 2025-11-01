import React from 'react';
import { LayoutDashboard, Users, BookOpen, Rocket, Monitor } from 'lucide-react';

// The main component must be named App and be the default export in a single-file React app.
const App = () => {
    // Define primary colors based on a dark, professional theme (Slate/Blue with Yellow accent)
    const HERO_BG_CLASS = "bg-slate-900"; 
    const ACCENT_TEXT_CLASS = "text-yellow-400"; 

    // **[NEW]** Define the URL for your background image
    const BACKGROUND_IMAGE_URL = 'https://images.unsplash.com/photo-1541339907198-e087566d9f1e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // Placeholder image (classroom/desk setting)

    // Button definitions for the dark hero background
    const BUTTON_ADMIN_CLASS = "bg-yellow-400 text-slate-900 font-bold hover:bg-yellow-300 shadow-xl"; 
    const BUTTON_SECONDARY_CLASS = "border-2 border-white text-white hover:bg-white hover:text-slate-900"; 

    // Helper component to replace react-router-dom's Link
    const LinkButton = ({ to, children, className }) => (
        <a 
            href={to} 
            className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 ${className}`}
        >
            {children}
        </a>
    );

    // Component to simulate a dashboard screen (replaces simple placeholder)
    const DashboardPlaceholder = () => (
        <div className="p-4 rounded-xl shadow-2xl h-auto transform transition-transform duration-500 hover:scale-[1.02]"
            style={{ 
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
                border: '2px solid #334155'
            }}
        >
            <div className="flex justify-between items-center text-slate-400 mb-6 border-b border-slate-700 pb-2">
                <div className="flex items-center">
                    <Monitor className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Admin Dashboard</span>
                </div>
                <div className="flex space-x-1">
                    <span className="h-2 w-2 bg-red-500 rounded-full"></span>
                    <span className="h-2 w-2 bg-yellow-500 rounded-full"></span>
                    <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                </div>
            </div>
            
            {/* Simulated Widgets */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 p-4 rounded-lg shadow-inner">
                    <p className="text-sm text-yellow-400 font-bold">Students</p>
                    <p className="text-2xl text-white mt-1">1,240</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg shadow-inner">
                    <p className="text-sm text-yellow-400 font-bold">Teachers</p>
                    <p className="text-2xl text-white mt-1">85</p>
                </div>
                <div className="col-span-2 bg-slate-800 p-4 rounded-lg shadow-inner h-48 py-6">
                    <p className="text-sm text-slate-400 mb-2">Upcoming Classes Chart</p>
                    <div className="h-full bg-slate-700 rounded-sm flex items-end justify-center p-1 space-x-2"> 
                        <div className="w-1/5 h-5/6 bg-red-500 rounded-sm transition-all duration-300 hover:scale-y-105 origin-bottom" title="Monday"></div>
                        <div className="w-1/5 h-3/5 bg-blue-500 rounded-sm transition-all duration-300 hover:scale-y-105 origin-bottom" title="Tuesday"></div>
                        <div className="w-1/5 h-full bg-green-500 rounded-sm transition-all duration-300 hover:scale-y-105 origin-bottom" title="Wednesday"></div>
                        <div className="w-1/5 h-4/5 bg-indigo-500 rounded-sm transition-all duration-300 hover:scale-y-105 origin-bottom" title="Thursday"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            
            {/* Hero Section: Dark Background with Image */}
            <section 
                className={`relative bg-[url('${BACKGROUND_IMAGE_URL}')] bg-cover bg-center text-white py-24 md:py-40 overflow-hidden shadow-xl`}
            >
                {/* Image Overlay: Added to ensure text readability on top of the image */}
                <div className="absolute inset-0 bg-black/40 z-0"></div>

                {/* Decorative background grid/pattern for depth (kept for subtle effect) */}
                <div className="absolute inset-0 opacity-15 z-0" 
                    style={{ 
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23334155\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' 
                    }}>
                </div>

                <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                        Empowering Education <br className="hidden md:inline" /> with <span className={ACCENT_TEXT_CLASS}>Technology</span>
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl text-slate-100 max-w-2xl mx-auto">
                        A comprehensive, user-friendly portal for seamless school management — designed for Admins, Students, and Teachers.
                    </p>
                    <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                        {/* Admin Button: Primary Action */}
                        <LinkButton 
                            to="/admin" 
                            className={BUTTON_ADMIN_CLASS}
                        >
                            <LayoutDashboard className="inline w-5 h-5 mr-2 -mt-1" />
                            Admin Portal
                        </LinkButton>
                        {/* Student Button: Secondary Action */}
                        <LinkButton 
                            to="/student" 
                            className={BUTTON_SECONDARY_CLASS}
                        >
                            <Users className="inline w-5 h-5 mr-2 -mt-1" />
                            Student Portal
                        </LinkButton>
                        {/* Teacher Button: Tertiary Action */}
                        <LinkButton 
                            to="/teacher" 
                            className={BUTTON_SECONDARY_CLASS}
                        >
                            <BookOpen className="inline w-5 h-5 mr-2 -mt-1" />
                            Teacher Portal
                        </LinkButton>
                    </div>
                </div>
            </section>

            {/* Main Content Section: Primarily White */}
            <section className="max-w-5xl mx-auto px-6 py-20 bg-white">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div>
                        <h2 className={`text-3xl font-bold text-slate-800 mb-4 border-l-4 border-yellow-400 pl-4`}>
                            Streamline Your School Operations
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                            Our platform simplifies administrative tasks, enhances student learning experiences, and empowers teachers with efficient tools. From attendance tracking to grade management, we've got you covered.
                        </p>
                        {/* Using a visually distinct list style */}
                        <ul className="text-gray-700 space-y-3">
                            <li className="flex items-start">
                                <span className="text-yellow-500 font-bold mr-2 mt-1">•</span>
                                <span>Effortless student enrollment and record keeping.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-yellow-500 font-bold mr-2 mt-1">•</span>
                                <span>Intuitive gradebook and progress tracking for teachers.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-yellow-500 font-bold mr-2 mt-1">•</span>
                                <span>Secure access for parents, students, and staff.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-yellow-500 font-bold mr-2 mt-1">•</span>
                                <span>Real-time notifications and communication features.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Dashboard Visual */}
                    <div className="hidden md:block">
                        <DashboardPlaceholder />
                    </div>
                </div>

                {/* Quick Start Card - Updated with dark background/color effects */}
                <div className="mt-20 rounded-xl p-8 shadow-2xl text-white"
                    style={{ 
                        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                        border: '1px solid #334155'
                    }}
                >
                    <h3 className={`text-2xl font-bold mb-3 flex items-center ${ACCENT_TEXT_CLASS}`}>
                        <Rocket className={`w-6 h-6 mr-3`} /> 
                        Quick Start Guide
                    </h3>
                    <p className="text-lg leading-relaxed text-slate-300">
                        Begin by signing up as an **Admin** through the <a href="/admin" className="text-yellow-400 hover:underline font-bold transition-colors duration-200">Admin Portal</a>. 
                        Once logged in, you can seamlessly create and manage both Student and Teacher accounts from your dedicated Admin Dashboard.
                    </p>
                </div>
            </section>

            {/* Simple Footer/Separator */}
            <footer className="py-8 bg-slate-800 text-center text-slate-400 text-sm">
                <div className="max-w-5xl mx-auto px-4">
                    <p>&copy; {new Date().getFullYear()} School Management Platform. All rights reserved.</p>
                </div>
            </footer>
            
        </div>
    );
};

export default App;
