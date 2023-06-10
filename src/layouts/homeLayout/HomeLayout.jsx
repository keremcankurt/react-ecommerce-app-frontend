import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/header/Header'

export default function HomeLayout({selectedImage, setSelectedImage}) {
  
  
  return (
    <>
    <Header setSelectedImage={setSelectedImage} selectedImage={selectedImage}/>
    <Outlet/>
    </>
  )
}
