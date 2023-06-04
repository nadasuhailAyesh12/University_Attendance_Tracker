# University_Attendance_Tracker

## Description:
A web app that helps you  as an instructor quickly register your student's attendance without using an Excel sheet, import Excel sheet to the database, export reports, providing functional requirements on students, courses, sections, and lectures that any university management system need

# Run University_Attendance_Tracker locally:

Please note that  it requires that you have node js installed on your pc, it is preferable to be version 14 or more 

if you don't you can install it from here  [node js](https://nodejs.org/en)

Create a folder to clone the repo on it then open the command window or git pash and cd to this folder

 1 . clone the repo: git clone (`https://github.com/nadasuhailAyesh12/University_Attendance_Tracker.git`)

  first running the  backend :

 2 . go to the repo folder in the folder that you clone the repo on it. At the root of the repo, there is a .env file, open it with Notepad and edit the user_name and password to your username and password in both URLs.

```
    example:  1.  DEVELOPMENT_URI=postgres://yourusername:yourpassword@localhost:5432/nadamohattendance
```

```
               2.  SEEDER_URI=postgres://yourusername:yourpassword@localhost:5432/postgres
```
2. save changes to it 

<!---->

⚡warning: There  are two URLs: development and seeder so be sure to edit them both

3 . return back to your command window cd  University_Attendance_Tracker 

Run  `npm i` to ensure that all dependencies are installed this will take a couple of minutes.

note that the high severity vulnerability that will appear after finishing `npm i`it is not an error it is just because of the difference in versions

 4 .  Run `npm  run seeder` in the cmd,  **_ please: be sure that your de beaver is closed since dropping the database would make an error since another user is accessing the database so you can't drop it _**

5 . Run `npm run dev`  in the cmd, so the server is listing, please make sure not to close it off keep it open 

Second Running the frontend :ballot-box-with-check:

open another cmd cd  the repo that you have cloned then:

1 . `cd  client  `

  run  `npm i ` to ensure to install dependencies it will take a couple of minutes please wait till it finishes
  
2  . run  `npm start  `Happy hacking!

 nice work!  to test the functions as Administrator login with the password  NORAn$frte and ID 320200629
  to test the functions as a normal user go to sign up create an account and enjoy the journey 🎀

***

# 📈 Database Design:

We first collect the functional requirements, understand them deeply, then specify the entities at ERD , specify relations between them, and finally, output our ERD 

Our   entity relationship diagram :arrow-down:

## [ERD ](https://drive.google.com/file/d/1-jj47bS4wtTT9SrKN5q0XeCT0RWApCzX/view?usp=sharing)[](https://drive.google.com/file/d/1-jj47bS4wtTT9SrKN5q0XeCT0RWApCzX/view?usp=sharing)

Then after that, we make reduction we reduce our ERD to a schema diagram,we use Normalization to ensure 

thar every relation is in good form 

this is our DDL create tables:

## [DDlTables](https://drive.google.com/file/d/1WvmDiDvG02LfUO2hlLyl8KCX0U472kEW/view?usp=sharing)

 of course, to ensure everything is working well you can try our queries on de Beaver or in your SQL shell and insure everything is correct here is our query sample

## [query sample](https://drive.google.com/file/d/1-PpTgoXtmdQdOTb_VzLyQn_j1bFVx4Yd/view?usp=sharing)

## fake Data

***

# Users stories:

## As an instructor and Administrator:

I want to be able to log in to my account.

I want to be able to search, delete, and update lectures for a specific course, and also, add lecture location 

I want to be able to add, delete, and update students, and also link them with the courses that they take

I want to be able to register student attendance will a short time by supporting autocomplete and registering them in a variety of  ways (name,phone_number, ID) 

I want to be able to  export an Excel sheet with students IDs  who attend less than 25% of lectures in specific courses and a section to print a report for dropping them off of the course

I want to let my colleague take attendance in  case I am absent by letting him import  an Excel sheet of student IDs  and then the database will  store them as attendance

I want to be able to display  students  under  one of these varieties of conditions 

1 .  Display the list of students who attended less than 25% of  
lectures in specific courses and section

2 . Display the student's order to their ‘commitment’ from the  
most  committed  to  the  least

3 .  Display  the  list  of  students  who  missed  3  consecutive  
lectures

4  . Displaying students  according to a specific department, section, course

I want to be able to show every student his attendance status, export it as an Excel sheet when he requests this, also update errors if they exist.

 I want to be able to display  lectures  under  one of these varieties of conditions:

1 .  Display the top 10 most attended lectures of all time

 2 . Display the lectures that had more students missing that  
lecture than actually attending it.

3 . For each student who attended more than 80% of all lectures,  
show the lectures he or she did not attend

I want to be able to show attendance status (the ratio of attendance, and number of students attending) for each lecture at the course.

## As just Administrator:

I want to be able to add, edit,  search, and delete course 

I want to be able to link an instructor with the section of the course that he teaches 

 I want to be able to add, edit, delete, and search for an instructor.

I want to be able to create user accounts 

***

# Used Technologies:

ReactJs  
Nodejs  
Express

***

# Team Members:

[Nada S. Ayesh](https://github.com/nadasuhailAyesh12)

[Mohammed  S. Ayesh](https://github.com/mohmmadAyesh)
