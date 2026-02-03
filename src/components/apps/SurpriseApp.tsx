import { useState, useEffect } from 'react';
import { PartyPopper } from 'lucide-react';

const confettiColors = [
  'hsl(340 80% 65%)', // pink
  'hsl(270 70% 70%)', // purple
  'hsl(200 80% 60%)', // blue
  'hsl(45 90% 60%)',  // yellow
  'hsl(150 70% 55%)', // green
  'hsl(20 90% 65%)',  // orange
];

const Confetti = () => {
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    size: Math.random() * 8 + 4,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece absolute"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
};

const SurpriseApp = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  useEffect(() => {
    // Stop confetti after 4 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-pink-100/50 via-purple-50/30 to-white text-center relative overflow-hidden">
      {showConfetti && <Confetti />}

      <div className="animate-window-open">
        <div className="mb-6 animate-float">
          <PartyPopper className="w-16 h-16 text-primary mx-auto" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          happy birthday, mom! 🎂
        </h1>

        <p className="text-lg text-muted-foreground mb-8 max-w-sm">
          you're the best thing that ever happened to me. here's to another amazing year! 🥳
        </p>

        {!showFinalMessage ? (
          <button
            onClick={() => setShowFinalMessage(true)}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg"
          >
            one last thing... 💝
          </button>
        ) : (
          <div className="animate-fade-in bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-sm">
            <p className="text-foreground/80 leading-relaxed">
              i just want you to know that no matter how old i get, i'll always be your little girl. 
              you're my first best friend and my forever home. 
              <br /><br />
              i love you to the moon and back, mom. 
              <br />
              <span className="text-primary font-medium">forever and always 🤍</span>
            </p>
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 left-4 text-4xl opacity-20">🎈</div>
      <div className="absolute top-8 right-8 text-3xl opacity-20">🎁</div>
      <div className="absolute bottom-8 left-8 text-3xl opacity-20">🌸</div>
      <div className="absolute bottom-4 right-4 text-4xl opacity-20">💖</div>
    </div>
  );
};

export default SurpriseApp;
