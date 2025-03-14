'use client';

import { useState } from 'react';
import { Box, Drawer, List, ListItemText, ListItemButton, ListItemIcon } from '@mui/material';
import { useRouter } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MapIcon from '@mui/icons-material/Map';
import PlanningIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
}


export default function SideBar({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const menuItems = [
    { text: 'Dashboard', path: '/', icon: <DashboardIcon /> },
    { text: 'My Travels', path: '/map', icon: <MapIcon /> },
    { text: 'Planning', path: '/test', icon: <PlanningIcon /> },
    { text: 'Settings', path: '/login', icon: <SettingsIcon /> }
  ];

  return (
    <Box sx={{ display: 'flex' }}>

      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        variant="permanent"
        sx={{
          width: open ? drawerWidth : 65,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 65,
            boxSizing: 'border-box',
            overflowX: 'hidden',
            transition: 'width 0.2s',
          },
        }}
      >
        <Box sx={{ overflow: 'auto', mt: 8 }}>
          <List>
            <ListItemButton
              onClick={toggleDrawer(!open)}
              sx={{
                minWidth: 'auto',
                justifyContent: 'center',
                px: 2.5,
                position: 'fixed',
                top: 0,
                width: open ? drawerWidth : 65,
                zIndex: 1,
                background: '#fff',
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
              }}
            >
              {open ? '←' : '→'}
            </ListItemButton>
            {menuItems.map((item, index) => (
              <ListItemButton
                key={item.text}
                selected={selectedIndex === index}
                onClick={() => {
                  setSelectedIndex(index);
                  router.push(item.path);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: open ? drawerWidth : 65 }}>
        {children}
      </Box>
      
    </Box>
  );
} 