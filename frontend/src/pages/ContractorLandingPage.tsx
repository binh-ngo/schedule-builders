import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Description } from '../components/Description'
import Hero from '../components/Hero'

export const ContractorLandingPage = () => {

  return (
    <HelmetProvider>
      <div className='landing'>
        <Helmet>
          <title>Sign up and Create a Personalized Form</title>
          <meta
            name="description"
            content="Welcome to the Schedule.builders contractor landing page. Discover an introduction to our services and business plan to grow your online presence and customer base."
          />
        </Helmet>
        <div className='hero'>
          <Hero h2="let's work together!"
                paragraph='Looking to get more jobs? Sign up or create your own customizable form above and we will work on getting you noticed!'
                img='hero2.webp' 
                button1Href='/create-contractor'
                button1Text='Sign up!'
                button2Href='/contractor/create-form'
                button2Text='Try it out!'/>
        </div>
        <div className='heroDescription mb-5'>
        <Description />
        </div>
      </div>
    </HelmetProvider>
  )
}
