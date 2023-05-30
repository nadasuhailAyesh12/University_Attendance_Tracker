INSERT INTO authuser values 
(220200627,'Nouran','$2a$12$hqnq12Mov.iBietQbtUDuu92upaallanMonWddv.h0Rw4bbz9C1Wi','user'),
  (320200629,'Rasha','$2a$12$bKkLuogysZjifFiftnWO1.sVICHCceaxDp1A3LO2Ylzu5nOQqtOEm','Admin');                        

INSERT INTO department values('Engineering','L'),
('Science','C');


INSERT INTO course values('ECOM3422','DBMS','Engineering','DBMS7thedition'),
 ('ECOM2422','javaProgramming','Engineering','java'),
  ('SCOM2422','physics','Science','serway');

INSERT INTO instructor values(320200629,'Rasha','Engineering','teaching-assistant');

INSERT INTO section values(201,'ECOM3422','winter',2023,320200629),
(201,'ECOM2422','winter',2023,320200629),
(201,'SCOM2422','winter',2023,320200629),
(202,'ECOM3422','winter',2023,320200629);

INSERT INTO student values(220200628,'Nada','suhail','khalil','Ayesh','female','Gaza','Engineering'),
(220200617,'Narin','khaled','Hazem','Samour','female','Gaza','Engineering'),
(220200629,'Nara','Ahmed','Hazem','Shurab','female','Gaza','Engineering'),
(220200619,'lina','Sami','Hazem','Tbeal','female','Gaza','Engineering'),
(220200204,'Asil','khouli','samer','Herz','female','Gaza','Engineering'),
(22020067,'Abeer','hasan','Ahm','Ayash','female','Gaza','Engineering'),
(1220200629,'Nael','Yaser','Faraj','Dader','male','Gaza','Engineering'),
(120200616,'Fathi','karam','Samer','Srour','male','Gaza','Engineering'),
(120200617,'Jamal','Mohammed','karem','Matar','male','Gaza','Engineering'),
(120200189,'Mohammed','Suhail','khalil','Ayesh','male','Gaza','Engineering'),
(120200209,'Yazed','Awni','Fathi','Samali','male','Gaza','Engineering'),
(120200229,'Ibrahem','Hassan','shadi','Sheik','male','Gaza','Engineering');

INSERT INTO student_phone values(220200628,013827093);

INSERT INTO lecture
 values(1,201,'ECOM3422','winter',2023,'saturday',12,1,213,'L'),
 (2,201,'ECOM3422','winter',2023,'saturday',12,1,213,'L'),
 (3,201,'ECOM3422','winter',2023,'saturday',12,1,213,'L'),
 (4,201,'ECOM3422','winter',2023,'saturday',12,1,213,'L'),
 (5,201,'ECOM3422','winter',2023,'saturday',12,1,213,'L'),
 (9,201,'ECOM3422','winter',2023,'saturday',12,1,213,'L'),
 (6,201,'ECOM3422','winter',2023,'saturday',12,1,213,'L'),
 (7,201,'ECOM3422','winter',2023,'saturday',12,1,213,'L'),
 (8,201,'ECOM3422','winter',2023,'saturday',12,1,213,'L'),
 (10,201,'ECOM3422','winter',2023,'saturday',1,2,212,'L'),
 (1,201,'ECOM2422','winter',2023,'saturday',12,1,213,'L'),
  (2,201,'SCOM2422','winter',2023,'saturday',12,1,213,'C');

INSERT INTO takes values (201,'ECOM3422','winter',2023,220200628),
(201,'ECOM3422','winter',2023,220200629),
(201,'ECOM3422','winter',2023,120200617);

INSERT INTO attendance values(1,220200628,201,'ECOM3422'),
(2,220200628,201,'ECOM3422'),
(3,220200628,201,'ECOM3422'),
(4,220200628,201,'ECOM3422'),
(5,120200617,201,'ECOM3422'),
(6,120200617,201,'ECOM3422'),
(7,220200629,201,'ECOM3422'),
(8,220200629,201,'ECOM3422'),
(9,220200629,201,'ECOM3422'),
(10,220200629,201,'ECOM3422'),
(1,220200629,201,'ECOM3422'),
(2,220200629,201,'ECOM3422'),
(3,220200629,201,'ECOM3422'),
(4,220200617,201,'ECOM3422'),
(5,220200628,201,'ECOM3422'),
(6,220200628,201,'ECOM3422'),
(7,220200628,201,'ECOM3422'),
(8,220200628,201,'ECOM3422'),
(9,220200628,201,'ECOM3422');

