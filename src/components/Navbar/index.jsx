import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import classes from './style.module.scss'

const Navbar = () => {

    const navigate = useNavigate();

    return (
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static" elevation={0} color='transparent'>
          <Toolbar className={classes.header}>
            <Typography variant="h2" component="div" sx={{ flexGrow: 1 }} className={classes.headerTitle} onClick={() => navigate(`/`)}>
              <b>Delicacy</b>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    )
}

export default Navbar