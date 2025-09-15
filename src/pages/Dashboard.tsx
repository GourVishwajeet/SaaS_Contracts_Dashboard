import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ContractTable from "../components/ContractTable";
import UploadModal from "../components/UploadModal";

export default function Dashboard() {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col ">
        <Topbar onUpload={() => setShowUpload(true)} />
        <main className="p-4 sm:p-6 mt-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Contracts</h2>
          <ContractTable />
        </main>
      </div>
      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
    </div>
  );
}