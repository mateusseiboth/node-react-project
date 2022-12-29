-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: lamp-mysql-1
-- Tempo de geração: 29-Dez-2022 às 20:56
-- Versão do servidor: 8.0.31
-- versão do PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `teste`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `declaracao`
--

CREATE TABLE `declaracao` (
  `id` int NOT NULL,
  `nome` varchar(50) NOT NULL,
  `usuario_id` int NOT NULL,
  `empresa_id` int NOT NULL,
  `tipoID` int NOT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa`
--

CREATE TABLE `empresa` (
  `id` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefone` varchar(50) NOT NULL,
  `ativo` tinyint(1) NOT NULL,
  `declara` varchar(50) NOT NULL,
  `CNPJ` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipodeclaracao`
--

CREATE TABLE `tipodeclaracao` (
  `id` int NOT NULL,
  `nome` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `nivel` int NOT NULL,
  `imagem` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `username`, `senha`, `nivel`, `imagem`) VALUES
(6, 'teste', 'teste', 1, ''),
(7, 'Jucilene', '12345', 0, ''),
(8, 'ricardo', 'queridao', 1, '02d11fbe626b17476c57f7f2fac983c62cec1727.png'),
(9, 'Osshiro', 'nota10', 0, '44e19defb8d5b523b5470d32bde8789e6f89daf0.jpg'),
(10, 'flavio', 'flavinho', 1, '1ffb5360efbd91f883b39d4a03a862574ac93c89.webp'),
(11, '666', '666', 0, 'null.png'),
(12, '444', '444', 0, 'null.png'),
(14, '222', '222', 0, 'null.png'),
(15, 'eee', 'eee', 0, 'null.png');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `declaracao`
--
ALTER TABLE `declaracao`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UsuarioDeclara` (`usuario_id`),
  ADD KEY `EmpresaDeclara` (`empresa_id`),
  ADD KEY `DeclaracaoTipo` (`tipoID`);

--
-- Índices para tabela `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CNPJ` (`CNPJ`);

--
-- Índices para tabela `tipodeclaracao`
--
ALTER TABLE `tipodeclaracao`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `declaracao`
--
ALTER TABLE `declaracao`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tipodeclaracao`
--
ALTER TABLE `tipodeclaracao`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `declaracao`
--
ALTER TABLE `declaracao`
  ADD CONSTRAINT `DeclaracaoTipo` FOREIGN KEY (`tipoID`) REFERENCES `tipodeclaracao` (`id`),
  ADD CONSTRAINT `EmpresaDeclara` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`),
  ADD CONSTRAINT `UsuarioDeclara` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
