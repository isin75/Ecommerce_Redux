import React from 'react'
import Header from './header'
import ProductCard from './common/productCards'
import Pagination from './common/pagination'

const Home = () => {
  return (
    <div className='h-screen'>
      <Header />
      <ProductCard />
      <Pagination />
    </div>
  )
}

Home.propTypes = {}

export default Home
