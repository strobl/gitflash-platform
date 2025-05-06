
import React from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const DesignNavbar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate("/login");
  };

  const handleMenuClick = () => {
    // In a real implementation, this would toggle a side menu
    console.log("Menu clicked");
  };
  
  return (
    <div className="flex justify-between items-center border-b border-[#E7E9EC] w-full bg-white px-4 sm:px-6 py-3">
      <div className="flex items-center gap-2 text-[#0A2540]">
        <div className="bg-gradient-to-br from-[#0A2540] to-[#3B5166] p-1.5 rounded-md flex items-center justify-center">
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path d="M8 0L10 4L14 5L11 8.5L12 13L8 11L4 13L5 8.5L2 5L6 4L8 0Z" fill="currentColor"/>
          </svg>
        </div>
        <div className={cn(
          "font-semibold my-auto",
          isMobile ? "text-sm" : "text-base"
        )}>
          KI Interviews by gitflash.com
        </div>
      </div>
      <div className="flex items-center gap-2">
        {!isMobile && (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-[#3B5166] border-[#E7E9EC] hover:bg-[#F5F6F7] hover:text-[#0A2540]"
            onClick={handleMenuClick}
          >
            <Menu size={16} className="mr-1" />
            Menu
          </Button>
        )}
        <Button 
          size={isMobile ? "sm" : "default"} 
          className="bg-gradient-to-br from-[#0A2540] to-[#3B5166] text-white hover:from-[#0A2540] hover:to-[#546679] transition-all duration-300"
          onClick={handleLogin}
        >
          <User size={isMobile ? 14 : 16} className="mr-1" />
          {isMobile ? "Login" : (isAuthenticated ? "Dashboard" : "Anmelden")}
        </Button>
      </div>
    </div>
  );
};
