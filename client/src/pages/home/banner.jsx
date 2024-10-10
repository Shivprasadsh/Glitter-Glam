import React from 'react'
import { Link } from 'react-router-dom'
import bannerImg from '../../assets/header.png'

const Banner = () => {
  return (
    <div className='section__container header__container'>
        <div className='header__content'>
            <h4>UP TO 20% Discount</h4>
            <h1 className='head_h1'>Girl's Fashion</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum magnam commodi non quibusdam placeat, fugit iste voluptatum libero ex. Numquam commodi harum nemo nulla sit amet animi fuga eligendi quos!</p>
           <button className='btn'><Link to='/shop'>EXPLORE NOW</Link></button>
        </div>
        <div className='header__image'>
            <img src={bannerImg} alt="banner IMgae" />
        </div>
    </div>
  )
}

export default Banner
