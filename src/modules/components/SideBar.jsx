import { Box, Divider, Drawer, Toolbar, Typography } from '@mui/material'
import morgquickLogo from '/assets/logos/logoERAS.png'
import { SideBarItem } from './SideBarItem';


export const SideBar = ({ drawerWidth = 240 }) => {


    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent' // temporary
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        <img
                            src={morgquickLogo}
                            alt="MorgquickLogo"
                            style={{
                                marginTop: '10px',
                                width: '160px',
                            }}
                        />
                    </Typography>
                </Toolbar>
                <Divider />

                <SideBarItem />

            </Drawer>
        </Box>
    )
}
