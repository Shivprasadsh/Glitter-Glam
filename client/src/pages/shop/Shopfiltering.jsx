import React from 'react'

const Shopfiltering = ({ filtersState, filters, setFiltersState, clearFilter }) => {
  return (
    <div className='space-y-5 flex-shrink-0'>
      <h3>Filter</h3>

      {/* Category */}
      <div className='flex flex-col space-y-2'>
        <h4 className='font-medium text-lg'>Category</h4>
        <hr />
        {filters.categories.map((category) => (
          <label key={category} className='capitalize cursor-pointer'>
            <input
              type='radio'
              name='category'
              value={category}
              checked={filtersState.category === category}
              onChange={(e) => setFiltersState({ ...filtersState, category: e.target.value })}
            />
            <span className='ml-1'>{category}</span>
          </label>
        ))}
      </div>

      {/* Color */}
      <div className='flex flex-col space-y-2'>
        <h4 className='font-medium text-lg'>Color</h4>
        <hr />
        {filters.colors.map((color) => (
          <label key={color} className='capitalize cursor-pointer'>
            <input
              type='radio'
              name='color'
              value={color}
              checked={filtersState.color === color}
              onChange={(e) => setFiltersState({ ...filtersState, color: e.target.value })}
            />
            <span className='ml-1'>{color}</span>
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className='flex flex-col space-y-2'>
        <h4 className='font-medium text-lg'>Price Range</h4>
        <hr />
        {filters.priceRange.map((range) => (
          <label key={range.label} className='capitalize cursor-pointer'>
            <input
              type='radio'
              name='priceRange'
              value={`${range.min}-${range.max}`}
              checked={filtersState.priceRange === `${range.min}-${range.max}`}
              onChange={(e) => setFiltersState({ ...filtersState, priceRange: e.target.value })}
            />
            <span className='ml-1'>{range.label}</span>
          </label>
        ))}
      </div>

      {/* Clear Filter Button */}
      <button
        className='mt-4 p-2 bg-red-500 text-white rounded'
        onClick={clearFilter}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default Shopfiltering
