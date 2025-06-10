import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

type NavigationContextType = {
  navigateTo: (path: string) => void;
  navLoading: boolean;
};

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [navLoading, setNavLoading] = useState(false);
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    setNavLoading(true);
    navigate(path);
    setTimeout(() => setNavLoading(false), 50); // * иммитация подгрузки роутинга
  };

  return (
    <NavigationContext.Provider value={{ navigateTo, navLoading }}>
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
