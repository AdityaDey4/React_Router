
const Footer = () => {
    const today = new Date();
    return (
      <footer className="Footer">
          <p>Copyright &copy; {today.getFullYear()} | all rights reserved</p>
      </footer>
    )
  }
  
  export default Footer;