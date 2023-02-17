import React from 'react';
import './Post.css';
import { Link } from 'react-router-dom';

const Post = ( {postMapped }) => {
  return (
    <article>
        <Link to={`/post/${postMapped.id}`}>
            <h2>{postMapped.title}</h2>
            <p>{postMapped.datetime}</p>
        </Link>
        <p className='article'>{
            (postMapped.body).length <= 25
                ? postMapped.body
                : `${(postMapped.body).slice(0, 45)}...`
        }</p>
    </article>
  )
}

export default Post 