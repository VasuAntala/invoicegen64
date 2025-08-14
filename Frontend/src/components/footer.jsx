import './footer.css';

const footer = () => {
    return (
        <footer className="footer">
            <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                © 2025 Invoice Generator
                <a className="text-dark" href=""> InvoiceGen</a>
            </div>
        </footer>
    );
}   

export default footer;