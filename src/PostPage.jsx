import React from 'react'
import { useParams, Link } from 'react-router-dom';
import './PostPage.css';

const PostPage = ({ posts, handleDelete }) => {

  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);

  return (
    <main className='postPageMain'>
      <article className='PostPage'>
        {post &&
          <>
            <h2>{post.title}</h2>
            <p>{post.datetime}</p>
            <p>{post.body}</p>
            <Link to={`/ediit/${post.id}`}><button className='editButton'>Edit Post</button></Link>
            <button className='deleteButton' onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          </>
        }
        {!post &&
          <>
            <h2>Post Not  Found</h2>
            <p>Well, that's disappointing. </p>
            <p>
              <Link to='/'>Visit Our Homepage</Link>
            </p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage
