import { Menu } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes , Route} from "react-router-dom";
import Menubar from "./components/Menubar.jsx";
import Footer from "./components/footer.jsx";
import LandingPage from "./pages/Landingpage/Landingpage.jsx";
import Mainpagee from "./pages/Mainpagee.jsx";
import AboutUs from "./pages/aboutus.jsx";
import Register from "./pages/Login/signup/registration.jsx";
import Login from "./pages/Login/login.jsx";
import Invoice from "./components/Invoice.jsx"
import InvoicePreview from "./components/invoicepreview.jsx";
import InvoiceUpdate from "./components/invoiceupdate.jsx";
import Invoicedelete from "./components/invoicedelete.jsx";
import Userprofile from "./pages/userprofile.jsx";
import ContactUs from "./pages/contactus.jsx";
import Adminpage from "./pages/admin.jsx";
import AdminUsers from "./pages/adminUsers.jsx";
import AdminInvoices from "./pages/adminInvoices.jsx";
import './App.css';

 
 
 
 const App = () => {

    return (
    <BrowserRouter>

    <Menubar />
    <Toaster />

    <Routes>
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/" element={<Mainpagee />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/invoicepreview" element={<InvoicePreview />} />
        <Route path="/invoiceupdate/:id" element={<InvoiceUpdate />} />
        <Route path="/invoicedelete" element={<Invoicedelete />} />
        <Route path="/userprofile" element={<Userprofile />} />
        <Route path="/admin" element={<Adminpage />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/invoices" element={<AdminInvoices />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}/>
      </Routes>

      <Toaster />
      <Footer />
    </BrowserRouter>
    );
  }
export default App;