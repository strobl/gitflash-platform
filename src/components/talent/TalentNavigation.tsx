
import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, User, Video, Search, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface TalentNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TalentNavigation: React.FC<TalentNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const navigationItems = [
    {
      id: "startseite",
      label: "Startseite",
      icon: <Home className="h-5 w-5" />,
      href: "/talent/startseite",
    },
    {
      id: "profil",
      label: "Mein Profil",
      icon: <User className="h-5 w-5" />,
      href: "/talent/profil",
    },
    {
      id: "interview",
      label: "Interviews",
      icon: <Video className="h-5 w-5" />,
      href: "/talent/interview",
    },
    {
      id: "erkunden",
      label: "Erkunden",
      icon: <Search className="h-5 w-5" />,
      href: "/talent/erkunden",
    },
    {
      id: "zahlungen",
      label: "Zahlungen",
      icon: <CreditCard className="h-5 w-5" />,
      href: "/talent/zahlungen",
    },
  ];

  const handleNavigation = (tabId: string, href: string) => {
    // Update the state first
    onTabChange(tabId);
    // Then navigate to the appropriate route
    navigate(href);
  };

  // Mobile Bottom Navigation
  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t">
        <div className="flex justify-around">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id, item.href)}
              className={cn(
                "flex flex-col items-center py-3 px-4",
                activeTab === item.id
                  ? "text-gitflash-primary"
                  : "text-gray-400"
              )}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    );
  }

  // Desktop Sidebar Navigation
  return (
    <div className="hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r w-16 lg:w-64">
      <div className="flex flex-col p-3">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.id, item.href)}
            className={cn(
              "flex items-center gap-3 px-3 py-3 rounded-md transition-colors",
              activeTab === item.id
                ? "bg-gitflash-primary/10 text-gitflash-primary"
                : "hover:bg-gray-100 text-gray-600"
            )}
          >
            {item.icon}
            <span className="hidden lg:inline-block">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
