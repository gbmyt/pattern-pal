"use client"
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import MailIcon from '@mui/icons-material/Mail';

import "@/styles/globals.css"

const drawerWidth = 240;

const sideBarLinks = [
  { href: "/", linkText: "Home" },
  { href: "/account", linkText: "Account" },
  { href: "/settings", linkText: "Settings", parentPage: "Account" },
  { href: "/projects", linkText: "Projects", parentPage: "Account" },
  { href: "/queue", linkText: "Queue", parentPage: "Account" },
  { href: "/favorites", linkText: "Favorites", parentPage: "Account" },
  { href: "/library", linkText: "Library", parentPage: "Account" },
  { href: "/stash", linkText: "Stash", parentPage: "Account" },
  
  { href: "/sell", linkText: "Seller" },
  { href: "/shop", linkText: "Shop", parentPage: "Seller" },
  { href: "/shop/manage", linkText: "Manage", parentPage: "Seller" },

  { href: "/studio", linkText: "Design Studio" }, // Rename or separate Manage Shop to 'Seller'?
  { href: "/editor", linkText: "Editor", parentPage: "Studio" },
  { href: "/patterns", linkText: "New Pattern", parentPage: "Studio" },
  { href: "/templates", linkText: "Templates", parentPage: "Studio" },
  
  { href: "/symbols", linkText: "Symbols" },
  { href: "/community", linkText: "Community" },
]

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isActive, setActiveIndex] = React.useState<number>(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        open={open} 
        elevation={0}
        sx={{ backgroundColor: "transparent" }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginLeft: "2px",
              "&:hover": {
                backgroundColor: "transparent",
              }
            }}
          >
          <MenuIcon sx={[ open && { display: 'none', },]} />
          </IconButton>
            <Typography 
              component="a"
              href="/" 
              sx={{ 
                fontSize: "30px",
                color: "#000",
                fontWeight: 600,
                ml: !open ? 2 : 0,
              }}
              >Notions</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sideBarLinks.map((link, index) => (
            <ListItem key={link.linkText} disablePadding>
              <ListItemButton onClick={() => setActiveIndex(index)}>
                <Typography 
                  component="a" 
                  href={link.href} 
                  sx={{
                    ml: link.parentPage && 4,
                    fontWeight: (isActive === index) ? 'bold' : 'normal',
                    color: (isActive === index) ? 'rgba(151, 71, 255)' : '#000'
                  }}
                >{link.linkText}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Inbox'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {/* {isUnread ? <MarkEmailUnreadIcon /> : <MailIcon />} */}
                  <MarkEmailUnreadIcon />
                </ListItemIcon>
                <Typography 
                  component="a" 
                  href={`/${text.toLowerCase()}`} 
                >{text}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}