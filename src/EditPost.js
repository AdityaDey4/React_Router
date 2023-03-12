import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditPost = ({
    posts,
    handleEdit,
    editTitle,
    setEditTitle,
    editBody,
    setEditBody
}) => {

    const { id } = useParams();
    const post = posts.find(post=> (post.id).toString()===id);

    useEffect(()=> {
        if(post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [posts, setEditBody, setEditTitle]);
  return (
    <main className="NewPost">
        {editTitle && 
        <>
            <h2>Edit Post</h2>
            <form className="newPostForm" onSubmit={(e)=> e.preventDefault()}>
            <label htmlFor="postTitle">Title</label>
            <input
                id="postTitle"
                type="text"
                placeHolder="title"
                value={editTitle}
                onChange={(e)=> setEditTitle(e.target.value)}
                required
            />

            <label htmlFor="postBody">Body</label>
            <textarea
                id="postBody"
                placeHolder="title"
                value={editBody}
                onChange={(e)=> setEditBody(e.target.value)}
                required
            />
            <button type="submit" onClick={()=> handleEdit(post.id)}>Submit</button>
            </form> 
        </>}  

        {!editTitle && 
            <>
                <h2 style={{textAlign:"center"}}>Post Not Found</h2>
                <p style={{textAlign:"center"}}>
                    <Link to="/">Visit Our Home Page</Link>
                </p>
            </>
        } 
    </main>
  )
}

export default EditPost;