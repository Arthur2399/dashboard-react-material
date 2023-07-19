import { Box } from '@mui/material';
import { SideBar } from '../components/SideBar';
import { TopBar } from '../components/TopBar';
import { useEffect, useState } from 'react';

export const ModulesLayout = ({ children }) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box display="flex" position="relative" width="100%" height={windowHeight}>
      <SideBar />
      <Box component='main' width="100%" height="100%" sx={{ flexGrow: 1 }}>
        <TopBar />
        <Box overflow="auto" display="flex" justifyContent="center" alignItems="center" padding={2} sx={{ height: "calc(100% - 72px)"}}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
