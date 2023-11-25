import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Description } from '../components/Description'
import Hero from '../components/Hero'

export const LandingPage = () => {
  return (
    <HelmetProvider>
        <Helmet>
          <title>Request a Home Project Estimate</title>
          <meta
            name="description"
            content="Welcome to Schedule.builders. Discover an introduction to our services and access quick project estimates or schedule an appointment with ease."
          />
        </Helmet>
      <div className='landing'>
        <div className='hero'>
          <Hero h2='ready when you are.'
                paragraph='In need of contractors for hire? We will present multiple companies tailored to your needs and give you 50% of our fee.'
                img='hero3.webp' 
                button1Href='/create-project'
                button1Text='Submit Project'
                button2Href='/about'
                button2Text='Learn more'/>
        </div>
        <div className='heroDescription mb-5'>
        <Description />
        </div>
      </div>
    </HelmetProvider>
  )
}
