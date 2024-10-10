import React from 'react'
import dealImg from '../../assets/deals.png'

const Deal = () => {
  return (
    <section className='section__container deals__container'>
        <div className='deals__image'>
            <img src={dealImg}alt="" />
        </div>
        <div className='deals__content'>
            <h5>Get Up To 20% Discount</h5>
            <h4>Deals of the Month</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, perferendis unde aspernatur pariatur voluptatibus bland</p>
            <div className='deals__countdown flex-wrap'>
              <div className='deals__countdown--card'>
                <h4>14</h4>
                <p>Days</p>

              </div>
              <div className='deals__countdown--card'>
                <h4>20</h4>
                <p>hours</p>

              </div>
              <div className='deals__countdown--card'>
                <h4>6</h4>
                <p>Min</p>

              </div>
              <div className='deals__countdown--card'>
                <h4>50</h4>
                <p>Sec</p>

              </div>
            </div>
        </div>
    </section>
  )
}

export default Deal
