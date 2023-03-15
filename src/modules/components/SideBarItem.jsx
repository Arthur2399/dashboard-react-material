import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';

/* ICONS FOR MODULES */
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import SchoolIcon from '@mui/icons-material/School';
import PaymentsIcon from '@mui/icons-material/Payments';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import InventoryIcon from '@mui/icons-material/Inventory';
import ComputerIcon from '@mui/icons-material/Computer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

import DeleteIcon from '@mui/icons-material/Delete';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));



const example = [
  {
    id: 1,
    text: 'Punto de venta',
    ruute: '/',
    color: '',
    textInfo: '10',
    labelIcon: PointOfSaleIcon,
  },
  {
    id:2 ,
    text: 'Educativo',
    ruute: '/',
    color: '',
    textInfo: '10',
    labelIcon: SchoolIcon,
  },
  {
    id:3 ,
    text: 'Cuentas por pagar',
    ruute: '/',
    color: '',
    textInfo: '10',
    labelIcon: PaymentsIcon,
  },
  {
    id:4 ,
    text: 'Cuentas por cobrar',
    ruute: '/',
    color: '',
    textInfo: '10',
    labelIcon: ReceiptIcon,
  },
  {
    id:5 ,
    text: 'Contabilidad',
    ruute: '/',
    color: '',
    textInfo: '10',
    labelIcon: AccountBalanceWalletIcon,
  },
  {
    id:6 ,
    text: 'Tesoreria',
    ruute: '/',
    color: '',
    textInfo: '10',
    labelIcon: MonetizationOnIcon,
  },
  {
    id:7 ,
    text: 'SRI',
    ruute: '/',
    color: '',
    textInfo: '10',
    labelIcon: AccountBalanceIcon,
  },
  {
    id:8 ,
    text: 'Inventarios',
    ruute: '/',
    color: '',
    textInfo: '10',
    labelIcon: InventoryIcon,
  },
  {
    id:9 ,
    text: 'Activos fijos',
    ruute: '/',
    color: '',
    textInfo: '10',
    labelIcon: ComputerIcon,
  },
  {
    id:10 ,
    text: 'Compras',
    ruute: '/',
    color: '',
    textInfo: '10',
    labelIcon: ShoppingCartIcon,
  },
  {
    id:11 ,
    text: 'Gerencial',
    ruute: '/',
    color: '',
    textInfo: '10',
    labelIcon: ApartmentIcon,
  },
  {
    id:12 ,
    text: 'Administración',
    ruute: '/',
    color: '',
    textInfo: '10',
    labelIcon: AdminPanelSettingsIcon,
  },
  {
    id:13 ,
    text: 'Parametrización',
    ruute: '/',
    color: '',
    textInfo: '10',
    labelIcon: SettingsSuggestIcon,
  },
  
]



function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};


export const SideBarItem = () => {

  const { modules } = useSelector(state => state.menu);

  const renderMenuItem = (item) => {
    const {
      id,
      text,
      color,
      textInfo,
      labelIcon,
      children,
    } = item;

    if (children) {
      return (
        <StyledTreeItem
          key={id}
          nodeId={id.toString()}
          color={color}
          labelText={text}
          labelInfo={textInfo}
          labelIcon={labelIcon}
          sx={{mb:1}}
        >
          {children.map((childItem) => renderMenuItem(childItem))}
        </StyledTreeItem>
      );
    } else {
      return (
        <StyledTreeItem key={id} nodeId={id.toString()} labelText={text} labelIcon={labelIcon} color={color}sx={{mb:1}} />
      );
    }
  };

  return (
    <TreeView
      aria-label="gmail"
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto',mt:4 }}
    >
      {example.map((item) => renderMenuItem(item))}
    </TreeView>
  );
};