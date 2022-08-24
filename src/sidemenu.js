import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { Drawer } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import useToken from './useToken';

export default Sidemenu => {
    const { token, removeToken } = useToken();

    const logout = event => {
        removeToken();
        window.location.reload();
    }

    return (
        <Drawer
            sx={{
            width: 300,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: 300,
                boxSizing: 'border-box',
            },
            }}
            variant="permanent"
            anchor="left"
        >
        <MenuList>
            <MenuItem>
                <ListItemIcon>
                    <FormatListBulletedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Lista newsletterów</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <PeopleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Lista odbiorców</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Ustawienia</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={logout}>
                <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Wyloguj się</ListItemText>
            </MenuItem>
        </MenuList>
        </Drawer>
    );
}