// Dependencies;
// =============*
const sqlQueries = require("./db/queries");
const inquirer = require("inquirer");
const mysql = require("mysql");

// MYSQL;
// =============*
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "columbiaUniversity",
	database: "employee_db",
});

// -on connect;
connection.connect(function (err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	promptOptions();
});

promptOptions();
// Options;
// =============
function promptOptions() {
	departmentList = [];
	departmentListObj = {};
	roleList = [];
	roleListObj = {};
	employeeList = [];
	employeeListObj = {};

	// - Department IDs and Names;
	connection.query(sqlQueries.GetDepartments(), function (err, results) {
		if (err) throw err;
		for (let i = 0; i < results.length; i++) {
			departmentList.push(results[i].name);
		}
		departmentListObject = results;
		console.log(departmentListObj);
	});

	// - Role IDs and Titles;
	connection.query(sqlQueries.GetRoles(), function (err, results) {
		if (err) throw err;
		for (let i = 0; i < results.length; i++) {
			roleList.push(results[i].title);
		}
		roleListObject = results;
		console.log(roleListObj);
	});

	// - Employee IDs and Names;
	connection.query(sqlQueries.GetEmployeeNames(), function (err, results) {
		if (err) throw err;
		employeeList.push("None");
		for (let i = 0; i < results.length; i++) {
			employeeList.push(results[i].first_name + " " + results[i].last_name);
		}
		employeeListObject = results;
		console.log(employeeListObj);
	});
	return (optionsOBJ = [departmentList, roleList, employeeList]);
}

// Prompts;
// ============*
async function runPrompts() {
	await inquirer
		.prompt({
			name: "option",
			type: "list",
			message: "Select option:",
			choices: [
				new inquirer.Separator(":====EMPLOYEE====:"),
				"= View Employees =",
				"+ Add Employee +",
				"^ Update Employee Role ^",
				"^^ Update Employee Manager ^^",
				"- Delete Employee -",
				new inquirer.Separator(":======ROLE======:"),
				"= View Roles =",
				"+ Add Role +",
				"- Delete Role -",
				new inquirer.Separator(":===DEPARTMENT===:"),
				"= View Departments =",
				"+ Add Department +",
				"- Delete Department -",
			],
		})
		.then(
			await function (response) {
				switch (response.option) {
					case "= View employees =":
						viewEmployees();
						break;

					case "+ Add Employee +":
						addEmployees();
						break;

					case "- Delete Employee -":
						deleteEmployees();
						break;

					case "^ Update Employee Role ^":
						updateEmployeeRoles();
						break;

					case "^^ Update Employee Manager ^^":
						updateEmployeeManager();
						break;

					case "= View Roles =":
						viewRoles();
						break;

					case "+ Add Role +":
						addRoles();
						break;

					case "- Delete Role -":
						deleteRoles();
						break;

					case "= View Departments +":
						viewDepartments();
						break;

					case "+ Add Department +":
						addDepartments();
						break;

					case "- Delete Department -":
						deleteDepartments();
						break;
				}
			}
		);
}

// Employee Functions;
// =============*
// - View;
async function viewEmployees() {
	var query =
		"SELECT employees.id, employees.first_name, employees.last_name, department.name AS department, role_table.title, role_table.salary FROM employees INNER JOIN role_table ON employees.role_id = role_table.role_id INNER JOIN department ON role_table.department_id = department.department_id";
	connection.query(query, function (err, response) {
		console.table(response);
		runPrompts();
	});
}
// - Add;
async function addEmployees() {
	var query =
		'SELECT CONCAT(first_name , " ", last_name) AS name, id AS value FROM employee_DB.employees;';
	await inquirer
		.prompt(
			{
				name: "first_name",
				type: "input",
				message: "What is the employee's first name?",
			},
			{
				name: "last_name",
				type: "input",
				message: "What is the employee's last name?",
			},
			{
				name: "role",
				type: "list",
				message: "What is the employee's role?",
				choices: roleList,
			}
		)
		.then(async function (answer) {
			connection.query(
				`INSERT INTO role_table (title) VALUES ("${answer.rolesInput}");`,
				function (err, response) {
					console.log(response);
					runPrompts();
				}
			);
		});
}
// -Delete;
async function deleteEmployees() {
	var query =
		'SELECT CONCAT(first_name , " ", last_name) AS name, id AS value FROM employee_DB.employees;';
	connection.query(query, async function (err, response) {
		console.table(response);
		await inquirer
			.prompt({
				name: "delete",
				message: "Select Employee to delete:",
				type: "list",
				choices: response,
			})
			.then(function (answer) {
				let deleteID = answer.delete;

				connection.query(
					"DELETE FROM employees WHERE ?",
					{
						id: deleteID,
					},
					function (err, res) {
						if (err) throw err;
						console.log(res.affectedRows + " employee deleted!\n");
						runPrompts();
					}
				);
			});
	});
}

// Role Functions;
// =============*
