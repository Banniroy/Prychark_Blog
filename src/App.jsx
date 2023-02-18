import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home.jsx";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";

function App() {

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'My First Post',
      datetime: 'July 01, 2021 11:23 AM',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim odio eum perferendis velit '
    },
    {
      id: 2,
      title: 'My Second Post',
      datetime: 'July 01, 2021 11:23 AM',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim odio eum perferendis velit voluptates vero earum? Ea sed, porro adipisci distinctio natus deleniti eius dolorem fuga dolorum, debitis, fugit tempore?'
    },
    {
      id: 3,
      title: 'My Third Post',
      datetime: 'July 01, 2021 11:23 AM',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim odio eum perferendis velit '
    },
    {
      id: 4,
      title: 'My Fourth Post',
      datetime: 'July 01, 2021 11:23 AM',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim odio eum perferendis velit '
    }
  ])

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const history = useHistory();

  useEffect(() => {
    const filteredResults = posts.filter(post => ((post.body).toLocaleLowerCase()).includes(search.toLocaleLowerCase())
    || ((post.title).toLocaleLowerCase()).includes(search.toLocaleLowerCase())
  );
  setSearchResults(filteredResults.reverse());
  }, [posts, search]) 

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length -1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody }
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    history.push('/');
  }

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    history.push('/');
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
