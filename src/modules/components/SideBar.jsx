import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import { tokens } from "../../theme";
import { getIcons } from "../../helpers/getIcons";
import { useMenuStore } from "../hooks/useMenuStore";

import { Box, IconButton, InputBase, Typography, useTheme } from "@mui/material";

import logo from "/logos/logo.png"
import "react-pro-sidebar/dist/css/styles.css";


const icons = getIcons();

const Item = ({ title, url, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icons[icon]()}
    >
      <Typography>{title}</Typography>
      <Link to={url} />
    </MenuItem>
  );
};

const RenderItem = ({ item, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  if (item.subItems) {
    return (
      <SubMenu
        key={item.id}
        title={item.title}
        icon={icons[item.icon]()}
        onClick={()=>{
          if(item.url !=  selected)
          navigate(item.url)
          setSelected(item.url)
        }}
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

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Inicio");

  const { modules } = useMenuStore();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
            icon={isCollapsed ? icons["MenuOutlinedIcon"](): undefined}
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
                {icons["MenuOutlinedIcon"]({ style: { color: colors.grey[100] } })}
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center" sx={{ cursor: 'default', userSelect: 'none' }}>
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
                    {icons['SearchIcon']()}
                  </IconButton>
                </Box>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "5%"} sx={{ cursor: 'default', userSelect: 'none' }}>
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
