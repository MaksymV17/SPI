// Enum definitions
enum StudentStatus {
    Active = "Active",
    Academic_Leave = "Academic_Leave",
    Graduated = "Graduated",
    Expelled = "Expelled",
  }
  
  enum CourseType {
    Mandatory = "Mandatory",
    Optional = "Optional",
    Special = "Special",
  }
  
  enum Semester {
    First = "First",
    Second = "Second",
  }
  
  enum GradeValue {
    Excellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2,
  }
  
  enum Faculty {
    Computer_Science = "Computer_Science",
    Economics = "Economics",
    Law = "Law",
    Engineering = "Engineering",
  }
  
  // Interface definitions
  interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
  }
  
  interface Course {
    id: number;
    name: string;
    type: CourseType;
    credits: number;
    semester: Semester;
    faculty: Faculty;
    maxStudents: number;
  }
  
  interface Grade {
    studentId: number;
    courseId: number;
    grade: GradeValue;
    date: Date;
    semester: Semester;
  }
  
  // University Management System
  class UniversityManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: Grade[] = [];
    private nextStudentId: number = 1;
    private nextCourseId: number = 1;
  
    /**
     * Enroll a new student into the system
     */
    enrollStudent(student: Omit<Student, "id">): Student {
      const newStudent: Student = { id: this.nextStudentId++, ...student };
      this.students.push(newStudent);
      return newStudent;
    }
  
    /**
     * Register a student for a course
     */
    registerForCourse(studentId: number, courseId: number): void {
      const student = this.students.find((s) => s.id === studentId);
      const course = this.courses.find((c) => c.id === courseId);
  
      if (!student) throw new Error("Student not found");
      if (!course) throw new Error("Course not found");
  
      const enrolledCount = this.grades.filter((g) => g.courseId === courseId).length;
      if (enrolledCount >= course.maxStudents) throw new Error("Course is full");
      if (student.faculty !== course.faculty) throw new Error("Student cannot register for a course in a different faculty");
    }
  
    /**
     * Assign a grade to a student for a specific course
     */
    setGrade(studentId: number, courseId: number, grade: GradeValue): void {
      const registration = this.grades.find((g) => g.studentId === studentId && g.courseId === courseId);
      if (!registration) throw new Error("Student is not registered for the course");
  
      registration.grade = grade;
      registration.date = new Date();
    }
  
    /**
     * Update a student's status
     */
    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
      const student = this.students.find((s) => s.id === studentId);
      if (!student) throw new Error("Student not found");
  
      if (newStatus === StudentStatus.Graduated && student.status !== StudentStatus.Active) {
        throw new Error("Only active students can graduate");
      }
  
      student.status = newStatus;
    }
  
    /**
     * Get all students by faculty
     */
    getStudentsByFaculty(faculty: Faculty): Student[] {
      return this.students.filter((s) => s.faculty === faculty);
    }
  
    /**
     * Get all grades of a specific student
     */
    getStudentGrades(studentId: number): Grade[] {
      return this.grades.filter((g) => g.studentId === studentId);
    }
  
    /**
     * Get available courses for a faculty and semester
     */
    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
      return this.courses.filter((c) => c.faculty === faculty && c.semester === semester);
    }
  
    /**
     * Calculate average grade of a student
     */
    calculateAverageGrade(studentId: number): number {
      const studentGrades = this.getStudentGrades(studentId);
      if (studentGrades.length === 0) throw new Error("No grades found for this student");
  
      const total = studentGrades.reduce((sum, g) => sum + g.grade, 0);
      return total / studentGrades.length;
    }
  
    /**
     * Get list of top students by faculty
     */
    getTopStudentsByFaculty(faculty: Faculty): Student[] {
      const studentsByFaculty = this.getStudentsByFaculty(faculty);
  
      return studentsByFaculty.filter((student) => {
        const grades = this.getStudentGrades(student.id);
        return grades.every((g) => g.grade === GradeValue.Excellent);
      });
    }
  }
  