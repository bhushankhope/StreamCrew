CREATE DATABASE IF NOT EXISTS StreamCrew;
DROP TABLE IF EXISTS `StreamCrew`.`Users`;
DROP TABLE IF EXISTS `StreamCrew`.`Session`;

CREATE TABLE `StreamCrew`.`Users` (
  -- This table is used to maintain records of users watching in a particular session
  `UserId` VARCHAR(45) NOT NULL,
  `SessionId` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`UserId`));

CREATE TABLE `StreamCrew`.`Session` (
  -- This table is used to maintain records of individual sessions created by hosts
  `SessionId` VARCHAR(45) NOT NULL,
  `ContentId` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`SessionId`));
