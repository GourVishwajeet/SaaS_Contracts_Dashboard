import React, { useState } from 'react'

interface FileItem {
  name: string
  status: string
  progress: number
}

function FileRow({ file }: { file: FileItem }) {
  return (
    <div className="flex items-center justify-between p-2 border rounded">
      <div>
        <div className="font-medium">{file.name}</div>
        <div className="text-xs text-slate-500">{file.status}</div>
      </div>
      <div>{file.progress}%</div>
    </div>
  )
}

export default function UploadModal({ onClose }: { onClose: () => void }) {
  const [files, setFiles] = useState<FileItem[]>([])

  // Handle file selection
  function handleFiles(selected: FileList | null) {
    if (!selected) return
    const arr = Array.from(selected).map((f) => ({ name: f.name, status: 'Uploading', progress: 0 }))
    setFiles((s) => [...arr, ...s])
    arr.forEach((f) => simulateUpload(f))
  }

  // Simulate file upload with random progress
  function simulateUpload(file: FileItem) {
    let progress = 0
    const id = setInterval(() => {
      progress += Math.floor(Math.random() * 30) + 10
      setFiles((prev) =>
        prev.map((p) =>
          p.name === file.name ? { ...p, progress: Math.min(100, progress) } : p
        )
      )
      if (progress >= 100) {
        clearInterval(id)
        setFiles((prev) =>
          prev.map((p) =>
            p.name === file.name ? { ...p, status: 'Success', progress: 100 } : p
          )
        )
      }
    }, 400)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow p-6 w-11/12 md:w-1/2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Upload files</h3>
          <button onClick={onClose} className="text-slate-600">Close</button>
        </div>
        <div className="border-2 border-dashed p-6 text-center rounded mb-4">
          <input
            type="file"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="mb-2"
          />
          <div className="text-sm text-slate-500">Drag & drop files here or click to browse</div>
        </div>
        <div className="space-y-2">
          {files.map((f) => <FileRow key={f.name} file={f} />)}
        </div>
      </div>
    </div>
  )
}
