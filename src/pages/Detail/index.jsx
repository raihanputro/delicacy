import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { callApi, callApiFavorites } from '../../domain/api';
import classes from './style.module.scss'
import Navbar from '../../components/Navbar/index'

const Detail = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState([]);
    const [moreRecipies, setMoreRecipies] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMeal();
        fetchFavorites();
      }, [id]);

    const fetchMeal = async() => {
        const response = await callApi(`/lookup.php?i=${id}`, 'GET');

        const responseByCategories = await callApi(`/filter.php?c=${response.meals[0].strCategory}`, 'GET');

        const slicedResponseMoreRecipies = responseByCategories?.meals?.slice(12, 18);


        const modifiedResponseMoreRecipies = slicedResponseMoreRecipies?.map( async(item) => {
            const responseById = await callApi(`/lookup.php?i=${item.idMeal}`, 'GET');
            const { idMeal, strMeal, strMealThumb } = responseById.meals[0];
            return {
              idMeal, strMeal, strMealThumb
            }
          })

        const finalResponseMoreRecipies = await Promise.all(modifiedResponseMoreRecipies);

        
        setMeal(response.meals[0]);
        setMoreRecipies(finalResponseMoreRecipies);
    };

    const fetchFavorites = async() => {
        const response = await callApiFavorites(`/${meal?.idMeal}`, 'GET');

       setFavorite(response)
    }

    const postFavorites = async() => {
        const response = await callApiFavorites('', 'POST', {id: meal.idMeal, mealName: meal.strMeal, mealImg: meal.strMealThumb});
         
        console.log(response, "<<post fav")
    }

    const deleteFavorites = async() => {
        const response = await callApiFavorites('', 'DELETE', {id: meal.idMeal, mealName: meal.strMeal, mealImg: meal.strMealThumb});
         
        console.log(response, "<<post fav")
    }

    console.log(favorite.id, "<<>>>>>")

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
                                <Button variant='p' onClick={() => {favorite?.id !== meal?.idMeal ? postFavorites() : deleteFavorites()} }>{favorite?.id === meal?.idMeal ?  'Remove Favorite' : 'Add to Favorites'}</Button>
                            </div>
                        </div>
                        <img src={meal.strMealThumb} className={classes.mealImg}/>
                    </div>
            </div>
            <div className={classes.moreRecepiesContainer}>
                <h3>More Recipies</h3>
                <div className={classes.recipiesCardContainer}>
                    {moreRecipies && moreRecipies.map((recipies, index) => (
                    <div key={index} className={classes.recipiesCard} onClick={()=>navigate(`../detail/${recipies?.idMeal.toLowerCase()}`)}>
                        <img src={recipies.strMealThumb} />
                        <p>{recipies.strMeal}</p>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default Detail