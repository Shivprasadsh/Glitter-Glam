import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Ratingstaer from '../../compents/RatingStar'
import { useDispatch } from 'react-redux'
import { useFetchProductByIdQuery } from '../../Redux/feature/product/productapi'
import { addToCart } from '../../Redux/feature/cart/cartfile'
//import ReviewCart from './reviews/reviews'


const Singleproduct = () => {
    const {id} = useParams()
    const dispatch = useDispatch();
    const {data,error ,isLoading} = useFetchProductByIdQuery(id)


    const singleProduct = data?.product ||{};
    const productReview = data?.reviews || []

    const handleAddToCart = (product) =>{
      dispatch(addToCart(product))
    }

    if(isLoading) return <p>Loading ...</p>
    if(error) return <p>Error in loading</p>
  return (
    <>

<section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Product</h2>
        <div className='section__subheader space-x-2'>
        <span className='hover:text-primary'>
            <Link to='/'>Home</Link> 
        </span>
        <span className='hover:text-primary'><Link to='/shop'>Shop</Link>
        </span>

       <span className='hover:text-primary'>{singleProduct.name}</span>
       </div>
        
      </section>

      <section className='section__container mt-8'>
        
        <div className='flex flex-col items-center md:flex-row gap-8'>
        <div className='md:w-1/2 w-full'>
            <img src = {singleProduct?.image} />
        </div>
        <div className='md:w-1/2 w-full'>
        <h3 className='text-2xl font-semibold mb-4'>{singleProduct.name}</h3>
        <p className='text-xl text-primary mb-4'>${singleProduct?.price}
          {singleProduct?.oldPrice &&   <s>${singleProduct?.oldPrice}</s>}
         </p>
        <p className='text-gray-400 mb-4'>{singleProduct?.description}</p>


        <div className='flex flex-col space-y-2'>
            <p><strong>Category:</strong> <strong>{singleProduct?.category}</strong></p>
            <p><strong>Color:</strong> <strong>{singleProduct?.color}</strong></p>

            <div className='flex gap-1 items-center'>
                <strong>Rating</strong>
                <Ratingstaer rating={singleProduct?.rating}/>
            </div>

        </div>
        <button 
        onClick={(e)=>{
          e.stopPropagation();
         handleAddToCart(singleProduct)
        }}
        className='mt-6 px-6 py-3 bg-primary text-white'>
           Add to Cart 
        </button>

        </div>

        </div>

      </section>

      {/* display
      <section className='section__container'>
        <ReviewCart productReview ={productReview}/>
      </section> */}
    </>
  )
}

export default Singleproduct


