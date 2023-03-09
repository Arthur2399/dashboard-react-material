import { Box, Divider, Drawer, Toolbar, Typography } from '@mui/material'
import { SideBarItem } from './SideBarItem';


export const SideBar = ({width,menuClose}) => {

    return (
        <Box
            component='nav'
            sx={{ mt:10, flexShrink: { sm: 0 } }}
        >
            <Drawer
                className="animate__animated animate__fadeIn"
                variant='permanent' // temporary
                elevation={3}
                sx={menuClose == false
                    ?{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: width, borderRight:'none',backgroundColor:"four.main", mt:10 }
                      }
                    :{
                        display: { xs: 'none' }
                    }
            }
            >


                <SideBarItem />

            </Drawer>
        </Box>
    )
}
