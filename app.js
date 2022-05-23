const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');


//Questions array and switch for user responses 
const initialQuestions = [
    {
        type: 'list',
        name: 'initialQuestions',
        message: 'Employee Management:  Please select an option',
        choices: [
          'Display roles',
          'Add role',
          'Display departments',
          'Add department',
          'Show employees',
          'Add employee',
          'Update an employee role'
        
        ]
    }
]
const addRoleQuery = [
    {
        type: 'input',
        name: 'title',
        message: 'Please enter the TITLE of the new employee'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Please enter the SALARY amount of the new employee'
    },
    {
        type: 'input',
        name: 'department',
        message: 'Please enter the DEPARTMENT the new employee will be placed in'
    }
]
const addDepartmentQuery = [
    {
        type: 'input',
        name: 'name',
        message: 'Please enter the NAME of the new department'
    }
]
const addEmployeeQuery = [
    {
        type: 'input',
        name: 'first_name',
        message: "Please enter the employee's first name"
    },
    {
        type: 'input',
        name: 'last_name',
        message: "Please enter the employee's last name"
    },
    {
        type: 'input',
        name: 'role_id',
        message: "Please enter the employee's role ID number"
    },    
    {
        type: 'input',
        name: 'employee_id',
        message: "Please enter the employee's new ID number"
    }
]

const selectEmployeeQuery = [
    {
        type: 'input',
        name: 'employee_id',
        message: 'Please enter the employee ID number that you would like to update'
    }
]

const updateRoleQuery = [
    {
        type: 'input',
        name: 'role_id',
        message: 'Please enter the role number you would like to assign to the employee'
    }
]

//DB manipulator
const addRole = async() => {
    const result = await inquirer.prompt(addRoleQuery)
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
    const params = [result.title, result.salary, result.department];
    db.query(sql, params, function (err,results) {
        console.log('');
        console.table(results);
    });
    initialMenuQuestions();
}
//RESUME PROGRESS HERE


//start
const startApplication = async() => {
    console.log(`
    █░█░█ █▀▀ █░░ █▀▀ █▀█ █▀▄▀█ █▀▀   ▀█▀ █▀█   █▀▀ █▀▄▀█ █▀█ █░░ █▀█ █▄█ █▀▀ █▀▀   ▀█▀ █▀█ ▄▀█ █▀▀ █▄▀ █▀▀ █▀█
    ▀▄▀▄▀ ██▄ █▄▄ █▄▄ █▄█ █░▀░█ ██▄   ░█░ █▄█   ██▄ █░▀░█ █▀▀ █▄▄ █▄█ ░█░ ██▄ ██▄   ░█░ █▀▄ █▀█ █▄▄ █░█ ██▄ █▀▄ 
    `);
    console.log('Please select an option from the menu to start');

    initialMenuQuestions();
}

//see above
startApplication();