import { Menu } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes , Route} from "react-router-dom";
import Menubar from "./components/Menubar.jsx";
import Footer from "./components/footer.jsx";
import LandingPage from "./pages/Landingpage/Landingpage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Mainpagee from "./pages/Mainpagee.jsx";
import PreviewPage from "./pages/Previewpage.jsx";
import Register from "./pages/Login/signup/registration.jsx";
import Login from "./pages/Login/login.jsx";
import Invoice from "./pages/Invoice.jsx"
import InvoicePreview from "./pages/InvoicePreview.jsx";
import './App.css';

 
 
 
 const App = () => {

    return (
    <BrowserRouter>

    <Menubar />
    <Toaster />

    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mainpage" element={<Mainpagee />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/invoicepreview" element={<InvoicePreview />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}/>
      </Routes>

    <Footer />
    </BrowserRouter>
    );
  }
export default App;