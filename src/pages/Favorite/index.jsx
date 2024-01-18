import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import classes from './style.module.scss';
import Navbar from '../../components/Navbar';
import { callApi, callApiFavorites } from '../../domain/api';

const Favorite = () => {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Favorite");


  useEffect(() => {
    fetchFavorites();
    fetchCategories();
  }, [favorite]);

  const fetchFavorites = async() => {
    const response = await callApiFavorites(``, 'GET');

   setFavorite(response)
  }

  const fetchCategories = async() => {
    const response = await callApi(`/categories.php`, 'GET');
    const modifiedData = response.categories?.map((item) => {
      return {
        nameCategory: item.strCategory,
      }
    });
    setCategories(modifiedData.slice(0, 6));
  }

  const handleActive = (value) => {
    setActiveCategory(value);
  }


  return (
    <div className={classes.container}>
      <Navbar />
      <div className={classes.menuItem}>
          {categories && categories.map((category, index) => (
            <Button variant='p' key={index} onClick={() => navigate(`/`)} className={activeCategory === category.nameCategory ? classes.activeCategory : classes.nonActiveCategory}>{category.nameCategory}</Button>
          ))}
          <Button variant='p' onClick={() => {handleActive('Favorite'), navigate(`../favorite`)}} className={activeCategory === "Favorite" ? classes.activeCategory : classes.nonActiveCategory}>Favorite</Button>
        </div>
      <div className={classes.favContainer}>
            {favorite && favorite.map((fav, index) => (
              <div key={index} className={classes.favCard} onClick={()=>navigate(`../detail/${fav?.id.toLowerCase()}`)}>
                  <img src={fav.mealImg} />
                  <p>{fav.mealName}</p>
                  <Button variant='outlined' className={classes.favButton}>Remove Favorite</Button>
              </div>
            ))}
          </div>
    </div>
  )
}

export default Favorite