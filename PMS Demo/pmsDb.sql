-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_details`
--

DROP TABLE IF EXISTS `auth_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_details`
--

LOCK TABLES `auth_details` WRITE;
/*!40000 ALTER TABLE `auth_details` DISABLE KEYS */;
INSERT INTO `auth_details` VALUES (1,'cedric.jonas','$2b$10$P6aquhX0Ca8tJdwSJ3t8IeWhtPzg8DSQAzA0RvZXEF4zTsDVMTOLW'),(2,'herrod.c','$2b$10$PTpT65MsvjH/PmCYryriZ.tstLZf5R1NkHL1ztrsc.0D4N79vpPhy'),(3,'sonya.f','$2b$10$qfRPuWlvg3LNAQrafSG4y.czHWb4/SpyZSUoj6J800WS3YQGk1wAq'),(4,'michael.p','$2b$10$8KMbU2LaHXcPdd4kvFw.JOjhCHpJWSamfPHxyNcFjLlN9aFhywB5u'),(5,'charde.m','$2b$10$SsJSnLZk/VuhSaVR2Z1/mOJ/kKAFwQcWflWBIk5oL4xbldQWEdd3i'),(6,'jenette.c','$2b$10$gFSnH80YASJXLli2FsIxBOUnkd.cOUy2s.ACZnsD4dFvjYzhKGrHO'),(7,'john.d','$2b$10$Qdnro.4ZVAgdv7tgJIpSH.E/X8Fs0fHKLgi/9HAFuVyrT9CKl/7kO'),(8,'tiger.n','$2b$10$BM2vjUl1wVYNSM1EDxrwt.hHiXIaczWo0g5VzODjb1Cyj.WaQ/Yzm'),(9,'doris.w','$2b$10$MkchWciOgXsdAhp5AAbOheBl6tk16Z7lYgy2Xezl99qjef937byp.'),(10,'joanne.harris','$2b$10$PwnQjH66dElr5Whpzjplq.DrnD1cXyOXzh0VvhD4rqb/g/QlO5T5m'),(11,'emp10','$2b$10$JMSvOMyHR3QGbA3C/DAnJOvPRnFR52/.egSmaHP77UhUh2uxTEJty'),(12,'emp11','$2b$10$ql.jCmXmcvDC6zdQW4k5VOQSrnShCOkj0MQC9Zyxx.ZizRN1N.Bhm'),(13,'emp12','$2b$10$aeopXIM70r7rnJojcW3WC.CoIRp3lJUMyVgRg/p//TWVu66huZqlO'),(14,'emp12','$2b$10$U/oyk7Jh98//IKGhXsvHaO0eFgof2SyV2Yl/NDE5V0gD/sUNbb.UO'),(15,'emp12','$2b$10$ywTZ/D5D8NGgKL1QSImwGeLm33NgmlIIMeojKNttDDTBWKEbbmEu6'),(16,'emp12','$2b$10$TKHYWS1AzaizRBy3Uc.Fce4d40JG6Gn5gtwkjtQMcHTgPoUn/aG1O'),(17,'emp12','$2b$10$AC2aF4SH6eH.B0Xl5Gpxw.TUgaJXOJXJavQT4yeCU/2GDRX9DNA/.'),(18,'emp12','$2b$10$cJeiqPI.EVTk1T8jk07onu2Y/tZrFUNiOId/CXvjZM7z66pza/uvS'),(19,'emp12','$2b$10$Pb.v/2OdBqrjMe4jusW54e7S3kubZ1Ght5DoYrqe2r6DwMiFhwPMq'),(20,'emp12','$2b$10$orLdZWUGVQgmowQ7Ji46meLuINDgy6W.Z8mILRb2RVh/7Ghp/YiUW'),(21,'emp13','$2b$10$mmdo77JwSvQZINIfpHB0nuanQg2ITlfT6549LGbCKRvtVQV3fzJrG'),(22,'emp14','$2b$10$a5bTUuZ8xgHinIMDhbf45upfTHz62SicgpSgUmQDXVIo3dD.ocZBC'),(23,'emp15','$2b$10$Su6L8YdCNirYtjCvdHzR9exOppXEY7C1WM7T/HLRLtT6nT4p8/6GC'),(24,'emp16','$2b$10$MMr1q5PuSbQUO8kBTfAG5OZ8NRwvRXtnWswicbfC5E5oAeUs8vvtG'),(25,'emp16','$2b$10$tettqLik0UjKwdxnxRlaBuQB3pVCiVAEl1cobvSror4an/XNnX2Vy'),(26,'emp17','$2b$10$Ci/xVDLaeIy/1zvZkxiN5OSRewzX/DW8rMbMJ01VOY4co1I8f3G62'),(27,'emp16','$2b$10$3spIaorHp3Kphd6xtBHGfOOpYND7IhplAYIbEkj3ztr7H9GUagYL6');
/*!40000 ALTER TABLE `auth_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Sales','Cochin','sales78e67269-2261-4693-b301-e78d3b727df0.jpeg'),(2,'Accounts','Cochin','accounts8ae8798d-accf-4068-9f1d-e600ff715983.jpeg'),(3,'Human Resources','Cochin','hr21beaaf9-3a37-49f6-abfc-f666a57c0005.jpeg'),(4,'Software','Cochin','software94fe23c7-23b2-4ba8-a9ae-c76fa2cb739a.jpeg'),(8,'Quality Control','Cochin','qualitycontrol.png'),(43,'Infrastructure','Cochin','deptImagec98df6f1-0802-4340-bbb2-72885300c46c.jpeg');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `departmentId` int DEFAULT NULL,
  `authDetailsId` int DEFAULT NULL,
  `userType` varchar(255) NOT NULL,
  `salary` int DEFAULT NULL,
  `jobTitle` varchar(255) DEFAULT NULL,
  `dateOfJoin` datetime DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `empId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_ec24e7ce187f1702f959799e70` (`authDetailsId`),
  KEY `FK_9ad20e4029f9458b6eed0b0c454` (`departmentId`),
  CONSTRAINT `FK_9ad20e4029f9458b6eed0b0c454` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`),
  CONSTRAINT `FK_ec24e7ce187f1702f959799e702` FOREIGN KEY (`authDetailsId`) REFERENCES `auth_details` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Cedric Jonas','Address 1','9494889001','cedric.jonas@example.com',1,1,'admin',100000,'director','2000-11-06 05:30:00','profile5c9380db6-6e5b-4605-a340-6b84bebac524.jpeg','AST/00001'),(2,'Herrod Chandler','Address 2','9494889002','herrod.chandler@example.com',1,2,'manager',50000,'project manager','2000-11-13 05:30:00','profile4.jpeg','AST/00002'),(3,'Sonya Frost','Address 3','9494889003','sonya.frost@example.com',2,3,'manager',50000,'project manager','2000-11-17 05:30:00','profile6.jpeg','AST/00003'),(4,'Michael Patrick','Address 4','9494889004','michael.patrick@example.com',3,4,'manager',50000,'project manager','2000-11-16 05:30:00','','AST/00004'),(5,'Charde Marshall','Address 5','9494889005','charde.marshall@example.com',1,5,'normal',25000,'software engineer','2000-11-19 05:30:00','profile15fc1ef6b-330b-4e3b-a9d3-900b03e03b24.png','AST/00005'),(6,'Jenette Caldwell','Address 6','9494889006','jenette.caldwell@example.com',2,6,'normal',25000,'software engineer','2000-11-19 05:30:00','profile27f5ad0ee-4c29-46aa-93dc-6e5a828e363e.jpeg','AST/00006'),(7,'John Doe','Address 7','9494889007','employee7@example.com',3,7,'normal',25000,'software engineer','2001-11-20 05:30:00','profile16019290f-fa0d-469a-941f-c659d8e0b326.png','AST/00007'),(8,'Tiger Nixon','Address 8','9494889008','employee8@example.com',1,8,'normal',25000,'software engineer','2003-09-30 05:30:00','','AST/00008'),(9,'Doris Wilder','Address 9','9494889009','employee9@example.com',2,9,'normal',25000,'software engineer','2004-09-30 05:30:00','','AST/00009'),(11,'Joanne Harris','Address 10','9494889010','joanne.harris@example.com',3,11,'normal',25000,'software engineer','2005-09-29 05:30:00','','AST/00011'),(12,'Frank Wade','Address 11','949889011','frank.wade@example.com',3,12,'normal',25000,'software engineer','2020-12-06 05:30:00','profile6.jpeg','AST/00012'),(20,'Lisa Kimberly','Address 12','949889012','lisa.kimberly@example.com',4,20,'normal',25000,'software engineer','2021-01-03 05:30:00','','AST/00020'),(21,'Angela Bonnie','Address 13','949889013','angela.bonnie@example.com',4,21,'normal',25000,'software engineer','2021-01-10 05:30:00','','AST/00021'),(22,'Andres Tucker','Address 14','949889014','andres.tucker@example.com',4,22,'normal',25000,'software engineer','2021-01-10 05:30:00','','AST/00022'),(23,'Julius Marker','address 15','949889014','julius.marker@example.com',4,23,'normal',25000,'software engineer','2021-01-10 05:30:00','','AST/00023');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1604904739990,'EmployeeTable1604904739990'),(2,1606249794773,'EmployeeTable1606249794773'),(3,1606252458672,'EmployeeTable1606252458672'),(4,1609305094042,'DepartmentTable1609305094042'),(5,1609325466915,'DepartmentTable1609325466915'),(6,1609654473904,'EmployeeTable1609654473904'),(7,1610350284271,'ProjectAndTask1610350284271'),(8,1610385031186,'Task1610385031186'),(9,1611306815815,'TaskPhase1611306815815'),(10,1611371028019,'AddEmpId1611371028019'),(11,1611371353873,'EmpIdUnique1611371353873'),(12,1611412322972,'ProjectDates1611412322972');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `code` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `client` varchar(255) NOT NULL,
  `projectManagerId` int DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  PRIMARY KEY (`code`),
  KEY `FK_5d41ecdc2d2e0ec8a4b019008fc` (`projectManagerId`),
  CONSTRAINT `FK_5d41ecdc2d2e0ec8a4b019008fc` FOREIGN KEY (`projectManagerId`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'RISE','World Bank',2,'2020-12-01 00:00:00','2021-02-15 00:00:00'),(2,'Clarity','Union Bank',3,'2020-12-01 00:00:00','2021-02-20 00:00:00');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'new',
  `priority` varchar(255) NOT NULL DEFAULT 'normal',
  `startDate` datetime NOT NULL,
  `endDate` datetime DEFAULT NULL,
  `taskFile` varchar(255) DEFAULT NULL,
  `assigneeId` int DEFAULT NULL,
  `createdById` int DEFAULT NULL,
  `projectCode` int DEFAULT NULL,
  `phase` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7384988f7eeb777e44802a0baca` (`assigneeId`),
  KEY `FK_91d76dd2ae372b9b7dfb6bf3fd2` (`createdById`),
  KEY `FK_20e0fc4fed27edcae6c9c69bc64` (`projectCode`),
  CONSTRAINT `FK_20e0fc4fed27edcae6c9c69bc64` FOREIGN KEY (`projectCode`) REFERENCES `project` (`code`),
  CONSTRAINT `FK_7384988f7eeb777e44802a0baca` FOREIGN KEY (`assigneeId`) REFERENCES `employee` (`id`),
  CONSTRAINT `FK_91d76dd2ae372b9b7dfb6bf3fd2` FOREIGN KEY (`createdById`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,'Prepare SRS','Software Requirement Specifications','closed','normal','2021-01-07 00:00:00','2021-01-18 00:00:00',NULL,6,3,2,'planning'),(2,'Prepare Class Diagrams','Prepare Class Diagrams','closed','normal','2021-01-31 00:00:00','2021-02-07 00:00:00',NULL,7,3,2,'design'),(3,'Accounts Module - Entity Desgin','Model Design','new','normal','2021-01-15 00:00:00','2021-02-04 00:00:00',NULL,6,3,2,'development'),(4,'Test Case Preparation','Description for preparing Test cases','resolved','normal','2021-01-16 00:00:00','2021-02-03 00:00:00',NULL,7,3,2,'testing'),(5,'Admin Module Functional Testing','Description for Testing Admin Module','new','normal','2021-01-24 00:00:00','2021-02-09 00:00:00',NULL,6,3,2,'testing'),(6,'Setting Page Layout','Description for setting the page layout','inProgress','normal','2021-01-12 00:00:00','2021-02-13 00:00:00',NULL,7,3,2,'development'),(8,'Prepare Test Plan','Prepare Test Plan','closed','normal','2021-01-21 00:00:00','2021-01-28 00:00:00',NULL,6,3,2,'planning'),(9,'Preparing Test plan','Description for preparing test plan','inProgress','normal','2021-01-23 00:00:00','2021-02-06 00:00:00',NULL,5,2,1,'planning'),(10,'Prepare Class Diagrams','Description for preparing class diagrams','resolved','normal','2021-01-23 00:00:00','2021-02-07 00:00:00',NULL,6,2,1,'design'),(11,'Prepare SRS','Description for preparing SRS','closed','normal','2021-01-03 00:00:00','2021-01-10 00:00:00',NULL,5,2,1,'planning'),(12,'Prepare UI Design','Description for preparing UI design','new','normal','2021-02-07 00:00:00','2021-02-14 00:00:00',NULL,5,2,1,'development'),(13,'Prepare UI Design','Description of Prepare UI Design','new','normal','2021-02-06 00:00:00','2021-02-13 00:00:00',NULL,3,1,2,'design'),(14,'Prepare Test cases - Payroll','Description for preparing test cases for payroll','new','normal','2021-02-11 00:00:00','2021-02-18 00:00:00',NULL,5,1,1,'testing');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `works_on`
--

DROP TABLE IF EXISTS `works_on`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `works_on` (
  `worksOnId` int NOT NULL AUTO_INCREMENT,
  `hours` int NOT NULL,
  `employeeId` int DEFAULT NULL,
  `projectCode` int DEFAULT NULL,
  PRIMARY KEY (`worksOnId`),
  KEY `FK_8679a9ccafc060541e69ae2e84d` (`employeeId`),
  KEY `FK_f8e08bbb588393e03432d1f282d` (`projectCode`),
  CONSTRAINT `FK_8679a9ccafc060541e69ae2e84d` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`id`),
  CONSTRAINT `FK_f8e08bbb588393e03432d1f282d` FOREIGN KEY (`projectCode`) REFERENCES `project` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `works_on`
--

LOCK TABLES `works_on` WRITE;
/*!40000 ALTER TABLE `works_on` DISABLE KEYS */;
INSERT INTO `works_on` VALUES (1,20,2,1),(2,10,5,1),(3,10,6,1),(4,20,3,2),(5,10,6,2),(6,10,7,2);
/*!40000 ALTER TABLE `works_on` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-12 16:41:08
