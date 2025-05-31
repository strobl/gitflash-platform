
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, Users, Award } from 'lucide-react';
import { PublicInterview } from '@/hooks/usePublicInterviews';
import { Link } from 'react-router-dom';

interface InterviewCardProps {
  interview: PublicInterview;
}

export function InterviewCard({ interview }: InterviewCardProps) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} Min`;
  };

  const getDifficultyLevel = (context: string) => {
    if (context?.toLowerCase().includes('senior') || context?.toLowerCase().includes('expert')) {
      return { level: 'Schwer', color: 'bg-red-500' };
    }
    if (context?.toLowerCase().includes('junior') || context?.toLowerCase().includes('einsteiger')) {
      return { level: 'Leicht', color: 'bg-green-500' };
    }
    return { level: 'Mittel', color: 'bg-yellow-500' };
  };

  const difficulty = getDifficultyLevel(interview.conversation_context || '');

  return (
    <article className="bg-white shadow-[0px_12px_32px_rgba(0,0,0,0.08)] w-full overflow-hidden rounded-xl cursor-pointer hover:shadow-lg transition-shadow">
      <img 
        src="/lovable-uploads/01ffdd6f-bf0a-4d5f-a208-633a505b4d0f.png" 
        className="aspect-[1.8] object-cover w-full" 
        alt={interview.conversation_name} 
      />
      <div className="flex w-full flex-col items-stretch px-3 py-4">
        <h3 className="text-[#0A2540] text-xl font-bold line-clamp-1">{interview.conversation_name}</h3>
        <p className="text-[#546679] text-xs font-normal leading-[18px] mt-3 line-clamp-2">
          {interview.conversation_context || 'Bereiten Sie sich mit diesem KI-Interview auf Ihre nächste Bewerbung vor.'}
        </p>
        <div className="flex gap-2 text-[10px] font-medium whitespace-nowrap text-right leading-[1.3] mt-3">
          <div className="justify-center items-center flex flex-col overflow-hidden text-[#0A2540] bg-[#E7E9EC] px-2 py-1 rounded-[100px]">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#0A2540]" />
              <div className="text-[#0A2540] self-stretch my-auto">
                {formatDuration(interview.max_call_duration)}
              </div>
            </div>
          </div>
          <div className="justify-center items-center flex min-h-[22px] flex-col overflow-hidden text-white bg-[#0A2540] px-2 py-[5px] rounded-[100px]">
            <div className="text-white self-stretch gap-1">
              {difficulty.level}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 mt-2">
          <Link 
            to={`/uebung/${interview.id}`}
            className="text-[#0A2540] hover:text-[#546679] font-medium text-sm transition-colors underline-offset-4 hover:underline"
          >
            Details ansehen
          </Link>
          
          <Button 
            asChild 
            className="bg-[#0A2540] hover:bg-[#546679] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg text-xs"
          >
            <Link to={`/uebung/${interview.id}`}>
              <Play className="w-3 h-3 mr-1" />
              Starten
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
