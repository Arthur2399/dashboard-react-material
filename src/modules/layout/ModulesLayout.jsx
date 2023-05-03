import { Box } from '@mui/material';
import { SideBar } from '../components/SideBar';
import { TopBar } from '../components/TopBar';

export const ModulesLayout = ({ children }) => {
  return (
    <Box display="flex" position="relative" width="100%" height="100%">
      <SideBar />
      <Box component='main' width="100%" height="100%" sx={{ flexGrow: 1 }}>
        <TopBar />
        <Box overflow="auto" padding={2} sx={{ height: "calc(100% - 70px)" }}>
          {children}
        </Box>
      </Box>
    </Box >
  )
}
