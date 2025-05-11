
import React, { useState } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';

export type DateRange = {
  from: Date;
  to: Date;
};

export type TimeRangeOption = 'last30days' | 'quarter' | 'fiscalYear' | 'custom';

interface TimeRangePickerProps {
  onChange: (range: DateRange) => void;
  currentRange?: DateRange;
}

export const TimeRangePicker: React.FC<TimeRangePickerProps> = ({ 
  onChange, 
  currentRange 
}) => {
  const [selectedOption, setSelectedOption] = useState<TimeRangeOption>('last30days');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>(
    currentRange || {
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date()
    }
  );

  const handleOptionChange = (value: TimeRangeOption) => {
    setSelectedOption(value);
    
    let newRange: DateRange;
    const today = new Date();
    
    switch (value) {
      case 'last30days':
        newRange = {
          from: new Date(today.setDate(today.getDate() - 30)),
          to: new Date()
        };
        break;
      case 'quarter':
        // Current quarter
        const currentMonth = today.getMonth();
        const quarterFirstMonth = Math.floor(currentMonth / 3) * 3;
        newRange = {
          from: new Date(today.getFullYear(), quarterFirstMonth, 1),
          to: new Date()
        };
        break;
      case 'fiscalYear':
        newRange = {
          from: new Date(today.getFullYear(), 0, 1), // January 1st of current year
          to: new Date()
        };
        break;
      case 'custom':
        // For custom, don't change the range yet, wait for user selection
        setIsCalendarOpen(true);
        return;
      default:
        newRange = dateRange;
    }
    
    setDateRange(newRange);
    onChange(newRange);
  };

  const formatDateRange = (range: DateRange): string => {
    return `${format(range.from, 'd. MMMM', { locale: de })} – ${format(range.to, 'd. MMMM', { locale: de })}`;
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        value={selectedOption}
        onValueChange={(value) => handleOptionChange(value as TimeRangeOption)}
      >
        <SelectTrigger className="h-9 w-[180px] bg-white border border-gray-200 rounded-lg">
          <SelectValue placeholder="Zeitraum wählen" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="last30days">Letzte 30 Tage</SelectItem>
          <SelectItem value="quarter">Quartal</SelectItem>
          <SelectItem value="fiscalYear">Geschäftsjahr</SelectItem>
          <SelectItem value="custom">Benutzerdefiniert</SelectItem>
        </SelectContent>
      </Select>

      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-9 bg-white border border-gray-200 rounded-lg"
            onClick={() => {
              if (selectedOption !== 'custom') {
                setSelectedOption('custom');
              }
              setIsCalendarOpen(true);
            }}
          >
            <CalendarIcon className="h-4 w-4" />
            <span>{formatDateRange(dateRange)}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={dateRange.from}
            selected={{
              from: dateRange.from,
              to: dateRange.to,
            }}
            onSelect={(range) => {
              if (range?.from && range?.to) {
                const newRange = { from: range.from, to: range.to };
                setDateRange(newRange);
                onChange(newRange);
                setIsCalendarOpen(false);
              }
            }}
            numberOfMonths={2}
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
