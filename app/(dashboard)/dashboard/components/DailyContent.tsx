// app/dashboard/components/DailyContent.tsx
"use client";

import { useState } from "react";

interface ContentItem {
  id: number;
  text: string;
  author?: string;
  category: string;
  date: string;
}

interface Props {
  selectedSubTab: string;
}

export default function DailyContent({ selectedSubTab }: Props) {
  const [quotes, setQuotes] = useState<ContentItem[]>([
    {
      id: 1,
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: "Motivation",
      date: "2023-10-15"
    },
    {
      id: 2,
      text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      author: "Winston Churchill",
      category: "Persistence",
      date: "2023-10-14"
    }
  ]);

  const [buzzwords, setBuzzwords] = useState<ContentItem[]>([
    {
      id: 1,
      text: "Synergy",
      category: "Business",
      date: "2023-10-15"
    },
    {
      id: 2,
      text: "Leverage",
      category: "Business",
      date: "2023-10-14"
    }
  ]);

  const [newContent, setNewContent] = useState({
    text: "",
    author: "",
    category: ""
  });

  const handleAddContent = () => {
    if (selectedSubTab === "Quotes") {
      const newQuote: ContentItem = {
        id: quotes.length + 1,
        text: newContent.text,
        author: newContent.author,
        category: newContent.category,
        date: new Date().toISOString().split('T')[0]
      };
      setQuotes([...quotes, newQuote]);
    } else if (selectedSubTab === "Buzzwords") {
      const newBuzzword: ContentItem = {
        id: buzzwords.length + 1,
        text: newContent.text,
        category: newContent.category,
        date: new Date().toISOString().split('T')[0]
      };
      setBuzzwords([...buzzwords, newBuzzword]);
    }
    
    setNewContent({ text: "", author: "", category: "" });
  };

  const contentToShow = selectedSubTab === "Quotes" ? quotes : buzzwords;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-800">
          Daily Content - {selectedSubTab}
        </h2>
        <button className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark transition-colors">
          Add New {selectedSubTab.slice(0, -1)}
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Add New {selectedSubTab.slice(0, -1)}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {selectedSubTab === "Quotes" ? "Quote Text" : "Buzzword"}
                </label>
                <input
                  type="text"
                  value={newContent.text}
                  onChange={(e) => setNewContent({...newContent, text: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={selectedSubTab === "Quotes" ? "Enter quote text" : "Enter buzzword"}
                />
              </div>
              {selectedSubTab === "Quotes" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input
                    type="text"
                    value={newContent.author}
                    onChange={(e) => setNewContent({...newContent, author: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter author name"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={newContent.category}
                  onChange={(e) => setNewContent({...newContent, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category"
                />
              </div>
              <button
                onClick={handleAddContent}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add {selectedSubTab.slice(0, -1)}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Preview</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              {newContent.text ? (
                <>
                  <p className="text-lg italic">"{newContent.text}"</p>
                  {selectedSubTab === "Quotes" && newContent.author && (
                    <p className="mt-2 text-right">- {newContent.author}</p>
                  )}
                  {newContent.category && (
                    <p className="mt-2 text-sm text-gray-500">Category: {newContent.category}</p>
                  )}
                </>
              ) : (
                <p className="text-gray-500">Enter content to see a preview</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Existing {selectedSubTab}</h3>
          <div className="space-y-4">
            {contentToShow.map((item) => (
              <div key={item.id} className="border rounded-md p-4">
                <p className="text-lg">{item.text}</p>
                {selectedSubTab === "Quotes" && (
                  <p className="mt-1 text-sm text-gray-600">- {item.author}</p>
                )}
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Category: {item.category}</span>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
                  <button className="text-sm text-red-600 hover:text-red-800">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}