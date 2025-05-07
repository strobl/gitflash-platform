
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { listPublicInterviews } from '@/services/tavusService';
import { Header } from '@/components/landing/Header';
import KIInterviews from '@/components/interviews/design/KIInterviews';

// Interface for interviews with categories
interface Interview {
  id: string;
  conversation_name: string;
  conversation_context?: string;
  created_at: string;
  status: string;
  category: string;
  image?: string;
  duration?: string;
  difficulty?: string;
}

// Helper function to determine category based on interview name/context
const getCategoryForInterview = (interview: any): string => {
  const name = interview.conversation_name.toLowerCase();
  const context = interview.conversation_context?.toLowerCase() || '';
  
  if (name.includes('architekt') || context.includes('architekt')) return 'architecture';
  if (name.includes('recht') || context.includes('recht') || name.includes('anwalt') || context.includes('anwalt')) return 'law';
  if (name.includes('ingenieur') || context.includes('ingenieur') || name.includes('bau') || context.includes('statik')) return 'engineering';
  if (name.includes('projekt') || context.includes('projekt') || name.includes('manage')) return 'management';
  
  return 'general';
};

// Helper to determine difficulty
const getDifficultyLevel = (interview: any): string => {
  const name = interview.conversation_name.toLowerCase();
  const context = interview.conversation_context?.toLowerCase() || '';
  
  if (name.includes('fortgeschritten') || context.includes('fortgeschritten') || 
      name.includes('schwer') || context.includes('schwer')) {
    return 'Schwer';
  }
  
  if (name.includes('mittel') || context.includes('mittel')) {
    return 'Mittel';
  }
  
  return 'Einfach';
};

// Sample images for interviews
const CATEGORY_IMAGES = {
  architecture: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/2dd467d586601d48080d5df03accad71b21462ff?placeholderIfAbsent=true",
  law: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/76b47a2cddc417d0e75ce89c86396f2a20acb549?placeholderIfAbsent=true",
  engineering: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/2dd467d586601d48080d5df03accad71b21462ff?placeholderIfAbsent=true",
  management: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/76b47a2cddc417d0e75ce89c86396f2a20acb549?placeholderIfAbsent=true",
  general: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/2dd467d586601d48080d5df03accad71b21462ff?placeholderIfAbsent=true"
};

export default function InterviewsDesign() {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInterviews();
  }, []);

  async function fetchInterviews() {
    setIsLoading(true);
    try {
      const data = await listPublicInterviews();
      
      // Enhance interviews with additional properties
      const enhancedInterviews = data.map((interview: any) => {
        const category = getCategoryForInterview(interview);
        return {
          ...interview,
          category,
          image: CATEGORY_IMAGES[category] || CATEGORY_IMAGES.general,
          duration: `${Math.floor(Math.random() * 15) + 10}m`, // Random duration between 10-25m for demo
          difficulty: getDifficultyLevel(interview)
        };
      });
      
      setInterviews(enhancedInterviews);
    } catch (error) {
      console.error('Error fetching interviews:', error);
      setError('Failed to load interviews');
      toast.error('Fehler beim Laden der Interviews');
    } finally {
      setIsLoading(false);
    }
  }

  const handleInterviewSelect = (id: string) => {
    // Use window.location for a direct navigation instead of React Router
    console.log(`Directly navigating to /uebung/${id}`);
    window.location.href = `/uebung/${id}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <KIInterviews 
        interviews={interviews}
        isLoading={isLoading}
        error={error}
        onInterviewSelect={handleInterviewSelect}
      />
    </div>
  );
}
