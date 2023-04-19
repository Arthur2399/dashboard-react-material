import { useState } from "react";
import { useDispatch } from "react-redux";

import { Badge, Box, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

import { tokens } from "../../theme";
import { startLogout } from "../../store/auth/thunks";
import { ProfileMenu } from "./ProfileMenu";

export const TopBar = () => {

    const dispatch = useDispatch();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    
    
    const [anchorEl, setAnchorEl] = useState (null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  

    const onLogout = () => {
        dispatch(startLogout());
    }


    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Box
                width="50%"
                display="flex"
                backgroundColor={colors.grey[100]}
                borderRadius="3px"
                sx={{ cursor: 'default', userSelect: 'none', }}
            >
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Buscar..." />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>
            <Box display="flex">
                <IconButton>
                    <Badge badgeContent={4} color="primary">
                        <NotificationsOutlinedIcon />
                    </Badge>
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton onClick={handleClick}>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>
            <ProfileMenu anchorEl={anchorEl} handleClose={handleClose}  open={open}  onLogout={onLogout}/>
        </Box>
    )
}
