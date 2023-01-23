--create database
USE master
GO

CREATE DATABASE Layers_Office
USE Layers_Office
GO

--create tables

create table Cities(
id int identity CONSTRAINT PK_Cities PRIMARY KEY NOT NULL,
city_name varchar(50) NOT NULL
)

create table Links(
id int identity CONSTRAINT PK_Links PRIMARY KEY NOT NULL,
link_name varchar(50) NOT NULL,
site_address varchar(100) NOT NULL
)

create table File_patterns(
id int identity CONSTRAINT PK_File_patterns PRIMARY KEY NOT NULL,
File_pattern_name varchar(50) NOT NULL,
discription varchar(100) NULL,
access int NOT NULL 
)

create table Assets( --נכסים
id int identity CONSTRAINT PK_Assets PRIMARY KEY NOT NULL,
block_or_book varchar(50) NOT NULL, --גוש או ספר
plot_or_page varchar(50) NOT NULL, --חלקה או דף
sub_plot varchar(50) NULL,  --תת חלקה
asset_address varchar(50) NOT NULL,
tik_minhal varchar(50) NULL,
other_details varchar(50) NULL
)

create table Payments( --תשלומים
id int identity CONSTRAINT PK_Payments PRIMARY KEY NOT NULL,
payment_name varchar(50) NOT NULL,
pay_sum varchar(50) NOT NULL,
who_to_pay varchar(50) NULL, --למי צריך לשלם
sum_off varchar(50) NULL,
final_sum varchar(50) NOT NULL,
discription varchar(100) NULL
)

create table People(
id int identity CONSTRAINT PK_People PRIMARY KEY NOT NULL,
first_name varchar(50) NOT NULL,
last_name varchar(50) NOT NULL,
phone varchar(50) NOT NULL,
second_phone varchar(50) NULL,
email varchar(50) NULL,
tz varchar(9) NOT NULL,
living_address varchar(50) NOT NULL,
)

create table Users(
id int identity CONSTRAINT PK_Users PRIMARY KEY NOT NULL,
person_id int CONSTRAINT FK_Users_People FOREIGN KEY REFERENCES People(id) NOT NULL,
user_password varchar(50) NOT NULL,
user_type varchar(50) NOT NULL DEFAULT 'customer' CONSTRAINT BoolCheck Check (user_type In ('lawyer', 'customer'))
)
create table Bags(
id int identity CONSTRAINT PK_Bags PRIMARY KEY NOT NULL,
bag_name varchar(50)  NOT NULL,
date_close date  NULL,
bag_state int NOT NULL DEFAULT 0,
last_open dateTime NOT NULL,
asset_id int CONSTRAINT FK_Bags_Assets FOREIGN KEY REFERENCES Assets(id) NOT NULL,
modification_time datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
open_date datetime NULL
)

create table Files(
id int identity CONSTRAINT PK_Files PRIMARY KEY NOT NULL,
bag_id int CONSTRAINT FK_Files_Bags FOREIGN KEY REFERENCES Bags(id) NOT NULL,
file_pattern_id int CONSTRAINT FK_Files_File_patterns FOREIGN KEY REFERENCES File_patterns(id) NOT NULL,
document varbinary(max) NOT NULL,
file_name nvarchar(60) NULL,
creator_id int CONSTRAINT FK_Files_creator_01142BA1 FOREIGN KEY REFERENCES People(id) NOT NULL,
uploading_date datetime NULL,
file_type nchar(10) NULL
)
create table Bags_to_People(
id int identity CONSTRAINT PK_Bags_to_People PRIMARY KEY NOT NULL,
person_id int CONSTRAINT FK_Bags_to_People_People FOREIGN KEY REFERENCES People(id) NOT NULL,
person_type varchar(50) NOT NULL DEFAULT 'lawyer' CONSTRAINT tripleCheck Check (person_type In ('lawyer', 'buyer','seller')),
bag_id int CONSTRAINT FK_Bags_to_People_Bags FOREIGN KEY REFERENCES Bags(id) NOT NULL,
)

create table Action_patterns(
id int identity CONSTRAINT PK_Action_patterns PRIMARY KEY NOT NULL,
action_pattern_name varchar(50) NOT NULL,
discription varchar(100) NULL,
file_pattern_id int CONSTRAINT FK_Action_patterns_File_patterns FOREIGN KEY REFERENCES File_patterns(id) NULL,
link_id int CONSTRAINT FK_Action_patterns_Links FOREIGN KEY REFERENCES Links(id)  NULL,
payment_id int CONSTRAINT FK_Action_patterns_Payments FOREIGN KEY REFERENCES Payments(id)  NULL,
action_level int DEFAULT 0 NOT NULL,
whom_for varchar(50) NOT NULL DEFAULT 'lawyer' CONSTRAINT WhomForCheck Check (whom_for In ('lawyer', 'buyer','seller')),
waiting_for_pattern_id int CONSTRAINT FK_Action_patterns_Action_patterns FOREIGN KEY REFERENCES Action_patterns(id) NULL,
)

create table Actions(
id int identity CONSTRAINT PK_Action PRIMARY KEY NOT NULL,
action_pattern_id int CONSTRAINT FK_Actions_Action_patterns FOREIGN KEY REFERENCES Action_patterns(id) NULL,
comments varchar(100) NULL,
dead_line date NULL,  
action_state varchar(50) NOT NULL DEFAULT 'waiting' CONSTRAINT actionStateCheck Check (action_state In ('waiting', 'done')),
action_file_id int CONSTRAINT FK_Actions_files FOREIGN KEY REFERENCES Files(id) NULL,
action_priority int DEFAULT 0 NOT NULL,
created_date datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
whom_for_id int NULL
)

create table Actions_to_Bags(
id int identity CONSTRAINT PK_Action_to_Bags PRIMARY KEY NOT NULL,
bag_id int CONSTRAINT FK_Actions_to_Bags_Bags FOREIGN KEY REFERENCES Bags(id) NULL,
action_id int CONSTRAINT FK_Actions_to_Bags_Actions FOREIGN KEY REFERENCES Actions(id) NULL,
)