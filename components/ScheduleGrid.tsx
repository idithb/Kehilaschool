import React from 'react';
import { DAYS, TIME_SLOTS, TIME_SLOTS_MAP } from '../constants';
import type { Course } from '../types';
import { CourseCard } from './CourseCard';

interface ScheduleGridProps {
  courses: Course[];
  selectedCourseIds: Set<number>;
  onCourseSelect: (courseId: number) => void;
  isAdmin: boolean;
  onEditCourse: (course: Course) => void;
  onDeleteCourse: (courseId: number) => void;
}

export const ScheduleGrid: React.FC<ScheduleGridProps> = ({ 
  courses, 
  selectedCourseIds, 
  onCourseSelect,
  isAdmin,
  onEditCourse,
  onDeleteCourse
}) => {
  return (
    <div className="bg-white p-2 sm:p-4 rounded-lg shadow-lg overflow-x-auto">
      <div className="grid grid-cols-[auto_repeat(5,minmax(180px,1fr))] min-w-[1000px]">
        {/* Header Row */}
        <div className="border-b-2 border-l-2 border-gray-200 p-2 font-bold text-center sticky top-0 right-0 bg-gray-100 z-[5]">זמן</div>
        {DAYS.map((day) => (
          <div key={day} className="border-b-2 border-l-2 border-gray-200 p-3 font-bold text-lg text-center sticky top-0 bg-gray-100 z-[5] text-blue-800">
            {day}
          </div>
        ))}

        {/* Schedule Rows */}
        {TIME_SLOTS.map((slot, rowIndex) => (
          <React.Fragment key={slot}>
            <div className={`border-l-2 ${rowIndex < TIME_SLOTS.length -1 ? 'border-b-2' : ''} border-gray-200 p-2 text-center sticky right-0 bg-gray-100`}>
              <div className="font-semibold">{slot}</div>
              <div className="text-sm text-gray-600">{TIME_SLOTS_MAP[slot]}</div>
            </div>
            {DAYS.map((day) => {
              const coursesInCell = courses.filter(c => c.day === day && c.timeSlot === slot);
              return (
                <div key={`${day}-${slot}`} className={`p-2 border-l-2 ${rowIndex < TIME_SLOTS.length -1 ? 'border-b-2' : ''} border-gray-200 min-h-[120px] bg-gray-50/50 space-y-2`}>
                  {coursesInCell.length > 0 ? (
                    coursesInCell.map(course => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        isSelected={selectedCourseIds.has(course.id)}
                        onSelect={onCourseSelect}
                        isAdmin={isAdmin}
                        onEdit={onEditCourse}
                        onDelete={onDeleteCourse}
                      />
                    ))
                  ) : (
                    <div className="w-full h-full"></div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
