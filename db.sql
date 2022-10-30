CREATE DATABASE erp;
\c erp  -- PostgeSQL

CREATE TABLE departments(
    full_name           VARCHAR(100),
    short_code          VARCHAR(5),
    PRIMARY KEY (short_code)
);

CREATE TABLE students(
    usn                 VARCHAR(15),
    name                VARCHAR(30),
    fathers_name        VARCHAR(30),
    mothers_name        VARCHAR(30),
    dob                 DATE,
    address             VARCHAR(255),
    phone_num           NUMERIC(10, 0),
    email               VARCHAR(30),
    department          VARCHAR(5),
    last_qualification  VARCHAR(50),
    qualified_from      VARCHAR(255),
    passing_year        DATE,
    marks_scored        NUMERIC(3, 0),
    percentage          NUMERIC(4, 2),
    cet_rank            INT,
    neet_rank           INT,
    aadhar_number       NUMERIC(12, 0),
    bank_account_number NUMERIC(12, 0),
    PRIMARY KEY (usn),
    FOREIGN KEY (department) REFERENCES departments(short_code)
);

CREATE TABLE lecturers(
    lecturer_id         VARCHAR(15),
    name                VARCHAR(30),
    fathers_name        VARCHAR(30),
    spouse_name         VARCHAR(30),
    phone_num           NUMERIC(10, 0),
    dob                 DATE,
    email               VARCHAR(30),
    address             VARCHAR(255),
    qualification       VARCHAR(50),
    subject_expertise   VARCHAR(50),
    department          VARCHAR(5),
    experience          NUMERIC(3, 1),
    aadhar_number       NUMERIC(12, 0),
    pan_number          VARCHAR(10),
    bank_account_number NUMERIC(15, 0),
    pay_scale           INT,
    basic_pay           INT,
    gross_salary        INT,
    deduction           INT,
    net_salary          INT,
    PRIMARY KEY (lecturer_id),
    FOREIGN KEY (department) REFERENCES departments(short_code)
);

ALTER TABLE departments ADD COLUMN hod_lecturer_id VARCHAR(15)
REFERENCES lecturers(lecturer_id);

CREATE TABLE student_leave(
    department          varchar(5),
    usn                 varchar(15),
    date                date,
    assigned            boolean DEFAULT false,
    PRIMARY KEY (usn, date),
    FOREIGN KEY (usn) REFERENCES students(usn),
    FOREIGN KEY (department) REFERENCES departments(short_code)
);

CREATE TABLE lecturer_leave(
    department          varchar(5),
    lecturer_id         varchar(15),
    date                date,
    assigned            boolean DEFAULT false,
    PRIMARY KEY (lecturer_id, date),
    FOREIGN KEY (lecturer_id) REFERENCES lecturers(lecturer_id),
    FOREIGN KEY (department) REFERENCES departments(short_code)
);

CREATE TABLE student_attendance(
    usn                 VARCHAR(15),
    absent_date         DATE,
    FOREIGN KEY (usn) REFERENCES students(usn)
);

CREATE TABLE lecturer_attendance(
    lecturer_id         VARCHAR(15),
    absent_date         DATE,
    PRIMARY KEY (lecturer_id, absent_date),
    FOREIGN KEY (lecturer_id) REFERENCES lecturers(lecturer_id)
);

CREATE TABLE subjects(
    subject_code        VARCHAR(10),
    subject_name        VARCHAR(50),
    taught_by           VARCHAR(15),
    department          VARCHAR(5),
    semester            NUMERIC(1,0),
    PRIMARY KEY (subject_code),
    FOREIGN KEY (taught_by) REFERENCES lecturers(lecturer_id),
    FOREIGN KEY (department) REFERENCES departments(short_code)
);

ALTER TABLE student_attendance ADD COLUMN subject_code VARCHAR(10)
REFERENCES subjects(subject_code);

ALTER TABLE student_attendance ADD PRIMARY KEY (usn, absent_date, subject_code);

CREATE TABLE students_subjects_marks(
    usn                 VARCHAR(15),
    subject_code        VARCHAR(10),
    -- -1 means marks not yet assigned
    -- -2 means student was absent
    "IA1"               NUMERIC(2,0) DEFAULT -1,
    "IA2"               NUMERIC(2,0) DEFAULT -1,
    "IA3"               NUMERIC(2,0) DEFAULT -1,
    external            NUMERIC(3,0) DEFAULT -1,
    "IA_average"        NUMERIC(2,0) DEFAULT -1,
    pass                boolean DEFAULT false,
    PRIMARY KEY (usn, subject_code),
    FOREIGN KEY (usn) REFERENCES students(usn),
    FOREIGN KEY (subject_code) REFERENCES subjects(subject_code)
);

-- CREATE TABLE students_subjects(
--     usn                 VARCHAR(15),
--     subject_code        VARCHAR(10),
--     PRIMARY KEY (usn, subject_code),
--     FOREIGN KEY (usn) REFERENCES students(usn),
--     FOREIGN KEY (subject_code) REFERENCES subjects(subject_code)
-- );

CREATE TABLE passwords(
    id                  VARCHAR(15),
    password            VARCHAR(255),
    PRIMARY KEY (id)
);

