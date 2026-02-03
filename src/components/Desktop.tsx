import { useState, useCallback } from 'react';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import Taskbar from './Taskbar';
import LettersApp from './apps/LettersApp';
import GalleryApp from './apps/GalleryApp';
import PlaylistApp from './apps/PlaylistApp';
import AppreciationApp from './apps/AppreciationApp';
import SurpriseApp from './apps/SurpriseApp';

interface AppWindow {
  id: string;
  title: string;
  component: React.ReactNode;
  position: { x: number; y: number };
  size: { width: string; height: string };
}

const apps = [
  { 
    id: 'letters', 
    icon: '💌', 
    label: 'letters.app',
    title: 'letters',
    size: { width: '420px', height: '500px' }
  },
  { 
    id: 'gallery', 
    icon: '📸', 
    label: 'gallery.app',
    title: 'gallery',
    size: { width: '500px', height: '450px' }
  },
  { 
    id: 'playlist', 
    icon: '🎵', 
    label: 'playlist.app',
    title: 'playlist',
    size: { width: '380px', height: '520px' }
  },
  { 
    id: 'appreciation', 
    icon: '⭐', 
    label: 'appreciation.app',
    title: 'appreciation',
    size: { width: '400px', height: '480px' }
  },
  { 
    id: 'surprise', 
    icon: '🎉', 
    label: 'surprise.app',
    title: 'surprise!',
    size: { width: '420px', height: '450px' }
  },
];

const getAppComponent = (id: string) => {
  switch (id) {
    case 'letters': return <LettersApp />;
    case 'gallery': return <GalleryApp />;
    case 'playlist': return <PlaylistApp />;
    case 'appreciation': return <AppreciationApp />;
    case 'surprise': return <SurpriseApp />;
    default: return null;
  }
};

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState<AppWindow[]>([]);
  const [windowOrder, setWindowOrder] = useState<string[]>([]);

  const openApp = useCallback((appId: string) => {
    const existingWindow = openWindows.find(w => w.id === appId);
    if (existingWindow) {
      // Bring to front
      setWindowOrder(prev => [...prev.filter(id => id !== appId), appId]);
      return;
    }

    const app = apps.find(a => a.id === appId);
    if (!app) return;

    // Calculate position with offset for each new window
    const offset = openWindows.length * 30;
    const position = {
      x: 80 + offset,
      y: 60 + offset
    };

    const newWindow: AppWindow = {
      id: app.id,
      title: app.title,
      component: getAppComponent(app.id),
      position,
      size: app.size
    };

    setOpenWindows(prev => [...prev, newWindow]);
    setWindowOrder(prev => [...prev, app.id]);
  }, [openWindows]);

  const closeWindow = useCallback((windowId: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== windowId));
    setWindowOrder(prev => prev.filter(id => id !== windowId));
  }, []);

  const focusWindow = useCallback((windowId: string) => {
    setWindowOrder(prev => [...prev.filter(id => id !== windowId), windowId]);
  }, []);

  return (
    <div className="fixed inset-0 desktop-wallpaper overflow-hidden">
      {/* Desktop Icons */}
      <div className="p-6 pt-8 flex flex-col gap-4 flex-wrap h-[calc(100vh-60px)] content-start">
        {apps.map((app, index) => (
          <DesktopIcon
            key={app.id}
            icon={app.icon}
            label={app.label}
            onClick={() => openApp(app.id)}
            delay={index * 100}
          />
        ))}
      </div>

      {/* Windows */}
      {openWindows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          onClose={() => closeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          zIndex={100 + windowOrder.indexOf(window.id)}
          initialPosition={window.position}
          size={window.size}
        >
          {window.component}
        </Window>
      ))}

      {/* Taskbar */}
      <Taskbar />

      {/* Watermark */}
      <div className="fixed bottom-14 right-4 text-xs text-foreground/30 font-mono">
        coded with love 🤍
      </div>
    </div>
  );
};

export default Desktop;
