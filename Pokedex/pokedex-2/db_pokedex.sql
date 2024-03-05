-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 23-Set-2022 às 02:53
-- Versão do servidor: 10.4.8-MariaDB
-- versão do PHP: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--

CREATE DATABASE db_pokedex;
-- Banco de dados: `db_pokedex`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_pokemon`
--

CREATE TABLE `tb_pokemon` (
  `cd_pokemon` int(11) NOT NULL,
  `nm_pokemon` varchar(100) NOT NULL,
  `ds_tipo1` varchar(30) NOT NULL,
  `ds_tipo2` varchar(30) NOT NULL,
  `atk_base` int(11) DEFAULT NULL,
  `def_base` int(11) DEFAULT NULL,
  `vida_base` int(11) DEFAULT NULL,
  `esq_base` int(11) DEFAULT NULL,
  `url_img` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_pokemon`
--

INSERT INTO `tb_pokemon` (`cd_pokemon`, `nm_pokemon`, `ds_tipo1`, `ds_tipo2`, `atk_base`, `def_base`, `vida_base`, `esq_base`, `url_img`) VALUES
(1, 'Bulbasaur', 'Grama', 'Toxico', 30, 30, 30, 30, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png'),
(2, 'Ivysaur', 'Grama', 'Toxico', 40, 40, 40, 40, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png'),
(3, 'Venusaur', 'Grama', 'Toxico', 50, 50, 50, 50, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png'),
(9, 'Charmander ', 'fogo', '', NULL, NULL, NULL, NULL, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png'),
(10, 'Charmander ', 'fogo', '', NULL, NULL, NULL, NULL, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tb_pokemon`
--
ALTER TABLE `tb_pokemon`
  ADD PRIMARY KEY (`cd_pokemon`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_pokemon`
--
ALTER TABLE `tb_pokemon`
  MODIFY `cd_pokemon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
