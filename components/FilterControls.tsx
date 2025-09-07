
import React from 'react';
import { DAYS, TIME_SLOTS } from '../constants';
import type { Day, TimeSlot } from '../types';

interface FilterControlsProps {
  dayFilter: Day | 'הכל';
  setDayFilter: (day: Day | 'הכל') => void;
  timeFilter: TimeSlot | 'הכל';
  setTimeFilter: (time: TimeSlot | 'הכל') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onShowMySchedule: () => void;
  hasSelection: boolean;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  dayFilter,
  setDayFilter,
  timeFilter,
  setTimeFilter,
  searchQuery,
  setSearchQuery,
  onShowMySchedule,
  hasSelection,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 sticky top-4 z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Day Filter */}
        <div>
          <label htmlFor="day-filter" className="block text-sm font-medium text-gray-700 mb-1">
            סינון לפי יום
          </label>
          <select
            id="day-filter"
            value={dayFilter}
            onChange={(e) => setDayFilter(e.target.value as Day | 'הכל')}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="הכל">כל הימים</option>
            {DAYS.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        {/* Time Filter */}
        <div>
          <label htmlFor="time-filter" className="block text-sm font-medium text-gray-700 mb-1">
            סינון לפי שעה
          </label>
          <select
            id="time-filter"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as TimeSlot | 'הכל')}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="הכל">כל השעות</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div>
          <label htmlFor="search-filter" className="block text-sm font-medium text-gray-700 mb-1">
            חיפוש שיעור
          </label>
          <input
            id="search-filter"
            type="text"
            placeholder="שם שיעור, מורה..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Show My Schedule Button */}
        <div className="flex items-end">
          <button
            onClick={onShowMySchedule}
            disabled={!hasSelection}
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            הצג את המערכת שלי
          </button>
        </div>
      </div>
    </div>
  );
};
