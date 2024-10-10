import React, { useEffect, useState } from 'react'
import productData from '../../data/product.json'
import Productcart from './Productcart'
import Shopfiltering from './Shopfiltering'
import { useFetchAllProductsQuery } from '../../Redux/feature/product/productapi'

const filters = {
  categories: ['all', 'accessories', 'dress', 'jewelry', 'cosmetics'],
  colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'green', 'beige'],
  priceRange: [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50-$100', min: 50, max: 100 },
    { label: '$100-$200', min: 100, max: 200 },
    { label: '$200-above', min: 200, max: Infinity }
  ]
}

const ShopPage = () => {
  const [filtersState, setFiltersState] = useState({
    category: 'all',
    color: 'all',
    priceRange: ''
  })

  const [current, setCurrentPage] = useState(1)
  const [ProductsPerPage] = useState(8)

  const { category, color, priceRange } = filtersState
  let minPrice = '', maxPrice = ''
  
  if (priceRange) {
    [minPrice, maxPrice] = priceRange.split('-').map(Number)
  }

  const { data: { products = [], totalPage, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
    category: category !== 'all' ? category : '',
    color: color !== 'all' ? color : '',
    minPrice: isNaN(minPrice) ? '' : minPrice,
    maxPrice: isNaN(maxPrice) ? '' : maxPrice,
    page: current,
    limit: ProductsPerPage
  })

  // clear filter
  const clearFilter = () => {
    setFiltersState({
      category: 'all',
      color: 'all',
      priceRange: ''
    })
  }

  // handle paginating
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPage) {
      setCurrentPage(pageNumber)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error in loading</div>
  }

  const startProduct = (current - 1) * ProductsPerPage + 1
  const endProduct = startProduct + products.length - 1

  return (
    <>
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Shop Page</h2>
        <p className='section__subheader'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta culpa elige
        </p>
      </section>
      <section className='section__container'>
        {/* left */}
        <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
          <Shopfiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilter={clearFilter}
          />

          {/* right */}
          <div>
            <h3 className='text-xl font-medium mb-4'>Showing {startProduct} to {endProduct} of {totalProducts} products</h3>
            <Productcart products={products} />

            {/* pagination controls */}
            <div className='mt-6 flex justify-center'>
              <button
                disabled={current === 1}
                onClick={() => handlePageChange(current - 1)}
                className='px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-2'
              >
                Previous
              </button>

              {
                [...Array(totalPage)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 ${current === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md mx-1`}
                  >
                    {index + 1}
                  </button>
                ))
              }

              <button
                disabled={current === totalPage}
                onClick={() => handlePageChange(current + 1)}
                className='px-4 py-2 bg-gray-300 text-gray-800 rounded-md ml-2'
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ShopPage
