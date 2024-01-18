import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import Navbar from '../../components/Navbar/index'
import { callApi } from '../../domain/api'

import classes from './style.module.scss'

const Home = () => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [moreRecipies, setMoreRecipies] = useState([]);

  useEffect(() => {
    fetchMeals();
    fetchCategories();
  }, [activeCategory]);

  const fetchMeals = async() => {
    const responseByCategories = await callApi(`/filter.php?c=${activeCategory}`, 'GET');
    const slicedResponse = responseByCategories?.meals?.slice(0, 9);
    const slicedResponseMoreRecipies = responseByCategories?.meals?.slice(10, 16);

    const modifiedResponse = slicedResponse?.map( async(item) => {
      const responseById = await callApi(`/lookup.php?i=${item.idMeal}`, 'GET');
      const { idMeal, strMeal, strInstructions,  strIngredient1, strIngredient2, strIngredient3, strIngredient4, strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMealThumb } = responseById.meals[0];
      return {
        idMeal, strMeal, strInstructions, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMealThumb
      }
    })

    const modifiedResponseMoreRecipies = slicedResponseMoreRecipies?.map( async(item) => {
      const responseById = await callApi(`/lookup.php?i=${item.idMeal}`, 'GET');
      const { idMeal, strMeal, strMealThumb } = responseById.meals[0];
      return {
        idMeal, strMeal, strMealThumb
      }
    })

    const finalResponse = await Promise.all(modifiedResponse);
    const finalResponseMoreRecipies = await Promise.all(modifiedResponseMoreRecipies);


    setMeals(finalResponse);
    setMoreRecipies(finalResponseMoreRecipies)
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

  console.log(activeCategory)
  console.log(moreRecipies)

  return (
    <div className={classes.container}>
        <Navbar />
        <div className={classes.menuItem}>
          {categories && categories.map((category, index) => (
            <Button variant='p' key={index} onClick={() => handleActive(category.nameCategory)} className={activeCategory === category.nameCategory ? classes.activeCategory : classes.nonActiveCategory}>{category.nameCategory}</Button>
          ))}
          <Button variant='p' onClick={() => {handleActive('Favorite'), navigate(`../favorite`)}} className={activeCategory === "Favorite" ? classes.activeCategory : classes.nonActiveCategory}>Favorite</Button>
        </div>
        <div className={classes.cardContainer}>
        {meals && meals.map((meal, index) => (
            <div key={index}  className={classes.card} onClick={()=>navigate(`../detail/${meal?.idMeal.toLowerCase()}`)}>
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

        ))}
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
  )
}

export default Home