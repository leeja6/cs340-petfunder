-- Shelters
-- get all Shelter info to populate the Shelters table
SELECT shelterID, registrationDate, name, streetAddress, city, state, phoneNumber, fax, email, sponsorable FROM shelters

-- Pets
-- get all Shelter names and IDs to populate the shelter dropdown
SELECT name, shelterID FROM shelters

-- get all Pet info to populate the Pets table
SELECT pets.petID, pets.registrationDate, pets.name, pets.birthday, pets.animal, pets.breed, pets.personality, pets.adoptable, pets.goal, pets.shelterID, shelters.name FROM pets
LEFT JOIN shelters ON pets.shelterID = shelters.shelterID