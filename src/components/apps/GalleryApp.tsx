import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  { id: 1, src: '/images/image1.jpg', caption: 'a precious memory 🤍' },
  { id: 2, src: '/images/image2.jpg', caption: 'look at us!! 📸' },
  { id: 3, src: '/images/image3.jpg', caption: 'good times 🌸' },
  { id: 4, src: '/images/image4.jpg', caption: 'my favorite human 💖' },
  { id: 5, src: '/images/image5.jpg', caption: 'best mommy ever ✨' },
  { id: 6, src: '/images/image6.jpg', caption: 'adventures together 🌈' },
  { id: 7, src: '/images/image7.jpg', caption: 'pure happiness 🥰' },
  { id: 8, src: '/images/image8.jpg', caption: 'making memories 💫' },
  { id: 9, src: '/images/image9.jpg', caption: 'us being us 💕' },
];

const GalleryApp = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === 0 ? photos.length - 1 : selectedPhoto - 1);
    }
  };

  const handleNext = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === photos.length - 1 ? 0 : selectedPhoto + 1);
    }
  };

  return (
    <div className="p-4 h-full overflow-auto bg-gradient-to-b from-purple-50/30 to-white">
      <p className="text-center text-sm text-muted-foreground mb-4">
        click to view photos ! 📸
      </p>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => setSelectedPhoto(index)}
            className="aspect-square rounded-xl overflow-hidden bg-muted hover:scale-[1.02] transition-transform group relative"
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
              <span className="text-white text-xs">{photo.caption}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setSelectedPhoto(null); }}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <div className="max-w-3xl max-h-[80vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[selectedPhoto].src}
              alt={photos[selectedPhoto].caption}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            <p className="text-white text-center mt-4 text-lg">
              {photos[selectedPhoto].caption}
            </p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 text-white/70 hover:text-white transition-colors"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryApp;
