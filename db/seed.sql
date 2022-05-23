USE employeesdb;

INSERT INTO department (name)
VALUES ('Sales'),('Finance'),('Legal'),('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 75000, 1),('Finance Lead', 87000,2),('Legal Lead', 200000,3),('Engineering Lead',215000,4),('Sales Analyst', 50000, 1),('Financial Analyst', 70000, 2),('Legal Analyst', 120000, 3),('Engineering Analyst', 130000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jackson', 'Pollock', 1, null), ('Ludwig', 'Beethoven', 2, null), ('Vincent', 'Gogh', 3, null), ('Joseph', 'Bach', 4, null), ('Savador', 'Dali', 5, 1), ('Jean', 'Sartre', 6, 2), ('Claude', 'Monet', 7, 3), ('Wolfgang', 'Mozart', 8, 4);