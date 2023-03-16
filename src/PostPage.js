import { useParams, Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";
import api from './api/posts';

const PostPage = () => {

    const history = useHistory();
    const { posts, setPosts } = useContext(DataContext);
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);

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
      <main className="PostPage">
          <article className="post">
              { post && 
                <>

                    <h2>{post.title}</h2>
                    <p className="postDate">{post.datetime}</p>
                    <p className="postBody">{post.body}</p>
                    <Link to={"/edit/"+post.id}><button className="editButton">Edit</button></Link>
                    <button className="deleteButton" onClick={()=> handleDelete(id)}>Delete</button>
                </>
              }

              {!post && 
                <>

                    <h2 style={{textAlign:"center"}}>Page Not Found</h2>
                    <p style={{textAlign:"center"}}>
                      <Link to="/">Visit Our Home Page</Link>
                    </p>
                </>
              }
          </article>
      </main>
    )
  }
  
  export default PostPage;