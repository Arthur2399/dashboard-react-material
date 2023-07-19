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

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Inicio");

  const { modules } = useMenuStore();

  return (
    <Box
      sx={{
        m:0,
        p:0,
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          /* background: `red!important`, */
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
            onClick={isCollapsed ==true? () => setIsCollapsed(!isCollapsed): ()=>{}}
            icon={isCollapsed ? icons["MenuOutlinedIcon"]() : undefined}
            style={{
              margin: "0px",
              padding:"0px",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box position="fixed" className="animate__animated animate__fadeIn animate__delay-1s" zIndex={10} sx={{ background: colors.primary[400], width:"268px", top:"0", left:"0"}}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ cursor: 'default', userSelect: 'none', margin: 0 }}
                >
                  <img
                    src={logo}
                    alt="logo"
                    style={{ width: "100px", marginLeft: '60px', marginTop:"10px" }}
                  />
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    {icons["MenuOutlinedIcon"]({ style: { color: colors.grey[100], marginLeft:"20px" } })}
                  </IconButton>
                </Box>
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
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "5%"} sx={{ cursor: 'default', userSelect: 'none', mt: isCollapsed ? 0 : '140px' }}>
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
