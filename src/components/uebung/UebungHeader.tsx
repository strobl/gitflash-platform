
import React from "react";
import { Badge } from "@/components/ui/badge";

interface UebungHeaderProps {
  title: string;
  category: {
    name: string;
    color: string;
  };
}

export const UebungHeader: React.FC<UebungHeaderProps> = ({ title, category }) => {
  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-gitflash-primary mb-4">
        {title}
      </h1>
      <div className="flex items-center gap-2">
        <Badge 
          className={`bg-${category.color}-100 text-${category.color}-800 hover:bg-${category.color}-100`}
        >
          {category.name}
        </Badge>
        <span className="text-sm text-gray-500">Letztes Update: 3 Tage zuvor</span>
      </div>
    </div>
  );
};
