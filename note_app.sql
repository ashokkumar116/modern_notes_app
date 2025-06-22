-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2025 at 10:07 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `note_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `note_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `note` text NOT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`note_id`, `user_id`, `note`, `date`) VALUES
(1, 6, 'Hi I wrote a note', '2025-06-18'),
(3, 6, 'Hi I wrote a new note', '2025-06-18'),
(4, 6, 'Hi I wrote a new note 2', '2025-06-18'),
(6, 7, 'Hi I wrote a new note as abishek', '2025-06-18'),
(7, 6, 'hioii', '2025-06-20'),
(8, 6, 'hioii', '2025-06-20'),
(9, 6, 'hii', '2025-06-20'),
(10, 6, 'new\n', '2025-06-20'),
(17, 10, 'hello edited', '2025-06-21'),
(19, 10, 'hiii', '2025-06-21'),
(26, 12, 'new note', '2025-06-21');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `otp` varchar(10) DEFAULT NULL,
  `otp_expire` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `contact`, `password`, `profile_image`, `otp`, `otp_expire`) VALUES
(1, 'john', 'john@gmail.com', '9876543210', '$2b$10$bWh.GlCtuBawLHFKOO.T9.MzhL0595TK0/jroPcmzQzH89ooUPxH2', NULL, NULL, NULL),
(3, 'clair', 'clair@gmail.com', '9876543210', '$2b$10$ZodI5xOj5/C8UErO3qKljuRImG5n7K88DhhUz9CelPtxp49ZSDc/e', NULL, NULL, NULL),
(4, 'tiya', 'tiya@gmail.com', '9876543210', '$2b$10$26oqh0YMGp0oPgjMELNu1uniLv4oMKDFhOJLMvm83JCvUuCt5vsZW', '/uploads/1750266846856.jpg', NULL, NULL),
(5, 'tafe', 'tafe@gmail.com', '9876543210', '$2b$10$77mrLXY2fhjVx0xzCsxHuOjnFvmHr0Odn5IPpE/1Q9dVzccRH4j8e', '/uploads/1750263023515.png', NULL, NULL),
(6, 'eicher', 'eicher@gmail.com', '9876543210', '$2b$10$BWg8essBqbiNyW.RRmqxhO1oQ4AP2Jf9/ImRb34ZJeTc63aG5Y.RG', '/uploads/1750264334260.jpg', NULL, NULL),
(7, 'SUBASh', 'subash@gmail.com', '9876543210', '$2b$10$JJyLSAaVc.Yn7fL/j4F.S.Pc5U5XEJYPYeJQR3L0wt78NNGXQb4y.', '/uploads/1750266877690.jpg', NULL, NULL),
(8, 'test', 'test@gmail.com', '0987654321', '$2b$10$/jLmUYx/rVdl2aaLjUL6meGpFz5EXVYb7RqxuJjethcB7O5WzANvm', NULL, NULL, NULL),
(10, 'ASHOK KUMAR P', 'ashokkumarpandian7@gmail.com', '9655350649', '$2b$10$Q2AiApanGkIBX0qRd3z/a.6TZo8fFfe1BGEIlalceqf8ccr2rccam', '/uploads/1750526143837.jpg', NULL, NULL),
(11, 'new', 'new@gmail.com', '9876543210', '$2b$10$qDUXUUVwHwKKWStPJbF82eB4UUdJFBPqQWfgHJQPiWPhHby5f6ajK', '/uploads/1750354444190.jpg', NULL, NULL),
(12, 'abishek', 'abishek@gmail.com', '1234567890', '$2b$10$wR/H4peuoe0SCnGGpnHqieAm19d5jPXXUDoKs.sYMq60W5aBCsMum', NULL, NULL, NULL),
(19, 'ABISHEK A', '3201313@dsengg.ac.in', '9876543210', '$2b$10$PQmc05/OM8uxbf2aeg3rP.E/ZXVC5mRWBc4XAvxpI/TrytEBJc1wW', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`note_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `note_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
