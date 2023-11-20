-- “relations” Table
-- Description: Stores the relationship between kiosk access levels and student privileges

-- Structure: 
-- Column Names
-- Description
-- Value
-- Example Value
-- name
-- Stores the name describing the kiosk with the access_level
-- String
-- High School Kiosk
-- access_level (Primary key)
-- Stores the access level of a kiosk
-- Integer
-- 2
-- privilege
-- Stores required student privilege to access this kiosk level
-- Integer
-- 4
-- direction
-- Stores whether all student privileges above, below or only the same as the one specified are also allowed to use the kiosk of this access level
-- Integer
-- -1
-- start_hour
-- Stores the hour (24 hour format) of when the relation becomes active
-- Integer
-- 8
-- start_minute
-- Stores the minute of when the relation becomes active
-- Integer
-- 15
-- end_hour
-- Stores the hour (24 hour format) of when the relation stops being active
-- Integer
-- 9
-- end_minute
-- Stores the minute of when the relation stops being active
-- Integer
-- 30


-- Creation line: CREATE TABLE relations (name varchar(255), access_level int, privilege int, direction int, start_hour int signed, start_minute int signed, end_hour int signed, end_minute int signed, PRIMARY KEY (access_level));


INSERT INTO relations (name, access_level, privilege, direction, start_hour, start_minute, end_hour, end_minute) VALUES ("High School Kiosk", 2, 4, -1, 8, 15, 9, 30);