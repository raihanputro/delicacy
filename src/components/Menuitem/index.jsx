// import React from 'react'
// import { useState, useEffect } from 'react';
// import { MenuItem } from '@mui/material';
// import Typography from '@mui/material/Typography';

// import { callApi } from '../../domain/api';

// import classes from './style.module.scss'


// const Menuitem = () => {

//   // const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("Favorite");

//   useEffect(() => {
//     fetchCategories();
//   }, [activeCategory]);

//   // const [favorites, setFavorites] = useState([]);

//   // const fetchFavorites = async() => {
//   //   const response = await callApiFavorites('', 'GET');
//   //   const modifiedData = response.favori?.map((item) => {
//   //     return {
//   //       nameCategory: item.strCategory,
//   //     }
//   //   });

//   //   setFavorites(modifiedData);
//   // }

//   const fetchCategories = async() => {
//     const response = await callApi(`/categories.php`, 'GET');
//     const modifiedData = response.categories?.map((item) => {
//       return {
//         nameCategory: item.strCategory,
//       }
//     });

//     setCategories(modifiedData.slice(0, 6));
//   }

//   const handleActive = (value) => {
//     setActiveCategory(value);
//   }
//   return (
//     <div className={classes.menuItem}>
//           {categories && categories.map((category, index) => (
//             <Button variant='p' key={index} onClick={() => handleActive(category.nameCategory)} className={activeCategory === category.nameCategory ? classes.activeCategory : classes.nonActiveCategory}>{category.nameCategory}</Button>
//           ))}
//           <Button variant='p' onClick={() => {handleActive('Favorite'), navigate(`../favorite`)}} className={activeCategory === "Favorite" ? classes.activeCategory : classes.nonActiveCategory}>Favorite</Button>
//       </div>
//   )
// }

// export default Menuitem