import { useState } from "react";
import { Link } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, InputBase, Typography, useTheme } from "@mui/material";
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
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import MessageIcon from '@mui/icons-material/Message';

import SystemSecurityUpdateGoodIcon from '@mui/icons-material/SystemSecurityUpdateGood';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import MapIcon from '@mui/icons-material/Map';

import profileImg from "/Img/profile.png"
import logo from "/logos/logo.png"

import "react-pro-sidebar/dist/css/styles.css";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useMenuStore } from "../hooks/useMenuStore";
import SearchIcon from "@mui/icons-material/Search";


import SubscriptionsIcon from '@mui/icons-material/Subscriptions'; 'subcripciones'
import PeopleIcon from '@mui/icons-material/People'; 'Clienes'
import SettingsIcon from '@mui/icons-material/Settings'; 'configuracion'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'; 'planes'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'; 'plazos de pago'
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined'; 'servicios'
import RequestPageIcon from '@mui/icons-material/RequestPage'; 


const iconComp = {
  "HomeOutlinedIcon": <HomeOutlinedIcon />,
  "PieChartOutlineOutlinedIcon": <PieChartOutlineOutlinedIcon />,
  "CalendarMonthIcon": <CalendarMonthIcon />,
  "LibraryBooksIcon": <LibraryBooksIcon />,
  "PaymentsIcon": <PaymentsIcon />,
  "RequestQuoteIcon": <RequestQuoteIcon />,
  "PaidIcon": <PaidIcon />,
  "AccountBalanceIcon": <AccountBalanceIcon />,
  "InventoryIcon": <InventoryIcon />,
  "ApartmentIcon": <ApartmentIcon />,
  "HailIcon": <HailIcon />,
  "ShoppingBagIcon": <ShoppingBagIcon />,
  "PointOfSaleIcon": <PointOfSaleIcon />,
  "SchoolIcon": <SchoolIcon />,
  "LabelImportantIcon": <LabelImportantIcon />,
  "SystemSecurityUpdateGoodIcon": <SystemSecurityUpdateGoodIcon />,
  "AccountCircleIcon": <AccountCircleIcon />,
  "Diversity3Icon": <Diversity3Icon />,
  "MapIcon": <MapIcon />,
  "LocalPoliceIcon": <LocalPoliceIcon />,
  "MessageIcon": <MessageIcon />,
  "SubscriptionsIcon":<SubscriptionsIcon/>,
  "PeopleIcon":<PeopleIcon/>,
  "SettingsIcon":<SettingsIcon/>,
  "PhoneAndroidIcon":<PhoneAndroidIcon/>,
  "CurrencyExchangeIcon":<CurrencyExchangeIcon/>,
  "DesignServicesOutlinedIcon":<DesignServicesOutlinedIcon/>,
  "RequestPageIcon":<RequestPageIcon/>,
}

/* ITEM */
const Item = ({ title, url, icon, selected, setSelected }) => {
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
      <Link to={url} />
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
      <Item key={item.id} title={item.title} url={item.url} icon={item.icon} selected={selected} setSelected={setSelected} />
    );
  }
}

export const SideBar = () => {

  const { modules } = useMenuStore();
  const { user } = useAuthStore();

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
              margin: "0px",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt="-10px"
                sx={{ cursor: 'default', userSelect: 'none', margin: 0 }}
              >
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: "100px", marginLeft: '60px' }}
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
              <Box textAlign="center" sx={{ cursor: 'default', userSelect: 'none' }}>
                {/*
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user.name}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {user.job}
                </Typography> */}

                <Box
                  width="85%"
                  display="flex"
                  margin="20px"
                  backgroundColor={colors.primary[200]}
                  borderRadius="3px"
                  sx={{ cursor: 'default', userSelect: 'none', }}
                >
                  <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Buscar..." />
                  <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"} sx={{ cursor: 'default', userSelect: 'none' }}>
            {modules.map((item) => (
              item.titleGroup ? (
                <Typography
                  key={item.id}
                  variant="h6"
                  color={colors.grey[300]}
                  sx={!isCollapsed ? { m: "15px 0 5px 20px" } : { display: "none" }}
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
