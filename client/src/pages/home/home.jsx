import React from 'react'
import Banner from './banner'
import Catagories from './Catagories'
import Herosection from './Herosection'
import TrendProduct from '../shop/trendProduct.jsx'
import Deal from './Deal.jsx'
import Promobanner from './Promobanner.jsx'



const Home = () => {
  return (
    <>
    <Banner/>
    <Catagories/>
    <Herosection/>
    <TrendProduct/>
    <Deal/>
    <Promobanner/>
    
    </>
  )
}

export default Home
