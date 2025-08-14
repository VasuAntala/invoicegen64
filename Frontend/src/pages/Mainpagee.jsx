import "./Mainpagee.css";
import invoice from "../assets/invoice.jpg";
import invoice1 from "../assets/invoice1.jpg";

const Mainpagee = () => {
    return (
        <div className="container">
            <div className="main-content">
                <div className="image-container">
                    <h1>Welcome To Invoice Generator</h1>
                    <p>Create and manage your invoices easily.</p>
                    <p>Get started by generating your first invoice.</p>
                    <div className="button-container">
                        <button className="btn rounded-pill px-4" onClick={() => window.location.href = '/invoice'}>
                            Generate Invoice
                        </button>
                    </div>

                    <div className="button-container">
                        <button className="btn  rounded-pill px-4" onClick={() => window.location.href = '/register'}>
                            Login/Sign Up
                        </button>
                    </div>
                </div>
            </div>

            {/* <div className="blue-container">
                
                <div className="image-container">
                    <img src={invoice} alt="Invoice Example 1" className="invoice-image" />
                    <img src={invoice1} alt="Invoice Example 2" className="invoice-image" />
                </div>
            </div> */}
        </div>
    );
}
export default Mainpagee;
