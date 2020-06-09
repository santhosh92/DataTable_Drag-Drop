import { Component, AfterViewInit } from '@angular/core';
declare var LeaderLine: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tableList = [
    {
      'name': 'instructor',
      'columns': [
        {
          'name': 'instructor_id',
          'alias': ''
        },
        {
          'name': 'instructor_name',
          'alias': ''
        },
        {
          'name': 'salary',
          'alias': ''
        }
      ],
      'position':{x: 1137, y: 226},
      'keys': {
        'primary': 'instructor_id'
      }
    },
    {
      'name': 'course',
      'position':{x: 100, y: 100},
      'columns': [
        {
          'name': 'course_id',
          'alias': ''
        },
        {
          'name': 'instructor_name',
          'alias': ''
        },
        {
          'name': 'title',
          'alias': ''
        }
      ],
      'keys': {
        'primary': 'course_id'
      }
    },
    {
      'name': 'student',
      'position':{x: 250, y: 250},
      'columns': [
        {
          'name': 'student_id',
          'alias': ''
        },
        {
          'name': 'student_name',
          'alias': ''
        }
      ],
      'keys': {
        'primary': 'student_id'
      }
    },
    {
      'name': 'offering',
      'position':{x: 300, y: 300},
      'columns': [
        {
          'name': 'offering_id',
          'alias': ''
        },
        {
          'name': 'offering_name',
          'alias': ''
        },
        {
          'name': 'instructor_id',
          'alias': ''
        },
        {
          'name': 'course_id',
          'alias': ''
        },{
          'name': 'offering_id1',
          'alias': ''
        },
        {
          'name': 'offering_name1',
          'alias': ''
        },
        {
          'name': 'instructor_id1',
          'alias': ''
        },
        {
          'name': 'course_id1',
          'alias': ''
        }
      ],
      'keys': {
        'primary': 'offering_id',
        'foregin': 'instructor_id, course_id'
      }
    },
    {
      'name': 'attendance',
      'position':{x: 0, y: 0},
      'columns': [
        {
          'name': 'offering_id',
          'alias': ''
        },
        {
          'name': 'student_id',
          'alias': ''
        }
      ],
      'keys': {
        'foregin': 'offering_id, student_id'
      }
    }
  ];
  data = { 'tables': [], entityRelationship: [], entityCordinates: [] };
    // { 'tables': [{ 'name': 'instructor', 'columns': ['instructor_id', 'instructor_name', 'salary'], 'keys': { 'primary': 'instructor_id' }, 'width': 33 }, { 'name': 'course', 'columns': ['course_id', 'title'], 'keys': { 'primary': 'course_id' }, 'width': 33 }, { 'name': 'student', 'columns': ['student_id', 'student_name'], 'keys': { 'primary': 'student_id' }, 'width': 33 }, { 'name': 'offering', 'columns': ['offering_id', 'offering_name', 'instructor_id', 'course_id'], 'keys': { 'primary': 'offering_id', 'foregin': 'instructor_id, course_id' }, 'width': 33 }, { 'name': 'attendance', 'columns': ['offering_id', 'student_id'], 'keys': { 'foregin': 'offering_id, student_id' }, 'width': 33 }], 'entityRelationship': [{ 'name': 'instructor_offeringkey', 'primaryTable': 'instructor', 'relationalTable': 'offering' }, { 'name': 'course_offeringkey', 'primaryTable': 'course', 'relationalTable': 'offering' }, { 'name': 'offering_attendancekey', 'primaryTable': 'offering', 'relationalTable': 'attendance' }, { 'name': 'student_attendancekey', 'primaryTable': 'student', 'relationalTable': 'attendance' }] };
}
