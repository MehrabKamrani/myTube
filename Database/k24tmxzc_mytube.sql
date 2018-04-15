-- phpMyAdmin SQL Dump
-- version 4.0.10.18
-- https://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Apr 15, 2018 at 09:10 AM
-- Server version: 10.1.31-MariaDB-cll-lve
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `k24tmxzc_mytube`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `password`, `email`) VALUES
('admin', '1234', 'tard916@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE IF NOT EXISTS `member` (
  `id` int(11) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(20) NOT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT '0',
  `TAC` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `fullname`, `username`, `email`, `password`, `isVerified`, `TAC`) VALUES
(2, 'Mehrab Kamrani', 'Zizou', 'Mk.zizou@gmail.com', '123456', 1, 357482),
(4, 'Umar', 'Umar', 'Umar@mail.com', '111111', 1, 835411),
(5, 'Thierno Abdoul Rahimi Diallo', 'Rahimi123', 'tard916@gmail.com', '1234', 1, 835411);

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

CREATE TABLE IF NOT EXISTS `video` (
  `videoID` varchar(100) NOT NULL,
  `title` varchar(30) NOT NULL,
  `description` varchar(30) NOT NULL,
  `approve` int(11) NOT NULL DEFAULT '0',
  `approveBy` varchar(50) NOT NULL,
  `uploadedBy` varchar(50) NOT NULL,
  `numViews` int(11) NOT NULL,
  `videoPath` varchar(256) NOT NULL,
  PRIMARY KEY (`videoID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`videoID`, `title`, `description`, `approve`, `approveBy`, `uploadedBy`, `numViews`, `videoPath`) VALUES
('VID_5acf83206fce30.45816608', 'CAMERON', 'BOTH plantations in cameron hi', 1, '', 'Rahimi', 0, 'e0ca2b5e-c8e7-4302-885e-07bca2fa6d3b.mp4'),
('VID_5ad2f89f1acfd8.55624765', 'Third', 'Third', 1, '', 'Umar', 0, '78cfa1d2-0538-4a14-8856-90b8a4254965.mp4'),
('VID_5ad2f9bb82f096.95084625', 'Hey', 'Hey', 1, '', 'Umar', 0, 'c2700997-2c4e-459c-a68e-2f7deec18d21.mp4'),
('VID_5ad31e709f0225.31407494', 'Another', 'Another', 0, '', 'Umar', 0, 'a0dafce1-461c-447a-b55e-3a1293149d50.mp4');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
