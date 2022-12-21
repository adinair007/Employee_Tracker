//--Dependencies--
const inquirer = require("inquirer");
require("console.table");
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
          "View Contents",
          "Add To / Update Database",
          "Delete From Database",
          "View Department Budgets",
        ],
      },
    ])
    .then((response) => {
      switch (response.main) {
        case "View Contents":
          viewMenu();
          break;

        case "Add To / Update Database":
          addMenu();
          break;

        case "Delete From Database":
          deleteMenu();
          break;

        case "View Department Budgets":
          viewBudget();
          break;
      }
    });
}

//--Viewing Budget By Department--
function viewBudget() {
  console.log("Showing Budget By Department...");
  db.viewDeptBudget()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => {
      startMenu();
    });
}

//--Viewing Menu---
function viewMenu() {
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
          "View Employee By Manager",
          "View Employee By Department",
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

        case "View Employee By Manager":
          viewByManager();
          break;

        case "View Employee By Department":
          viewByDepartment();
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
      console.table(employees);
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
      console.table(departments);
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
      console.table(roles);
    })
    .then(() => {
      startMenu();
    });
}

//--Viewing By Manager--
function viewByManager() {
  db.findEmployeeByMngr()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => {
      startMenu();
    });
}

//--Viewing By Department--
function viewByDepartment() {
  db.findEmployeeByDept()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => {
      startMenu();
    });
}

//--Adding/Updating Menu--
function addMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "main",
        message: "Select an option below: ",
        choices: [
          "Add A New Employee",
          "Add A New Department",
          "Add A New Role",
          "Update An Employee's Role",
          "Update An Employee's Manager",
        ],
      },
    ])
    .then((response) => {
      switch (response.main) {
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

        case "Update An Employee's Manager":
          updateManager();
          break;
      }
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
        name: "name",
        message: `Enter New Department's Name.`,
      },
    ])
    .then(function (answer) {
      db.createDepartment(answer)
        .then(([rows]) => {
          let departments = rows;
          console.log("\n");
          console.log(`${answer.name} was added to the database.`);
          console.table(departments);
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
        name: "title",
        message: `Enter New Role's Title.`,
      },
      {
        type: "input",
        name: "salary",
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
        `A new role called: ${answer.title}, has been added to the database.`
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
          name: "employeeId",
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
              viewAllEmployees();
            });
        });
      });
  });
}

//--Updating Employee's Manager--
function updateManager() {
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
      .then((empChoice) => {
        const employee = empChoice.employee_update;

        db.findAllEmployees().then(([rows]) => {
          const managers = rows;
          const managersList = managers.map(
            ({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id,
            })
          );
          inquirer
            .prompt([
              {
                type: "list",
                name: "manager",
                message: `Select A New Manager.`,
                choices: managersList,
              },
            ])
            .then((managerChoice) => {
              const manager = managerChoice.manager;
              db.updateManager(employee, manager);
              console.log("Employee has been updated!");

              viewAllEmployees();
            });
        });
      });
  });
}
//--Deletion Menu--
function deleteMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "main",
        message: "Select an option below: ",
        choices: ["Delete An Employee", "Delete A Department", "Delete A Role"],
      },
    ])
    .then((response) => {
      switch (response.main) {
        case "Delete An Employee":
          deleteEmployee();
          break;

        case "Delete A Department":
          deleteDept();
          break;

        case "Delete A Role":
          deleteRole();
          break;
      }
    });
}

//--Deleting Employee--
function deleteEmployee() {
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
          name: "employee_delete",
          message: `Select an employee to delete.`,
          choices: employeesList,
        },
      ])
      .then((empChoice) => {
        const employee = empChoice.employee_delete;
        db.deleteEmp(employee);
        console.log(
          `${empChoice.first_name} ${empChoice.last_name} was deleted from the database.`
        );
        viewAllEmployees();
      });
  });
}

//--Deleting A Department--
function deleteDept() {
  db.findAllDepartments().then(([rows]) => {
    let departments = rows;
    const deptList = departments.map(({ name, id }) => ({
      name: name,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "dept_delete",
          message: `Select A Department To Delete:`,
          choices: deptList,
        },
      ])
      .then((deptChoice) => {
        const dept = deptChoice.dept_delete;
        db.deleteDept(dept);
        console.log(`${deptChoice.name} was deleted from the database.`);
        viewAllDepartments();
      });
  });
}

//--Deleting A Role--
function deleteRole() {
  db.findAllRoles().then(([rows]) => {
    let roles = rows;
    const roleList = roles.map(({ title, id }) => ({
      name: title,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "role_delete",
          message: `Select A Role To Delete:`,
          choices: roleList,
        },
      ])
      .then((roleChoice) => {
        const role = roleChoice.role_delete;
        db.deleteRole(role);
        console.log(`${roleChoice.title} was deleted from the database.`);
        viewAllRoles();
      });
  });
}
