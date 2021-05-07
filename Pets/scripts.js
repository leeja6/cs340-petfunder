var samplePets = [
    {
      "petID": 1,
      "registrationDate": "04/28/2021",
      "name": "Ratchet",
      "birthday":"05/08/2017",
      "animal": "cat",
      "breed": "DSH",
      "personality": "princess",
      "adoptable": true,
      "goal": "pet toys",
      "shelterID": "Orange County Animal Shelter [1]"
    },
    {
      "petID": 2,
      "registrationDate": "04/28/2021",
      "name": "Clank",
      "birthday":"04/03/2018",
      "animal": "cat",
      "breed": "DSH",
      "personality": "derpy",
      "adoptable": false,
      "goal": "medicine",
      "shelterID": "Oregon Humane Society [2]"
    },
    {
      "petID": 3,
      "registrationDate": "04/28/2021",
      "name": "Banjo",
      "birthday":"05/24/2020",
      "animal": "cat",
      "breed": "DSH",
      "personality": "sweetheart",
      "adoptable": true,
      "goal": "food",
      "shelterID": "Orange County Animal Shelter [1]"
    }
  ]

  var sampleShelters = [
    "Orange County Animal Shelter [1]",
    "Oregon Humane Society [2]",
    "Seattle Humane Society [3]",
  ]

  populatePetTable(samplePets);
  function clearTable() {
    var tableBodyTag = document.getElementById("petsTableBody");
    tableBodyTag.innerHTML = "";
  }
  createShelterSelect();

  function createShelterSelect() {
    var shelterSelect = document.getElementById("shelterID");
    for(element in sampleShelters)
    {
      console.log(element);
      var opt = document.createElement("option");
      opt.innerHTML = sampleShelters[element];
      opt.value =sampleShelters[element];
      shelterSelect.appendChild(opt);
    }
  }
  
  function createPet() {
    // Date code from: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    registrationDate = mm + '/' + dd + '/' + yyyy;
    var name = document.getElementById("name").value;
    var birthday = document.getElementById("birthday").value;
    var displayBirthday = birthday.substring(5, 7) + '/' + birthday.substring(8, 10) + '/' + birthday.substring(0, 4);
    var animal = document.getElementById("animal").value;
    var breed = document.getElementById("breed").value;
    var personality = document.getElementById("personality").value;
    var radioOptions = document.getElementsByName('adoptable');
    var goal = document.getElementById("goal").value;
    var shelterID = document.getElementById("shelterID").value;
    
    for (var i = 0; i <  radioOptions.length; i++) {
      if (radioOptions[i].checked) {
        if (radioOptions[i].value == 'yes') {
          isAdoptable = true;
        }
        else {
          isAdoptable = false;
        }
        break;
      }
    }
    var newPet = {
      "petID": samplePets.length + 1,
      "registrationDate": registrationDate,
      "name": name,
      "birthday": displayBirthday,
      "animal": animal,
      "breed": breed,
      "personality": personality,
      "adoptable": isAdoptable,
      "goal": goal,
      "shelterID": shelterID
    };
    samplePets.push(newPet);
    var tableBodyTag = document.getElementById("petsTableBody");
    addRowToPetTable(newPet, tableBodyTag);
  }
  
  function populatePetTable(pets) {
    clearTable();
    var tableBodyTag = document.getElementById("petsTableBody");
    for (var i = 0; i < pets.length; i++) {
      addRowToPetTable(pets[i], tableBodyTag);
    }
  }
  
  function addRowToPetTable(row, bodyElement) {
    var tr = document.createElement('tr');
    for (var dataColumn in row) {
      var td = document.createElement('td');
        td.innerHTML = row[dataColumn];
      tr.appendChild(td);
    }
    var editButton = document.createElement('button');
    editButton.innerHTML = "Edit";
    var editRow = document.createElement('td');
    editRow.appendChild(editButton);
    tr.appendChild(editRow);
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener('click',function(event) {
      deletePet(row["petID"]);
    })
    var deleteRow = document.createElement('td');
    deleteRow.appendChild(deleteButton);
    tr.appendChild(deleteRow);
    bodyElement.appendChild(tr);
  }
  
  function deletePet(petID) {
    for (var i = 0; i < samplePets.length; i++) {
      var petIDMatch = samplePets[i]["petID"]==petID;
      if (petIDMatch) {
        samplePets.splice(i,1);
        populatePetTable(samplePets);
        break;
        }
    }
  }
