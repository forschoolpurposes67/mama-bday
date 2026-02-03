import { useState, useEffect } from 'react';

const Taskbar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).toLowerCase();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).toLowerCase();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-white/80 backdrop-blur-md border-t border-border/50 flex items-center justify-between px-4 z-40">
      <div className="flex items-center gap-2">
        <span className="text-lg">🤍</span>
        <span className="text-sm font-medium text-foreground/70">mom os</span>
      </div>

      <div className="text-right">
        <p className="text-sm font-medium text-foreground/80">{formatTime(time)}</p>
        <p className="text-xs text-muted-foreground">{formatDate(time)}</p>
      </div>
    </div>
  );
};

export default Taskbar;
