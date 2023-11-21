import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Description } from '../components/Description'
import Hero from '../components/Hero'

export const LandingPage = () => {
  return (
    <HelmetProvider>
      <div className='landing'>
        <Helmet>
          <title>Request a Home Project Estimate</title>
          <meta
            name="description"
            content="Welcome to the Kalan landing page. Discover an introduction from Kalan and access quick project estimates or schedule an appointment with ease."
          />
        </Helmet>
        <div className='hero'>
          <Hero />
        </div>
        <div className='heroDescription'>
        <Description />
        </div>
      </div>
    </HelmetProvider>
  )
}
