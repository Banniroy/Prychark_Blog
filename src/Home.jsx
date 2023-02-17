import React from 'react'
import './Home.css'
import Feed from './Feed';

const Home = ({ posts }) => {
  return (
    <main>
        {posts.length ? (
          <Feed posts={posts} /> 
        ) : (
          <p style={{marginTop: '3rem'}}>
            No posts to display.
          </p>
        )}
    </main>
  )
}

export default Home