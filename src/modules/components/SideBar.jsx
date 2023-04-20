import { useState } from "react";
import { Link } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

/* ICONOS */
import PaymentsIcon from '@mui/icons-material/Payments';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import InventoryIcon from '@mui/icons-material/Inventory';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HailIcon from '@mui/icons-material/Hail';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import SchoolIcon from '@mui/icons-material/School';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

import profileImg from "../../data/img/perfil.jpg"
import logo from "/logos/LogoERAS.png"

import "react-pro-sidebar/dist/css/styles.css";
import { mockDataMenu } from "../../data/ui/menu/mockDataMenu";


const iconComp = {
  "HomeOutlinedIcon": <HomeOutlinedIcon />,
  "PieChartOutlineOutlinedIcon": <PieChartOutlineOutlinedIcon />,
  "CalendarMonthIcon": <CalendarMonthIcon />,
  "LibraryBooksIcon":<LibraryBooksIcon/>,
  "PaymentsIcon":<PaymentsIcon/>,
  "RequestQuoteIcon":<RequestQuoteIcon/>,
  "PaidIcon":<PaidIcon/>,
  "AccountBalanceIcon":<AccountBalanceIcon/>,
  "InventoryIcon":<InventoryIcon/>,
  "ApartmentIcon":<ApartmentIcon/>,
  "HailIcon":<HailIcon/>,
  "ShoppingBagIcon":<ShoppingBagIcon/>,
  "PointOfSaleIcon":<PointOfSaleIcon/>,
  "SchoolIcon":<SchoolIcon/>,
  "LabelImportantIcon":<LabelImportantIcon/>
}

/* ITEM */
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={iconComp[icon]}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const RenderItem = ({ item, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  if (item.subItems) {
    return (
      <SubMenu
        key={item.id}
        title={item.title}
        icon={iconComp[item.icon]}
        style={{
          cursor: 'default',
          userSelect: 'none',
          color: colors.grey[100],
        }}
      >
        {item.subItems.map((subitem) => (
          <RenderItem key={subitem.id} item={subitem} selected={selected} setSelected={setSelected} />
        ))}
      </SubMenu>
    );
  } else {
    return (
      <Item key={item.id} title={item.title} to={item.to} icon={item.icon} selected={selected} setSelected={setSelected} />
    );
  }
}

export const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Inicio");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >

      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
                sx={{ cursor: 'default', userSelect: 'none' }}
              >
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: "140px" }}
                />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon style={{
                    color: colors.grey[100],
                  }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center" sx={{ cursor: 'default', userSelect: 'none' }}>
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={profileImg}
                  style={{ borderRadius: "50%", objectFit: "cover", userSelect: 'none' }}
                />
              </Box>
              <Box textAlign="center" sx={{ cursor: 'default', userSelect: 'none' }}>
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Arthur Chávez
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Ing.Sistemas
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"} sx={{ cursor: 'default', userSelect: 'none' }}>
            {mockDataMenu.map((item) => (
              item.titleGroup ? (
                <Typography
                  key={item.id}
                  variant="h6"
                  color={colors.grey[300]}
                  sx={!isCollapsed?{ m: "15px 0 5px 20px" } :{ display:"none"} }
                >
                  {item.titleGroup}
                </Typography>
              )
                : <RenderItem key={item.id} item={item} selected={selected} setSelected={setSelected} />
            ))}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}
