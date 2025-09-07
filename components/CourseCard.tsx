import React from 'react';
import type { Course } from '../types';

interface CourseCardProps {
  course: Course;
  isSelected: boolean;
  onSelect: (courseId: number) => void;
  isAdmin: boolean;
  onEdit: (course: Course) => void;
  onDelete: (courseId: number) => void;
}

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    </svg>
);

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);

export const CourseCard: React.FC<CourseCardProps> = ({ course, isSelected, onSelect, isAdmin, onEdit, onDelete }) => {
  
  const handleCardClick = () => {
    if (!isAdmin) {
      onSelect(course.id);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onEdit(course);
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete(course.id);
  }
  
  return (
    <div
      className={`relative p-3 rounded-lg border transition-all duration-200 ease-in-out group
        ${isAdmin ? 'hover:bg-gray-100' : 'cursor-pointer hover:shadow-lg hover:scale-105'}
        ${isSelected && !isAdmin ? 'bg-blue-100 border-blue-400 shadow-md' : 'bg-white border-gray-200 hover:border-blue-300'}`}
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-2">
            <h4 className={`font-bold ${isSelected && !isAdmin ? 'text-blue-800' : 'text-gray-900'}`}>{course.name}</h4>
            <p className="text-sm text-gray-600">{course.details}</p>
        </div>
        {!isAdmin && (
            <input
                type="checkbox"
                checked={isSelected}
                readOnly
                className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
            />
        )}
      </div>

      {isAdmin && (
        <div className="absolute top-1 left-1 flex space-x-1 space-x-reverse">
            <button onClick={handleEditClick} className="p-1 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
                <EditIcon />
            </button>
            <button onClick={handleDeleteClick} className="p-1 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-100 transition-colors">
                <DeleteIcon />
            </button>
        </div>
      )}
    </div>
  );
};
