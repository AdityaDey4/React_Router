import Feed from "./Feed";

const Home = ({ posts }) => {
    return (
      <main className="Home">
          
          {posts.length ? ( 
            <Feed posts={posts} />
            // <p>{posts[1].title}</p>
          ) : (
            <p style={{marginTop:"2rem", textAlign:"center"}}>
              No posts to dispaly
            </p>
          ) }
      </main>
    )
  }
  
  export default Home;