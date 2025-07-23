import Logo from './logo.jsx';
import { Link } from "react-router-dom";

const Manubar = () => { 
    return (
        <nav className= "navbar navbar-expand-lg navbar-light bg-light  bg-white shadow-sm sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/">
               <Logo />
                <span className="fw-bolder  fs-4 mx-3" style={{ letterSpacing: '-0.5px', color:'#0D6EFDB2'}}>
                    InvoiceGen
                </span>

                </Link>
          <button
           className="navbar-toggler" 
           type="button"
           data-bs-toggle="collapse"
           data-bs-target="#navbarNav" 
           aria-controls="navbarNav"
           aria-expanded="false" 
           aria-label="Toggle navigation"
           >
                
           
            <span className="navbar-toggler-icon"> </span>
 
        </button>
        
<div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ flexGrow: 0 }}>
  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">       
          <Link className="nav-link fw-medium" to='/mainpage'>
              Home
          </Link>          
      </li>
      <li className="nav-item">
          <button className="nav-link fw-medium" to='/landingpage'>
            Generate
          </button>     
      </li>
      <li className="nav-item">
          <Link className="nav-link fw-medium" to='/preview'>
            About Us
          </Link>             
      </li>
      <li className="nav-item">
          <Link className="nav-link fw-medium" to='/dashboard'>
              Contact Us
          </Link>
      </li>
  </ul>

  {/* Add ms-auto class here to push this to right */}
  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <button 
            className="btn btn-primary rounded-pill px-4" 
            onClick={() => window.location.href='/register'}>
                Login/Signup
          </button>
      </li>
  </ul>
</div>

                </div>
                </nav>
    );
}

export default Manubar;
// <nav className="navbar navbar-expand-lg navbar-light bg-light">
//     <div className="container-fluid">
//         <a className="navbar-brand" href="#">Invoice Generator</a>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
//                 data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
//                 aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//         </button>
        // <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        //         <li className="nav-item">
        //             <a className="nav-link active" aria-current="page" href="/">Home</  a>
        //         </li>
        //         <li className="nav-item">       
        //             <a className="nav-link" href="/mainpagee">Main Page</a>
        //         </li>
        //         <li className="nav-item">
        //             <a className="nav-link" href="/dashboard">Dashboard</a>
        //         </li>
        //         <li className="nav-item">
        //             <a className="nav-link" href="/previewpage">Preview Page</a>
        //         </li>
        //         <li className="nav-item">
        //             <a className="nav-link" href="/landingpage">Landing Page</a>
        //         </li>
        //     </ul>
//             <form className="d-flex" role="search">
//                 <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
//                 <button className="btn btn-outline-success" type="submit">Search</button>
//             </form>
//         </div>
//     </div>
// </nav>      