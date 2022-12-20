INSERT INTO department (name)
VALUES 
("Counsil"),
("General"),
("Commander"),
("Captain");

INSERT INTO role (title, salary, department_id)
VALUES
("Jedi Grandmaster", 100000, 1),
("Jedi Master", 70000, 1),
("Jedi Knight", 80000, 2),
("Padawan", 50000, 3),
("Jedi", 35000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Master", "Yoda", 1, null),
("Qui-Gonn", "Jinn", 5, 1),
("Obi-Wan", "Kenobi", 2, 2),
("Luke", "Skywalker", 4, 1),
("Anakin", "Skywalker", 3, 3);

-- UPDATE employee
-- SET manager_id = 1 
-- WHERE first_name LIKE '%Qui%' ;
-- UPDATE employee
-- SET manager_id = 2 
-- WHERE first_name LIKE '%Obi%' ;
-- UPDATE employee
-- SET manager_id = 1 
-- WHERE first_name LIKE '%Luke%' ;
-- UPDATE employee
-- SET manager_id = 3 
-- WHERE first_name LIKE '%Ana%' ;
