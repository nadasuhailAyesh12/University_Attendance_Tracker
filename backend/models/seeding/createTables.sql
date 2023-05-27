BEGIN;

DROP TABLE IF EXISTS authuser,course,instructor,section,student,lecture 
   ,student_phone,takes,attendance,department CASCADE;

CREATE TABLE
    authuser(
        ID Integer  primary key ,
        name varchar(20) not null,
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
         title varchar(20),
         dept_name varchar(20),
         book varchar(20),
         foreign key (dept_name) references department 
          on DELETE CASCADE 
          on UPDATE CASCADE
    );
    
    CREATE TABLE
    instructor(
        ID Integer  primary key ,
        name varchar(20),
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
        first_name varchar(20) not null,
        middle_initial varchar(20) not null,
        middle_final varchar(20)not null,
        final_name varchar(20)not null,
        gender varchar(8) not null,
        location varchar(20) not null,
        dept_name varchar(20),
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
        start_time numeric(2) not null,
        end_time numeric(2) not null,
        room_number Integer not null,
        building varchar(20) not null,
        foreign key (sec_id,course_id,semester,year) references section
         on DELETE CASCADE 
        on UPDATE CASCADE,
        primary key(lecture_id,course_id,sec_id)
    );

    CREATE TABLE
    attendance (
        lecture_id  serial ,
          ID integer,
            sec_id Integer ,
        course_id varchar(20),
       foreign key (lecture_id,course_id,sec_id) references lecture
         on DELETE CASCADE 
        on UPDATE CASCADE,
       foreign key (ID) references student
         on DELETE CASCADE 
        on UPDATE CASCADE,
        primary key (lecture_id,ID)
    );

COMMIT;