import React from 'react'
import Navbar from './components/Navbar'

export default function Layout(props) {
  return (
    <div>
      {/* Layout of the Website */}
      <Navbar/>
      <props.Child/>
    </div>
  )
}
