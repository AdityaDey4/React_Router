
const NewPost = ({
  handleSubmit,
  postTitle,
  setPostTitle,
  postBody,
  setPostBody
}) => {
    return (
      <main className="NewPost">
          <h2>New Post</h2>
          <form className="newPostForm" onSubmit={handleSubmit}>
            <label htmlFor="postTitle">Title</label>
            <input
              id="postTitle"
              type="text"
              placeHolder="title"
              value={postTitle}
              onChange={(e)=> setPostTitle(e.target.value)}
              required
            />

            <label htmlFor="postBody">Body</label>
            <textarea
              id="postBody"
              placeHolder="title"
              value={postBody}
              onChange={(e)=> setPostBody(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
      </main>
    )
  }
  
  export default NewPost;