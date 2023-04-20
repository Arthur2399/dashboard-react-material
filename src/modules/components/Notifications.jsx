import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

import perfilFoto from '../../data/img/perfil.jpg'

import {ListItemAvatar, ListItemText, Typography } from '@mui/material';


export const Notifications = ({ anchorNo, openNo, handleClose }) => {
    return (
        <Menu
            id="account-notification"
            anchorEl={anchorNo}
            onClose={handleClose}
            onClick={handleClose}
            open={openNo}
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
            <MenuItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={perfilFoto} />
                </ListItemAvatar>
                <ListItemText
                    primary="Plan de cuentas creado."
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Miguel Pino
                            </Typography>
                            {" — Revisa la configuración creada..."}
                        </>
                    }
                />
            </MenuItem>
            <Divider variant="inset" component="li" />
            <MenuItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="" />
                </ListItemAvatar>
                <ListItemText
                    primary="Plan de cuentas editado"
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Jordi Fiallos
                            </Typography>
                            {" — Revisa los datos editados..."}
                        </>
                    }
                />
            </MenuItem>
            <Divider variant="inset" component="li" />
            <MenuItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={perfilFoto} />
                </ListItemAvatar>
                <ListItemText
                    primary="Factura anulada."
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Efraín Raza
                            </Typography>
                            {" — Revisa acción realizada..."}
                        </>
                    }
                />
            </MenuItem>
            
        </Menu>
    )
}
