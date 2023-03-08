import { Box, Divider, Drawer, Toolbar, Typography } from '@mui/material'
import morgquickLogo from '/assets/logos/logoERAS.png'
import { SideBarItem } from './SideBarItem';


export const SideBar = ({width,menuClose}) => {

    return (
        <Box
            component='nav'
            sx={{ width: { sm: width }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                className="animate__animated animate__fadeIn"
                variant='permanent' // temporary
                sx={menuClose == false
                    ?{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: width }
                      }
                    :{
                        display: { xs: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: width }
                    }
            }
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
