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
          'Display Roles',
          'Add Role',
          'Display Departments',
          'Add Department',
          'Show Employees',
          'Add Employee',
          'Update an Employee Role'
        
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

//DB manipulator: handshake between inputs and SQL where you initiate the async function based on choice by user
//is nearly the same statement every time, except with different inputs and SQL
//must account for selecting employee and updating role assignment
const addRole = async() => {
    const result = await inquirer.prompt(addRoleQuery)
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
    const params = [result.title, result.salary, result.department];
    db.query(sql, params, function (err,results) {
        console.log('');
        console.table(results);
    });
    minimap();
}
const addDepartment = async() => {
    const result = await inquirer.prompt(addDepartmentQuery)
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [result.name];
    db.query(sql, params, function (err, results) {
        console.log("");
        console.table(results);
    });
    minimap();
}
const addEmployee = async() => {
    const result = await inquirer.prompt(addEmployeeQuery)
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [result.first_name, result.last_name, result.role_id, result.manager_id];
    db.query(sql, params, function(err, results) {
        console.log("");
        console.table(results);
    });
    minimap();
}
const selectEmployee = async() => {
    const result = await inquirer.prompt(selectEmployeeQuery);
    db.query('SELECT role.id, role.title FROM role', function (err, results) {
        console.log("");
        console.table(results);
    });
    updateRole(result.employee_id);
}
const updateRole = async(employeeID) => {
    const result = await inquirer.prompt(updateRoleQuery)
    const sql = `UPDATE employee SET role_id = ${result.role_id} WHERE id = ${employeeID}`;
    db.query(sql, function(err, results) {
        console.log("");
        console.table(results);
    });
    minimap();
}
//here is where we make the connection to the topmost menu, note that the case names are the same as the initialQuestions menu which is what I call
const minimap = async() => {
    const result = await inquirer.prompt(initialQuestions)
    .then(function(result) {
        switch(result.initialQuestions) {
            case "Display Roles":
            db.query('SELECT role.id, role.title, role.salary, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department', function (err,result) {
                console.log("");
                console.table(results);
            });
            minimap();
            break;

            case "Add Role":
                db.query('SELECT * FROM department', function(err,results) {
                    console.log("");
                    console.table(results);
                });
                addRole();
            break;

            case "Display Departments":
                db.query('SELECT * FROM department', function (err, results) {
                    console.log("");
                    console.table(results);
                });
            minimap();
            break;

            case "Add Department":
        }
    })
}

//start
const startApplication = async() => {
    console.log(`
    █░█░█ █▀▀ █░░ █▀▀ █▀█ █▀▄▀█ █▀▀   ▀█▀ █▀█   █▀▀ █▀▄▀█ █▀█ █░░ █▀█ █▄█ █▀▀ █▀▀   ▀█▀ █▀█ ▄▀█ █▀▀ █▄▀ █▀▀ █▀█
    ▀▄▀▄▀ ██▄ █▄▄ █▄▄ █▄█ █░▀░█ ██▄   ░█░ █▄█   ██▄ █░▀░█ █▀▀ █▄▄ █▄█ ░█░ ██▄ ██▄   ░█░ █▀▄ █▀█ █▄▄ █░█ ██▄ █▀▄ 
    `);
    console.log('Please select an option from the menu to start');

    minimap();
}

//see above
startApplication();