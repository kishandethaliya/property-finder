-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2022 at 10:30 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_property_search`
--

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `price` varchar(255) NOT NULL,
  `main_image` varchar(255) NOT NULL,
  `address` longtext NOT NULL,
  `country` varchar(255) NOT NULL,
  `pincode` varchar(50) NOT NULL,
  `latitude` varchar(255) NOT NULL,
  `longitude` varchar(255) NOT NULL,
  `sale_rent` varchar(10) NOT NULL DEFAULT 'sale',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`id`, `name`, `description`, `price`, `main_image`, `address`, `country`, `pincode`, `latitude`, `longitude`, `sale_rent`, `created`) VALUES
(1, 'The dummy House 1', '3 bds2 ba2,384 sqft- House for sale', '234520', 'image_1645952798977.jpg', 'Democracy Way, Logan Central Queensland 4114, Australia', 'Australia', '4114', '-27.6433975', '153.1045966', 'sale', '2022-02-27 09:06:38'),
(2, 'The dummy House 2', ' 2 bds2 ba2,450 sqft- House for rent', '100000', 'image_1645953152987.jpg', 'Queensland Road, Darra Queensland 4076, Australia', 'Australia', '4076', '-27.56396725', '152.95212365', 'rent', '2022-02-27 09:12:32'),
(3, 'The dummy House 3', '2 bds2 ba2,450 sqft- House for rent', '123456', 'image_1645953205086.jpg', 'Queensland Avenue, Broadbeach Queensland 4218, Australia', 'Australia', '4218', '-28.02764435', '153.4317436', 'rent', '2022-02-27 09:13:25'),
(4, 'The dummy House 4', ' 2 bds2 ba2,450 sqft- House for sale', '123456', 'image_1645953247927.jpg', 'German Riesco, La Florida, Santiago Metropolitan 8240000, Chile', 'Chile', '8240000', '-33.562023', '-70.580475', '', '2022-02-27 09:14:07'),
(5, 'The dummy House 5', '3 bds2 ba2,384 sqft- House for sale', '456123', 'image_1645953276126.jpg', 'Berman, San Miguel, Santiago Metropolitan 8900000, Chile', 'Chile', '8900000', '-33.515057', '-70.642136', 'sale', '2022-02-27 09:14:36'),
(6, 'The dummy House 6', '2 bds2 ba2,450 sqft- House for rent', '124560', 'image_1645953306119.jpg', 'South Main Street, Bradley, Maine 04411, United States', 'United States', '04411', '44.90446', '-68.6363', 'rent', '2022-02-27 09:15:06'),
(7, 'The dummy House 7', '3 bds2 ba2,384 sqft- House for sale', '1000000', 'image_1645953344149.jpg', 'South Main Street, Old Town, Maine 04411, United States', 'United States', '04411', '44.90902', '-68.64169', 'sale', '2022-02-27 09:15:44'),
(8, 'The dummy House 8', '2 bds2 ba2,450 sqft- Villa for rent', '456123', 'image_1645953385493.jpg', 'Main Road, Milford, Maine 04461, United States', 'United States', '04461', '44.97276', '-68.63478', 'rent', '2022-02-27 09:16:25'),
(9, 'The dummy House 9', ' 2 bds2 ba2,450 sqft- House for sale', '234520', 'image_1645953414822.jpg', 'Kersey Road, Felixstowe, IP11 2UL, United Kingdom', 'United Kingdom', 'IP11 2UL', '51.961997', '1.326357', 'sale', '2022-02-27 09:16:54'),
(10, 'The dummy House 10', '1 bds 1ba, 850 sqft- House for rent', '3000', 'image_1645954014241.jpg', 'Cuba, Quilicura, Santiago Metropolitan 8700000, Chile', 'Chile', '8700000', '-33.357971', '-70.74408', 'rent', '2022-02-27 09:26:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
