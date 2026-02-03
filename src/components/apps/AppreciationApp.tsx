import { useState } from 'react';
import { Heart, Star, Sparkles, Sun, Coffee, Home } from 'lucide-react';

const appreciations = [
  {
    icon: <Heart className="w-5 h-5" />,
    title: "your unconditional love",
    detail: "no matter what happens, you're always there with open arms. that kind of love is rare and i never take it for granted 🤍"
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: "believing in me",
    detail: "even when i doubt myself, you never do. you see the best in me and push me to be better every day ⭐"
  },
  {
    icon: <Coffee className="w-5 h-5" />,
    title: "the little things",
    detail: "the morning coffee, the random snacks, checking if i've eaten... these small acts of love mean the world to me ☕"
  },
  {
    icon: <Sun className="w-5 h-5" />,
    title: "your strength",
    detail: "watching you handle everything with grace inspires me. you're the strongest person i know 🌟"
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "your patience",
    detail: "thank you for being patient with me through my moody days, my stubborn moments, and my endless questions 💫"
  },
  {
    icon: <Home className="w-5 h-5" />,
    title: "being my safe space",
    detail: "home isn't a place, it's wherever you are. you make everything feel okay just by being there 🏠"
  }
];

const AppreciationApp = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="p-4 h-full overflow-auto bg-gradient-to-b from-amber-50/30 to-white">
      <p className="text-center text-sm text-muted-foreground mb-4">
        things i appreciate about you 💖
      </p>

      <div className="space-y-3 max-w-md mx-auto">
        {appreciations.map((item, index) => (
          <button
            key={index}
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
              expandedIndex === index 
                ? 'bg-primary/10 shadow-md' 
                : 'bg-white hover:bg-primary/5 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg transition-colors ${
                expandedIndex === index ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
              }`}>
                {item.icon}
              </div>
              <span className="font-medium text-foreground/80">{item.title}</span>
            </div>
            
            {expandedIndex === index && (
              <p className="mt-3 text-sm text-muted-foreground pl-12 animate-fade-in">
                {item.detail}
              </p>
            )}
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6">
        click each one to see more 🤍
      </p>
    </div>
  );
};

export default AppreciationApp;
