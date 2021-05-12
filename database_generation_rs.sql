DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS shelters;

--
-- Table structure for table 'shelters'
--

CREATE TABLE `shelters` (
`shelterID` int(11) NOT NULL AUTO_INCREMENT,
`registrationDate` date NOT NULL,
`name` varchar(255) NOT NULL,
`streetAddress` varchar(255) NOT NULL,
`city` varchar(255) NOT NULL,
`state` varchar(255) NOT NULL,
`phoneNumber` varchar(255) NOT NULL,
`fax` varchar(255),
`email` varchar(255),
`sponsorable` boolean NOT NULL,
PRIMARY KEY (`shelterID`),
UNIQUE KEY (`shelterID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table 'pets'
--

CREATE TABLE `pets` (
`petID` int(11) NOT NULL AUTO_INCREMENT,
`registrationDate` date NOT NULL,
`name` varchar(255) NOT NULL,
`birthday` date NOT NULL,
`animal` varchar(255) NOT NULL,
`breed` varchar(255),
`personality` varchar(255) NOT NULL,
`adoptable` boolean NOT NULL,
`goal` varchar(255) NOT NULL,
`shelterID` int(11),
PRIMARY KEY (`petID`),
FOREIGN KEY (`shelterID`) REFERENCES `shelters`(`shelterID`),
UNIQUE KEY (`petID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Inserting data for table `shelters`
--

INSERT INTO `shelters` (`shelterID`, `registrationDate`, `name`, `streetAddress`, `city`, `state`, `phoneNumber`, `fax`, `email`, `sponsorable`) VALUES
(1, DATE '2021-05-08', 'Sunny Saints, Saint Bernard Dog Rescue', 'PO Box 870', 'Bellflower', 'CA', '8582224101', '8582224141', 'pam@sunnysaints.org', TRUE),
(2, DATE '2021-05-08', 'Kitty Bungalow Charm School for Wayward Cats', '2032 W. Martin Luther King Jr. Blvd', 'Los Angeles', 'CA', '3237301102', NULL, 'adoptions@kittybungalow.org', TRUE),
(3, DATE '2021-05-09', 'Homeward Bound Pets', '10601 Loop Road', 'McMinnville', 'OR', '5034720341', '4034720343', 'shelter@hbpets.org', FALSE),
(4, DATE '2021-05-09', 'Exotic Bird Rescue of Oregon', 'PO Box 184', 'Springfield', 'OR', '5414614333', '5414614335', 'ebr@rescuebird.com', TRUE),
(5, DATE '2021-05-09', 'Oreo''s Animal Rescue', '93 21st St. East', 'Dickinson', 'ND', '7014830240', NULL, 'oreosanimalrescue@yahoo.com', TRUE),
(6, DATE '2021-05-10', 'Any Rat Rescue', 'PO Box 833', 'Scottsdale', 'AZ', '480663338', NULL, 'info@anyratrescue.org', TRUE),
(7, DATE '2021-05-10', 'Camp Chaos Puppy Rescue', 'PO Box 23', 'House Springs', 'MO', '3147757223', '3147757222', 'info@campchaospuppyrescue.org', FALSE),
(8, DATE '2021-05-10', 'Adore-a-Bullie Paws and Claws', 'PO Box 191', 'Bronx', 'NY', '7188016505', '7188016500', 'adoreabullie@gmail.com', TRUE),
(9, DATE '2021-05-11', 'Lucky Black Cats of Mew York', 'PO Box 321', 'Flushing', 'NY', '7188220043', NULL, 'luckyblackcatsofmewyork@gmail.com', TRUE),
(10, DATE '2021-05-11', 'Secondhand Hounds', '5959 Baker Rd, Ste 390', 'Minnetonka', 'MN', '6126162522', NULL, 'inquiry@secondhandnounds.org', TRUE),
(11, DATE '2021-05-11', 'Pibbles n Kibbles Animal Rescue', 'PO Box 112', 'Reseda', 'CA', '8184375475', NULL, 'Pibblesnkibblesanimalrescue@yahoo.com', TRUE);

--
-- Inserting data for table `pets`
--

INSERT INTO `pets` (`petID`, `registrationDate`, `name`, `birthday`, `animal`, `breed`, `personality`, `adoptable`, `goal`, `shelterID`) VALUES
(1, DATE '2021-05-08', 'Ratchet', DATE '2017-05-08', 'cat', 'DSH', 'Princess', TRUE, 'Food', 2),
(2, DATE '2021-05-08', 'Clank', DATE '2018-04-03', 'cat', 'Russian Blue', 'Needy', TRUE, 'Medicine', 2),
(3, DATE '2021-05-08', 'Banjo', DATE '2020-05-24', 'dog', 'Saint Bernard', 'Sweet', FALSE, 'Toys', 1),
(4, DATE '2021-05-09', 'Kazzooie', DATE '2015-01-15', 'cat', 'Long Hair', 'Quiet', TRUE, 'Bedding', 3),
(5, DATE '2021-05-09', 'Summer', DATE '2018-07-13', 'parakeet', NULL, 'Funny', FALSE, 'Bigger housing', 4),
(6, DATE '2021-05-10', 'Grey Wind', DATE '2020-01-01', 'rat', NULL, 'Inquisitvie', TRUE, 'Food', 6),
(7, DATE '2021-05-10', 'Shaggy Dog', DATE '2021-02-01', 'dog', 'Lab/German Shephard', 'Active', FALSE, 'Surgery', 7),
(8, DATE '2021-05-11', 'Nymeria', DATE '2019-11-01', 'dog', 'Basset Hound', 'Floppy', TRUE, 'Medicine', 10),
(9, DATE '2021-05-11', 'Lady', DATE '2016-09-01', 'cat', NULL, 'Active', TRUE, 'Toys', 9),
(10, DATE '2021-05-11', 'Teddy', DATE '2017-06-01', 'dog', 'Yorkshire Terrier', 'Quiet', TRUE, 'Medicine', NULL),
(11, DATE '2021-05-11', 'Beau', DATE '2016-12-15', 'dog', 'Golden Retriever', 'Fun', FALSE, 'Toys', 10),
(12, DATE '2021-05-11', 'Luke', DATE '2015-10-01', 'dog', 'Black Lab', 'Sweet', TRUE, 'Medicine', 10),
(13, DATE '2021-05-11', 'Reggie', DATE '2017-05-08', 'cat', 'Maine Coon', 'Friendly Giant', TRUE, 'Food', 11);
