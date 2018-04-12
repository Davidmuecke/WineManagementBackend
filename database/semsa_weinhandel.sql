-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 12. Apr 2018 um 15:17
-- Server-Version: 10.1.22-MariaDB
-- PHP-Version: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `semsa_weinhandel`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `adresse`
--

CREATE TABLE `adresse` (
  `id` int(11) NOT NULL,
  `land` varchar(100) COLLATE utf8_bin NOT NULL,
  `strasse` varchar(200) COLLATE utf8_bin NOT NULL,
  `plz` int(10) NOT NULL,
  `ort` varchar(200) COLLATE utf8_bin NOT NULL,
  `hausnummer` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `adresse`
--

INSERT INTO `adresse` (`id`, `land`, `strasse`, `plz`, `ort`, `hausnummer`) VALUES
(1, 'Deutschland', 'Weinweg', 72141, 'Vaihingen', 2),
(2, 'Deutschland', 'Weingasse', 72213, 'Leonberg', 17),
(3, 'Deutschland', 'Weinpfad', 72362, 'Freiburg', 1),
(4, 'Deutschland', 'Weinplatz', 73615, 'Wankheim', 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `artikel`
--

CREATE TABLE `artikel` (
  `id` int(10) NOT NULL,
  `jahrgang` int(4) NOT NULL,
  `menge` int(10) NOT NULL,
  `bezeichnung` varchar(100) COLLATE utf8_bin NOT NULL,
  `lagerort` varchar(100) COLLATE utf8_bin NOT NULL,
  `herkunft` varchar(100) COLLATE utf8_bin NOT NULL,
  `einkaufspreis` int(10) NOT NULL,
  `verkaufspreis` int(10) NOT NULL,
  `lieferant_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `artikel`
--

INSERT INTO `artikel` (`id`, `jahrgang`, `menge`, `bezeichnung`, `lagerort`, `herkunft`, `einkaufspreis`, `verkaufspreis`, `lieferant_id`) VALUES
(1, 1969, 200, 'Rotwein', 'Vaihingen', 'Stuttgart', 5, 9, 1),
(2, 1900, 15, 'Portwein', 'Freiburg', 'Porto', 10, 15, 2),
(3, 1800, 5, 'Weisswein', 'Bruchsal', 'Vancouver', 1000, 10000, 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `artikel_bestellung`
--

CREATE TABLE `artikel_bestellung` (
  `artikel_id` int(10) NOT NULL,
  `bestellung_id` int(10) NOT NULL,
  `id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `artikel_bestellung`
--

INSERT INTO `artikel_bestellung` (`artikel_id`, `bestellung_id`, `id`) VALUES
(1, 1, 1),
(3, 2, 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `benutzer`
--

CREATE TABLE `benutzer` (
  `id` int(10) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `vorname` varchar(100) COLLATE utf8_bin NOT NULL,
  `passwort` varchar(200) COLLATE utf8_bin NOT NULL,
  `rolle_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `benutzer`
--

INSERT INTO `benutzer` (`id`, `name`, `vorname`, `passwort`, `rolle_id`) VALUES
(1, 'Mitarbeiter', 'Markus', 'test1234', 2),
(2, 'Chef', 'Carl', 'admin1234', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bestellung`
--

CREATE TABLE `bestellung` (
  `kunde_id` int(10) NOT NULL,
  `id` int(10) NOT NULL,
  `gesamtpreis` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `bestellung`
--

INSERT INTO `bestellung` (`kunde_id`, `id`, `gesamtpreis`) VALUES
(1, 1, 9),
(2, 2, 10000);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `kunde`
--

CREATE TABLE `kunde` (
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `id` int(10) NOT NULL,
  `rechnungsadresse_id` int(10) NOT NULL,
  `lieferadresse_id` int(10) NOT NULL,
  `vorname` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `kunde`
--

INSERT INTO `kunde` (`name`, `id`, `rechnungsadresse_id`, `lieferadresse_id`, `vorname`) VALUES
('Haller', 1, 3, 3, 'Haller'),
('Daniel', 2, 4, 4, 'Doser');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `lieferant`
--

CREATE TABLE `lieferant` (
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `vorname` varchar(100) COLLATE utf8_bin NOT NULL,
  `region` varchar(100) COLLATE utf8_bin NOT NULL,
  `adresse_id` int(10) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `lieferant`
--

INSERT INTO `lieferant` (`name`, `vorname`, `region`, `adresse_id`, `id`) VALUES
('Willy', 'Weiner', 'Stuttgart', 1, 1),
('Werner', 'Winzer', 'Baden', 3, 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rolle`
--

CREATE TABLE `rolle` (
  `id` int(10) NOT NULL,
  `bezeichnung` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `rolle`
--

INSERT INTO `rolle` (`id`, `bezeichnung`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rolle_zugriffsrecht`
--

CREATE TABLE `rolle_zugriffsrecht` (
  `id` int(10) NOT NULL,
  `rolle_id` int(10) NOT NULL,
  `zugriffsrecht_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `rolle_zugriffsrecht`
--

INSERT INTO `rolle_zugriffsrecht` (`id`, `rolle_id`, `zugriffsrecht_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `zugriffsrecht`
--

CREATE TABLE `zugriffsrecht` (
  `id` int(10) NOT NULL,
  `bezeichnung` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `zugriffsrecht`
--

INSERT INTO `zugriffsrecht` (`id`, `bezeichnung`) VALUES
(1, 'lesen'),
(2, 'schreiben');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `adresse`
--
ALTER TABLE `adresse`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `artikel`
--
ALTER TABLE `artikel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lieferant_id` (`lieferant_id`);

--
-- Indizes für die Tabelle `artikel_bestellung`
--
ALTER TABLE `artikel_bestellung`
  ADD PRIMARY KEY (`id`),
  ADD KEY `artikel_id` (`artikel_id`),
  ADD KEY `bestellung_id` (`bestellung_id`);

--
-- Indizes für die Tabelle `benutzer`
--
ALTER TABLE `benutzer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rolle_id` (`rolle_id`);

--
-- Indizes für die Tabelle `bestellung`
--
ALTER TABLE `bestellung`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bestellung_ibfk_1` (`kunde_id`);

--
-- Indizes für die Tabelle `kunde`
--
ALTER TABLE `kunde`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rechnungsadresse_id` (`rechnungsadresse_id`),
  ADD KEY `lieferadresse_id` (`lieferadresse_id`);

--
-- Indizes für die Tabelle `lieferant`
--
ALTER TABLE `lieferant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adresse_id` (`adresse_id`);

--
-- Indizes für die Tabelle `rolle`
--
ALTER TABLE `rolle`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `rolle_zugriffsrecht`
--
ALTER TABLE `rolle_zugriffsrecht`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rolle_id` (`rolle_id`),
  ADD KEY `zugriffsrecht_id` (`zugriffsrecht_id`);

--
-- Indizes für die Tabelle `zugriffsrecht`
--
ALTER TABLE `zugriffsrecht`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `adresse`
--
ALTER TABLE `adresse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `artikel`
--
ALTER TABLE `artikel`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `artikel_bestellung`
--
ALTER TABLE `artikel_bestellung`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `benutzer`
--
ALTER TABLE `benutzer`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `bestellung`
--
ALTER TABLE `bestellung`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `kunde`
--
ALTER TABLE `kunde`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `lieferant`
--
ALTER TABLE `lieferant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `rolle`
--
ALTER TABLE `rolle`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `rolle_zugriffsrecht`
--
ALTER TABLE `rolle_zugriffsrecht`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `zugriffsrecht`
--
ALTER TABLE `zugriffsrecht`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `artikel`
--
ALTER TABLE `artikel`
  ADD CONSTRAINT `artikel_ibfk_1` FOREIGN KEY (`lieferant_id`) REFERENCES `lieferant` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `artikel_bestellung`
--
ALTER TABLE `artikel_bestellung`
  ADD CONSTRAINT `artikel_bestellung_ibfk_1` FOREIGN KEY (`artikel_id`) REFERENCES `artikel` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `artikel_bestellung_ibfk_2` FOREIGN KEY (`bestellung_id`) REFERENCES `bestellung` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `benutzer`
--
ALTER TABLE `benutzer`
  ADD CONSTRAINT `benutzer_ibfk_1` FOREIGN KEY (`rolle_id`) REFERENCES `rolle` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `bestellung`
--
ALTER TABLE `bestellung`
  ADD CONSTRAINT `bestellung_ibfk_1` FOREIGN KEY (`kunde_id`) REFERENCES `kunde` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `kunde`
--
ALTER TABLE `kunde`
  ADD CONSTRAINT `kunde_ibfk_1` FOREIGN KEY (`rechnungsadresse_id`) REFERENCES `adresse` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `kunde_ibfk_2` FOREIGN KEY (`lieferadresse_id`) REFERENCES `adresse` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `lieferant`
--
ALTER TABLE `lieferant`
  ADD CONSTRAINT `lieferant_ibfk_1` FOREIGN KEY (`adresse_id`) REFERENCES `adresse` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `rolle_zugriffsrecht`
--
ALTER TABLE `rolle_zugriffsrecht`
  ADD CONSTRAINT `rolle_zugriffsrecht_ibfk_1` FOREIGN KEY (`rolle_id`) REFERENCES `rolle` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `rolle_zugriffsrecht_ibfk_2` FOREIGN KEY (`zugriffsrecht_id`) REFERENCES `zugriffsrecht` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
