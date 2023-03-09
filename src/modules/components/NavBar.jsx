import { MenuOutlined, Search } from "@mui/icons-material"
import { AppBar, Avatar, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { useState } from "react";
import InputBase from '@mui/material/InputBase';
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/auth/authSlice";
import morgquickLogo from '/assets/logos/logoERAS.png'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';



export const NavBar = ({ width, menuClose, setMenuClose, setWith }) => {

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


    const inOpenMenu = () => {
        if (menuClose == false) {
            setWith(0)
            setMenuClose(true)
        } else {
            setWith(240)
            setMenuClose(false)
        }
    }

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));

      const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.black, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      }));

      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        },
      }));

    return (
        <AppBar
            position='fixed'
            elevation={0}
            sx={{
                backgroundColor: "four.main"
            }}
        /*   sx={{
              width: { sm: `calc(100% - ${width}px)` },
              ml: { sm: `${width}px` }
          }} */
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    onClick={inOpenMenu}
                    sx={{ mr: 2, color: 'black' }}
                >
                    <MenuOutlined />
                </IconButton>
                <img
                    src={morgquickLogo}
                    alt="MorgquickLogo"
                    style={{
                        marginTop: '10px',
                        width: '160px',
                    }}
                />
                {/*                 <Grid container sx={{ display: { sm: 'block', xs: 'none'} }} >
                    <Typography variant='h6' noWrap component='div'sx={{ml:2}} > ERAS Soluciones Integrales.Cía.Ltda </Typography>
                </Grid> */}


                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>

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
