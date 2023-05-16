INSERT INTO authuser values 
(220200627,'Nouran','$2a$12$hqnq12Mov.iBietQbtUDuu92upaallanMonWddv.h0Rw4bbz9C1Wi','user'),
  (320200629,'Rasha','$2a$12$bKkLuogysZjifFiftnWO1.sVICHCceaxDp1A3LO2Ylzu5nOQqtOEm','Admin');                        

INSERT INTO department values('Engineering','L');

INSERT INTO course values('ECOM3422','DBMS','Engineering','DBMS7thedition');

INSERT INTO instructor values(320200629,'Rasha','Engineering','teaching-assistant');

INSERT INTO section values(201,'ECOM3422','winter',2023,320200629);

INSERT INTO student values(220200628,'Nada','suhail','khalil','Ayesh','female','Gaza','Engineering');

INSERT INTO student_phone values(220200628,013827093);

INSERT INTO lecture(sec_id,course_id,semester,year,day,start_time,end_time,room_number,building)
 values(201,'ECOM3422','winter',2023,'saturday',12,1,213,'L');

INSERT INTO takes values (201,'ECOM3422','winter',2023,220200628);

INSERT INTO attendance values(1,220200628);

