-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2021 at 02:48 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbms_proj`
--

-- --------------------------------------------------------

--
-- Table structure for table `all_doctors`
--

CREATE TABLE `all_doctors` (
  `DOC_NO` varchar(5) NOT NULL DEFAULT '0',
  `DEPARTMENT` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `all_doctors`
--

INSERT INTO `all_doctors` (`DOC_NO`, `DEPARTMENT`) VALUES
('DR028', 'demo'),
('DR030', 'demo2'),
('DR031', 'demo3'),
('DR032', 'demo4'),
('DR026', 'HRM');

--
-- Triggers `all_doctors`
--
DELIMITER $$
CREATE TRIGGER `tg_all_doctors_insert` BEFORE INSERT ON `all_doctors` FOR EACH ROW BEGIN
  INSERT INTO all_doctors_seq VALUES (NULL);
  SET NEW.DOC_NO = CONCAT('DR', LPAD(LAST_INSERT_ID(), 3, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `all_doctors_seq`
--

CREATE TABLE `all_doctors_seq` (
  `DOC_NO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `all_doctors_seq`
--

INSERT INTO `all_doctors_seq` (`DOC_NO`) VALUES
(2),
(26),
(27),
(28),
(30),
(31),
(32);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `D_NAME` varchar(255) NOT NULL,
  `D_LOCATION` varchar(255) NOT NULL,
  `FACILITIES` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`D_NAME`, `D_LOCATION`, `FACILITIES`) VALUES
('demo', 'demo', 'demo'),
('demo2', 'demo', 'demo'),
('demo3', 'demo', 'demo'),
('demo4', 'demo', 'demo'),
('HRM', 'Norway', 'HR');

-- --------------------------------------------------------

--
-- Table structure for table `doc_on_call`
--

CREATE TABLE `doc_on_call` (
  `DOC_NO` varchar(5) NOT NULL DEFAULT '0',
  `D_NAME` varchar(255) DEFAULT NULL,
  `QUALIFICATION` varchar(255) DEFAULT NULL,
  `FS_PR_CL` int(30) DEFAULT NULL,
  `PYMT_DU` int(30) DEFAULT NULL,
  `ADDRESS` varchar(255) DEFAULT NULL,
  `PH_NO` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doc_on_call`
--

INSERT INTO `doc_on_call` (`DOC_NO`, `D_NAME`, `QUALIFICATION`, `FS_PR_CL`, `PYMT_DU`, `ADDRESS`, `PH_NO`) VALUES
('DR026', 'John', 'PhD', 4400, 44000, 'Norway, Europe', 98765431),
('DR028', 'demo', 'demo', 3, 3, 'demo', 2),
('DR030', 'demo', 'demo', 2, 2, 'demo', 2),
('DR031', 'demo', 'demo', 3, 3, 'demo', 3),
('DR032', 'demo', 'demo', 3, 3, 'demo', 2);

-- --------------------------------------------------------

--
-- Table structure for table `doc_reg`
--

CREATE TABLE `doc_reg` (
  `DOC_NO` varchar(5) NOT NULL DEFAULT '0',
  `D_NAME` varchar(255) DEFAULT NULL,
  `QUALIFICATION` varchar(255) DEFAULT NULL,
  `SALARY` int(30) DEFAULT NULL,
  `EN_TIME` datetime DEFAULT NULL,
  `EX_TIME` datetime DEFAULT NULL,
  `ADDRESS` varchar(255) DEFAULT NULL,
  `PH_NO` int(30) DEFAULT NULL,
  `DOJ` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doc_reg`
--

INSERT INTO `doc_reg` (`DOC_NO`, `D_NAME`, `QUALIFICATION`, `SALARY`, `EN_TIME`, `EX_TIME`, `ADDRESS`, `PH_NO`, `DOJ`) VALUES
('DR026', 'John', 'PhD', 455000, '2021-05-05 12:46:33', '2021-05-05 12:46:33', 'Norway, Europe', 98765431, '2021-05-06 00:00:00'),
('DR028', 'demo', 'demo', 2, '2021-05-13 10:57:08', '2021-05-13 10:57:08', 'demo', 2, '2021-05-13 00:00:00'),
('DR030', 'demo', 'demo', 2, '2021-05-13 11:00:35', '2021-05-13 11:00:35', 'demo', 2, '2021-05-13 00:00:00'),
('DR031', 'demo', 'demo', 4, '2021-05-13 11:09:48', '2021-05-13 11:09:48', 'demo', 3, '2021-05-13 00:00:00'),
('DR032', 'demo', 'demo', 2, '2021-05-13 11:12:06', '2021-05-13 11:12:06', 'demo', 2, '2021-05-13 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `pat_admit`
--

CREATE TABLE `pat_admit` (
  `PAT_NO` varchar(5) NOT NULL DEFAULT '0',
  `ADV_PYMT` int(11) DEFAULT NULL,
  `MODE_PYMT` char(25) DEFAULT NULL,
  `ROOM_NO` int(11) NOT NULL,
  `DEPTNAME` varchar(255) NOT NULL,
  `ADMTD_ON` datetime DEFAULT NULL,
  `COND_ON` char(25) DEFAULT NULL,
  `INVSTGTN_DN` varchar(255) DEFAULT NULL,
  `TRMT_SDT` varchar(5) NOT NULL DEFAULT '0',
  `ATTDNT_NM` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pat_admit`
--

INSERT INTO `pat_admit` (`PAT_NO`, `ADV_PYMT`, `MODE_PYMT`, `ROOM_NO`, `DEPTNAME`, `ADMTD_ON`, `COND_ON`, `INVSTGTN_DN`, `TRMT_SDT`, `ATTDNT_NM`) VALUES
('PT040', 2, '', 1, 'HRM', '0000-00-00 00:00:00', 'admit', '', 'DR026', 'admit');

-- --------------------------------------------------------

--
-- Table structure for table `pat_chkup`
--

CREATE TABLE `pat_chkup` (
  `PAT_NO` varchar(5) NOT NULL DEFAULT '0',
  `DOC_NO` varchar(5) NOT NULL DEFAULT '0',
  `DIAGNOSIS` varchar(255) DEFAULT NULL,
  `CHKUP_DT` datetime DEFAULT NULL,
  `STATUS` char(2) DEFAULT NULL,
  `TREATMENT` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pat_chkup`
--

INSERT INTO `pat_chkup` (`PAT_NO`, `DOC_NO`, `DIAGNOSIS`, `CHKUP_DT`, `STATUS`, `TREATMENT`) VALUES
('PT030', 'DR026', 'g', '2021-05-13 00:00:00', '1', 'd'),
('PT032', 'DR026', 'g', '2021-05-13 00:00:00', '1', 'd'),
('PT033', 'DR026', 'g', '2021-05-13 00:00:00', '1', 'd'),
('PT034', 'DR026', 'g', '2021-05-13 00:00:00', '1', 'd'),
('PT035', 'DR026', 'g', '0000-00-00 00:00:00', '', 'd'),
('PT036', 'DR026', 'g', '2021-05-13 00:00:00', '1', 'd'),
('PT038', 'DR026', 'g', '2021-05-13 00:00:00', '1', 'd'),
('PT039', 'DR026', 'Regular', '2021-05-13 00:00:00', '1', 'Regular'),
('PT040', 'DR026', 'admit', '0000-00-00 00:00:00', '', 'admit'),
('PT041', 'DR026', 'discharge', '0000-00-00 00:00:00', '', 'discharge'),
('PT044', 'DR026', 'operation', '0000-00-00 00:00:00', '', 'operation'),
('PT045', 'DR026', 'g', '0000-00-00 00:00:00', '', 'd'),
('PT046', 'DR026', 'g', '0000-00-00 00:00:00', '', 'd');

-- --------------------------------------------------------

--
-- Table structure for table `pat_dis`
--

CREATE TABLE `pat_dis` (
  `PAT_NO` varchar(5) NOT NULL DEFAULT '0',
  `TR_ADVS` varchar(255) DEFAULT NULL,
  `TR_GVN` varchar(255) DEFAULT NULL,
  `MEDICINES` varchar(255) DEFAULT NULL,
  `PYMT_GV` char(1) DEFAULT NULL,
  `DIS_ON` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pat_dis`
--

INSERT INTO `pat_dis` (`PAT_NO`, `TR_ADVS`, `TR_GVN`, `MEDICINES`, `PYMT_GV`, `DIS_ON`) VALUES
('PT041', 'discharge', 'discharge', 'undefined', '4', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pat_entry`
--

CREATE TABLE `pat_entry` (
  `PAT_NO` varchar(5) NOT NULL DEFAULT '0',
  `PAT_NAME` varchar(255) DEFAULT NULL,
  `CHKUP_DT` datetime DEFAULT NULL,
  `PT_AGE` int(30) DEFAULT NULL,
  `SEX` char(1) DEFAULT NULL,
  `DIAGNOSIS` varchar(255) DEFAULT NULL,
  `RFD` varchar(5) NOT NULL DEFAULT '0',
  `ADDRESS` varchar(255) DEFAULT NULL,
  `CITY` varchar(255) DEFAULT NULL,
  `PH_NO` int(30) DEFAULT NULL,
  `DEPARTMENT` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pat_entry`
--

INSERT INTO `pat_entry` (`PAT_NO`, `PAT_NAME`, `CHKUP_DT`, `PT_AGE`, `SEX`, `DIAGNOSIS`, `RFD`, `ADDRESS`, `CITY`, `PH_NO`, `DEPARTMENT`) VALUES
('PT001', 'Demo', '2021-05-11 00:00:00', 30, 'M', 'demo', 'DR026', 'demo', 'Lahore', 987654321, 'HRM'),
('PT002', 'demo', '2021-05-11 00:00:00', 54, 'M', 'demo', 'DR026', 'demo', 'Lahore', 5765, 'HRM'),
('PT003', 'demo', '2021-05-11 00:00:00', 5, 'M', 'demo', 'DR026', 'demo', 'Lahore', 3, 'HRM'),
('PT004', 'demo', '2021-05-11 00:00:00', 2, 'M', 'demo', 'DR026', 'demo', 'Lahore', 5, 'HRM'),
('PT005', 'demo', '2021-05-11 00:00:00', 2, 'M', 'demo', 'DR026', 'demo', 'Lahore', 5, 'HRM'),
('PT006', 'demo', '2021-05-13 00:00:00', 2, 'M', 'demo', 'DR026', 'demo', 'Lahore', 3, 'HRM'),
('PT007', 'demo', '2021-05-13 00:00:00', 2, 'M', 'demo', 'DR026', 'demo', 'Lahore', 3, 'HRM'),
('PT008', 'demo', '2021-05-13 00:00:00', 2, 'M', 'demo', 'DR026', 'demo', 'Lahore', 3, 'HRM'),
('PT009', 'demo', '2021-05-13 00:00:00', 2, 'M', 'demo', 'DR026', 'demo', 'Lahore', 3, 'HRM'),
('PT010', 'demo', '2021-05-13 00:00:00', 2, 'M', 'demo', 'DR026', 'demo', 'Karachi', 2, 'HRM'),
('PT011', 'demo', '2021-05-13 00:00:00', 2, 'M', 'demo', 'DR026', 'demo', 'Karachi', 2, 'HRM'),
('PT012', 'demo', '2021-05-13 00:00:00', 1, 'M', 'demo', 'DR026', 'demo', 'Lahore', 3, 'HRM'),
('PT013', 'demo', '2021-05-13 00:00:00', 3, 'M', 'demo', 'DR026', 'demo', 'Karachi', 2, 'HRM'),
('PT015', '', '0000-00-00 00:00:00', 0, 'M', '', 'DR026', '', '', 0, 'HRM'),
('PT016', 's', '2021-05-13 00:00:00', 32, 'M', 'j', 'DR026', 's', 'Lahore', 2, 'HRM'),
('PT017', 'demo', '2021-05-13 00:00:00', 3, 'M', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT018', 'demo', '2021-05-13 00:00:00', 3, 'M', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT019', 'demo', '2021-05-13 00:00:00', 3, 'M', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT020', 'demo', '2021-05-13 00:00:00', 3, 'M', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT021', 'demo', '2021-05-13 00:00:00', 3, 'M', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT022', 'demo', '2021-05-13 00:00:00', 3, 'M', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT023', 'demo', '2021-05-13 00:00:00', 3, 'M', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT024', 'demo', '2021-05-13 00:00:00', 3, 'M', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT025', 'demo', '2021-05-13 00:00:00', 3, 'M', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT026', 'demo', '2021-05-13 00:00:00', 3, 'M', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT027', 'demo', '2021-05-13 00:00:00', 3, 'M', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT028', 'demo', '2021-05-13 00:00:00', 3, 'M', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT029', 'demo', '2021-05-13 00:00:00', 3, 'M', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT030', 'demo', '2021-05-13 00:00:00', 3, 'M', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT031', 'demo', '2021-05-13 00:00:00', 3, 'M', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT032', 'demo', '2021-05-13 00:00:00', 3, 'M', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT033', 'demo', '2021-05-13 00:00:00', 3, 'M', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT034', 'demo', '2021-05-13 00:00:00', 3, 'M', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT035', 'dem', '0000-00-00 00:00:00', 3, 'u', 'g', 'DR026', 'de', 'Karachi', 3, 'HRM'),
('PT036', 'demo', '2021-05-13 00:00:00', 3, 'M', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT038', 'demo', '2021-05-13 00:00:00', 3, 'M', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT039', 'Regular', '2021-05-13 00:00:00', 2, 'M', 'Regular', 'DR026', 'Regular', 'Lahore', 1, 'HRM'),
('PT040', 'admi', '0000-00-00 00:00:00', 2, 'u', 'admit', 'DR026', 'admi', 'Karachi', 2, 'HRM'),
('PT041', 'discharg', '0000-00-00 00:00:00', 2, 'u', 'discharge', 'DR026', 'discharg', 'Lahore', 2, 'HRM'),
('PT044', 'operatio', '0000-00-00 00:00:00', 3, 'u', 'operation', 'DR026', 'operatio', 'Islamabad', 4, 'HRM'),
('PT045', 'dem', '0000-00-00 00:00:00', 3, 'u', 'g', 'DR026', 'demo', 'Karachi', 3, 'HRM'),
('PT046', 'dem', '0000-00-00 00:00:00', 3, 'u', 'g', 'DR026', 'dem', 'Karachi', 3, 'HRM');

--
-- Triggers `pat_entry`
--
DELIMITER $$
CREATE TRIGGER `tg_pat_ent_insert` BEFORE INSERT ON `pat_entry` FOR EACH ROW BEGIN
  INSERT INTO pat_entry_seq VALUES (NULL);
  SET NEW.PAT_NO = CONCAT('PT', LPAD(LAST_INSERT_ID(), 3, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `pat_entry_seq`
--

CREATE TABLE `pat_entry_seq` (
  `PAT_NO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pat_entry_seq`
--

INSERT INTO `pat_entry_seq` (`PAT_NO`) VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10),
(11),
(12),
(13),
(15),
(16),
(17),
(18),
(19),
(20),
(21),
(22),
(23),
(24),
(25),
(26),
(27),
(28),
(29),
(30),
(31),
(32),
(33),
(34),
(35),
(36),
(38),
(39),
(40),
(41),
(44),
(45),
(46);

-- --------------------------------------------------------

--
-- Table structure for table `pat_opr`
--

CREATE TABLE `pat_opr` (
  `PAT_NO` varchar(5) NOT NULL DEFAULT '0',
  `DATE_OPR` datetime DEFAULT NULL,
  `IN_COND` varchar(255) DEFAULT NULL,
  `AFOP_COND` varchar(255) DEFAULT NULL,
  `TY_OPERATION` varchar(255) DEFAULT NULL,
  `MEDICINES` varchar(255) DEFAULT NULL,
  `DOC_NO` varchar(5) DEFAULT '0',
  `OPTH_NO` varchar(255) DEFAULT NULL,
  `OTHER_SUG` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pat_opr`
--

INSERT INTO `pat_opr` (`PAT_NO`, `DATE_OPR`, `IN_COND`, `AFOP_COND`, `TY_OPERATION`, `MEDICINES`, `DOC_NO`, `OPTH_NO`, `OTHER_SUG`) VALUES
('PT044', '0000-00-00 00:00:00', 'operation', 'operation', 'operation', 'undefined', 'DR026', 'HRM', 0),
('PT045', '0000-00-00 00:00:00', 'undefined', 'undefined', 'undefined', 'k', 'DR026', 'HRM', 0),
('PT046', '0000-00-00 00:00:00', 'undefined', 'undefined', 'undefined', 'k', 'DR026', 'HRM', 0);

-- --------------------------------------------------------

--
-- Table structure for table `pat_reg`
--

CREATE TABLE `pat_reg` (
  `PAT_NO` varchar(5) NOT NULL DEFAULT '0',
  `DATE_VIS` datetime DEFAULT NULL,
  `cond` char(25) DEFAULT NULL,
  `TREATMENT` varchar(255) DEFAULT NULL,
  `MEDICINES` varchar(255) DEFAULT NULL,
  `DOC_NO` varchar(5) NOT NULL DEFAULT '0',
  `PAYMT` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pat_reg`
--

INSERT INTO `pat_reg` (`PAT_NO`, `DATE_VIS`, `cond`, `TREATMENT`, `MEDICINES`, `DOC_NO`, `PAYMT`) VALUES
('PT036', '2021-05-13 00:00:00', 'j', 'd', 'k', 'DR026', 0),
('PT038', '2021-05-13 00:00:00', 'j', 'd', 'k', 'DR026', 0),
('PT039', '2021-05-13 00:00:00', 'Regular', 'Regular', 'Regular', 'DR026', 0);

-- --------------------------------------------------------

--
-- Table structure for table `room_details`
--

CREATE TABLE `room_details` (
  `ROOM_NO` int(11) NOT NULL,
  `TYPE` char(1) DEFAULT NULL,
  `STATUS` char(1) DEFAULT NULL,
  `RM_DL_CRG` int(11) DEFAULT NULL,
  `OTHER_CRG` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room_details`
--

INSERT INTO `room_details` (`ROOM_NO`, `TYPE`, `STATUS`, `RM_DL_CRG`, `OTHER_CRG`) VALUES
(1, 'G', 'Y', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `all_doctors`
--
ALTER TABLE `all_doctors`
  ADD PRIMARY KEY (`DOC_NO`),
  ADD KEY `DEPARTMENT` (`DEPARTMENT`);

--
-- Indexes for table `all_doctors_seq`
--
ALTER TABLE `all_doctors_seq`
  ADD PRIMARY KEY (`DOC_NO`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`D_NAME`);

--
-- Indexes for table `doc_on_call`
--
ALTER TABLE `doc_on_call`
  ADD PRIMARY KEY (`DOC_NO`);

--
-- Indexes for table `doc_reg`
--
ALTER TABLE `doc_reg`
  ADD PRIMARY KEY (`DOC_NO`);

--
-- Indexes for table `pat_admit`
--
ALTER TABLE `pat_admit`
  ADD PRIMARY KEY (`PAT_NO`),
  ADD KEY `ROOM_NO` (`ROOM_NO`),
  ADD KEY `TRMT_SDT` (`TRMT_SDT`);

--
-- Indexes for table `pat_chkup`
--
ALTER TABLE `pat_chkup`
  ADD PRIMARY KEY (`PAT_NO`),
  ADD KEY `DOC_NO` (`DOC_NO`);

--
-- Indexes for table `pat_dis`
--
ALTER TABLE `pat_dis`
  ADD PRIMARY KEY (`PAT_NO`);

--
-- Indexes for table `pat_entry`
--
ALTER TABLE `pat_entry`
  ADD PRIMARY KEY (`PAT_NO`),
  ADD KEY `DEPARTMENT` (`DEPARTMENT`),
  ADD KEY `RFD` (`RFD`);

--
-- Indexes for table `pat_entry_seq`
--
ALTER TABLE `pat_entry_seq`
  ADD PRIMARY KEY (`PAT_NO`);

--
-- Indexes for table `pat_opr`
--
ALTER TABLE `pat_opr`
  ADD PRIMARY KEY (`PAT_NO`),
  ADD KEY `DOC_NO` (`DOC_NO`),
  ADD KEY `OPTH_NO` (`OPTH_NO`);

--
-- Indexes for table `pat_reg`
--
ALTER TABLE `pat_reg`
  ADD KEY `PAT_NO` (`PAT_NO`),
  ADD KEY `DOC_NO` (`DOC_NO`);

--
-- Indexes for table `room_details`
--
ALTER TABLE `room_details`
  ADD PRIMARY KEY (`ROOM_NO`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `all_doctors_seq`
--
ALTER TABLE `all_doctors_seq`
  MODIFY `DOC_NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `pat_entry_seq`
--
ALTER TABLE `pat_entry_seq`
  MODIFY `PAT_NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `room_details`
--
ALTER TABLE `room_details`
  MODIFY `ROOM_NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `all_doctors`
--
ALTER TABLE `all_doctors`
  ADD CONSTRAINT `all_doctors_ibfk_1` FOREIGN KEY (`DEPARTMENT`) REFERENCES `department` (`D_NAME`) ON DELETE CASCADE;

--
-- Constraints for table `doc_on_call`
--
ALTER TABLE `doc_on_call`
  ADD CONSTRAINT `doc_on_call_ibfk_1` FOREIGN KEY (`DOC_NO`) REFERENCES `all_doctors` (`DOC_NO`) ON DELETE CASCADE;

--
-- Constraints for table `doc_reg`
--
ALTER TABLE `doc_reg`
  ADD CONSTRAINT `doc_reg_ibfk_1` FOREIGN KEY (`DOC_NO`) REFERENCES `all_doctors` (`DOC_NO`) ON DELETE CASCADE;

--
-- Constraints for table `pat_admit`
--
ALTER TABLE `pat_admit`
  ADD CONSTRAINT `pat_admit_ibfk_1` FOREIGN KEY (`PAT_NO`) REFERENCES `pat_entry` (`PAT_NO`) ON DELETE CASCADE,
  ADD CONSTRAINT `pat_admit_ibfk_2` FOREIGN KEY (`ROOM_NO`) REFERENCES `room_details` (`ROOM_NO`) ON DELETE CASCADE,
  ADD CONSTRAINT `pat_admit_ibfk_3` FOREIGN KEY (`TRMT_SDT`) REFERENCES `all_doctors` (`DOC_NO`) ON DELETE CASCADE;

--
-- Constraints for table `pat_chkup`
--
ALTER TABLE `pat_chkup`
  ADD CONSTRAINT `pat_chkup_ibfk_1` FOREIGN KEY (`PAT_NO`) REFERENCES `pat_entry` (`PAT_NO`) ON DELETE CASCADE,
  ADD CONSTRAINT `pat_chkup_ibfk_2` FOREIGN KEY (`DOC_NO`) REFERENCES `all_doctors` (`DOC_NO`) ON DELETE CASCADE;

--
-- Constraints for table `pat_dis`
--
ALTER TABLE `pat_dis`
  ADD CONSTRAINT `pat_dis_ibfk_1` FOREIGN KEY (`PAT_NO`) REFERENCES `pat_entry` (`PAT_NO`) ON DELETE CASCADE;

--
-- Constraints for table `pat_entry`
--
ALTER TABLE `pat_entry`
  ADD CONSTRAINT `pat_entry_ibfk_1` FOREIGN KEY (`DEPARTMENT`) REFERENCES `department` (`D_NAME`) ON DELETE CASCADE,
  ADD CONSTRAINT `pat_entry_ibfk_2` FOREIGN KEY (`RFD`) REFERENCES `all_doctors` (`DOC_NO`) ON DELETE CASCADE;

--
-- Constraints for table `pat_opr`
--
ALTER TABLE `pat_opr`
  ADD CONSTRAINT `pat_opr_ibfk_1` FOREIGN KEY (`PAT_NO`) REFERENCES `pat_entry` (`PAT_NO`) ON DELETE CASCADE,
  ADD CONSTRAINT `pat_opr_ibfk_2` FOREIGN KEY (`DOC_NO`) REFERENCES `all_doctors` (`DOC_NO`) ON DELETE SET NULL,
  ADD CONSTRAINT `pat_opr_ibfk_3` FOREIGN KEY (`OPTH_NO`) REFERENCES `department` (`D_NAME`);

--
-- Constraints for table `pat_reg`
--
ALTER TABLE `pat_reg`
  ADD CONSTRAINT `pat_reg_ibfk_1` FOREIGN KEY (`PAT_NO`) REFERENCES `pat_entry` (`PAT_NO`) ON DELETE CASCADE,
  ADD CONSTRAINT `pat_reg_ibfk_2` FOREIGN KEY (`DOC_NO`) REFERENCES `all_doctors` (`DOC_NO`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
