import React from 'react'
import { Footer } from '../components/Footer'
import Hero from '../components/Hero'
import { Login } from '../components/Login'

export const LandingPage = () => {
  return (
    <div className='landing'>
      <Login />
      <Hero />
      <Footer />
    </div>
  )
}
