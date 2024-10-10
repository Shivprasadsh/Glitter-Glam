import React, { useState } from 'react'
import productData from '../../data/product.json'
import Productcart from '../shop/Productcart'

const Search = () => {
    const [searchitem,setsearchItem] = useState('')
    const [filteredProduct,setfilteredProduct] =useState(productData)

    const handleSearch = ()=>{
        const query = searchitem.toLowerCase();
        const filtered = productData.filter(product => product.name.toLowerCase().includes(query)
    || product.description.toLowerCase().includes(query))

    setfilteredProduct(filtered);
    }

  return (
    <>
     <section className='section__container bg-primary-light'>
        <h2  className='section__header capitalize'>Search Product</h2>
        <p className='section__subheader'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta culpa elige</p>

     </section>
     <section className='section__container'>
        <div className='w-full mb-12 flex flex-col md:flex-row items-center'>
            <input type="text" 
            value={searchitem}
            onChange={(e)=>setsearchItem(e.target.value)}
            className='search-bar w-full max-w-4xl p-2 border rounded'
            placeholder='search for product'/>
            <button onClick={handleSearch} 
            className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white'>Search</button>
        </div>
        <Productcart products={filteredProduct}/>
     </section>
    </>
  )
}

export default Search
