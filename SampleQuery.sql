------ The six queries that are required !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
-- get Most Attended Lectures -- this is one of the six QUERRRRRRRRRRRRRRRRRRRRRRRRY
select lecture_id ,count(*) as count from attendance  where course_id=$1 and sec_id=$2 group by lecture_id order by count desc limit 10
-- getting lectures that have absent more than attending 
SELECT lecture_id 
FROM attendance 
where course_id =$1 and sec_id =$2
 group by lecture_id
 HAVING(COUNT(*)*100  ) / (SELECT COUNT(*) FROM  takes where course_id=$1 and sec_id=$2)<50
 -- get lecture that has 80% attendance percentage
select lecture_id,id from lecture cross join student where lecture_id not in (select lecture_id from attendance where id in (SELECT student.ID from student natural join takes
 where ID  not in(select attendance.ID FROM attendance 
    WHERE course_id =$1 and sec_id=$2
    GROUP BY attendance.ID
HAVING(COUNT(*) * 100.0) / (SELECT COUNT(*) FROM lecture WHERE course_id = $1 and sec_id =$2) < 80))) and id in (SELECT student.ID from student natural join takes
 where ID  not in (select attendance.ID FROM attendance 
    WHERE course_id = $1 and sec_id = $2
    GROUP BY attendance.ID
    HAVING(COUNT(*) * 100.0) / (SELECT COUNT(*) FROM lecture WHERE course_id =$1 and sec_id =$2) < 80))
-- getting students that attend less than 25% of lectures
SELECT student.ID from student natural join takes
 where ID  not in (select attendance.ID FROM attendance 
    WHERE course_id = $1 and sec_id=$2
    GROUP BY attendance.ID
HAVING (COUNT(*) * 100.0) / (SELECT COUNT(*) FROM lecture WHERE course_id =$1 and sec_id=$2) >=25)
-- getting students that miss 3 consecutive lectures
WITH diffs AS (
  SELECT a.ID, a.lecture_id - LAG(a.lecture_id) OVER (PARTITION BY a.ID ORDER BY a.lecture_id) AS diff
  FROM attendance a
)
SELECT distinct d.ID
FROM diffs d
WHERE EXISTS (
  SELECT 1
  FROM diffs d2
  WHERE d2.ID = d.ID
  GROUP BY d2.ID
  HAVING MAX(d2.diff) > 3
);
-- get top ten commitment student student with that attend most of lectures
SELECT ID ,COUNT(*) AS count
FROM attendance  
where course_id =$1 and sec_id =$2
GROUP BY  id 
ORDER BY count desc
limit 10
-------Auth Routes ---------------
-- Register User to database
INSERT INTO authuser(ID,name, password) VALUES($1, $2,$3) -- where values demonstrate id,name,password
-- returning password from special request for security purposes
select password from authuser where ID=$1 -- where $1 is the id of logged user
-- login to database
select ID,name,role from authuser where ID=$1 --where $1 is the id of the logged user;
-------Course Query ----------------
-- adding Course 
insert into course values ($1,$2,$3,$4) --where $1,$2,$3,$4 are the course_id,title,dept_name,book
-- getting Course Record
insert select * from course
-- updating Course
update course set course_id=$5,title=$2,dept_name=$3,book=$4 where course_id =$1
-- deleting Course
delete from course where course_id =$1 -- for deleting entire course record with id equal the value filled in $1
-- Seaching Course by title
SELECT * FROM course WHERE title ILIKE $1
-------department Query ------------
-- getting all department records
select * from department
-------Instructor Query ------------
-- adding Instructor
insert into instructor values ($1,$2,$3,$4)
-- updating Instructor
update instructor set ID=$5,name=$2,dept_name=$3,role=$4 where ID=$1
-- deleting Instructor
delete from instructor where ID=$1
-- searching instructor
SELECT * FROM instructor WHERE name ILIKE $1
-- get all instructors
select * from instructor
-------lecture Query----------------
-- getting lectures that have absent more than attending 
SELECT lecture_id 
FROM attendance 
where course_id =$1 and sec_id =$2
 group by lecture_id
 HAVING(COUNT(*)*100  ) / (SELECT COUNT(*) FROM  takes where course_id=$1 and sec_id=$2)<50
 -- notice that this lecture is one of the six query
-- get number of attendance
select lecture_id ,count(*)from attendance where course_id=$1 and sec_id=$2 group by lecture_id
-- get Most Attended Lectures -- this is one of the six QUERRRRRRRRRRRRRRRRRRRRRRRRY
select lecture_id ,count(*) as count from attendance  where course_id=$1 and sec_id=$2 group by lecture_id order by count desc limit 10
-- get Attendance Ratio
select COUNT(*)*100  / (SELECT COUNT(*) FROM  takes where course_id=$1 and sec_id=$2 ) as ratio from attendance   where course_id=$1 and sec_id=$2 and lecture_id=$3
-- get lecture that has 80% attendance percentage
select lecture_id,id from lecture cross join student where lecture_id not in (select lecture_id from attendance where id in (SELECT student.ID from student natural join takes
 where ID  not in(select attendance.ID FROM attendance 
    WHERE course_id =$1 and sec_id=$2
    GROUP BY attendance.ID
HAVING(COUNT(*) * 100.0) / (SELECT COUNT(*) FROM lecture WHERE course_id = $1 and sec_id =$2) < 80))) and id in (SELECT student.ID from student natural join takes
 where ID  not in (select attendance.ID FROM attendance 
    WHERE course_id = $1 and sec_id = $2
    GROUP BY attendance.ID
    HAVING(COUNT(*) * 100.0) / (SELECT COUNT(*) FROM lecture WHERE course_id =$1 and sec_id =$2) < 80)) -- this is one of the six queries required in the file
-- add lecture
insert into  lecture values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) -- the values for lecture_id, sec_id, course_id, semester, year, day, start_time, end_time, room_number, building respectively
-- adding lecture for section
insert into  lecture (sec_id, course_id, semester, year, day, start_time, end_time, room_number, building)values($1,$2,$3,$4,$5,$6,$7,$8,$9)
-- getting lecture record based on dept_name and course_id
select lecture_id,sec_id,room_number,building,day,start_time,end_time from lecture natural join course where dept_name ilike $1 and course_id ilike $2
-- Search Lecture
select lecture_id,sec_id,room_number,building,day,start_time,end_time from lecture natural join course where course_id ilike $1 and dept_name ilike $2 and building ilike $3 and room_number=$4 and sec_id=$5 and lecture_id=$6
-- updating lectures
update lecture set sec_id=$1,course_id=$2,room_number=$3,building=$4,start_time=$5,end_time=$6,day=$7,lecture_id=$11 where lecture_id=$8 and course_id=$9 and sec_id=$10
-- deleteLecture
delete from  lecture where lecture_id=$1 and course_id=$2 and sec_id=$3
--get exactly the lecture (supplying query)
select lecture_id,sec_id,room_number,building,day,start_time,end_time from lecture natural join course where course_id ilike $1 and lecture_id=$3 and sec_id=$2
-------Section Query-----------
--getting Sections related to Course
select distinct sec_id,course_id,building,room_number,day,start_time,end_time from section natural join lecture where course_id=$1
-------Student Query-----------
-- getting students that attend less than 25% of lectures
SELECT student.ID from student natural join takes
 where ID  not in (select attendance.ID FROM attendance 
    WHERE course_id = $1 and sec_id=$2
    GROUP BY attendance.ID
HAVING (COUNT(*) * 100.0) / (SELECT COUNT(*) FROM lecture WHERE course_id =$1 and sec_id=$2) >=25)
-- getting all lectures attended by student
SELECT * from attendance where ID=$1
-- getting students that miss 3 consecutive lectures
WITH diffs AS (
  SELECT a.ID, a.lecture_id - LAG(a.lecture_id) OVER (PARTITION BY a.ID ORDER BY a.lecture_id) AS diff
  FROM attendance a
)
SELECT distinct d.ID
FROM diffs d
WHERE EXISTS (
  SELECT 1
  FROM diffs d2
  WHERE d2.ID = d.ID
  GROUP BY d2.ID
  HAVING MAX(d2.diff) > 3
);
-- search student by his name
select * from student where CONCAT(first_name, ' ', middle_initial,' ',middle_final,' ',final_name) iLIKE $1 limit 10 ;
-- search student by his id or his phone number
select student.ID,first_name,middle_initial,middle_final,final_name,gender,location
         from student left outer join student_phone 
        on student.ID=student_phone.ID
        WHERE student.ID=$1
    OR phone_number=$1
    limit 3;
-- register student to attendance 
insert into attendance VALUES($1, $2,$3,$4)
-- getting students based on dept_name and course_id also sec_id
select * from student natural join takes
        where dept_name ilike $1 and course_id ilike $2 and sec_id=$3
-- update student 
update student set ID=$8,first_name=$2,middle_initial=$3,middle_final=$4,final_name=$5,dept_name=$6,location=$7 where ID=$1;
-- add student 
insert into student values($1,$2,$3,$4,$5,$6,$7,$8) -- and the values are ID, first_name, middle_initial, middle_final, final_name, gender, location, dept_name respectively
-- get top ten commitment student student with that attend most of lectures
SELECT ID ,COUNT(*) AS count
FROM attendance  
where course_id =$1 and sec_id =$2
GROUP BY  id 
ORDER BY count desc
limit 10
-- get student by ID
select ID,first_name,middle_initial,middle_final,final_name,gender,location from student
where ID=$1
-- delete student
delete from student where ID=$1
-- insert attendance for student or updating attendance
insert into attendance VALUES($1, $2,$3,$4)
-- get student by id
select ID,first_name,middle_initial,middle_final,final_name,gender,location ,dept_name from student
where ID=$1
-- add student to takes so that the student belong to specific course
insert into takes values($1,$2,$3,$4,$5)
----- User Query----------
--get user by id
select ID,name,role from authuser where ID= $1;


