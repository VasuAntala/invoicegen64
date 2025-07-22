const LandingPage = () => {
    return (
        <div className="container">
            <div>
        landing page
            </div>

            <div>
        <button className="btn btn-primary rounded-pill px-4" onClick={() => window.location.href='/mainpage'}>
            Go to Main Page
        </button>


            </div>

        {/* Additional content can be added here */}
        </div>
    );
    }

export default LandingPage;