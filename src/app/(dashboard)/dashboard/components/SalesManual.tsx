// app/dashboard/components/SalesManual.tsx
"use client";

import { useState } from "react";

interface ManualItem {
  id: number;
  title: string;
  category: string;
  content: string;
  lastUpdated: string;
}

interface Props {
  selectedSubTab: string;
}

export default function SalesManual({ selectedSubTab }: Props) {
  const [manualItems, setManualItems] = useState<ManualItem[]>([
    {
      id: 1,
      title: "Daily Sales Checklist",
      category: "Reps Checklist",
      content: "1. Review daily goals\n2. Check lead pipeline\n3. Prepare sales materials\n4. Schedule follow-ups\n5. Update CRM",
      lastUpdated: "2023-10-15"
    },
    {
      id: 2,
      title: "Initial Contact Script",
      category: "Fundamental Scripts",
      content: "Hello [Prospect Name], my name is [Your Name] from [Company]. I'm reaching out because we help businesses like yours [value proposition].",
      lastUpdated: "2023-10-14"
    },
    {
      id: 3,
      title: "Closing Techniques",
      category: "Sales Bible",
      content: "The Assumptive Close: Assume the sale is made and discuss next steps.\nThe Summary Close: Summarize benefits before asking for commitment.",
      lastUpdated: "2023-10-13"
    }
  ]);

  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    category: selectedSubTab,
    content: ""
  });

  const handleAddItem = () => {
    const newItemData: ManualItem = {
      id: manualItems.length + 1,
      title: newItem.title,
      category: newItem.category,
      content: newItem.content,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setManualItems([...manualItems, newItemData]);
    setNewItem({ title: "", category: selectedSubTab, content: "" });
    setShowAddItemModal(false);
  };

  const filteredItems = manualItems.filter(item => item.category === selectedSubTab);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-800">
          Sales Manual - {selectedSubTab}
        </h2>
        <button
          onClick={() => setShowAddItemModal(true)}
          className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark transition-colors"
        >
          Add New Item
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-medium">{item.title}</h3>
                <span className="text-sm text-gray-500">{item.lastUpdated}</span>
              </div>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-sans">{item.content}</pre>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
                <button className="text-sm text-blue-600 hover:text-blue-800">Download</button>
                <button className="text-sm text-red-600 hover:text-red-800">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-10">
            <div className="text-5xl text-gray-300 mb-4">📚</div>
            <h3 className="text-lg font-medium text-gray-500">No content found</h3>
            <p className="text-gray-400">Add your first item to get started</p>
          </div>
        )}
      </div>

      {showAddItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
            <h3 className="text-lg font-medium mb-4">Add New Item to {selectedSubTab}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Reps Checklist">Reps Checklist</option>
                  <option value="Fundamental Scripts">Fundamental Scripts</option>
                  <option value="Sales Bible">Sales Bible</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={newItem.content}
                  onChange={(e) => setNewItem({...newItem, content: e.target.value})}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddItemModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}