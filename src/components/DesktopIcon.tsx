import { ReactNode } from 'react';

interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  delay?: number;
}

const DesktopIcon = ({ icon, label, onClick, delay = 0 }: DesktopIconProps) => {
  return (
    <button
      onClick={onClick}
      className="desktop-icon flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all group"
      style={{ 
        animationDelay: `${delay}ms`,
        animation: 'window-open 0.4s ease-out forwards',
        opacity: 0 
      }}
    >
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-3xl md:text-4xl group-hover:shadow-xl transition-shadow">
        {icon}
      </div>
      <span className="text-xs md:text-sm font-medium text-foreground/80 max-w-[80px] text-center leading-tight">
        {label}
      </span>
    </button>
  );
};

export default DesktopIcon;
