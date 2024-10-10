import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import products from '../../data/product.json'
import Productcart from '../shop/Productcart';

const Category = () => {
    const {categoryName} =useParams();
    const [filteredProduct,setfilteredProduct] =useState([])

    useEffect(()=>{
      const filtered = products.filter((product)=>product.category ===categoryName.toLowerCase())
     setfilteredProduct(filtered)
      
    },[categoryName])
  return (
    <>
     <section className='section__container bg-primary-light'>
        <h2  className='section__header capitalize'>{categoryName}</h2>
        <p className='section__subheader'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta culpa elige</p>

     </section>


     <div className='section__container'>
        <Productcart products={filteredProduct}/>
     </div>
    </>

  )
}

export default Category
