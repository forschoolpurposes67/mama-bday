import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  cover: string;
  audio: string;
  message: string;
  duration: string;
}

const playlist: Track[] = [
  {
    id: 1,
    title: "Multo",
    artist: "Cup of Joe",
    cover: "/images/music1.jpg",
    audio: "/music1.mp4",
    message: "this reminded me when i was blasting music in my room and you told me you knew this song ^^",
    duration: "4:23"
  },
  {
    id: 2,
    title: "Ethereal",
    artist: "Txmy",
    cover: "/images/music2.jpg",
    audio: "/music2.mp4",
    message: "this song is dreamy and calm just like you 👀👀",
    duration: "3:45"
  },
  {
    id: 3,
    title: "Piano Concerto No. 2 in C Minor, Op. 18: II. Adagio sostenuto",
    artist: "Sergei Rachmaninoff",
    cover: "/images/music3.jpg",
    audio: "/music3.mp4",
    message: "the peak of the piece just makes me think of the emotions and nostalgia we've been through 🤍",
    duration: "12:34"
  }
];

const PlaylistApp = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    if (!currentTrack) return;
    const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    setCurrentTrack(playlist[prevIndex]);
    setProgress(0);
  };

  const handleNext = () => {
    if (!currentTrack) return;
    const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
    const nextIndex = currentIndex === playlist.length - 1 ? 0 : currentIndex + 1;
    setCurrentTrack(playlist[nextIndex]);
    setProgress(0);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-zinc-900 to-black text-white">
      {/* Header */}
      <div className="p-4 pb-2">
        <p className="text-sm text-zinc-400 text-center">songs that remind me of you 🎵</p>
      </div>

      {/* Track List */}
      <div className="flex-1 overflow-auto px-4 pb-32">
        {playlist.map((track, index) => (
          <button
            key={track.id}
            onClick={() => handlePlayTrack(track)}
            className={`w-full p-3 rounded-lg mb-2 flex items-center gap-3 transition-colors text-left ${
              currentTrack?.id === track.id 
                ? 'bg-white/10' 
                : 'hover:bg-white/5'
            }`}
          >
            <img 
              src={track.cover} 
              alt={track.title}
              className="w-12 h-12 rounded-md object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className={`font-medium text-sm truncate ${
                currentTrack?.id === track.id ? 'text-green-400' : 'text-white'
              }`}>
                {track.title}
              </p>
              <p className="text-xs text-zinc-400 truncate">{track.artist}</p>
            </div>
            <span className="text-xs text-zinc-500">{track.duration}</span>
          </button>
        ))}
      </div>

      {/* Now Playing Bar (Spotify-style) */}
      {currentTrack && (
        <div className="absolute bottom-0 left-0 right-0 player-gradient border-t border-white/10">
          {/* Message */}
          <div className="px-4 py-2 bg-white/5">
            <p className="text-xs text-zinc-400 italic text-center">
              "{currentTrack.message}"
            </p>
          </div>

          {/* Player Controls */}
          <div className="px-4 py-3">
            {/* Track Info */}
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="w-14 h-14 rounded-md object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-white truncate">{currentTrack.title}</p>
                <p className="text-xs text-zinc-400">{currentTrack.artist}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-zinc-500 w-8">0:00</span>
              <div className="flex-1 h-1 bg-zinc-600 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-zinc-500 w-12 text-right">{currentTrack.duration}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
              <button 
                onClick={handlePrev}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              
              <button 
                onClick={handlePlayPause}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-black" />
                ) : (
                  <Play className="w-5 h-5 text-black ml-0.5" />
                )}
              </button>
              
              <button 
                onClick={handleNext}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistApp;
