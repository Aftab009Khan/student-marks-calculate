import React, { useState } from 'react';
import { UserPlus, Users, Search, Award, CheckCircle, XCircle, BookOpen, Edit3 } from 'lucide-react';

export default function StudentGradeSystem() {
  const defaultSubjects = ['Maths', 'Biology', 'Physics', 'Chemistry', 'Python', 'JavaScript'];
  const [subjects, setSubjects] = useState(defaultSubjects);
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [marks, setMarks] = useState({});
  const [searchName, setSearchName] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [showSubjectEditor, setShowSubjectEditor] = useState(false);
  const [tempSubjects, setTempSubjects] = useState('');

  const getGrade = (avg) => {
    if (avg > 90) return { grade: 'A', status: 'Pass', color: 'bg-green-100 border-green-400 text-green-800' };
    if (avg >= 75) return { grade: 'B', status: 'Pass', color: 'bg-blue-100 border-blue-400 text-blue-800' };
    if (avg >= 60) return { grade: 'C', status: 'Pass', color: 'bg-yellow-100 border-yellow-400 text-yellow-800' };
    if (avg >= 40) return { grade: 'D', status: 'Pass', color: 'bg-orange-100 border-orange-400 text-orange-800' };
    return { grade: 'F', status: 'Fail', color: 'bg-red-100 border-red-400 text-red-800' };
  };

  const updateSubjects = () => {
    const newSubjects = tempSubjects.split(',').map(s => s.trim()).filter(s => s);
    if (newSubjects.length > 0) {
      setSubjects(newSubjects);
      setMarks({});
      setShowSubjectEditor(false);
    } else {
      alert('Please enter at least one subject!');
    }
  };

  const addStudent = () => {
    if (!name.trim()) {
      alert('Please enter student name!');
      return;
    }

    const allMarksEntered = subjects.every(sub => {
      const mark = marks[sub];
      return mark !== undefined && mark !== '' && !isNaN(mark);
    });
    
    if (!allMarksEntered) {
      alert('Please enter valid marks for all subjects!');
      return;
    }

    const marksArray = subjects.map(sub => parseFloat(marks[sub]));
    const avg = marksArray.reduce((a, b) => a + b, 0) / marksArray.length;
    const gradeInfo = getGrade(avg);

    setStudents([...students, {
      name,
      marks: { ...marks },
      average: avg.toFixed(2),
      grade: gradeInfo.grade,
      status: gradeInfo.status,
      color: gradeInfo.color
    }]);

    setName('');
    setMarks({});
  };

  const searchStudent = () => {
    if (!searchName.trim()) {
      alert('Please enter a student name to search!');
      return;
    }
    const found = students.find(s => s.name.toLowerCase() === searchName.toLowerCase());
    if (found) {
      setSearchResult(found);
    } else {
      setSearchResult('not_found');
    }
  };

  const passCount = students.filter(s => s.status === 'Pass').length;
  const failCount = students.filter(s => s.status === 'Fail').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Award className="text-indigo-600" size={40} />
            Student Grade Management System
          </h1>
          <p className="text-gray-600">Track student performance with custom subjects</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 mb-6 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <BookOpen className="text-purple-600" size={24} />
              Subjects Configuration
            </h2>
            <button
              onClick={() => {
                setShowSubjectEditor(!showSubjectEditor);
                setTempSubjects(subjects.join(', '));
              }}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition font-semibold flex items-center gap-2"
            >
              <Edit3 size={18} />
              {showSubjectEditor ? 'Cancel' : 'Edit Subjects'}
            </button>
          </div>
          
          {showSubjectEditor ? (
            <div className="space-y-3">
              <input
                type="text"
                value={tempSubjects}
                onChange={(e) => setTempSubjects(e.target.value)}
                placeholder="Enter subjects separated by commas (e.g., Math, Science, English)"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={updateSubjects}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Save Subjects
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject, idx) => (
                <span key={idx} className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium text-sm">
                  {subject}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 mb-6 border-2 border-indigo-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <UserPlus className="text-indigo-600" size={28} />
            Add New Student
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Student Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter student name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Enter Marks for Each Subject *
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                {subjects.map((subject) => (
                  <div key={subject}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {subject}
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={marks[subject] || ''}
                      onChange={(e) => setMarks({ ...marks, [subject]: e.target.value })}
                      placeholder="0-100"
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={addStudent}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold flex items-center justify-center gap-2 shadow-lg text-lg"
            >
              <UserPlus size={22} />
              Add Student
            </button>
          </div>
        </div>

        {students.length > 0 && (
          <>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-purple-300">
                <div className="flex items-center gap-3">
                  <Users className="text-purple-600" size={36} />
                  <div>
                    <h3 className="text-sm text-gray-600 font-medium uppercase">Total Students</h3>
                    <p className="text-4xl font-bold text-gray-800">{students.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-green-300">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-600" size={36} />
                  <div>
                    <h3 className="text-sm text-gray-600 font-medium uppercase">Passed</h3>
                    <p className="text-4xl font-bold text-green-600">{passCount}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-red-300">
                <div className="flex items-center gap-3">
                  <XCircle className="text-red-600" size={36} />
                  <div>
                    <h3 className="text-sm text-gray-600 font-medium uppercase">Failed</h3>
                    <p className="text-4xl font-bold text-red-600">{failCount}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6 mb-6 border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Search className="text-blue-600" size={28} />
                Search Student
              </h2>

              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  value={searchName}
                  onChange={(e) => {
                    setSearchName(e.target.value);
                    setSearchResult(null);
                  }}
                  placeholder="Enter student name to search"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && searchStudent()}
                />
                <button
                  onClick={searchStudent}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg"
                >
                  Search
                </button>
              </div>

              {searchResult && (
                <div className="mt-4">
                  {searchResult === 'not_found' ? (
                    <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 text-center">
                      <XCircle className="mx-auto text-red-600 mb-3" size={48} />
                      <p className="text-red-700 font-bold text-lg">Student Not Found!</p>
                      <p className="text-red-600 mt-1">'{searchName}' is not in the records.</p>
                    </div>
                  ) : (
                    <div className={`border-2 rounded-xl p-6 ${searchResult.color}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{searchResult.name}</h3>
                          <p className="text-sm font-medium opacity-75">Student Record</p>
                        </div>
                        <div className="text-center bg-white bg-opacity-50 rounded-lg p-3">
                          <div className="text-5xl font-bold mb-1">{searchResult.grade}</div>
                          <div className="flex items-center justify-center gap-1 font-bold">
                            {searchResult.status === 'Pass' ? 
                              <CheckCircle size={20} /> : 
                              <XCircle size={20} />
                            }
                            {searchResult.status}
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white bg-opacity-60 rounded-lg p-4 mb-3">
                        <h4 className="font-bold text-sm mb-3 text-gray-700">Subject-wise Marks</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {Object.entries(searchResult.marks).map(([subject, mark]) => (
                            <div key={subject} className="bg-white rounded-lg p-3 shadow-sm">
                              <div className="text-xs font-semibold text-gray-600 uppercase">{subject}</div>
                              <div className="text-2xl font-bold text-gray-800">{mark}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-white bg-opacity-60 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-lg">Average Score:</span>
                          <span className="text-3xl font-bold">{searchResult.average}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Student Report</h2>
              <div className="space-y-4">
                {students.map((student, idx) => (
                  <div
                    key={idx}
                    className={`border-2 rounded-xl p-6 ${student.color} transition hover:shadow-lg`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{student.name}</h3>
                        <p className="text-sm font-medium opacity-75">Student #{idx + 1}</p>
                      </div>
                      <div className="text-center bg-white bg-opacity-50 rounded-lg p-3">
                        <div className="text-5xl font-bold mb-1">{student.grade}</div>
                        <div className="flex items-center justify-center gap-1 font-bold text-sm">
                          {student.status === 'Pass' ? 
                            <CheckCircle size={18} /> : 
                            <XCircle size={18} />
                          }
                          {student.status}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white bg-opacity-60 rounded-lg p-4 mb-3">
                      <h4 className="font-bold text-sm mb-3 text-gray-700">Subject-wise Marks</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {Object.entries(student.marks).map(([subject, mark]) => (
                          <div key={subject} className="bg-white rounded-lg p-3 shadow-sm">
                            <div className="text-xs font-semibold text-gray-600 uppercase">{subject}</div>
                            <div className="text-2xl font-bold text-gray-800">{mark}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-white bg-opacity-60 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">Average Score:</span>
                        <span className="text-3xl font-bold">{student.average}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {students.length === 0 && (
          <div className="bg-white rounded-xl shadow-xl p-12 text-center border-2 border-gray-200">
            <Users className="mx-auto text-gray-400 mb-4" size={80} />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Students Added Yet</h3>
            <p className="text-gray-500">Configure subjects and start adding students to see their grades!</p>
          </div>
        )}
      </div>
    </div>
  );
}
