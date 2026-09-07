import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";

function UploadBox({ onFileLoaded }) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const processFile = (file) => {
    setError("");

    if (!file) return;

    const allowed = [
      "csv",
      "xlsx",
      "xls",
    ];

    const extension = file.name.split(".").pop().toLowerCase();

    if (!allowed.includes(extension)) {
      setError("Only CSV, XLSX or XLS files are allowed.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);

        const workbook = XLSX.read(data, {
          type: "array",
        });

        const sheetName = workbook.SheetNames[0];

        const worksheet = workbook.Sheets[sheetName];

        const rows = XLSX.utils.sheet_to_json(worksheet, {
          defval: "",
        });

        onFileLoaded({
          file,
          rows,
        });
      } catch (err) {
        setError("Unable to read this file.");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setDragActive(false);

    const file = e.dataTransfer.files[0];

    processFile(file);
  };

  const downloadTemplate = () => {
    const template = [
      {
        Name: "Rahul Sharma",
        Email: "rahul@gmail.com",
        Phone: "9876543210",
        Source: "Website",
        Status: "New",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(template);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Leads"
    );

    XLSX.writeFile(workbook, "LeadHub_Lead_Template.xlsx");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

        <div>
          <h3 className="text-lg font-bold text-[#0B1F33]">
            Upload Lead File
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Upload your CSV or Excel lead file
          </p>
        </div>

        <button
          onClick={downloadTemplate}
          className="px-4 py-2 rounded-lg border border-[#16A3D3] text-[#16A3D3] font-medium hover:bg-[#16A3D3] hover:text-white transition"
        >
          ↓ Download Template
        </button>

      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
        className={`cursor-pointer border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition ${
          dragActive
            ? "border-[#16A3D3] bg-[#72B8D8]/10"
            : "border-gray-300 hover:border-[#16A3D3] hover:bg-gray-50"
        }`}
      >

        <div className="w-16 h-16 mx-auto rounded-full bg-[#16A3D3]/10 flex items-center justify-center text-3xl">
          📁
        </div>

        <h4 className="mt-4 font-semibold text-[#0B1F33]">
          Drag & Drop your file here
        </h4>

        <p className="text-sm text-gray-500 mt-1">
          or click to browse from your computer
        </p>

        <p className="text-xs text-gray-400 mt-3">
          Supported: CSV, XLS, XLSX
        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xls,.xlsx"
          className="hidden"
          onChange={(e) =>
            processFile(e.target.files[0])
          }
        />

      </div>

      {error && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}

    </div>
  );
}

export default UploadBox;