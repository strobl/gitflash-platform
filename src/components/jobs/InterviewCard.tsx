
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, Users, Award } from 'lucide-react';
import { Interview } from '@/hooks/useInterviews';
import { Link } from 'react-router-dom';

interface InterviewCardProps {
  interview: Interview;
}

export function InterviewCard({ interview }: InterviewCardProps) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} Min`;
  };

  const getDifficultyLevel = (context: string) => {
    if (context.toLowerCase().includes('senior') || context.toLowerCase().includes('expert')) {
      return { level: 'Schwer', color: 'bg-red-500' };
    }
    if (context.toLowerCase().includes('junior') || context.toLowerCase().includes('einsteiger')) {
      return { level: 'Leicht', color: 'bg-green-500' };
    }
    return { level: 'Mittel', color: 'bg-yellow-500' };
  };

  const difficulty = getDifficultyLevel(interview.conversation_context || '');

  return (
    <Card className="group relative overflow-hidden bg-white hover:bg-gradient-to-br hover:from-white hover:to-slate-50 border-0 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gitflash-primary via-gitflash-accent to-gitflash-secondary"></div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gitflash-primary group-hover:text-gitflash-accent transition-colors line-clamp-2 leading-tight">
          {interview.conversation_name}
        </CardTitle>
        
        <div className="flex items-center gap-2 mt-3">
          <Badge variant="secondary" className="bg-gitflash-light text-gitflash-primary text-xs">
            <Award className="w-3 h-3 mr-1" />
            KI-Interview
          </Badge>
          <div className="flex items-center text-xs text-gitflash-secondary">
            <Clock className="w-3 h-3 mr-1 text-gitflash-accent" />
            <span>{formatDuration(interview.max_call_duration)}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gitflash-text leading-relaxed line-clamp-3 text-sm">
          {interview.conversation_context || 'Bereiten Sie sich mit diesem KI-Interview auf Ihre nächste Bewerbung vor.'}
        </p>
        
        <div className="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-gitflash-background to-slate-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className={`w-2 h-2 ${difficulty.color} rounded-full`}></div>
            <span className="text-sm font-medium text-gitflash-text">{difficulty.level}</span>
          </div>
          
          <div className="flex items-center text-sm text-gitflash-secondary">
            <Users className="w-4 h-4 mr-1.5 text-gitflash-accent" />
            <span className="font-medium">Baubranche</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <Link 
            to={`/uebung/${interview.id}`}
            className="text-gitflash-accent hover:text-gitflash-primary font-medium text-sm transition-colors underline-offset-4 hover:underline"
          >
            Details ansehen
          </Link>
          
          <Button 
            asChild 
            className="bg-gradient-to-r from-gitflash-primary to-gitflash-secondary hover:from-gitflash-secondary hover:to-gitflash-primary text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Link to={`/uebung/${interview.id}`}>
              <Play className="w-4 h-4 mr-2" />
              Starten
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
