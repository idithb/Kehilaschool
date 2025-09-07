
import React, { useState, useEffect } from 'react';
import { DAYS, TIME_SLOTS, GRADE_LEVELS } from '../constants';
import type { Course, Day, TimeSlot, GradeLevel } from '../types';

interface CourseFormModalProps {
    course: Course | null;
    onClose: () => void;
    onSave: (courseData: Omit<Course, 'id'> & { id?: number }) => void;
}

export const CourseFormModal: React.FC<CourseFormModalProps> = ({ course, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [day, setDay] = useState<Day>('ראשון');
    const [timeSlot, setTimeSlot] = useState<TimeSlot>('שעה 1');
    const [gradeLevel, setGradeLevel] = useState<GradeLevel>('ג-ד');


    useEffect(() => {
        if (course) {
            setName(course.name);
            setDetails(course.details);
            setDay(course.day);
            setTimeSlot(course.timeSlot);
            setGradeLevel(course.gradeLevel);
        }
    }, [course]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: course?.id,
            name,
            details,
            day,
            timeSlot,
            gradeLevel,
        });
    };
    
    const isFormValid = name.trim() !== '';

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-2xl font-bold text-blue-700">{course ? 'עריכת שיעור' : 'הוספת שיעור חדש'}</h2>
                     <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 transition-colors"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="course-name" className="block text-sm font-medium text-gray-700 mb-1">שם השיעור <span className="text-red-500">*</span></label>
                        <input id="course-name" type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                     <div>
                        <label htmlFor="course-details" className="block text-sm font-medium text-gray-700 mb-1">פרטים נוספים (מורה, כיתה וכו')</label>
                        <input id="course-details" type="text" value={details} onChange={e => setDetails(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="course-day" className="block text-sm font-medium text-gray-700 mb-1">יום</label>
                            <select id="course-day" value={day} onChange={e => setDay(e.target.value as Day)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div>
                           <label htmlFor="course-slot" className="block text-sm font-medium text-gray-700 mb-1">שעה</label>
                           <select id="course-slot" value={timeSlot} onChange={e => setTimeSlot(e.target.value as TimeSlot)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                {TIME_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                           </select>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="course-grade" className="block text-sm font-medium text-gray-700 mb-1">שכבה</label>
                        <select id="course-grade" value={gradeLevel} onChange={e => setGradeLevel(e.target.value as GradeLevel)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                            {GRADE_LEVELS.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                         <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">ביטול</button>
                         <button type="submit" disabled={!isFormValid} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">שמור שינויים</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
