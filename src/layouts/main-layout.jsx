import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

export default function MainLayout({ children }) {
  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        {children}
        <Footer />
    </div>
  )
}
