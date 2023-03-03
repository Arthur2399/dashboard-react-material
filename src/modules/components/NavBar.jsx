import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Avatar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/auth/authSlice";

export const NavBar = ({ drawerWidth = 240 }) => {

    const { name, photoURL } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const onLogout = () =>{
        window.sessionStorage.removeItem("Token");
        dispatch(logout());

    }

    return (
        <AppBar
            position='fixed'
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container sx={{ display: { sm: 'block', xs: 'none' } }} >
                    <Typography variant='h6' noWrap component='div' > ERAS Soluciones Integrales.Cía.Ltda </Typography>
                </Grid>

                <Grid container alignItems="center" justifyContent="end"  >
                    <Avatar src={photoURL} sx={{ mr: 1 }}>AC</Avatar>
                    <Typography variant='span' noWrap component='div' sx={{ mr:{sm: 1} }}> {name} </Typography>
                    <IconButton
                        sx={{ color: 'white' }}
                        onClick={onLogout}
                    >
                        <LogoutOutlined />
                    </IconButton>
                </Grid>

            </Toolbar>
        </AppBar>
    )
}
