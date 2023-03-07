import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import Label from '@mui/icons-material/Label';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useSelector } from 'react-redux';

/* const menuItems = [
  {
    id: '1',
    text: 'All Mail',
    icon: MailIcon,
  },
  {
    id: '2',
    text: 'Trash',
    icon: DeleteIcon,
  },
  {
    id: '3',
    text: 'Categories',
    icon: Label,
    children: [
      {
        id: '6',
        text: 'Updates',
        icon: InfoIcon,
        info: '2,294',
        color: '#e3742f',
        bgColor: '#fcefe3',
        children: [
          {
            id: '9',
            text: 'Hola',
            icon: InfoIcon,
            info: '2,294',
            color: '#e3742f',
            bgColor: '#fcefe3',
            children: [
              {
                id: '10',
                text: 'JEJE',
                icon: InfoIcon,
                info: '2,294',
                color: '#e3742f',
                bgColor: '#fcefe3',
              },]
          },
        ]
      },
      {
        id: '7',
        text: 'Forums',
        icon: ForumIcon,
        info: '3,566',
        color: '#a250f5',
        bgColor: '#f3e8fd',
      },
      {
        id: '8',
        text: 'Promotions',
        icon: LocalOfferIcon,
        info: '733',
        color: '#3c8039',
        bgColor: '#e6f4ea',
      },
    ],
  },
  {
    id: '4',
    text: 'History',
    icon: Label,
  },
]; */



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

const {modules} = useSelector(state=> state.menu);

  const renderMenuItem = (item) => {
    const { id,nombre,hijos } = item;
    if (hijos) {
      return (
        <StyledTreeItem
          key={id}
          nodeId={id}
          labelText={nombre}
          /* labelIcon={LabelIcon} */
        >
          {hijos.map((childItem) => renderMenuItem(childItem))}
        </StyledTreeItem>
      );
    } else {
      return (
        <StyledTreeItem key={id} nodeId={id} labelText={nombre} /* labelIcon={LabelIcon} */ />
      );
    }
  };

  return (
    <TreeView
      aria-label="gmail"
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {modules.payload.map((item) => renderMenuItem(item))}
    </TreeView>
  );
};