// import { useEffect, useState } from 'react';
// import * as jwt_decode from 'jwt-decode';
import Logo from './logo.jsx';
import { Link } from "react-router-dom";

const Manubar = () => {
    //   const [username, setUsername] = useState("");

    // useEffect(() => {
    //   const token = localStorage.getItem("token");
    //   if (token) {
    //     try {
    //       const decoded = jwt_decode.default(token);
    //       if (decoded.username) {
    //         setUsername(decoded.username);
    //       }
    //     } catch (err) {
    //       console.error("Invalid token", err);
    //     }
    //   }
    // }, []);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light  bg-white shadow-sm sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <Logo />
                    <span className="fw-bolder  fs-4 mx-3" style={{ letterSpacing: '-0.5px', color: '#0D6EFDB2' }}>
                        InvoiceGen
                        {/* { localStorage.getItem('username') === null ? 'Guest' : localStorage.getItem('username')} */}
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
                            <Link className="nav-link fw-medium" to='/'>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" to='/invoice'>
                                Generate
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" to='/aboutus'>
                                About Us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" to='/contactus'>
                                Contact Us
                            </Link>
                        </li>
                        <br />
                    </ul>
                    <div className="username" onClick={() => window.location.href = '/userprofile'} style={{ cursor: 'pointer' }} >
                        👤{localStorage.getItem('username') === null ? 'Guest' : localStorage.getItem('username')}
                    </div>

                    {/* Add ms-auto class here to push this to right */}
                    {/* <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <button 
            className="btn btn-primary rounded-pill px-4" 
            onClick={() => window.location.href='/register'}>
                Login/Signup
          </button>
      </li>
  </ul> */}
                </div>

            </div>
        </nav>
    );
}

export default Manubar;
