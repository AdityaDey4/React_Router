import { useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { format } from "date-fns";
import { useStoreState, useStoreActions } from "easy-peasy";


const EditPost = () => {

    const history = useHistory();
    const { id } = useParams();

    const posts = useStoreState((state)=> state.posts);
    const editTitle = useStoreState((state)=> state.editTitle);
    const editBody = useStoreState((state)=> state.editBody);

    const editPost = useStoreActions((actions)=> actions.editPost);
    const setEditTitle = useStoreActions((actions)=> actions.setEditTitle);
    const setEditBody = useStoreActions((actions)=> actions.setEditBody);
    
    const getPostById = useStoreState((state)=> state.getPostById);
    const post = getPostById(id);

    useEffect(()=> {
        if(post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [posts, setEditBody, setEditTitle]);
    
    const handleEdit = (id) => {
        const dateTime = format(new Date(), "MMMM dd, yyyy pp");
        const updatedPost = {id: id, title: editTitle, datetime: dateTime, body: editBody};
        editPost(updatedPost);
        history.push("/post/"+id);
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
            <button type="button" onClick={()=> handleEdit(post.id)}>Submit</button>
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