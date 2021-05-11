-- Shelters
-- get all Shelter info to populate the Shelters table
SELECT * FROM shelters;

-- Pets
-- get all Shelter names and IDs to populate the shelter dropdown
SELECT name, shelterID FROM shelters;

-- get all Pet info to populate the Pets table
SELECT pets.*, shelters.name FROM pets
LEFT JOIN shelters ON pets.shelterID = shelters.shelterID;
