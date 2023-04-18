import { Box, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth/thunks";
import { useState } from "react";

export const TopBar = () => {

    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [anchorEl, setAnchorEl] = useState(null);
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
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton onClick={handleClick}>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem >Perfil</MenuItem>
                <MenuItem >Contraseña</MenuItem>
                <MenuItem onClick={onLogout}>Cerrar sesión</MenuItem>
            </Menu>
        </Box>
    )
}
