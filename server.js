// Dependencies;
// =============
const inquirer = require("inquirer");
const mysql = require("mysql");

// MYSQL;
// =============
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "columbiaUniversity",
	database: "employee_db",
});

connection.connect(function (err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	init();
});

// Prompts;
// ============
async function runPrompts() {
	await inquirer
		.prompt({
			name: "option",
			type: "rawlist",
			message: "Select option:",
			choices: [
				"View employees",
				"Add employees",
				"Update employee roles",
				"Update employee manager",
				"Delete employees",
				"View roles",
				"Add roles",
				"Delete roles",
				"View departments",
				"Add departments",
				"Delete departments",
			],
		})
		.then(
			await function (response) {
				switch (response.option) {
					case "View employees":
						viewEmployees();
						break;

					case "Add employees":
						addEmployees();
						break;

					case "Delete employees":
						deleteEmployees();
						break;

					case "Update employee roles":
						updateEmployeeRoles();
						break;

					case "Update employee manager":
						updateEmployeeManager();
						break;

					case "View roles":
						viewRoles();
						break;

					case "Add roles":
						addRoles();
						break;

					case "Delete roles":
						deleteRoles();
						break;

					case "View departments":
						viewDepartments();
						break;

					case "Add departments":
						addDepartments();
						break;

					case "Delete Departments":
						deleteDepartments();
						break;
				}
			}
		);
}

// Employee Functions;
// =============
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
				type: "input",
				message: "What is the employee's role?",
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
	connection.query(query, function (err, response) {
		console.table(response);
		inquirer
			.prompt({
				name: "delete",
				type: "list",
				choices: response,
				message: "who would you like to delete",
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
// =============

runPrompts();
