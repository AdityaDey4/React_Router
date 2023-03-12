import { useParams, Link } from "react-router-dom";

const PostPage = ({ posts, handleDelete }) => {

    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    return (
      <main className="PostPage">
          <article className="post">
              { post && 
                <>

                    <h2>{post.title}</h2>
                    <p className="postDate">{post.datetime}</p>
                    <p className="postBody">{post.body}</p>
                    <button onClick={()=> handleDelete(id)}>Delete</button>
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