import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import userImg from '../../assets/images/avatar.png';
import { BiMenu } from 'react-icons/bi';

const navLinks = [
    { path: '/home', display: 'Home' },
    { path: '/doctors', display: 'Find a Doctor' },
    { path: '/services', display: 'Services' },
    { path: '/contact', display: 'Contact' },
];

const Header = () => {
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in when the component mounts
        const token = localStorage.getItem('token'); // Replace 'token' with your actual key
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token or session data
        setIsAuthenticated(false); // Update authentication state
        navigate('/home'); // Redirect to home page
    };

    return (
        <header
            className="header flex items-center"
            ref={headerRef}
            style={{
                backgroundColor: '#1e3a8a', // Blue background
                height: '80px', // Header height
                display: 'flex',
                alignItems: 'center',
                position: 'sticky',
                top: '0',
                zIndex: '100',
            }}
        >
            <div className="container">
                <div className="flex items-center justify-between">
                    <div>
                        {/* Logo */}
                        <img
                            src={logo}
                            alt="Logo"
                            style={{
                                height: '80px', // Match the header height
                                objectFit: 'contain',
                            }}
                        />
                    </div>
                    <div className="navigation" ref={menuRef}>
                        <ul className="menu flex items-center gap-[2.7rem]">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={link.path}
                                        className="text-[16px] leading-7 font-[500] hover:text-primaryColor"
                                    >
                                        {link.display}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link to="/login">
                                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                                    Login
                                </button>
                            </Link>
                        )}
                        <span className="md:hidden" onClick={() => menuRef.current.classList.toggle('show__menu')}>
                            <BiMenu className="w-6 h-6 cursor-pointer" />
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
