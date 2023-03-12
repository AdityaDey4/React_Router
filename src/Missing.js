import { Link } from "react-router-dom";
const Missing = () => {
    return (
      <main className="Missing">
          <h2 style={{textAlign:"center"}}>Page Not Found</h2>
          <p style={{textAlign:"center"}}>
            <Link to="/">Visit Our Home Page</Link>
          </p>
      </main>
    )
  }
  
  export default Missing;