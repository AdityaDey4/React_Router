import { useState, useEffect, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import api from './api/posts';
import { format } from "date-fns";
import DataContext from "./context/DataContext";


const EditPost = () => {

    const history = useHistory();
    const {posts, setPosts} = useContext(DataContext);
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const { id } = useParams();
    const post = posts.find(post=> (post.id).toString()===id);

    useEffect(()=> {
        if(post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [posts, setEditBody, setEditTitle]);
    
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