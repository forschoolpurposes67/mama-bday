import { useState, useEffect } from 'react';

const letterContent = `dear mommy,

happy birthday to the most amazing mom in the entire universe 🌸

i know i don't say it enough, but you mean everything to me. every little thing you do — from the way you make sure i've eaten, to the way you worry about me even when i tell you not to — it all means so much more than words could ever express.

thank you for being my biggest supporter, my comfort zone, and my home. thank you for the late-night talks, the warm hugs, and for always believing in me even when i didn't believe in myself.

you've taught me what it means to love unconditionally, to be strong in the face of challenges, and to always find joy in the little things. i hope this little "operating system" brings a smile to your face 💖

i love you more than all the stars in the sky, all the grains of sand on the beach, and all the coffee you've ever made me drink (that's a lot btw).

here's to another year of being the coolest mom ever!

with all my love and a million hugs,
your wonderful daughter 🤍`;

const LettersApp = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < letterContent.length) {
        setDisplayedText(letterContent.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, []);

  const handleReadAgain = () => {
    setDisplayedText('');
    setIsComplete(false);
    let index = 0;
    const timer = setInterval(() => {
      if (index < letterContent.length) {
        setDisplayedText(letterContent.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, 20);
  };

  return (
    <div className="p-6 h-full overflow-auto bg-gradient-to-b from-pink-50/50 to-white">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-pink-100">
          <pre className="font-quicksand text-sm md:text-base leading-relaxed whitespace-pre-wrap text-foreground/80">
            {displayedText}
            {!isComplete && <span className="typewriter-cursor text-primary">|</span>}
          </pre>
        </div>

        {isComplete && (
          <button
            onClick={handleReadAgain}
            className="mt-4 w-full py-2 px-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
          >
            read again 💌
          </button>
        )}
      </div>
    </div>
  );
};

export default LettersApp;
