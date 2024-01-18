import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import classes from './style.module.scss';
import Navbar from '../../components/Navbar';
import { callApi, callApiFavorites } from '../../domain/api';

const Favorite = () => {
  

  return (
    <div className={classes.container}>
      <Navbar />
    </div>
  )
}

export default Favorite