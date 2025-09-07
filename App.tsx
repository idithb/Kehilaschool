
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { INITIAL_COURSES, ADMIN_PASSWORD } from './constants';
import type { Course, Day, TimeSlot, GradeLevel } from './types';
import { FilterControls } from './components/FilterControls';
import { ScheduleGrid } from './components/ScheduleGrid';
import { MyScheduleView } from './components/MyScheduleView';
import { AdminPanel } from './components/AdminPanel';
import { CourseFormModal } from './components/CourseFormModal';
import { AdminLoginModal } from './components/AdminLoginModal';

const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [dayFilter, setDayFilter] = useState<Day | 'הכל'>('הכל');
  const [timeFilter, setTimeFilter] = useState<TimeSlot | 'הכל'>('הכל');
  const [gradeFilter, setGradeFilter] = useState<GradeLevel | 'הכל'>('הכל');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');
  const [selectedCourseIds, setSelectedCourseIds] = useState<Set<number>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Admin state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showCourseFormModal, setShowCourseFormModal] = useState<boolean>(false);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);

  useEffect(() => {
    // Load courses from localStorage
    try {
      const savedCourses = localStorage.getItem('schoolSchedule');
      if (savedCourses) {
        setCourses(JSON.parse(savedCourses));
      } else {
        setCourses(INITIAL_COURSES);
      }
    } catch (error) {
      console.error("Failed to load courses from localStorage", error);
      setCourses(INITIAL_COURSES);
    }

    // Load student name from localStorage
    const savedName = localStorage.getItem('studentName');
    if (savedName) {
        setStudentName(savedName);
    }

    // Load selected courses from URL for sharing
    const searchParams = new URLSearchParams(window.location.search);
    const selectedIdsFromUrl = searchParams.get('selected');
    if (selectedIdsFromUrl) {
      const ids = selectedIdsFromUrl.split(',')
        .map(id => parseInt(id.trim(), 10))
        .filter(id => !isNaN(id));
      setSelectedCourseIds(new Set(ids));
    }
  }, []);

  // Save student name to localStorage
  useEffect(() => {
    localStorage.setItem('studentName', studentName);
  }, [studentName]);

  // Update URL when selection changes
  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    const newParams = new URLSearchParams();
    
    if (selectedCourseIds.size > 0) {
      const idsString = Array.from(selectedCourseIds).join(',');
      newParams.set('selected', idsString);
    }
    
    if (currentParams.get('selected') !== newParams.get('selected')) {
      const newSearch = newParams.toString();
      const newUrl = newSearch ? `${window.location.pathname}?${newSearch}` : window.location.pathname;
      window.history.pushState({ path: newUrl }, '', newUrl);
    }
  }, [selectedCourseIds]);

  const handleCourseSelection = useCallback((courseId: number) => {
    setSelectedCourseIds(prevIds => {
      const newIds = new Set(prevIds);
      if (newIds.has(courseId)) {
        newIds.delete(courseId);
      } else {
        newIds.add(courseId);
      }
      return newIds;
    });
  }, []);
  
  const handleLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdminLoggedIn(true);
      setShowLoginModal(false);
    } else {
      alert('סיסמה שגויה');
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
  };
  
  const handleSaveSchedule = () => {
    try {
        localStorage.setItem('schoolSchedule', JSON.stringify(courses));
        alert('המערכת נשמרה ופורסמה בהצלחה!');
    } catch (error) {
        console.error("Failed to save courses to localStorage", error);
        alert('שגיאה בשמירת המערכת.');
    }
  };

  const handleOpenCourseForm = (course: Course | null = null) => {
    setCourseToEdit(course);
    setShowCourseFormModal(true);
  };

  const handleSaveCourse = (courseData: Omit<Course, 'id'> & { id?: number }) => {
    if (courseData.id) { // Editing existing course
      setCourses(prev => prev.map(c => c.id === courseData.id ? { ...courseData } as Course : c));
    } else { // Adding new course
      const newCourse = { ...courseData, id: Date.now() } as Course;
      setCourses(prev => [...prev, newCourse]);
    }
    setShowCourseFormModal(false);
  };

  const handleDeleteCourse = (courseId: number) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את השיעור?')) {
      setCourses(prev => prev.filter(c => c.id !== courseId));
    }
  };


  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const dayMatch = dayFilter === 'הכל' || course.day === dayFilter;
      const timeMatch = timeFilter === 'הכל' || course.timeSlot === timeFilter;
      const gradeMatch = gradeFilter === 'הכל' || course.gradeLevel === gradeFilter;
      const searchMatch = searchQuery === '' ||
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.details.toLowerCase().includes(searchQuery.toLowerCase());
      return dayMatch && timeMatch && searchMatch && gradeMatch;
    });
  }, [dayFilter, timeFilter, gradeFilter, searchQuery, courses]);

  const selectedCourses = useMemo(() => {
    return courses.filter(course => selectedCourseIds.has(course.id));
  }, [selectedCourseIds, courses]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8 relative">
        <h1 className="text-4xl font-bold text-blue-700">מערכת שעות בית ספר דמוקרטי</h1>
        <p className="text-lg text-gray-600 mt-2">סננו את השיעורים ובנו את המערכת האישית שלכם</p>
         {!isAdminLoggedIn && (
            <button
                onClick={() => setShowLoginModal(true)}
                className="absolute top-0 left-0 bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors text-sm"
            >
                כניסת מנהל
            </button>
        )}
      </header>
      
      {isAdminLoggedIn && (
        <AdminPanel
            onLogout={handleLogout}
            onAddCourse={() => handleOpenCourseForm(null)}
            onSaveSchedule={handleSaveSchedule}
        />
      )}

      <main>
        <FilterControls
          dayFilter={dayFilter}
          setDayFilter={setDayFilter}
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
          gradeFilter={gradeFilter}
          setGradeFilter={setGradeFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          studentName={studentName}
          setStudentName={setStudentName}
          onShowMySchedule={() => setIsModalOpen(true)}
          hasSelection={selectedCourseIds.size > 0}
        />

        <ScheduleGrid
          courses={filteredCourses}
          selectedCourseIds={selectedCourseIds}
          onCourseSelect={handleCourseSelection}
          isAdmin={isAdminLoggedIn}
          onEditCourse={handleOpenCourseForm}
          onDeleteCourse={handleDeleteCourse}
        />
      </main>

      {isModalOpen && (
        <MyScheduleView
          selectedCourses={selectedCourses}
          onClose={() => setIsModalOpen(false)}
          studentName={studentName}
        />
      )}

      {showLoginModal && (
        <AdminLoginModal
            onClose={() => setShowLoginModal(false)}
            onLogin={handleLogin}
        />
      )}
      
      {showCourseFormModal && (
        <CourseFormModal
            course={courseToEdit}
            onClose={() => setShowCourseFormModal(false)}
            onSave={handleSaveCourse}
        />
      )}
    </div>
  );
};

export default App;
