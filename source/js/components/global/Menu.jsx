import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


export default class Menu extends Component {
  render() {
    return (
      <Drawer variant='permanent'>
        <div>
          <IconButton onClick={ this.toggleDrawer }>
            <DashboardIcon />
          </IconButton>
        </div>
        <Divider />
        <div>
          <NavLink to={ routeCodes.HOME }>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItem>
          </NavLink>
          <NavLink to={ routeCodes.DRESS }>
            <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary='Dress' />
            </ListItem>
          </NavLink>
        </div>
      </Drawer>
    );
  }
}
