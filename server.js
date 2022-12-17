//--Dependencies--
const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./db");

//--Start Menu--
initialize();
function initialize() {
  console.log("Welcome To the Employee Tracker!");
  startMenu();
}

function startMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "main",
        message: "Select an option below: ",
        choices: [
          "View All Employees",
          "View All Departments",
          "View Roles",
          "Add A New Employee",
          "Add A New Department",
          "Add A New Role",
          "Update An Employee's Role",
        ],
      },
    ])
    .then((response) => {
      switch (response.main) {
        case "View All Employees":
          viewAllEmployees();
          break;

        case "View All Departments":
          viewAllDepartments();
          break;

        case "View Roles":
          viewAllRoles();
          break;

        case "Add A New Employee":
          addEmployee();
          break;

        case "Add A New Department":
          addDepartment();
          break;

        case "Add A New Role":
          addRole();
          break;

        case "Update An Employee's Role":
          updateEmployeeRole();
          break;
      }
    });
}

//--To View All Employees--
function viewAllEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      cTable(employees);
    })
    .then(() => {
      startMenu();
    });
};

//--To View All Departments--
function viewAllDepartments() {
  db.findAllDepartments()
  .then(([rows]) => {
    let departments = rows;
    console.log('\n');
    cTable(departments);
  })
  .then(() => {
    startMenu();
  });
};

//--To View All Roles--
function viewAllRoles() {
  db.findAllRoles()
  .then(([rows]) => {
    let roles = rows;
    console.log('\n');
    cTable(roles);
  })
  .then(() => {
    startMenu()
  });
};

//--Adding Employee--
function addEmployee() {
  inquirer.prompt (
    [
      {
        type: 'input',
        name: 'first_name',
        message: `Enter Employee's First Name.`
      },
      {
        type: 'input',
        name: 'last_name',
        message: `Enter Employee's Last Name.`
      },
      {
        type: 'input',
        name: 'role_id',
        message: `Enter Employee's Role ID.`
      },
      {
        type: 'input',
        name: 'first_name',
        message: `Enter Employee's First Name.`
      }

    ]
  )
}