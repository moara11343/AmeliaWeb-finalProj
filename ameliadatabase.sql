-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2020 at 06:10 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ameliadatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `password`) VALUES
('admin', '123');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`firstname`, `lastname`, `email`, `username`, `password`, `phone`, `address`) VALUES
('jojo', 'asdsad', '123123@gmail.com', 'jojo123', '123', '123123123', 'aaa'),
('panupat', 'sriphayakaswet', 'ffs.fgdz@gmail.com', 'pnp1301', '123', '0646986888', '206/34 VOQUECondo Sukhumvit 16 Sukhumvit road klong toey');

-- --------------------------------------------------------

--
-- Table structure for table `paymenthistory`
--

CREATE TABLE `paymenthistory` (
  `payment_key` varchar(60) NOT NULL,
  `payment_orderkey` varchar(60) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `amount` varchar(10) NOT NULL,
  `sum` varchar(65) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `paymenthistory`
--

INSERT INTO `paymenthistory` (`payment_key`, `payment_orderkey`, `name`, `image`, `amount`, `sum`) VALUES
('tok_1HxbZKL12Pwp7AQ0Np2yS9lW', 'tok_1HxbZKL12Pwp7AQ0Np2yS9lWAL01', 'temp cassette (NISAKORN)', 'b0a29951773dece53d2e3ddeff006f52.jpg', '2', '1300'),
('tok_1HxbZKL12Pwp7AQ0Np2yS9lW', 'tok_1HxbZKL12Pwp7AQ0Np2yS9lWAL02', 'temp cassette (NISAKORN 2)', '05f63cf24d787ce351ba3118b95fe92d.jpg', '1', '650'),
('tok_1HxY7yL12Pwp7AQ0kxHOKJWz', 'tok_1HxY7yL12Pwp7AQ0kxHOKJWzAL01', 'temp cassette (NISAKORN)', 'b0a29951773dece53d2e3ddeff006f52.jpg', '1', '650'),
('tok_1HxY7yL12Pwp7AQ0kxHOKJWz', 'tok_1HxY7yL12Pwp7AQ0kxHOKJWzAL02', 'temp cassette (NISAKORN 2)', '05f63cf24d787ce351ba3118b95fe92d.jpg', '1', '650'),
('tok_1HxYOyL12Pwp7AQ0FcAOtCXQ', 'tok_1HxYOyL12Pwp7AQ0FcAOtCXQAL01', 'temp cassette (NISAKORN)', 'b0a29951773dece53d2e3ddeff006f52.jpg', '1', '650'),
('tok_1HxYOyL12Pwp7AQ0FcAOtCXQ', 'tok_1HxYOyL12Pwp7AQ0FcAOtCXQAL02', 'temp cassette (NISAKORN 2)', '05f63cf24d787ce351ba3118b95fe92d.jpg', '1', '650'),
('tok_1HxYOyL12Pwp7AQ0FcAOtCXQ', 'tok_1HxYOyL12Pwp7AQ0FcAOtCXQBG01', 'Amelia Bag (canvas)', '6845f30c3891edb902b4a558a2bae206.jpg', '1', '450'),
('tok_1HxYOyL12Pwp7AQ0FcAOtCXQ', 'tok_1HxYOyL12Pwp7AQ0FcAOtCXQBG02', 'Amelia Bag (Black)', '42648c6d82691e9b5cd43eb802e30f5b.jpg', '1', '450'),
('tok_1HxYOyL12Pwp7AQ0FcAOtCXQ', 'tok_1HxYOyL12Pwp7AQ0FcAOtCXQBG03', 'Amelia Bag (white)', '49b5bf73cf6e93eb442a15015707e766.jpg', '1', '450');

-- --------------------------------------------------------

--
-- Table structure for table `paymentkey`
--

CREATE TABLE `paymentkey` (
  `payment_key` varchar(60) NOT NULL,
  `payment_createby` varchar(100) NOT NULL,
  `payment_createdat` varchar(100) NOT NULL,
  `payment_total` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `paymentkey`
--

INSERT INTO `paymentkey` (`payment_key`, `payment_createby`, `payment_createdat`, `payment_total`) VALUES
('tok_1HxbZKL12Pwp7AQ0Np2yS9lW', 'pnp1301', '1607792864787', '1950'),
('tok_1HxY7yL12Pwp7AQ0kxHOKJWz', 'jojo123', '1607779636978', '1300'),
('tok_1HxYOyL12Pwp7AQ0FcAOtCXQ', 'jojo123', '1607780690921', '2650');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `image`) VALUES
('AL01', 'temp cassette (NISAKORN)', '650', 'b0a29951773dece53d2e3ddeff006f52.jpg'),
('AL02', 'temp cassette (NISAKORN 2)', '650', '05f63cf24d787ce351ba3118b95fe92d.jpg'),
('BG01', 'Amelia Bag (canvas)', '450', '6845f30c3891edb902b4a558a2bae206.jpg'),
('BG02', 'Amelia Bag (Black)', '450', '42648c6d82691e9b5cd43eb802e30f5b.jpg'),
('BG03', 'Amelia Bag (white)', '450', '49b5bf73cf6e93eb442a15015707e766.jpg'),
('BT01', 'Water bottle (Black)', '550', 'de42c2840962cdb48570987a1d7e7872.jpg'),
('BT02', 'Water bottle (Pink)', '550', 'c88a7126439216a075b9409de25af60a.jpg'),
('SH01', 'Amelia Shirt (Black)', '350', '3a31540f11738f37423b699cdcbb195e.jpg'),
('SH02', 'Amelia Shirt (Yellow)', '350', '09bba777c98361e20f0aeeeba2675c8c.jpg'),
('SH03', 'Amelia Shirt (White)', '350', 'bc4e36a98a5aa8f40412fe5aa0967cd4.jpg'),
('SW01', 'Amelia Sweater', '1500', '810d2529c6b5fec36dd88dadbc22a1671607724148624.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`email`,`username`);

--
-- Indexes for table `paymenthistory`
--
ALTER TABLE `paymenthistory`
  ADD PRIMARY KEY (`payment_orderkey`);

--
-- Indexes for table `paymentkey`
--
ALTER TABLE `paymentkey`
  ADD PRIMARY KEY (`payment_key`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
