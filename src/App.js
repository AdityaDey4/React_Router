import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import About from "./About";
import Missing from "./Missing";
import { Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import api from './api/posts'



function App() {

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  
  const history = useHistory();

  useEffect(()=> {
      const fetchPosts = async ()=> {
        try {
          const response = await api.get("/posts") // "/posts" is endpoint"
          setPosts(response.data);
        }catch(err) {

          // Not in the 200 responce range
          if(err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          }else {
            console.log("Error : "+err.message);
          }
        }
      }

      fetchPosts();
  }, []);

  useEffect(()=> {
      const filteredResults = posts.filter(post=> (
        (post.body.toLowerCase()).includes(search.toLocaleLowerCase())
        || (post.title.toLowerCase()).includes(search.toLocaleLowerCase())
      ));

      setSearchResults(filteredResults.reverse()); // to see old searched results first
  }, [posts, search]);

  const handleSubmit = async (e)=> {
    e.preventDefault();
    const id = posts.length ? posts[posts.length-1].id+1 : 1;
    const dateTime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = {id: id, title: postTitle, datetime: dateTime, body: postBody};
    
    try {

      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];

      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      history.push('/');
    } catch(err) {
      console.log("Error : "+err.message);
    }
  }

  const handleEdit = async (id) => {
    const dateTime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = {id: id, title: editTitle, datetime: dateTime, body: editBody};

    try {
      const response = await api.put("/posts/"+id, updatedPost);
      setPosts(posts.map(post=> post.id.toString() === id ? (response.data) : post));
      setEditTitle("");
      setEditBody("");
      history.push("/");
    }catch(err) {
      console.log("Error : "+err.message);
    }
  }
  // patch is used for updating the specific post
  // put is used for updating the entire post

  const handleDelete = async (id) => {

    try{
      await api.delete("/posts/"+id);
      const postList = posts.filter(post => post.id.toString() !== id);
      setPosts(postList);
      history.push('/');
    } catch(err) {
      console.log("Error : "+err.message);
    }
  }

  return (
    <div className="App"> 
      <Header title="React JS Blog"/>
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      <Switch>

        <Route exact path="/" >
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

        <Route exact path="/edit/:id">
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
