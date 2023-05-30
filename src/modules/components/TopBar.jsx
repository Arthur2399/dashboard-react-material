import { useState } from "react";
import { Badge, Box, IconButton, Typography, useTheme } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import { tokens } from "../../theme";
import { ProfileMenu } from "./ProfileMenu";
import { Notifications } from "./Notifications";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useCompanyInfoStore } from "../hooks/useCompanyInfoStore";

export const TopBar = () => {

    const { startLogout } = useAuthStore();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorNo, setAnchorNo] = useState(null);

    const { currentCompany } = useCompanyInfoStore();

    const open = Boolean(anchorEl);
    const openNo = Boolean(anchorNo);

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickNotification = (event) => {
        setAnchorNo(event.currentTarget);
    };


    const handleClose = () => {
        setAnchorEl(null);
        setAnchorNo(null);
    };


    const onLogout = () => {
        startLogout();
    }


    return (
        <Box display="flex" justifyContent="space-between" p={2} sx={{ background: colors.primary[400] }}>

            <img src={currentCompany.logoUrl} alt="logo" style={{
                width: 'auto', height: '40px', objectFit: 'cover', marginLeft:'20px',filter: 'grayscale(100%) brightness(200%)',
            }} />
            <Typography variant="h3" sx={{ color: colors.grey[100] }}> <strong>{currentCompany.name}</strong></Typography>
            <Box display="flex">
                <IconButton onClick={handleClickNotification}>
                    <Badge badgeContent={4} color='secondary'>
                        <NotificationsOutlinedIcon sx={{ color: colors.grey[100] }} />
                    </Badge>
                </IconButton>
                <IconButton onClick={handleClickMenu}>
                    <PersonOutlinedIcon sx={{ color: colors.grey[100] }} />
                </IconButton>
            </Box>
            <ProfileMenu anchorEl={anchorEl} handleClose={handleClose} open={open} onLogout={onLogout} />
            <Notifications anchorNo={anchorNo} handleClose={handleClose} openNo={openNo} />
        </Box>
    )
}
