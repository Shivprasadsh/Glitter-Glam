import React from 'react';
import category1 from '../../assets/category-1.jpg';
import category2 from '../../assets/category-2.jpg';
import category3 from '../../assets/category-3.jpg';
import category4 from '../../assets/category-4.jpg';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    { name: 'Accessories', path: 'accessories', Image: category1 },
    { name: 'Dress Collection', path: 'dress', Image: category2 },
    { name: 'Jewellery', path: 'jewellery', Image: category3 },
    { name: 'Cosmetic', path: 'cosmetic', Image: category4 }
  ];

  return (
    <>
      <div className="productgrid">
        {categories.map((category) => (
          <Link to={`/categories/${category.path}`} className="categories__card" key={category.path}>
            <img src={category.Image} alt={category.name} />
            <h4>{category.name}</h4>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Categories;
