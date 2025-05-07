
import React, { useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Building2, 
  HardHat, 
  Home, 
  Banknote, 
  Scale,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

const categories: Category[] = [
  { id: "all", name: "Alle", icon: <Users size={20} /> },
  { id: "architecture", name: "Architektur", icon: <Building2 size={20} /> },
  { id: "engineering", name: "Ingenieur", icon: <HardHat size={20} /> },
  { id: "management", name: "Projektmanager", icon: <Home size={20} /> },
  { id: "finance", name: "Finanzen", icon: <Banknote size={20} /> },
  { id: "law", name: "Recht", icon: <Scale size={20} /> },
];

interface UebungCategoryNavProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const UebungCategoryNav: React.FC<UebungCategoryNavProps> = ({
  activeCategory,
  setActiveCategory
}) => {
  const isMobile = useIsMobile();
  const navRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll positioning when active category changes
  useEffect(() => {
    if (navRef.current && isMobile) {
      const activeItem = navRef.current.querySelector('[data-active="true"]');
      if (activeItem) {
        const containerWidth = navRef.current.offsetWidth;
        const itemLeft = (activeItem as HTMLElement).offsetLeft;
        const itemWidth = (activeItem as HTMLElement).offsetWidth;
        
        // Center the active item
        navRef.current.scrollLeft = itemLeft - (containerWidth / 2) + (itemWidth / 2);
      }
    }
  }, [activeCategory, isMobile]);

  return (
    <nav 
      className={cn(
        "mb-6",
        isMobile ? "overflow-x-auto scrollbar-hide" : "overflow-visible"
      )}
      ref={navRef}
    >
      <div className="bg-[#F5F6F7] rounded-lg p-2 min-w-full">
        <div className={cn(
          "flex",
          isMobile ? "gap-3 min-w-max" : "justify-evenly"
        )}>
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            
            return (
              <div
                key={category.id}
                data-active={isActive}
                className={cn(
                  "min-w-[70px] relative py-2 px-3 rounded-md cursor-pointer transition-all duration-300",
                  isActive 
                    ? "text-white bg-gradient-to-br from-[#0A2540] to-[#3B5166] shadow-sm" 
                    : "text-[#3B5166] hover:bg-[#E7E9EC] transition-colors"
                )}
                onClick={() => setActiveCategory(category.id)}
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className={cn(
                    "flex items-center justify-center transition-transform duration-300",
                    isActive ? "text-white transform scale-110" : "text-[#546679]"
                  )}>
                    {category.icon}
                  </div>
                  <span className={cn(
                    "text-xs font-medium whitespace-nowrap transition-all duration-300",
                    isActive ? "text-white" : "text-[#3B5166]"
                  )}>
                    {category.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
