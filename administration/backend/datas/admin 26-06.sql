-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 26 juin 2024 à 21:04
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `admin`
--

-- --------------------------------------------------------

--
-- Structure de la table `connexion_serveurs`
--

CREATE TABLE `connexion_serveurs` (
  `id_serveur` varchar(32) NOT NULL,
  `mots_de_passe` varchar(64) NOT NULL,
  `nom_serveur` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `connexion_serveurs`
--

INSERT INTO `connexion_serveurs` (`id_serveur`, `mots_de_passe`, `nom_serveur`) VALUES
('25062024', '$2a$12$1IkLmaL9zHU4UGKDqyRf5uCb6GcuKhUtgPaUFEImSN.cnLHTcLzGK', 'serveur medical');

-- --------------------------------------------------------

--
-- Structure de la table `dossier_administratif`
--

CREATE TABLE `dossier_administratif` (
  `num_secu` varchar(15) NOT NULL,
  `nom` varchar(32) NOT NULL,
  `prenom` varchar(32) NOT NULL,
  `sexe` int(1) NOT NULL,
  `date_naissance` date NOT NULL,
  `telephone` varchar(32) NOT NULL,
  `email` varchar(30) NOT NULL,
  `adresse` varchar(50) NOT NULL,
  `remarques` varchar(1028) DEFAULT NULL,
  `id_mutuelle` int(30) NOT NULL,
  `id_hopital` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `dossier_administratif`
--

INSERT INTO `dossier_administratif` (`num_secu`, `nom`, `prenom`, `sexe`, `date_naissance`, `telephone`, `email`, `adresse`, `remarques`, `id_mutuelle`, `id_hopital`) VALUES
('104021730625478', 'Perez', 'Sergio', 1, '1990-06-04', '0948103097', 'test@hop.fr', '13 avenue salvador allende villeurbanne', 'jamais dans les points ! ', 1, 1),
('107102509803594', 'Ricciardo', 'Daniel', 1, '2007-10-25', '0123456789', 'd.ricciado@hop.com', '03 Rue de Monza 65980 Fiorano', 'Test de même nom.', 3, 1),
('108051202210801', 'Ricciardo', 'Daniel', 1, '2008-05-12', '0603221277', 'd.ricciado2@hop.com', '23 Rue de Suzuka 12976 Hanoi', 'Test de même nom.', 2, 1),
('145091821509474', 'Russel', 'Georges', 1, '1945-09-15', '0763014354', 'g.russel@hop.com', '10 Rue de Spa 33120 Liège', 'Test de même nom, même date de naissance.', 3, 1),
('145091821509573', 'Russel', 'Georges', 1, '1945-09-18', '0764024454', 'g.russel2@hop.com', '10 Rue de Sao Paulo 40290 Villeneuve', 'Test de même nom, même date de naissance.', 3, 1),
('194070502211575', 'Ricciardo', 'Daniel', 1, '1994-07-05', '0623281276', 'd.ricciado3@hop.com', '873 Rue Paul RRicard 75003 Paris', 'Test de même nom.', 3, 1),
('195017512001055', 'Leclerc', 'Charles', 1, '1990-01-15', '0616020304', 'c.leclerc@hop.com', '16 rue de Bakou', 'Pas de remarques.', 1, 1),
('199096831305097', 'Bottas', 'Valteri', 1, '1988-05-28', '0677010809', 'v.bottas@hop.com', '77 Rue de Turquie', 'Accompagné de sa grand-mère.', 3, 1),
('288114012531528', 'Wolf', 'Suzie', 2, '2000-10-02', '0609110804', 's.wolf@hop.com', '03 Avennue de Silverstone', 'Mineure.', 1, 1),
('294037512000591', 'Jorda', 'Carmen', 2, '1995-11-05', '0601087801', 'c.jorda@hop.com', '22 Avenue de Barcelone', 'Pas de pièce didentité présenté.', 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `hopital`
--

CREATE TABLE `hopital` (
  `id_hopital` int(30) NOT NULL,
  `nom` varchar(32) NOT NULL,
  `ville` varchar(32) NOT NULL,
  `telephone` varchar(10) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `hopital`
--

INSERT INTO `hopital` (`id_hopital`, `nom`, `ville`, `telephone`, `description`) VALUES
(1, 'Hopital Saint Louis', 'Paris', '0145678910', 'Hopital généraliste avec de nombreux services.'),
(2, 'Hopital de la Salpêtrière', 'Paris', '0145789120', 'Grand centre hospitalier universitaire.'),
(3, 'Hopital Cochin', 'Paris', '0176543210', 'Spécialisé en soins intensifs.');

-- --------------------------------------------------------

--
-- Structure de la table `mutuelle`
--

CREATE TABLE `mutuelle` (
  `id_mutuelle` int(30) NOT NULL,
  `nom_mutuelle` varchar(32) NOT NULL,
  `telephone` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `mutuelle`
--

INSERT INTO `mutuelle` (`id_mutuelle`, `nom_mutuelle`, `telephone`) VALUES
(1, 'Mutuelle Santé', '0123456789'),
(2, 'Mutuelle Familiale', '0987654321'),
(3, 'Mutuelle Pro', '0543219876'),
(99, '-', ''),
(100, 'Autre', '');

-- --------------------------------------------------------

--
-- Structure de la table `personnel_administratif`
--

CREATE TABLE `personnel_administratif` (
  `id_administratif` int(30) NOT NULL,
  `nom` varchar(32) NOT NULL,
  `prenom` varchar(32) NOT NULL,
  `date_naissance` date NOT NULL,
  `email` varchar(32) NOT NULL,
  `mots_de_passe` varchar(64) NOT NULL,
  `id_service` int(30) NOT NULL,
  `id_hopital` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `personnel_administratif`
--

INSERT INTO `personnel_administratif` (`id_administratif`, `nom`, `prenom`, `date_naissance`, `email`, `mots_de_passe`, `id_service`, `id_hopital`) VALUES
(1, 'Durand', 'Paul', '1980-05-20', 'p.durand@hop.com', '$2a$12$zC7NuUjZJD01xj4dL2p6bethWeu3xQmchf5BItyR3vUcv4roDQbNS', 1, 1),
(2, 'Martin', 'Sophie', '1975-12-11', 's.martin@hop.com', '$2a$12$zC7NuUjZJD01xj4dL2p6bethWeu3xQmchf5BItyR3vUcv4roDQbNS', 2, 2),
(3, 'Bernard', 'Luc', '1985-07-30', 'l.bernard@hop.com', '$2a$12$zC7NuUjZJD01xj4dL2p6bethWeu3xQmchf5BItyR3vUcv4roDQbNS', 3, 3);

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

CREATE TABLE `service` (
  `id_service` int(30) NOT NULL,
  `nom_service` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`id_service`, `nom_service`) VALUES
(1, 'Cardiologie'),
(2, 'Neurologie'),
(3, 'Orthopédie'),
(4, 'Chirurgie'),
(5, 'Radiologie');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `connexion_serveurs`
--
ALTER TABLE `connexion_serveurs`
  ADD PRIMARY KEY (`id_serveur`);

--
-- Index pour la table `dossier_administratif`
--
ALTER TABLE `dossier_administratif`
  ADD PRIMARY KEY (`num_secu`),
  ADD UNIQUE KEY `num_secu` (`num_secu`),
  ADD KEY `id_mutuelle` (`id_mutuelle`),
  ADD KEY `id_hopital` (`id_hopital`);

--
-- Index pour la table `hopital`
--
ALTER TABLE `hopital`
  ADD PRIMARY KEY (`id_hopital`);

--
-- Index pour la table `mutuelle`
--
ALTER TABLE `mutuelle`
  ADD PRIMARY KEY (`id_mutuelle`);

--
-- Index pour la table `personnel_administratif`
--
ALTER TABLE `personnel_administratif`
  ADD PRIMARY KEY (`id_administratif`),
  ADD KEY `id_service` (`id_service`),
  ADD KEY `id_hopital` (`id_hopital`);

--
-- Index pour la table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id_service`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `hopital`
--
ALTER TABLE `hopital`
  MODIFY `id_hopital` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `mutuelle`
--
ALTER TABLE `mutuelle`
  MODIFY `id_mutuelle` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT pour la table `personnel_administratif`
--
ALTER TABLE `personnel_administratif`
  MODIFY `id_administratif` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `service`
--
ALTER TABLE `service`
  MODIFY `id_service` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `dossier_administratif`
--
ALTER TABLE `dossier_administratif`
  ADD CONSTRAINT `dossier_administratif_ibfk_1` FOREIGN KEY (`id_mutuelle`) REFERENCES `mutuelle` (`id_mutuelle`),
  ADD CONSTRAINT `dossier_administratif_ibfk_2` FOREIGN KEY (`id_hopital`) REFERENCES `hopital` (`id_hopital`);

--
-- Contraintes pour la table `personnel_administratif`
--
ALTER TABLE `personnel_administratif`
  ADD CONSTRAINT `personnel_administratif_ibfk_1` FOREIGN KEY (`id_service`) REFERENCES `service` (`id_service`),
  ADD CONSTRAINT `personnel_administratif_ibfk_2` FOREIGN KEY (`id_hopital`) REFERENCES `hopital` (`id_hopital`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
