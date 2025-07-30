import React from 'react';

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div
    className="bg-card text-card-foreground border rounded-xl shadow p-6 transition-all duration-300 hover:shadow-md"
  >
    <div className="flex items-center">
      <div className={`p-3 rounded-lg ${color} shadow-sm`}>
        <Icon size={24} className="text-white" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-muted-foreground">
          {title}
        </p>
        <p className="text-2xl font-bold text-foreground">
          {value}
        </p>
      </div>
    </div>
  </div>
);

export default StatCard;
