// #############
// SQL Query Functions;
// #############

// EMPLOYEES;
// =============*
const GetEmployeeNames = () => {
	return `SELECT e.id, e.first_name, e.last_name
            FROM employees e
            ORDER BY e.first_name ASC;`;
};
const viewEmployees = () => {
	return `SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', d.name AS 'Department', r.title AS 'Title', r.salary AS 'Salary', CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
    FROM employees e
    LEFT JOIN employees m ON m.id = e.manager_id
    LEFT JOIN Role r ON e.role_id = r.id
    LEFT JOIN Department d ON d.id = r.department_id
    ORDER BY e.id ASC;`;
};
const addEmployee = (first, last, roleId, managerId) => {
	return `INSERT INTO employees (first_name, last_name, role_id, manager_id)
            VALUES ('${first}', '${last}', ${roleId}, ${managerId});`;
};
const updateEmployeeRole = (employeeId, roleId) => {
	return `UPDATE employees e
            SET
                e.role_id = ${roleId}
            WHERE
                e.id = ${employeeId};`;
};
const updateEmployeeManager = (managerId, employeeId) => {
	return `UPDATE employees e
            SET
                e.manager_id = ${managerId}
            WHERE
                e.id = ${employeeId};`;
};
const removeEmployee = (employeeId) => {
	return `DELETE FROM employees WHERE id = ${employeeId};`;
};

// ROLES;
// =============*
const GetRoles = () => {
	return `SELECT r.id, r.title
            FROM employeeRole r
            ORDER BY r.title ASC;`;
};
const viewRoles = () => {
	return `SELECT title AS Role
            FROM employeeRole
            ORDER BY title ASC;`;
};
const addRole = (title, salary, departmentId) => {
	return `INSERT INTO role (title, salary, department_id) 
            VALUES ('${title}', '${salary}', '${departmentId}');`;
};
const removeRole = (removeRoleId) => {
	return `DELETE FROM role WHERE id = ${removeRoleId};`;
};

// DEPARTMENT;
// =============*
const GetDepartments = () => {
	return `SELECT d.id, d.name
            FROM department d
            ORDER BY d.name ASC;`;
};
const viewDepartments = () => {
	return `SELECT name AS 'Department Name'
            FROM department
            ORDER BY name ASC;`;
};
const addDepartment = (name) => {
	return `INSERT INTO department (name) \
            VALUES ('${name}');`;
};
const removeDepartment = (removeDepartmentId) => {
	return `DELETE FROM department WHERE id = ${removeDepartmentId};`;
};

// EXPORTS;
// =============*
exports.GetEmployeeNames = GetEmployeeNames;
exports.viewEmployees = viewEmployees;
exports.addEmployee = addEmployee;
exports.updateEmployeeRole = updateEmployeeRole;
exports.updateEmployeeManager = updateEmployeeManager;
exports.removeEmployee = removeEmployee;

exports.GetRoles = GetRoles;
exports.viewRoles = viewRoles;
exports.addRole = addRole;
exports.removeRole = removeRole;

exports.GetDepartments = GetDepartments;
exports.viewDepartments = viewDepartments;
exports.addDepartment = addDepartment;
exports.removeDepartment = removeDepartment;
