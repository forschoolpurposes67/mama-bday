import { useState, useEffect } from 'react';

interface BootScreenProps {
  onBootComplete: () => void;
}

const bootMessages = [
  "mom os v1.0",
  "initializing gratitude engine...",
  "loading memories...",
  "optimizing love protocols...",
  "compiling years of hugs...",
  "system ready 🤍",
];

const BootScreen = ({ onBootComplete }: BootScreenProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentLine >= bootMessages.length) {
      const timeout = setTimeout(() => {
        onBootComplete();
      }, 1000);
      return () => clearTimeout(timeout);
    }

    const message = bootMessages[currentLine];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= message.length) {
        setCurrentText(message.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentLine(prev => prev + 1);
          setCurrentText('');
          setProgress(((currentLine + 1) / bootMessages.length) * 100);
        }, 400);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentLine, onBootComplete]);

  return (
    <div className="fixed inset-0 boot-screen flex flex-col items-center justify-center z-50">
      <div className="max-w-lg w-full px-8">
        {/* Completed lines */}
        <div className="space-y-2 mb-4">
          {bootMessages.slice(0, currentLine).map((msg, idx) => (
            <p 
              key={idx} 
              className="font-mono text-sm md:text-base animate-text-fade"
              style={{ color: 'hsl(150 60% 70%)' }}
            >
              {msg}
            </p>
          ))}
        </div>

        {/* Current typing line */}
        {currentLine < bootMessages.length && (
          <p className="font-mono text-sm md:text-base" style={{ color: 'hsl(150 60% 70%)' }}>
            {currentText}
            <span className={`typewriter-cursor ${showCursor ? 'opacity-100' : 'opacity-0'}`}>▋</span>
          </p>
        )}

        {/* Progress bar */}
        <div className="mt-8 w-full h-1 rounded-full overflow-hidden" style={{ background: 'hsl(150 30% 20%)' }}>
          <div 
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${progress}%`,
              background: 'hsl(150 60% 70%)'
            }}
          />
        </div>

        <p className="font-mono text-xs mt-3 opacity-50" style={{ color: 'hsl(150 60% 70%)' }}>
          coded with love by your wonderful daughter 🤍
        </p>
      </div>
    </div>
  );
};

export default BootScreen;
