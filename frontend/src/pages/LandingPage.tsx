import React from 'react'
import { Helmet } from 'react-helmet'
import Hero from '../components/Hero'

export const LandingPage = () => {
  return (
    <div className='landing'>
      <Helmet>
        <title>Landing Page</title>
        <meta
          name="description"
          content="Welcome to the Kalan landing page. Discover an introduction from Kalan and access quick project estimates or schedule an appointment with ease."
        />
      </Helmet>
      <div className='hero'>
      <Hero />
      </div>
    </div>
  )
}
