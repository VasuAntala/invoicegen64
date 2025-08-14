import React from "react";
import "./aboutus.css";

export default function AboutUs() {
  return (
    <div className="about-container">
      <h1>About Our Invoice Management System</h1>
      <p>
        Welcome to our <strong>Smart Invoice Management System</strong> —
        designed to simplify the way you create, manage, and track invoices.
        Whether you are a business owner, freelancer, or accountant, our
        solution offers an intuitive and efficient way to handle your billing
        needs.
      </p>

      <section>
        <h2>What We Offer</h2>
        <ul>
          <li>
            <strong>Create Invoices:</strong> Quickly generate invoices with
            customizable sender & recipient details.
          </li>
          <li>
            <strong>GST Calculations:</strong> Automatic CGST, SGST, and total
            amount computations.
          </li>
          <li>
            <strong>Live Preview & PDF:</strong> Preview invoices and
            download/share them as a PDF.
          </li>
          <li>
            <strong>Update & Delete:</strong> Modify existing invoices or remove
            outdated records.
          </li>
          <li>
            <strong>User-Specific Management:</strong> Log in to view and manage
            only your own invoices.
          </li>
        </ul>
      </section>

      <section>
        <h2>How It Works</h2>
        <ol>
          <li>Fill out your business details and client information.</li>
          <li>Add items with quantity, GST rate, and price.</li>
          <li>Our system calculates GST (CGST & SGST) and totals instantly.</li>
          <li>Save your invoice to our secure backend database.</li>
          <li>Preview, download, or share the generated PDF.</li>
        </ol>
      </section>

      <section>
        <h2>Behind the Technology</h2>
        <p>
          This app is built using the <strong>MERN stack</strong> with
          React.js frontend and Axios for API communication. The backend
          handles invoice storage, retrieval, updating, and deletion. We
          integrate <strong>jspdf</strong> and <strong>html2canvas</strong> for
          high-quality PDF generation so that you can store or print your
          invoices anytime.
        </p>
      </section>

      <section>
        <h2>Our Vision</h2>
        <p>
          Our mission is to help small businesses, freelancers, and companies
          digitize their billing process, save time, and increase productivity
          — while ensuring compliance with GST requirements.
        </p>
      </section>


    </div>
  );
}
