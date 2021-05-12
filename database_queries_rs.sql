-- Shelters
-- get all Shelter info to populate the Shelters table
SELECT * FROM shelters;

-- update a shelter's data based on submission of the Edit Shelter form 
UPDATE shelters SET name = :nameInput, streetAddress = :streetAddressInput, city = :cityInput, state = :stateInput, phoneNumber = :phoneNumberInput, fax = :faxInput, email = :emailInput, spomsorable = :sponsorableInput WHERE shelterID = :shelterID_from_the_edit_form;

-- delete a shelter
DELETE FROM shelters WHERE shelterID = :shelterID_from_delete_button

-- Pets
-- get all Shelter names and IDs to populate the shelter dropdown
SELECT name, shelterID FROM shelters;

-- get all Pet info to populate the Pets table
SELECT pets.*, shelters.name FROM pets
LEFT JOIN shelters ON pets.shelterID = shelters.shelterID;

-- update a pet's data based on submission of the Edit Pet form 
UPDATE pets SET name = :nameInput, birthday = :birthdayInput, animal = :animalInput, breed = :breedInput, personality = :personalityInput, adoptable = :adoptableInput, goald = :goalInput, shelterID = :shelterIDInput WHERE petID = :petID_from_the_edit_form;

-- delete a pet
DELETE FROM pets WHERE petID = :petID_from_delete_button
