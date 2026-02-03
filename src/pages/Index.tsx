import { useState } from 'react';
import BootScreen from '@/components/BootScreen';
import Desktop from '@/components/Desktop';

const Index = () => {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden">
      {!isBooted ? (
        <BootScreen onBootComplete={() => setIsBooted(true)} />
      ) : (
        <Desktop />
      )}
    </div>
  );
};

export default Index;
