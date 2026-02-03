import { ReactNode, useState, useRef, useEffect } from 'react';
import { X, Minus } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  initialPosition?: { x: number; y: number };
  size?: { width: string; height: string };
}

const Window = ({ 
  id, 
  title, 
  children, 
  onClose, 
  onFocus, 
  zIndex,
  initialPosition = { x: 100, y: 80 },
  size = { width: '500px', height: '400px' }
}: WindowProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    
    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 100, e.clientX - dragOffset.x)),
        y: Math.max(0, Math.min(window.innerHeight - 50, e.clientY - dragOffset.y))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={windowRef}
      className="os-window fixed rounded-2xl overflow-hidden animate-window-open"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
        maxWidth: 'calc(100vw - 32px)',
        maxHeight: 'calc(100vh - 100px)',
      }}
      onMouseDown={onFocus}
    >
      {/* Window Header */}
      <div 
        className="window-header h-12 flex items-center justify-between px-4 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="w-3.5 h-3.5 rounded-full bg-trafficlight-close hover:bg-trafficlight-close-hover transition-colors flex items-center justify-center group"
          >
            <X className="w-2 h-2 text-trafficlight-close-icon opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button className="w-3.5 h-3.5 rounded-full bg-trafficlight-minimize hover:bg-trafficlight-minimize-hover transition-colors flex items-center justify-center group">
            <Minus className="w-2 h-2 text-trafficlight-minimize-icon opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <div className="w-3.5 h-3.5 rounded-full bg-trafficlight-maximize" />
        </div>
        
        <span className="text-sm font-medium text-foreground/70 absolute left-1/2 -translate-x-1/2">
          {title}
        </span>
        
        <div className="w-16" />
      </div>

      {/* Window Content */}
      <div className="overflow-auto" style={{ height: 'calc(100% - 48px)' }}>
        {children}
      </div>
    </div>
  );
};

export default Window;
