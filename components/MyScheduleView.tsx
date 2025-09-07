
import React, { useState } from 'react';
import { TIME_SLOTS_MAP, DAYS } from '../constants';
import type { Course } from '../types';

interface MyScheduleViewProps {
  selectedCourses: Course[];
  onClose: () => void;
  studentName: string;
}

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.002l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);

export const MyScheduleView: React.FC<MyScheduleViewProps> = ({ selectedCourses, onClose, studentName }) => {
  const [copyButtonText, setCopyButtonText] = useState('העתק קישור');

  const groupedCourses = DAYS.reduce((acc, day) => {
    const coursesForDay = selectedCourses
      .filter(c => c.day === day)
      .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));
    if (coursesForDay.length > 0) {
      acc[day] = coursesForDay;
    }
    return acc;
  }, {} as Record<string, Course[]>);
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
        setCopyButtonText('הועתק!');
        setTimeout(() => {
            setCopyButtonText('העתק קישור');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('שגיאה בהעתקת הקישור');
    });
  };

  const title = studentName ? `המערכת של ${studentName}` : 'המערכת שלי';

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 p-6 pb-0">
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-3xl font-bold text-blue-700">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 transition-colors"
              aria-label="סגור"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto px-6">
          {Object.keys(groupedCourses).length === 0 ? (
            <p className="text-center text-gray-600 py-10">לא נבחרו שיעורים. חזרו למערכת הראשית ובחרו את השיעורים שלכם.</p>
          ) : (
            <div className="space-y-6">
              {DAYS.filter(day => groupedCourses[day]).map(day => (
                <div key={day}>
                  <h3 className="text-2xl font-semibold text-blue-600 border-r-4 border-blue-500 pr-3 mb-3">{day}</h3>
                  <ul className="space-y-2">
                    {groupedCourses[day].map(course => (
                      <li key={course.id} className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
                        <div>
                          <p className="font-bold text-gray-800">{course.name}</p>
                          <p className="text-sm text-gray-600">{course.details}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-700">{course.timeSlot}</p>
                          <p className="text-xs text-gray-500">{TIME_SLOTS_MAP[course.timeSlot]}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {Object.keys(groupedCourses).length > 0 && (
          <div className="flex-shrink-0 border-t p-4 flex justify-end">
            <button
              onClick={handleShare}
              className="flex items-center justify-center bg-green-500 text-white font-bold py-2 px-5 rounded-md hover:bg-green-600 transition-colors"
            >
              <ShareIcon />
              <span className="mr-2">{copyButtonText}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
