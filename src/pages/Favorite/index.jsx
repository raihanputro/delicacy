import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import classes from './style.module.scss';
import Navbar from '../../components/Navbar';
import { callApi, callApiFavorites } from '../../domain/api';

const Favorite = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Favorite");
  const [favorite, setFavorite] = useState([]);
  const [isFav, setIsFav] = useState(false);


  useEffect(() => {
    fetchFavorites();
    fetchCategories();
  }, [favorite]);

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

  const fetchFavorites = async() => {
    try {
        const response = await callApiFavorites(``, 'GET');
        setFavorite(response);

    } catch(error) {
        console.log(error)
    }
}


const deleteFavorites = async(id) => {
    try {
        const response = await callApiFavorites(`/${id}`, 'DELETE');
        fetchFavorites()
    } catch(error) {
        console.log(error)
    }
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
              <div key={index} className={classes.favCard} >
                  <img src={fav.mealImg} />
                  <p>{fav.mealName}</p>
                  <Button variant='outlined' className={classes.favButton} onClick={() => deleteFavorites(fav?.id)}>Remove Favorite</Button>
              </div>
            ))}
          </div>
    </div>
  )
}

export default Favorite