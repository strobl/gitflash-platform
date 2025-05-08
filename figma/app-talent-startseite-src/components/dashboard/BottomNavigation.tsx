
import React, { useState } from "react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}

const BottomNavigation: React.FC = () => {
  const [activeItem, setActiveItem] = useState("home");

  const navItems: NavItem[] = [
    {
      id: "home",
      label: "Startseite",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 21V9L12 3L20 9V21H14V14H10V21H4Z" stroke="#6C7C8C" strokeWidth="2" />
        </svg>
      ),
      activeIcon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 21V9L12 3L20 9V21H14V14H10V21H4Z" fill="#0A2540" stroke="#0A2540" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: "resume",
      label: "Lebenslauf",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 3V7H18M14 3H6V21H18V7L14 3Z" stroke="#6C7C8C" strokeWidth="2" />
        </svg>
      ),
      activeIcon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 3V7H18M14 3H6V21H18V7L14 3Z" stroke="#0A2540" strokeWidth="2" fill="#0A2540" fillOpacity="0.1" />
        </svg>
      ),
    },
    {
      id: "interview",
      label: "Interview",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H20C20.5304 3 21.0391 3.21071 21.4142 3.58579C21.7893 3.96086 22 4.46957 22 5V19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H16M8 21V17C8 16.4696 8.21071 15.9609 8.58579 15.5858C8.96086 15.2107 9.46957 15 10 15H14C14.5304 15 15.0391 15.2107 15.4142 15.5858C15.7893 15.9609 16 16.4696 16 17V21M8 21H16M12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 10.1046 13.1046 11 12 11Z" stroke="#6C7C8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      activeIcon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H20C20.5304 3 21.0391 3.21071 21.4142 3.58579C21.7893 3.96086 22 4.46957 22 5V19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H16M8 21V17C8 16.4696 8.21071 15.9609 8.58579 15.5858C8.96086 15.2107 9.46957 15 10 15H14C14.5304 15 15.0391 15.2107 15.4142 15.5858C15.7893 15.9609 16 16.4696 16 17V21M8 21H16M12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 10.1046 13.1046 11 12 11Z" stroke="#0A2540" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#0A2540" fillOpacity="0.1"/>
        </svg>
      ),
    },
    {
      id: "payments",
      label: "Zahlungen",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9H21M7 15H9M15 15H17M5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5Z" stroke="#6C7C8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      activeIcon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9H21M7 15H9M15 15H17M5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5Z" stroke="#0A2540" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#0A2540" fillOpacity="0.1"/>
        </svg>
      ),
    },
    {
      id: "explore",
      label: "Erkunden",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#6C7C8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      activeIcon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#0A2540" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#0A2540" fillOpacity="0.1"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed w-full bg-white shadow-[0px_-2px_8px_0px_rgba(0,0,0,0.1)] bottom-0 border-t border-[#E7E9EC]">
      <div className="flex justify-between px-6 py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            className="flex flex-col items-center gap-1"
            onClick={() => setActiveItem(item.id)}
          >
            <div>
              {activeItem === item.id ? item.activeIcon : item.icon}
            </div>
            <div
              className={`text-center text-[10px] ${
                activeItem === item.id ? "text-[#0A2540] font-medium" : "text-[#6C7C8C]"
              }`}
            >
              {item.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
