import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Avatar, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/auth/authSlice";

export const NavBar = ({width, menuClose, setMenuClose, setWith}) => {

    const { name, photoURL } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const onLogout = () => {
        window.sessionStorage.removeItem("Token");
        dispatch(logout());
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const inOpenMenu = () =>{
        if(menuClose == false){
            setWith(0)
            setMenuClose(true)
        }else{
            setWith(240)
            setMenuClose(false)
        }
    }

    return (
        <AppBar
            position='fixed'
            sx={{
                width: { sm: `calc(100% - ${width}px)` },
                ml: { sm: `${width}px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    onClick={inOpenMenu}
                    /* sx={{ mr: 2, display: { sm: 'none' } }} */
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container sx={{ display: { sm: 'block', xs: 'none' } }} >
                    <Typography variant='h6' noWrap component='div' > ERAS Soluciones Integrales.Cía.Ltda </Typography>
                </Grid>

                <Grid
                    container alignItems="center"
                    justifyContent="end"
                >
                    <Typography variant='span' noWrap component='div' sx={{ mr: { sm: 1 }, cursor: 'pointer' }}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    > {name} </Typography>
                    <Avatar
                        src={photoURL}
                        sx={{ mr: 1, cursor: 'pointer' }}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >AC
                    </Avatar>
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
                </Grid>

            </Toolbar>
        </AppBar>
    )
}
