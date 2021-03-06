-- Shelters
-- get all Shelter info to populate the Shelters table
SELECT * FROM Shelters;

-- add a new shelter with colon : character being used to 
-- denote the variables that will have data from the backend programming language
INSERT INTO Shelters (name, streetAddress, city, state, phoneNumber, fax, email, sponsorable) VALUES (:nameInput, :streetAddressInput, :cityInput, :stateInput, :phoneNumberInput, :faxInput, :emailInput, :sponsorableInput);

-- update a shelter's data based on submission of the Edit Shelter form 
UPDATE Shelters SET name = :nameInput, streetAddress = :streetAddressInput, city = :cityInput, state = :stateInput, phoneNumber = :phoneNumberInput, fax = :faxInput, email = :emailInput, spomsorable = :sponsorableInput WHERE shelterID = :shelterID_from_the_edit_form;

-- delete a shelter
DELETE FROM Shelters WHERE shelterID = :shelterID_from_delete_button;

-- Pets
-- get all Shelter names and IDs to populate the shelter dropdown
SELECT name, shelterID FROM Shelters;

-- get all Pet info to populate the Pets table
SELECT Pets.*, Shelters.name FROM Pets
LEFT JOIN Shelters ON Pets.shelterID = Shelters.shelterID;

-- add a new pet with colon : character being used to 
-- denote the variables that will have data from the backend programming language
INSERT INTO Pets (name, birthday, animal, breed, personality, adoptable, goal, shelterID) VALUES (:nameInput, :birthdayInput, :animalInput, :breedInput, :personalityInput, :adoptableInput, :goalInput, :shelterIDFromDropDownInput);

-- update a pet's data based on submission of the Edit Pet form 
UPDATE Pets SET name = :nameInput, birthday = :birthdayInput, animal = :animalInput, breed = :breedInput, personality = :personalityInput, adoptable = :adoptableInput, goal = :goalInput, shelterID = :shelterIDInput WHERE petID = :petID_from_the_edit_form;

-- delete a pet
DELETE FROM Pets WHERE petID = :petID_from_delete_button;

--Sponsorships
--get all pet data to populate pet dropdown
SELECT petID, name 
FROM Pets

-- get all columns from sponsors to populate the display for sponsors
SELECT * from Sponsors

-- get all columns from pet sponsorships to populate the display for pet sponsorships
SELECT Sponsors.sponsorID, firstName, lastName, Pets.petID, name, amount, beginDate, endDate from PetSponsorships
LEFT JOIN Sponsors ON
Sponsors.sponsorID = PetSponsorships.sponsorID
LEFT JOIN Pets ON
Pets.petID = PetSponsorships.petID

-- get all columns from pet sponsorships filtered to the ID entered by User to populate the display for pet sponsorships
SELECT Sponsors.sponsorID, firstName, lastName, Pets.petID, name, amount, beginDate, endDate from PetSponsorships
LEFT JOIN Sponsors ON
Sponsors.sponsorID = PetSponsorships.sponsorID
LEFT JOIN Pets ON
Pets.petID = PetSponsorships.petID
WHERE Sponsors.sponsorID = :sponsorIDFilterInput

-- add a new pet sponsorship with colon : character being used to 
-- denote the variables that will have data from the backend programming language
INSERT INTO PetSponsorships (sponsorID, petID, amount, beginDate, endDate) VALUES (:sponsorIDFromDropdownInput, :petIDFromDropdownInput, :amountInput, :beginDateInput, :endDateInput)

-- update a pet sponsorship amount, beginDate, and endDate with colon : character being used to 
-- denote the variables that will have data from the backend programming language
UPDATE PetSponsorships SET amount = :amountInput, beginDate = :beginDateInput, endDate = :endDateInput where sponsorID = :sponsorIDFromUpdate and petID = :petIDFromUpdate

-- delete a pet sponsorship with colon : character being used to 
-- denote the variables that will have data from the backend programming language
DELETE FROM PetSponsorships WHERE sponsorID = :sponsorIDFromDelete and petID = :petIDFromDelete

-- get all columns from shelter sponsorships to populate the display for shelter sponsorships
SELECT Sponsors.sponsorID, firstName, lastName, Shelters.shelterID, name, amount, beginDate, endDate from ShelterSponsorships
LEFT JOIN Sponsors ON
Sponsors.sponsorID = ShelterSponsorships.sponsorID
LEFT JOIN Shelters ON
Shelters.shelterID = ShelterSponsorships.shelterID

-- get all columns from shelter sponsorships filtered to the ID entered by User to populate the display for shelter sponsorships
SELECT Sponsors.sponsorID, firstName, lastName, Shelters.shelterID, name, amount, beginDate, endDate from ShelterSponsorships
LEFT JOIN Sponsors ON
Sponsors.sponsorID = ShelterSponsorships.sponsorID
LEFT JOIN Shelters ON
Shelters.shelterID = ShelterSponsorships.shelterID
WHERE Sponsors.sponsorID = :sponsorIDFilterInput

-- add a new shelter sponsorship with colon : character being used to 
-- denote the variables that will have data from the backend programming language
INSERT INTO ShelterSponsorships (sponsorID, shelterID, amount, beginDate, endDate) VALUES (:sponsorIDFromDropdownInput, :shelterIDFromDropdownInput, :amountInput, :beginDateInput, :endDateInput)

-- update a shelter sponsorship amount, beginDate, and endDate with colon : character being used to 
-- denote the variables that will have data from the backend programming language
UPDATE ShelterSponsorships SET amount = :amountInput, beginDate = :beginDateInput, endDate = :endDateInput where sponsorID = :sponsorIDFromUpdate and shelterID = :shelterIDFromUpdate

-- delete a shelter sponsorship with colon : character being used to 
-- denote the variables that will have data from the backend programming language
DELETE FROM ShelterSponsorships WHERE sponsorID = :sponsorIDFromDelete and shelterID = :shelterIDFromDelete

-- get sponsor data for sponsorship dropdown
SELECT firstName, lastName, sponsorID from Sponsors

-- add a new sponsor sponsorship with colon : character being used to 
-- denote the variables that will have data from the backend programming language
INSERT INTO Sponsors (firstName, lastName, anonymous) VALUES (:firstNameInput, :lastNameInput, :anonymousRadioButton)

-- update a sponsors first name, last name, and anonymity with colon : character being used to 
-- denote the variables that will have data from the backend programming language
UPDATE Sponsors SET firstName = :firstNameInput, lastName = :lastNameInput, anonymous = :anonymousRadioButton where sponsorID = :sponsorIDFromUpdate

-- delete a sponsor with colon : character being used to 
-- denote the variables that will have data from the backend programming language
DELETE FROM Sponsors WHERE sponsorID = :sponsorIDFromDelete
