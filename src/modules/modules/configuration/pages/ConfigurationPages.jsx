import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';


import LockIcon from '@mui/icons-material/Lock';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import WidgetsIcon from '@mui/icons-material/Widgets';
import MenuIcon from '@mui/icons-material/Menu';

import { Box, Divider, ListItemIcon, MenuItem } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { Header } from '../../components/Header';
import { useNavigate } from 'react-router-dom';

export const ConfigurationPages = () => {

  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const onNavigate = (to) => {
    navigate(to);
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box className="animate__animated animate__fadeIn">
      <Header title="Configuración" subtitle="Adiministra, controla y gestiona tu cuenta personal y de empresa" />
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <ListItemIcon sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Settings fontSize="small" />
          </ListItemIcon>
          <Typography sx={{ width: '40%', flexShrink: 0 }}>
            Configuraciones generales
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Edita tu perfil, cambia tu contraseña o elimina tu cuenta</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MenuItem sx={{ ml: 3 }}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Mi perfil
          </MenuItem>
          <Divider />
          <MenuItem sx={{ ml: 3 }}>
            <ListItemIcon>
              <LockIcon fontSize="small" />
            </ListItemIcon>
            Cambiar contraseña
          </MenuItem>
          <Divider />
          <MenuItem sx={{ ml: 3 }}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            Eliminar cuenta
          </MenuItem>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <ListItemIcon sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <Typography sx={{ width: '40%', flexShrink: 0 }}>
            Usuarios
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Crea o edita usuarios y sus provilegios</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MenuItem sx={{ ml: 3 }}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Gestionar usuarios
          </MenuItem>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <ListItemIcon sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <BusinessIcon fontSize="small" />
          </ListItemIcon>
          <Typography sx={{ width: '40%', flexShrink: 0 }}>
            Empresa
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Crea o edita la configuración de tu compañía</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MenuItem sx={{ ml: 3 }} onClick={() => onNavigate("empresa")}>
            <ListItemIcon>
              <BusinessCenterIcon fontSize="small" />
            </ListItemIcon>
            Gestionar Empresa
          </MenuItem>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <ListItemIcon sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <WidgetsIcon fontSize="small" />
          </ListItemIcon>
          <Typography sx={{ width: '40%', flexShrink: 0 }}>
            Menu
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Configura el menú de acuerdo a tus necesidades</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MenuItem sx={{ ml: 3 }}>
            <ListItemIcon>
              <MenuIcon fontSize="small" />
            </ListItemIcon>
            Editar menú
          </MenuItem>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}