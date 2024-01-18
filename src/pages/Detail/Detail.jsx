import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { callApi } from '../../domain/api';
import classes from './style.module.scss'
import Navbar from '../../components/Navbar/Navbar'

const Detail = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState([]);

    useEffect(() => {
        fetchMeal();
      }, [id]);

    const fetchMeal = async() => {
        const response = await callApi(`/lookup.php?i=${id}`, 'GET');

        setMeal(response.meals[0]);
    }

  return (
    <>
        <div className={classes.container}>
            <Navbar />
            <div className={classes.cardContainer}>
                    <div className={classes.card}>
                        <div className={classes.mealDesc}>
                            <div className={classes.mealIntro}>
                                <h1 className={classes.mealName}>{meal?.strMeal}</h1>
                                <p className={classes.mealIns}>{meal?.strInstructions}</p>
                            </div>
                            <div className={classes.mealIngContainer}>
                                <h1>Ingredients</h1>
                                <div className={classes.mealIngVarious}>
                                    <div className={classes.mealIng}>
                                        <img src='/ingredientIcon.png' />
                                        <div className={classes.mealMea}>
                                            <h3>{meal?.strIngredient1}</h3>
                                            <p>{meal?.strMeasure1}</p>
                                        </div>
                                    </div>
                                    <div className={classes.mealIng}>
                                        <img src='/ingredientIcon.png' />
                                        <div className={classes.mealMea}>
                                            <h3>{meal?.strIngredient2}</h3>
                                            <p>{meal?.strMeasure2}</p>
                                        </div>
                                    </div>
                                    <div className={classes.mealIng}>
                                        <img src='/ingredientIcon.png' />
                                        <div className={classes.mealMea}>
                                            <h3>{meal?.strIngredient3}</h3>
                                            <p>{meal?.strMeasure3}</p>
                                        </div>
                                    </div>
                                    <div className={classes.mealIng}>
                                        <img src='/ingredientIcon.png' />
                                        <div className={classes.mealMea}>
                                            <h3>{meal?.strIngredient4}</h3>
                                            <p>{meal?.strMeasure4}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img src={meal.strMealThumb} className={classes.mealImg}/>
                    </div>
            </div>
        </div>
    </>
  )
}

export default Detail