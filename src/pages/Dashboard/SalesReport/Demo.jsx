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

const SalesReport = () => {
    const axiosSecure = useAxiosSecure();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Fetch payments data
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const res = await axiosSecure.get("/payments");
            return res.data;
        },
    });

    // Filter data by date range
    const filteredData = payments.filter((item) => {
        const itemDate = new Date(item.date);
        const adjustedEndDate = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;

        return (
            (!startDate || itemDate >= startDate) &&
            (!adjustedEndDate || itemDate <= adjustedEndDate)
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
            `₹${item.price}` || "N/A",
            item.status || "N/A",
        ]);

        autoTable(doc, {
            head: [["Transaction ID", "Medicine Name", "Seller Email", "Buyer Email", "Total Price", "Status"]],
            body: tableData,
            startY: 20,
            styles: { fontSize: 10 },
            columnStyles: {
                0: { cellWidth: 30 },
                1: { cellWidth: 40 },
                2: { cellWidth: 50 },
                3: { cellWidth: 50 },
                4: { cellWidth: 20 },
                5: { cellWidth: 20 },
            },
            margin: { top: 10 },
        });

        doc.save("Sales_Report.pdf");
    };

    // Columns configuration for DataTable
    const columns = [
        {
            name: "#",
            cell: (row, index) => index + 1,
            width: "50px",
        },
        {
            name: "Name",
            selector: (row) => row.name || "N/A",
            sortable: true,
        },
        {
            name: "Transaction ID",
            selector: (row) => row.transactionId || "N/A",
            sortable: true,
        },
        {
            name: "Amount",
            selector: (row) => `₹${row.price}` || "N/A",
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => (
                <span
                    className={`px-2 py-1 rounded-lg text-sm ${row.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                        }`}
                >
                    {row.status || "N/A"}
                </span>
            ),
        },
        {
            name: "Action",
            cell: (row) => (
                <button
                    className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                >
                    Accept Payment
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-teal-700">Payment Management ({filteredData.length})</h2>

            {/* Date Range Filter */}
            <div className="flex items-center gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Start Date
                    </label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="border rounded-md px-3 py-2 w-full"
                        placeholderText="Select Start Date"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        End Date
                    </label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="border rounded-md px-3 py-2 w-full"
                        placeholderText="Select End Date"
                    />
                </div>
                <button
                    onClick={exportToCSV}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 mt-6"
                >
                    Download CSV/XLSX
                </button>
                <button
                    onClick={exportToPDF}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-6"
                >
                    Download PDF
                </button>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="text-center text-gray-600">Loading...</div>
            ) : (
                <div className="border rounded-lg shadow-md bg-white">
                    <DataTable
                        columns={columns}
                        data={filteredData}
                        pagination
                        highlightOnHover
                        striped
                        customStyles={{
                            rows: {
                                style: {
                                    minHeight: "56px",
                                },
                            },
                            headCells: {
                                style: {
                                    backgroundColor: "#008080",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: "14px",
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
