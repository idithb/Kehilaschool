import React from 'react';

interface AdminPanelProps {
    onLogout: () => void;
    onAddCourse: () => void;
    onSaveSchedule: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout, onAddCourse, onSaveSchedule }) => {
    return (
        <div className="bg-blue-800 text-white p-4 rounded-lg shadow-lg mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-right">
                <p className="font-bold text-lg">מצב ניהול</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
                <button
                    onClick={onAddCourse}
                    className="bg-white text-blue-800 font-bold py-2 px-5 rounded-md hover:bg-blue-100 transition-colors"
                >
                    הוסף שיעור חדש
                </button>
                <button
                    onClick={onSaveSchedule}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded-md transition-colors"
                >
                    שמור ופרסם מערכת
                </button>
                <button
                    onClick={onLogout}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-5 rounded-md transition-colors"
                >
                    התנתק
                </button>
            </div>
        </div>
    );
};