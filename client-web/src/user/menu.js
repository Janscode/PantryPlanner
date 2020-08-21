import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const pantryClick = (event) => {
    props.getPantry ();
    handleClick(event);
    handleClose();
  }

  const cookbookClick = (event) => {
    props.getCookbook();
    handleClick(event);
    handleClose();
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={pantryClick}>Pantry</MenuItem>
        <MenuItem onClick={cookbookClick}>Cookbook</MenuItem>
        <MenuItem onClick={props.logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}