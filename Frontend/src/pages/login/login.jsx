const Login = () => {
    return (
        <div className="container">
            <div className='main-content-login'> 
            <div className="form-group">
             <h5> Registration Page </h5>
                <form>

                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" />

                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" />

                    <label htmlFor="terms">
                        <input type="checkbox" id="terms"  className="form-check-input" />
                         I agree to the terms and conditions
                    </label>
                    <br />
                    <button type="submit" className="btn btn-primary mt-3" onClick={() => window.location.href='/mainpage'} >Register</button>

                    <a href='/register'>Already have an account? Login</a>

                </form>

            </div>
            {/* Additional content can be added here */}
            </div>
        </div>
    );
}       

export default Login;