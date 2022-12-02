import React from 'react'
import { useState, useMemo } from 'react'
import HiddenNavbar from '../../components/HiddenNavbar';
import './AmazonSidebar.css'

function AmazonSidebar() {
    const [sidebarOpen, setSidebarOpen] = useState<Boolean>(false);
    const [darkTheme, setDarkTheme] = useState<Boolean>(true);

    const lightThemeColors = {
        icon: "🌙",
        mode: "light",
        color: "white",
        inverseColor: "black",
        headerColor: "white"
    }
    const darkThemeColors = {
        icon: "🔆",
        mode: "dark",
        color: "#161e27",
        inverseColor: "white",
        headerColor: "#232f3e"
    }

    const theme = useMemo(() => darkTheme ? darkThemeColors : lightThemeColors, [darkTheme])

    function toggleSidebar() {
        setSidebarOpen(state => !state)
    }

    function toggleTheme() {
        setDarkTheme(state => !state)
    }

    return (
        <div className="amazon-sidebar-page" style={{backgroundColor: theme.color, minHeight: "100vh"}}>
            <aside className={`sidebar ${sidebarOpen ? "active" : ''}`}>
                <div className="window" style={{backgroundColor: theme.color, color: theme.inverseColor, colorScheme: theme.mode}}>
                    <header>
                        <div className="icon"></div>
                        <span className="profile-name">
                            <b>Hello, John</b>
                        </span>
                    </header>
                    <div className="items">
                        <ul>
                            <li>Trending</li>
                            <li><a href="https://www.google.com">Best Sellers</a></li>
                            <li><a href="https://www.google.com">New Releases</a></li>
                            <li><a href="https://www.google.com">Movers & Shakers</a></li>
                        </ul><hr />
                        <ul>
                            <li>Digital Content & Devices</li>
                            <li>Prime Video</li>
                            <li>Amazon Music</li>
                            <li>Echo & Alexa</li>
                            <li>Fire Tablets</li>
                            <li>Fire TV</li>
                            <li>Kindle E-readers & Books</li>
                            <li>Audible Books & Originals</li>
                            <li>Amazon Photos</li>
                            <li>Appstore for Android</li>
                            <li>AWS Courses</li>
                        </ul><hr />
                        <ul>
                            <li>Shop By Department</li>
                            <li>Clothing, Shoes, Jewelry & Watches</li>
                            <li>Amazon Fresh</li>
                            <li>Books</li>
                            <li>Movies, Music & Games</li>
                            <li>See All </li>
                        </ul><hr />
                        <ul>
                            <li>Programs & Features</li>
                            <li>Whole Foods Market</li>
                            <li>Pharmacy</li>
                            <li>Amazon Physical Stores</li>
                            <li>Subscribe & Save</li>
                            <li>See All</li>
                        </ul><hr />
                        <ul>
                            <li>Help & Settings</li>
                            <li>Your Account</li>
                            <li>🌐 English</li>
                            <li>🇺🇸 United States</li>
                            <li>Costumer Service</li>
                            <li>Sign Out</li>
                        </ul>
                    </div>
                </div>
                <div className="shade" onClick={toggleSidebar}>
                    <span className="close-sidebar-btn">&times;</span>
                </div>
            </aside>
            <nav className="navbar" style={{backgroundColor: theme.headerColor, color: theme.inverseColor}}>
                <div className="items">
                    <button className="open-sidebar-btn" onClick={toggleSidebar}>
                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon" style={{fill: theme.inverseColor, pointerEvents: "none", display: 'block', width: '100%', height: '100%'}}><g className="style-scope yt-icon"><path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z" className="style-scope yt-icon"></path></g>
                        </svg>
                    </button>
                    <button className="change-theme-btn" onClick={toggleTheme}>{theme.icon}</button>
                </div>
            </nav>
        </div>
    )
}

export default AmazonSidebar
