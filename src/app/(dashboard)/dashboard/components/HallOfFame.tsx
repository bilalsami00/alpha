// app/dashboard/components/HallOfFame.tsx
"use client";

import { useState } from "react";

interface Achievement {
  id: number;
  name: string;
  title: string;
  achievement: string;
  date: string;
  avatar: string;
}

export default function HallOfFame() {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Top Performer of the Month",
      achievement: "Exceeded sales target by 150%",
      date: "October 2023",
      avatar: "/avatars/sarah.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Best Newcomer",
      achievement: "Closed 20 deals in first month",
      date: "September 2023",
      avatar: "/avatars/michael.jpg"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      title: "Customer Satisfaction Champion",
      achievement: "100% positive customer feedback",
      date: "August 2023",
      avatar: "/avatars/emma.jpg"
    }
  ]);

  const [showAddAchievementModal, setShowAddAchievementModal] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    name: "",
    title: "",
    achievement: "",
    date: ""
  });

  const handleAddAchievement = () => {
    const newAchievementData: Achievement = {
      id: achievements.length + 1,
      name: newAchievement.name,
      title: newAchievement.title,
      achievement: newAchievement.achievement,
      date: newAchievement.date,
      avatar: "/avatars/default.jpg"
    };
    
    setAchievements([newAchievementData, ...achievements]);
    setNewAchievement({ name: "", title: "", achievement: "", date: "" });
    setShowAddAchievementModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-800">Hall of Fame</h2>
        <button
          onClick={() => setShowAddAchievementModal(true)}
          className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark transition-colors"
        >
          Add Achievement
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white p-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3">
                  <span className="text-2xl text-blue-600 font-bold">🏆</span>
                </div>
                <h3 className="text-xl font-bold text-center">{achievement.title}</h3>
                <p className="text-sm opacity-90">{achievement.date}</p>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-gray-700">
                      {achievement.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{achievement.name}</h4>
                  </div>
                </div>
                <p className="text-gray-600">{achievement.achievement}</p>
                <div className="mt-4 flex space-x-2">
                  <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
                  <button className="text-sm text-red-600 hover:text-red-800">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddAchievementModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Add New Achievement</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team Member Name</label>
                <input
                  type="text"
                  value={newAchievement.name}
                  onChange={(e) => setNewAchievement({...newAchievement, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Achievement Title</label>
                <input
                  type="text"
                  value={newAchievement.title}
                  onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Achievement Description</label>
                <textarea
                  value={newAchievement.achievement}
                  onChange={(e) => setNewAchievement({...newAchievement, achievement: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="text"
                  value={newAchievement.date}
                  onChange={(e) => setNewAchievement({...newAchievement, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Month Year (e.g., October 2023)"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddAchievementModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAchievement}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Achievement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}