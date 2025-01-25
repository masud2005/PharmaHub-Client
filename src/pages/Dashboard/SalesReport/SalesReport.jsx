import React, { useState } from "react";
import DataTable from "react-data-table-component";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";

const SalesReport = () => {
    const axiosSecure = useAxiosSecure();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Fetch payments data
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const res = await axiosSecure.get("/payments");
            console.log(res.data);
            return res.data;
        },
    });

    // Filter data by date range
    const filteredData = payments.filter((item) => {
        const itemDate = new Date(item.date); // `item.date` কে Date Object এ রূপান্তর
        const adjustedEndDate = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;

        return (
            (!startDate || itemDate >= startDate) && // startDate এর সাথে তুলনা
            (!adjustedEndDate || itemDate <= adjustedEndDate) // adjustedEndDate এর সাথে তুলনা
        );
    });


    // Export data to CSV/XLSX
    const exportToCSV = () => {
        const customData = filteredData.map((item) => ({
            "Transaction ID": item.transactionId || "N/A",
            "Medicine Name": (item.medicinesName || []).join(", "),
            "Seller Email": (item.sellerEmail || []).join(", "),
            "Buyer Email": item.email || "N/A",
            "Total Price (₹)": `₹${item.price || 0}`,
            Status: item.status || "N/A",
        }));

        const worksheet = XLSX.utils.json_to_sheet(customData);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");

        XLSX.writeFile(workbook, "Sales_Report.xlsx");
    };


    // Export data to PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Sales Report", 14, 10);

        const tableData = filteredData.map((item) => [
            item.transactionId || "N/A",
            (item.medicinesName || []).join(", "),
            (item.sellerEmail || []).join(", "),
            item.email || "N/A",
            `$ ${item.price}` || "N/A",
            item.status || "N/A",
        ]);

        autoTable(doc, {
            head: [["Transaction ID", "Medicine Name", "Seller Email", "Buyer Email", "Total Price", "Status"]],
            body: tableData,
            startY: 20, // Adjust starting position
            styles: { fontSize: 10 }, // Adjust font size
            columnStyles: {
                0: { cellWidth: 30 }, // Transaction ID
                1: { cellWidth: 30 }, // Medicine Name
                2: { cellWidth: 40 }, // Seller Email
                3: { cellWidth: 40 }, // Buyer Email
                4: { cellWidth: 20 }, // Total Price
                5: { cellWidth: 20 }, // Status
            },
            margin: { top: 10 },
        });


        doc.save("Sales_Report.pdf");
    };

    // Columns configuration for DataTable
    const columns = [
        {
            name: "#",
            cell: (row, index) => {
                return <span className="text-base text-gray-700">{index + 1}</span>;
            },
            width: "50px",
        },
        {
            name: "Date",
            // selector: (row) => row.date || "N/A",
            selector: (row) => (
                <span className="text-base text-gray-700">{row.date || "N/A"}</span>
            ),
        },
        {
            name: "Transaction ID",
            // selector: (row) => row.transactionId || "N/A",
            selector: (row) => (
                <span className="text-base text-gray-700">{row.transactionId || "N/A"}</span>
            ),
        },
        {
            name: "Medicine Name",
            // selector: (row) => (row.medicinesName || []).join(", "),
            selector: (row) => (
                <span className="text-base text-gray-700">{(row.medicinesName || []).join(", ")}</span>
            ),
        },
        {
            name: "Seller Email",
            // selector: (row) => (row.sellerEmail || []).join(", "),
            selector: (row) => (
                <span className="text-base text-gray-700">{(row.sellerEmail || []).join(", ")}</span>
            ),
        },
        {
            name: "Buyer Email",
            selector: (row) => (
                <span className="text-base text-gray-700">{row.email || "N/A"}</span>
            ),
        },
        {
            name: "Total Price",
            selector: (row) => (
                <span className="text-base text-gray-700">${row.price || "N/A"}</span>
            ),
        },
        {
            name: "Status",
            selector: (row) => (
                <span
                    className={`px-3 py-1 rounded-full text-base ${row.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                        }`}
                >
                    {row.status || "N/A"}
                </span>
            ),
        },
    ];

    return (
        <div>
            {/* <h2 className="text-2xl font-bold mb-4 text-teal-700">Sales Report</h2> */}
            <SectionTitle heading={'Sales Report'} subHeading={'View, filter, and download sales data in various formats (PDF, DOC, CSV, XLSX)'} />
            <div className="lg:flex items-center justify-between gap-4 mb-4">
                <div>
                    <h3 className="text-lg md:text-2xl font-semibold text-gray-700 mb-2">Filter by Date Range</h3>
                    <div className="flex gap-4">

                        <div>
                            {/* <label className="block text-sm md:text-base font-medium text-gray-700">
                                Start Date
                            </label> */}
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                className="border rounded-md px-3 py-2 w-full"
                                placeholderText="Select Start Date"
                            />
                        </div>
                        <div>
                            {/* <label className="block text-sm md:text-base font-medium text-gray-700">
                                End Date
                            </label> */}
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                className="border rounded-md px-3 py-2 w-full"
                                placeholderText="Select End Date"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={exportToCSV}
                        className="bg-teal-600 text-white px-4 text-sm md:text-base py-2 rounded-lg hover:bg-teal-700 mt-6"
                    >
                        Download CSV/XLSX
                    </button>
                    <button
                        onClick={exportToPDF}
                        className="bg-blue-600 text-white px-4 text-sm md:text-base py-2 rounded-lg hover:bg-blue-700 mt-6"
                    >
                        Download PDF
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="text-center text-gray-600 ">Loading...</div>
            ) : (
                <div className="border bg-white">
                    <DataTable
                        columns={columns}
                        data={filteredData}
                        // pagination
                        // highlightOnHover
                        // striped
                        customStyles={{
                            rows: {
                                style: {
                                    minHeight: "70px",
                                },
                            },
                            headCells: {
                                style: {
                                    backgroundColor: "#0d9488",
                                    color: "#fff",
                                    fontWeight: "semibold",
                                    fontSize: "16px",
                                    letterSpacing: '.5px',
                                    height: '64px',
                                },
                            },
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default SalesReport;
