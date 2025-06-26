import React, { useState } from 'react';
import { Button, Drawer, List, ListItem, ListItemText } from '@mui/material';

export const CustomDrawer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open: boolean) => () => {
        setIsOpen(isOpen);
    };

    return (
        <>
            <Button variant='outlined' onClick={toggleDrawer(true)}>
                Открыть меню
            </Button>
            <Drawer anchor='left' open={isOpen} onClose={toggleDrawer}>
                <List style={{ width: 250 }}>
                    <ListItem button onClick={toggleDrawer(false)}>
                        <ListItemText primary='Главная'></ListItemText>
                    </ListItem>
                    <ListItem button onClick={toggleDrawer(false)}>
                        <ListItemText primary="Контакты" />
                    </ListItem>
                    <ListItem button onClick={toggleDrawer(false)}>
                        <ListItemText primary="О нас" />
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
}