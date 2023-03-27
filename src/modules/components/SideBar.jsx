import { Box, Divider, Drawer, Toolbar, Typography } from '@mui/material'
import { SideBarItem } from './SideBarItem';


export const SideBar = ({width,menuClose}) => {

    return (
        <Box
            component='nav'
            sx={{ width: { sm: width }, mt:10, flexShrink: { sm: 0 }}}
        >
            <Drawer
                className="animate__animated animate__fadeIn"
                variant='permanent' // temporary
                elevation={3}
                sx={menuClose == false
                    ?{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: width,paddingLeft:1, borderRight:'none',backgroundColor:"white", mt:10 }
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
