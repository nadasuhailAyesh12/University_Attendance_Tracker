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
(220200629,'Noura','khaled','hazem','ayash','female','Gaza','Engineering')
;

INSERT INTO student_phone values(220200628,013827093);

INSERT INTO lecture
 values(1,201,'ECOM3422','winter',2023,'saturday',12,1,213,'L'),
 (1,202,'ECOM3422','winter',2023,'saturday',1,2,212,'L'),
 (1,201,'ECOM2422','winter',2023,'saturday',12,1,213,'L'),
  (1,201,'SCOM2422','winter',2023,'saturday',12,1,213,'C');

INSERT INTO takes values (201,'ECOM3422','winter',2023,220200628),
(201,'ECOM3422','winter',2023,220200629);

INSERT INTO attendance values(1,220200628,201,'ECOM3422');

