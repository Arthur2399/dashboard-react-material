import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";



export const ModulesLayout = ({ children }) => {

  const [menuClose, setMenuClose] = useState(false)
  const [width, setWith] = useState(240);

  return (
    <Box sx={{ display: 'flex', backgroundColor:"#F5F5F5" , height:"100vh"}}>
      <NavBar menuClose={menuClose} setMenuClose={setMenuClose} setWith={setWith}/>
      <SideBar width={width} menuClose={menuClose}/>
      <Box 
            component='main'
            sx={{ flexGrow: 1, p: 3 }}
        >
            <Toolbar />

            { children }
            
        </Box>
    </Box>
  )
}
