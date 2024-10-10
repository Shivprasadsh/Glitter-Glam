import React from 'react'

const Footer = () => {
  return (
    <>
       <footer className='section__container footer__container'>
        <div className='footer__col'>
            <h4>Contact Info</h4>
            <p>
                <span>
                    <i className='ri-map-pin-2-fill'></i>
                </span>
                369, Arror Road,Cherthala
            </p>
            <p>
                <span>
                    <i className='ri-mail-fill'></i>
                </span>
                <sup>shiv@gmail.com</sup>
            </p>
            <p>
                <span>
                    <i className='ri-phone-fill'></i>
                </span>
               9847107802
            </p>

        </div>

        <div className='footer__col'>
            <h4>Company</h4>
            <a href="">Home</a>
            <a href="">About Us</a>
            <a href="">Join Us</a>
            <a href="">Terms & condition</a>

        </div>

        <div className='footer__col'>
            <h4>    Help</h4>
            <a href="">Track order</a>
            <a href="">Men</a>
            <a href="">Women</a>
            <a href="">Dressess</a>

        </div>
        <div className='footer__col'>
            <h4>Social Media</h4>
            <p>
                <span>
                <i className="ri-chat-2-fill"></i>
                </span>
                Instagram
            </p>
            <p>
                <span>
                <i className="ri-chat-2-fill"></i>
                </span>
                Facebook
            </p>
            <p>
                <span>
                    <i className="ri-chat-2-fill"></i>
                </span>
               Twitter
            </p>

        </div>
        <div className='footer__bar'>
            Copyright @ 2025  by Shiva All rights reserverd.
        </div>


        </footer>
    
    </>
  )
}

export default Footer
