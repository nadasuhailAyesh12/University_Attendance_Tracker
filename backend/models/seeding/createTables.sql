BEGIN;

DROP TABLE IF EXISTS authuser,course,instructor,section,student,lecture 
   ,student_phone,takes,attendance,department CASCADE;

CREATE TABLE
    authuser(
        ID Integer  primary key ,
        name varchar(20) not null check(LENGTH(name) >= 1),
        password text not null,
         role text default 'user'
    );
     
     CREATE TABLE
    department(
        dept_name varchar(20) primary key ,
         building varchar(20) 
    );

    CREATE TABLE
    course(
        course_id varchar(20) primary key,
         title varchar(20) check(LENGTH(title) >= 1),
         dept_name varchar(20) ,
         book varchar(20)check(LENGTH(book) >= 1),
         foreign key (dept_name) references department 
          on DELETE CASCADE 
          on UPDATE CASCADE
    );
    
    CREATE TABLE
    instructor(
        ID Integer  primary key ,
        name varchar(20) check(LENGTH(name) >= 1),
        dept_name varchar(20),
         role text not null,
         foreign key (ID) references authuser
         on DELETE CASCADE 
         on UPDATE CASCADE,
         foreign key (dept_name) references department
         on DELETE CASCADE 
         on UPDATE CASCADE
    );

    CREATE TABLE
    section(
        sec_id Integer ,
         course_id varchar(20),
        semester varchar(20),
        year numeric (4,0),
        ID Integer ,
         foreign key (ID) references instructor
         on DELETE CASCADE 
         on UPDATE CASCADE,
         foreign key (course_id) references course
         on DELETE CASCADE 
         on UPDATE CASCADE,
         primary key (sec_id,course_id,semester,year)
    );

    CREATE TABLE
    student(
        ID Integer primary key ,
        first_name varchar(20) not null CHECK (LENGTH(first_name) >= 1),
        middle_initial varchar(20) not null check(LENGTH(middle_initial) >= 1),
        middle_final varchar(20)not null check(LENGTH(middle_final) >= 1),
        final_name varchar(20)not null check(LENGTH(final_name) >= 1),
        gender varchar(8) not null CHECK (gender IN ('female', 'male')) ,
        location varchar(20) not null,
        dept_name varchar(20)CHECK (LENGTH(dept_name) >= 1),
         foreign key (dept_name) references department
         on DELETE CASCADE 
         on UPDATE CASCADE
    );

    CREATE TABLE
    takes (
        sec_id Integer ,
        course_id varchar(20),
        semester varchar(20),
        year numeric (4,0),
        ID Integer,
        primary key(sec_id,course_id,semester,year,ID),
         foreign key (sec_id,course_id,semester,year) references section
        on DELETE CASCADE 
        on UPDATE CASCADE,
         foreign key (ID) references student
        on DELETE CASCADE 
        on UPDATE CASCADE
    );

    CREATE TABLE
    student_phone (
        ID Integer,
        phone_number Integer,
        primary key(phone_number,ID),
         foreign key (ID) references student
         on DELETE CASCADE 
         on UPDATE CASCADE
    );

    CREATE TABLE
    lecture (
        lecture_id  Integer default 1,
         sec_id Integer ,
        course_id varchar(20),
        semester varchar(20),
        year numeric (4,0),
        day varchar (20) not null,
        start_time numeric(2) not null check(start_time>=1 and start_time<=24 ),
        end_time numeric(2) not null check(end_time>=1 and start_time<=24 ),
        room_number Integer not null,
        building varchar(20) not null,
        foreign key (sec_id,course_id,semester,year) references section
         on DELETE CASCADE 
        on UPDATE CASCADE,
        primary key(lecture_id,course_id,sec_id)
    );

    CREATE TABLE
    attendance (
        lecture_id  integer ,
          ID integer,
            sec_id Integer ,
        course_id varchar(20),
       foreign key (lecture_id,course_id,sec_id) references lecture
         on DELETE CASCADE 
        on UPDATE CASCADE,
       foreign key (ID) references student
         on DELETE CASCADE 
        on UPDATE CASCADE,
        primary key (lecture_id,ID,sec_id,course_id)
    );

COMMIT;