-- DEPARTMENTS
-- =============
USE employee_db;
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Intern');
INSERT INTO department (name) VALUES ('Warehouse');
INSERT INTO department (name) VALUES ('Accounting');
INSERT INTO department (name) VALUES ('Management');
INSERT INTO department (name) VALUES ('Human Resources');

USE employee_db;
SELECT * FROM department;

-- ROLES
-- =============
USE employee_db;
INSERT INTO employeeRole (title, salary, department_id) VALUES ('Paper Sales-Person', '10000', '1');
INSERT INTO employeeRole (title, salary, department_id) VALUES ('Temp', '0', '2');
INSERT INTO employeeRole (title, salary, department_id) VALUES ('Foreman', '187050', '3');
INSERT INTO employeeRole (title, salary, department_id) VALUES ('Accountant', '137050', '4');
INSERT INTO employeeRole (title, salary, department_id) VALUES ('Office Administrator', '15000', '5');
INSERT INTO employeeRole (title, salary, department_id) VALUES ('Asst. to the RM', '45700', '5');
INSERT INTO employeeRole (title, salary, department_id) VALUES ('Regional Manager', '82300', '5');
INSERT INTO employeeRole (title, salary, department_id) VALUES ('Receptionist', '8000', '6');
INSERT INTO employeeRole (title, salary, department_id) VALUES ('Human Relations', '227050', '6');

USE employee_DB;
SELECT * FROM employeeRole;
USE employee_DB;
SELECT title
    FROM employeeRole
    -- ORDER BY department_id in ascending order, same with title
    ORDER BY department_id ASC, title ASC;

-- EMPLOYEES
-- =============
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Michael', 'Scott', 9, 1);
