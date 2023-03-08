import { Box } from "@mui/system";
import { useState } from "react";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";



export const ModulesLayout = ({ children }) => {

  const [menuClose, setMenuClose] = useState(false)
  const [width, setWith] = useState(240);

  return (
    <Box xs={{ display: 'flex' }}>
      <NavBar width={width} menuClose={menuClose} setMenuClose={setMenuClose} setWith={setWith}/>
      <SideBar width={width} menuClose={menuClose}/>
      {
        children
      }
    </Box>
  )
}
