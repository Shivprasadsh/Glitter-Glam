import React, { useState } from 'react'
import Productcart from './Productcart';
import products from '../../data/product.json'

const TrendProduct = () => {

  const [visibleProduct , setVisbleProduct] = useState(8)
  const loadMoreProducts =()=>{
    setVisbleProduct(prevCount => prevCount + 4)
  }
  return (
   <section className='section__container product__container'>
    <h2 className='section__header'>Trending Product</h2>
    <p className='section__subheader mb-12'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi earum consectetur corrupti, corporis et voluptat</p>
    <div className='mb-6'>
    <Productcart products={products.slice(0,visibleProduct)} />
    </div >


    <div className='product__btn'>
      {
        visibleProduct < products.length &&(
          <button className='btn' onClick={loadMoreProducts}>
            Load More
          </button>
        )
      }

    </div>
   </section>

  )
}

export default TrendProduct;
