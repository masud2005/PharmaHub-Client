import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Helmet } from 'react-helmet-async';

const Invoice = () => {
    const location = useLocation();
    const { email, name, price, status, transactionId } = location?.state?.paymentInfo || {};

    const exportToPDF = () => {
        const doc = new jsPDF();

        // Add website logo
        const imgUrl = "https://i.ibb.co/3k6MjsC/P-Logo.png"; // Logo URL
        doc.addImage(imgUrl, "PNG", 14, 10, 30, 15);

        // Add title
        doc.setFontSize(16);
        doc.text("Invoice", 100, 20, null, null, "center");

        // Add user information
        doc.setFontSize(12);
        doc.text(`Name: ${name || "Not Available"}`, 14, 40);
        doc.text(`Email: ${email || "Not Available"}`, 14, 50);

        // Add transaction details
        autoTable(doc, {
            head: [["Transaction ID", "Total Price", "Status"]],
            body: [
                [
                    transactionId || "Not Available",
                    `₹${price || "0"}`,
                    status || "Not Available",
                ],
            ],
            startY: 60,
            styles: { fontSize: 12 },
        });

        // Add footer
        doc.text("Thank you for your purchase!", 14, doc.internal.pageSize.height - 10);

        // Save PDF
        doc.save("Invoice.pdf");
    };

    return (
        <div>
            <Helmet>
                <title>Invoice || PharmaHub</title>
            </Helmet>
            {/* Invoice Content */}
            <div className="max-w-4xl mx-auto p-10 bg-white shadow-lg my-10 border">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center">
                        <img
                            src="https://i.ibb.co/3k6MjsC/P-Logo.png"
                            alt="Logo"
                            className="h-16"
                        />
                    </div>
                    <h2 className="text-2xl font-bold">Invoice</h2>
                </div>

                {/* User Information */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold">User Information</h3>
                    <p><strong>Name:</strong> {name || "Not Available"}</p>
                    <p><strong>Email:</strong> {email || "Not Available"}</p>
                </div>

                {/* Purchase Information */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold">Purchase Information</h3>
                    <p><strong>Transaction ID:</strong> {transactionId || "Not Available"}</p>
                    <p><strong>Total Price:</strong> ₹{price || "0"}</p>
                    <p><strong>Status:</strong> {status || "Not Available"}</p>
                </div>

                {/* Print Button */}
                <div className="flex justify-end">
                    <button
                        onClick={exportToPDF}
                        className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
                    >
                        Print / Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
