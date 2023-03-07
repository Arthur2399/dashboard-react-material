import { Box } from "@mui/system";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";

const drawerWith = 280;

export const ModulesLayout = ({ children }) => {
  return (
    <Box xs={{ display: 'flex' }}>
      <NavBar drawerWith={drawerWith} />
      <SideBar drawerWith={drawerWith} />
    </Box>
  )
}
