import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useCompanyInfoStore } from '../hooks/useCompanyInfoStore';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import HelpIcon from '@mui/icons-material/Help';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import LocationCityIcon from '@mui/icons-material/LocationCity';


export const ProfileMenu = ({ handleClose, open, anchorEl, onLogout }) => {

    const { photoURL } = useAuthStore();
    const { currentCompany, startChangeCompany } = useCompanyInfoStore();

    const navigate = useNavigate();

    const onNavigateConfiguration = () => {
        navigate("/configuracion")
    }

    return (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <LocationCityIcon />
                </ListItemIcon>
                Mi perfil
            </MenuItem>
            <Divider />
            <MenuItem onClick={startChangeCompany}>
                <ListItemIcon>
                    <LocationCityIcon />
                </ListItemIcon>
                Ejercicio fiscal {currentCompany.fiscal_exercise.label}
            </MenuItem>
            <Divider />
            <MenuItem onClick={onNavigateConfiguration}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Configuración
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <HelpIcon fontSize="small" />
                </ListItemIcon>
                Necesito ayuda
            </MenuItem>
            <MenuItem onClick={onLogout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Cerrar sesión
            </MenuItem>
        </Menu>
    );
}