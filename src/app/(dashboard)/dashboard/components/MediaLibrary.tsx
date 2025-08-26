// app/dashboard/components/MediaLibrary.tsx
"use client";

import { useState } from "react";

interface MediaItem {
  id: number;
  title: string;
  type: string;
  duration: string;
  uploadDate: string;
  thumbnail: string;
}

interface Props {
  selectedSubTab: string;
}

export default function MediaLibrary({ selectedSubTab }: Props) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: 1,
      title: "Morning Breathing Exercise",
      type: "Guided Breathwork",
      duration: "10:25",
      uploadDate: "2023-10-15",
      thumbnail: "/thumbnails/breathwork1.jpg"
    },
    {
      id: 2,
      title: "Stress Relief Meditation",
      type: "Guided Meditation",
      duration: "15:30",
      uploadDate: "2023-10-14",
      thumbnail: "/thumbnails/meditation1.jpg"
    },
    {
      id: 3,
      title: "Sales Techniques for Q4",
      type: "Sales Training",
      duration: "22:15",
      uploadDate: "2023-10-13",
      thumbnail: "/thumbnails/sales1.jpg"
    }
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newMedia, setNewMedia] = useState({
    title: "",
    type: selectedSubTab,
    duration: ""
  });

  const handleUploadMedia = () => {
    const newMediaItem: MediaItem = {
      id: mediaItems.length + 1,
      title: newMedia.title,
      type: newMedia.type,
      duration: newMedia.duration,
      uploadDate: new Date().toISOString().split('T')[0],
      thumbnail: "/thumbnails/default.jpg"
    };
    
    setMediaItems([...mediaItems, newMediaItem]);
    setNewMedia({ title: "", type: selectedSubTab, duration: "" });
    setShowUploadModal(false);
  };

  const filteredMedia = mediaItems.filter(item => item.type === selectedSubTab);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-800">
          Media Library - {selectedSubTab}
        </h2>
        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark transition-colors"
        >
          Upload Media
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 bg-gray-200 flex items-center justify-center">
                <div className="text-4xl text-gray-400">🎬</div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg mb-1">{item.title}</h3>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>{item.type}</span>
                  <span>{item.duration}</span>
                </div>
                <p className="text-sm text-gray-500">Uploaded: {item.uploadDate}</p>
                <div className="mt-3 flex space-x-2">
                  <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
                  <button className="text-sm text-blue-600 hover:text-blue-800">View</button>
                  <button className="text-sm text-red-600 hover:text-red-800">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMedia.length === 0 && (
          <div className="text-center py-10">
            <div className="text-5xl text-gray-300 mb-4">🎬</div>
            <h3 className="text-lg font-medium text-gray-500">No media found</h3>
            <p className="text-gray-400">Upload your first media file to get started</p>
          </div>
        )}
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Upload Media</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newMedia.title}
                  onChange={(e) => setNewMedia({...newMedia, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter media title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newMedia.type}
                  onChange={(e) => setNewMedia({...newMedia, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Guided Breathwork">Guided Breathwork</option>
                  <option value="Guided Meditation">Guided Meditation</option>
                  <option value="Video of the Day">Video of the Day</option>
                  <option value="Sales Training">Sales Training</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (mm:ss)</label>
                <input
                  type="text"
                  value={newMedia.duration}
                  onChange={(e) => setNewMedia({...newMedia, duration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="00:00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">MP4, MOV, WAV up to 100MB</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadMedia}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}