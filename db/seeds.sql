-- DEPARTMENTS
-- =============
USE employee_DB;
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Intern');
INSERT INTO department (name) VALUES ('Warehouse');
INSERT INTO department (name) VALUES ('Accounting');
INSERT INTO department (name) VALUES ('Management');
INSERT INTO department (name) VALUES ('Human Resources');

SELECT * FROM department;

-- ROLES
-- =============
USE employee_DB;
INSERT INTO role (title, salary, department_id) VALUES ('Paper Sales-Person', '10000', '1');
INSERT INTO role (title, salary, department_id) VALUES ('Temp', '0', '2');
INSERT INTO role (title, salary, department_id) VALUES ('Foreman', '187050', '3');
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', '137050', '4');
INSERT INTO role (title, salary, department_id) VALUES ('Office Administrator', '15000', '5');
INSERT INTO role (title, salary, department_id) VALUES ('Asst. to the RM', '45700', '5');
INSERT INTO role (title, salary, department_id) VALUES ('Regional Manager', '82300', '5');
INSERT INTO role (title, salary, department_id) VALUES ('Receptionist', '8000', '6');
INSERT INTO role (title, salary, department_id) VALUES ('Human Relations', '227050', '6');