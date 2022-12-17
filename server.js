//--Dependencies--
const inquirer = require("inquirer");
const consoleTable = require("console.table");
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
      consoleTable(employees);
    })
    .then(() => {
      startMenu();
    });
}

//--To View All Departments--
function viewAllDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      consoleTable(departments);
    })
    .then(() => {
      startMenu();
    });
}

//--To View All Roles--
function viewAllRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      consoleTable(roles);
    })
    .then(() => {
      startMenu();
    });
}

//--Adding New Employee--
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: `Enter Employee's First Name.`,
      },
      {
        type: "input",
        name: "last_name",
        message: `Enter Employee's Last Name.`,
      },
      {
        type: "input",
        name: "role_id",
        message: `Enter Employee's Role ID.`,
      },
      {
        type: "input",
        name: "manager_id",
        message: `Enter Employee's Manager ID.`,
      },
    ])
    .then(function (answer) {
      db.createEmployee(answer).then(() => {
        startMenu();
      });
      console.log("\n");
      console.log(
        `${answer.first_name} ${answer.last_name} was added to the database.`
      );
    });
}

//--Adding New Department--
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "dept_name",
        message: `Enter New Department's Name.`,
      },
    ])
    .then(function (answer) {
      db.createDepartment(answer)
        .then(([rows]) => {
          let departments = rows;
          console.log("\n");
          console.log(`${answer.dept_name} was added to the database.`);
          consoleTable(departments);
        })
        .then(() => {
          startMenu();
        });
    });
}

//--Adding New Role--
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role_title",
        message: `Enter New Role's Title.`,
      },
      {
        type: "input",
        name: "role_salary",
        message: `Enter Salary Amount.`,
      },
      {
        type: "input",
        name: "department_id",
        message: `Enter Department ID.`,
      },
    ])
    .then(function (answer) {
      db.createRole(answer).then(() => {
        startMenu();
      });
      console.log("\n");
      console.log(
        `A new role called: ${answer.role_title}, has been added to the database.`
      );
    });
}

//--Updating Employee Role--
function updateEmployeeRole() {
  db.findAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeesList = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee_update",
          message: `Select an employee to update.`,
          choices: employeesList,
        },
      ])
      .then((res) => {
        let employeeId = res.employeeId;
        db.findAllRoles().then(([rows]) => {
          let roles = rows;
          const rolesList = roles.map(({ id, role_title }) => ({
            name: role_title,
            value: id,
          }));
          inquirer
            .prompt([
              {
                type: "list",
                name: "roleId",
                message: `Select employee's new role.`,
                choices: rolesList,
              },
            ])
            .then((res) => db.updateRole(employeeId, res.roleId))
            .then(() => {
              startMenu();
            });
        });
      });
  });
};
