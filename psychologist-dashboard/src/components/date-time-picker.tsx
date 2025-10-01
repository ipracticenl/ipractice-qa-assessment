import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function DateTimePicker24h({
  value,
  onChange,
  testId,
  ariaLabel,
}: {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  testId?: string;
  ariaLabel?: string;
}) {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [isOpen, setIsOpen] = React.useState(false);

  // Sync internal state with external value prop
  React.useEffect(() => {
    setDate(value);
  }, [value]);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      if (date) {
        newDate.setHours(date.getHours());
        newDate.setMinutes(date.getMinutes());
      }
      setDate(newDate);
      onChange(newDate);
    }
  };

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    if (date) {
      const newDate = new Date(date);
      if (type === "hour") {
        newDate.setHours(Number.parseInt(value));
      } else if (type === "minute") {
        newDate.setMinutes(Number.parseInt(value));
      }
      setDate(newDate);
      onChange(newDate);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal min-h-[44px] touch-manipulation",
            !date && "text-muted-foreground"
          )}
          aria-label={ariaLabel || "Select date and time"}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          data-testid={testId}
        >
          <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="truncate">
            {date ? format(date, "MM/dd/yyyy HH:mm") : "MM/DD/YYYY HH:mm"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align="start"
        data-testid="date-time-picker-content"
      >
        <div className="flex flex-col sm:flex-row">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            className="border-b sm:border-b-0 sm:border-r"
          />
          <div className="flex flex-row sm:flex-col sm:h-[300px] divide-x sm:divide-x-0 sm:divide-y">
            <ScrollArea className="w-full sm:w-auto">
              <div className="flex sm:flex-col p-2 gap-1">
                <div className="sr-only" id="hour-label">
                  Select hour
                </div>
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    size="sm"
                    variant={
                      date && date.getHours() === hour ? "default" : "ghost"
                    }
                    className="min-w-[44px] min-h-[44px] flex-shrink-0 touch-manipulation"
                    onClick={() => handleTimeChange("hour", hour.toString())}
                    aria-label={`${hour} hours`}
                    aria-describedby="hour-label"
                    data-testid={`hour-${hour}`}
                  >
                    {hour.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-full sm:w-auto">
              <div className="flex sm:flex-col p-2 gap-1">
                <div className="sr-only" id="minute-label">
                  Select minutes
                </div>
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    key={minute}
                    size="sm"
                    variant={
                      date && date.getMinutes() === minute ? "default" : "ghost"
                    }
                    className="min-w-[44px] min-h-[44px] flex-shrink-0 touch-manipulation"
                    onClick={() =>
                      handleTimeChange("minute", minute.toString())
                    }
                    aria-label={`${minute} minutes`}
                    aria-describedby="minute-label"
                    data-testid={`minute-${minute}`}
                  >
                    {minute.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
