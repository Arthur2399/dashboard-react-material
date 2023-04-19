import { Box } from '@mui/material';
import { SideBar } from '../components/SideBar';
import { TopBar } from '../components/TopBar';

export const ModulesLayout = ({ children }) => {
  return (
    <Box display="flex" position="relative" width="100%">
      <SideBar />
      <Box component='main' width="100%">
        <TopBar />
        {children}
      </Box>
    </Box >
  )
}
