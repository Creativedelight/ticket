import React from 'react';
interface AdminCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
}
export function AdminCard({
  title,
  value,
  icon,
  trend,
  bgColor = 'bg-white'
}: AdminCardProps) {
  return <div className={`${bgColor} rounded-lg shadow p-6`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          {trend && <div className="mt-2 flex items-center">
              <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '+' : ''}
                {trend.value}%
              </span>
              <span className="ml-2 text-sm text-gray-500">
                from last month
              </span>
            </div>}
        </div>
        <div className="p-3 bg-indigo-100 rounded-full">{icon}</div>
      </div>
    </div>;
}