import React from 'react'
import card1 from '../../assets/card-1.png'
import card2 from '../../assets/card-2.png'
import card3 from '../../assets/card-3.png'



const cards = [
    {id: 1,
    Image:card1,
    trend:'2024 Trend',
    title:'Women Shirt'
},
  {
    id: 2,
    Image:card2,
    trend:'2024 Trend',
    title:'Women Dresses'
},
{
    id: 3,
    Image:card3,
    trend:'2024 Trend',
    title:'Women Causals'
}

]

const Herosection = () => {
  return (
    <section className='section__container hero__container'>
        {
            cards.map((card)=>(
                <div key={card.id} className='hero__card'>
                    <img src={card.Image} alt="" />
                    <div className='hero__content'>
                        <p>{card.trend}</p>
                        <h4>{card.title}</h4>
                        <a href="#">Discover More</a>
                    </div>
                </div>
            ))
        }
    </section>
  )
}

export default Herosection
