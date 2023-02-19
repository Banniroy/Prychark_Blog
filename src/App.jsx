import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home.jsx";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import About from "./About";
import Missing from "./Missing";
import { Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import api from './api/posts';

function App() {

  const [posts, setPosts] = useState([])

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data)
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    const filteredResults = posts.filter(post => ((post.body).toLocaleLowerCase()).includes(search.toLocaleLowerCase())
      || ((post.title).toLocaleLowerCase()).includes(search.toLocaleLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody }
    try {
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle();
      setPostBody('');
      history.push('/');
    } catch (error) {
      console.log(`Error: ${error}`)
    }

  }

  const handleEdit = async () => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatePost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatePost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
      setEditTitle('');
      setEditBody('');
      history.push('/');

    } catch (error) {
      console.log(`Error: ${error}`)
    }

  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      history.push('/');
    } catch (error) {
      console.log(`Error: ${error}`)
    }

  }

  return (
    <div className="App">
      <Header title="Prychark Blog" />
      <Nav
        search={search}
        setSearch={setSearch}
      />
      <Switch>
        <Route exact path="/">
          <Home
            posts={searchResults}
          />
        </Route>
        <Route exact path="/post">
          <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />
        </Route>
        <Route path="/edit/:id">
          <EditPost
            posts={posts}
            handleEdit={handleEdit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
          />
        </Route>
        <Route path="/post/:id">
          <PostPage
            posts={posts}
            handleDelete={handleDelete}
          />
        </Route>
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
