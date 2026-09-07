import React, { useState } from "react";

import Layout from "../components/layout/Layout";

import UploadBox from "../components/uploads/UploadBox";
import UploadStats from "../components/uploads/UploadStats";
import UploadCharts from "../components/uploads/UploadCharts";
import UploadPreview from "../components/uploads/UploadPreview";
import UploadHistory from "../components/uploads/UploadHistory";

function Uploads() {

  const [rows, setRows] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    valid: 0,
    duplicates: 0,
    errors: 0,
    assigned: 0,
    missing: 0,
  });

  const handleFileLoaded = ({ rows }) => {

    const total = rows.length;

    let valid = 0;
    let errors = 0;
    let missing = 0;

    rows.forEach((row) => {

      const name = row.Name || row.name;
      const email = row.Email || row.email;
      const phone = row.Phone || row.phone;

      if (!name || !email || !phone) {
        errors++;
        missing++;
      } else {
        valid++;
      }

    });

    setRows(rows);

    setStats({
      total,
      valid,
      duplicates: 0,
      errors,
      assigned: 0,
      missing,
    });
  };

  return (
    <Layout>

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F33]">
          Upload Leads
        </h2>

        <p className="mt-1 text-sm sm:text-base text-gray-500">
          Import and validate lead data into your CRM.
        </p>

      </div>


      {/* Upload */}

      <UploadBox
        onFileLoaded={handleFileLoaded}
      />


      {/* Stats */}

      <div className="mt-6">

        <UploadStats
          stats={stats}
        />

      </div>


      {/* Charts */}

      <div className="mt-6">

        <UploadCharts
          stats={stats}
        />

      </div>


      {/* Preview */}

      <div className="mt-6">

        <UploadPreview
          rows={rows}
        />

      </div>


      {/* History */}

      <div className="mt-6">

        <UploadHistory />

      </div>

    </Layout>
  );
}

export default Uploads;