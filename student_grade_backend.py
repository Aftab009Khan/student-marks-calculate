students = {}

# Default subjects (can be customized)
default_subjects = ['Maths', 'Biology', 'Physics', 'Chemistry', 'Python', 'JavaScript']

# Ask if user wants to customize subjects
print("="*50)
print("SUBJECT CONFIGURATION")
print("="*50)
print(f"Default subjects: {', '.join(default_subjects)}")
customize = input("\nDo you want to customize subjects? (yes/no): ").lower()

if customize == 'yes':
    num_subjects = int(input("How many subjects? "))
    subjects = []
    for i in range(num_subjects):
        subject = input(f"Enter subject {i+1} name: ")
        subjects.append(subject)
else:
    subjects = default_subjects

print(f"\nSubjects configured: {', '.join(subjects)}")

# Input number of students
n = int(input('\nEnter number of students: '))

# Collect student data
for _ in range(n):
    name = input('\nEnter student name: ')
    print(f"Enter marks for {name}:")
    marks_dict = {}
    for subject in subjects:
        mark = float(input(f"  {subject}: "))
        marks_dict[subject] = mark
    students[name] = marks_dict

# Function to get grade and status
def get_grade(avg):
    if avg > 90:
        return 'A', 'Pass'
    elif avg >= 75:
        return 'B', 'Pass'
    elif avg >= 60:
        return 'C', 'Pass'
    elif avg >= 40:
        return 'D', 'Pass'
    else:
        return 'F', 'Fail'

# Process each student WITH grades
print("\n" + "="*50)
print("STUDENT REPORT")
print("="*50 + "\n")

for name, marks_dict in students.items():
    marks = list(marks_dict.values())
    avg = sum(marks) / len(marks)
    grade, status = get_grade(avg)
    
    # Print student details WITH grade
    print(f"Name: {name}")
    print(f"Marks:")
    for subject, mark in marks_dict.items():
        print(f"  {subject}: {mark}")
    print(f"Average: {avg:.2f}")
    print(f"Grade: {grade}")
    print(f"Status: {status}")
    print("-" * 50)

# Print total count
print(f"\nTotal Students Appeared: {len(students)}")
print("="*50)

# Search functionality
print("\n" + "="*50)
print("SEARCH STUDENT")
print("="*50)

search_name = input('\nEnter student name to search: ')

if search_name in students:
    marks_dict = students[search_name]
    marks = list(marks_dict.values())
    avg = sum(marks) / len(marks)
    grade, status = get_grade(avg)
    
    print(f"\nStudent Found!")
    print(f"Name: {search_name}")
    print(f"Marks:")
    for subject, mark in marks_dict.items():
        print(f"  {subject}: {mark}")
    print(f"Average: {avg:.2f}")
    print(f"Grade: {grade}")
    print(f"Status: {status}")
else:
    print(f"\nStudent '{search_name}' not found in the records.")

print("="*50)
