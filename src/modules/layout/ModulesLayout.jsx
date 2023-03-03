import { Box } from "@mui/system";
import { NavBar } from "../components/NavBar";

const drawerWith = 280;

export const ModulesLayout = ({ children }) => {
  return (
    <Box xs={{ display: 'flex' }}>
      <NavBar drawerWith={drawerWith} />
    </Box>
  )
}
