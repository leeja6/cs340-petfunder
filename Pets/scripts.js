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

  var apiBaseUrl = 'http://flip1.engr.oregonstate.edu:7371';
    getPets();
    sampleShelters = getShelterData();

    function getValueWithinBrackets(string) {
      var idMatch = string.match(/\[(.*?)\]/);
      return idMatch[1];
    }

    function petsReceived() {
      var response = JSON.parse(this.responseText);
      var petsList = [];
      for(var i = 0; i < response.length; i++ ) {
        var petData = response[i];
        if (petData.adoptable == 1) {
          petData.adoptable = true;
        } else {
          petData.adoptable = false;
        }
        if (petData.shelterID == null) {
          shelterID = "";
        } else {
          shelterID = petData.shelterName + ' [' + petData.shelterID + ']'
        }
        var newPet = {
          petID: petData.petID,
          registrationDate: petData.registrationDate.split("T")[0],
          name: petData.name,
          birthday: petData.birthday.split("T")[0],
          animal: petData.animal,
          breed: petData.breed,
          personality: petData.personality,
          adoptable: petData.adoptable,
          goal: petData.goal,
          shelterID: shelterID
        }
        petsList.push(newPet);
      }
      samplePets = petsList;
      populatePetsTable(samplePets);
    }

    function getPets() {
      var req = new XMLHttpRequest();
      req.onload = petsReceived;
      req.open("get", apiBaseUrl + '/pets', true);
      req.send();
    }

    function sheltersReceived() {
      var response = JSON.parse(this.responseText);
      var sheltersList = [];
      sheltersList.push("");
      for(var i = 0; i < response.length; i++ ) {
        var shelterData = response[i];
        sheltersList.push(shelterData.name + ' [' + shelterData.shelterID + ']');
      }
      sampleShelters = sheltersList;
      createShelterSelect();
    }

    function getShelterData() {
      var req = new XMLHttpRequest();
      req.onload = sheltersReceived;
      req.open("get", apiBaseUrl + "/shelters?short=true", true);
      req.send();
      return sampleShelters;
    }

    function createShelterSelect() {
      var shelterSelect = document.getElementById("shelterID");
      shelterSelect.innerHTML = "";
      //console.log(sampleShelters);
      for(element in sampleShelters)
      {
        var opt = document.createElement("option");
        opt.innerHTML = sampleShelters[element];
        opt.value =sampleShelters[element];
        shelterSelect.appendChild(opt);
      }
    }

    function createPet() {
      // Date code from: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
      var registrationDate = new Date().toISOString();
      var name = document.getElementById("name").value;
      var birthday = document.getElementById("birthday").value;
      var animal = document.getElementById("animal").value;
      var breed = document.getElementById("breed").value;
      var personality = document.getElementById("personality").value;
      var radioOptions = document.getElementsByName('adoptable');
      isAdoptable = true;
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
      var goal = document.getElementById("goal").value;
      if (document.getElementById("shelterID").value == "") {
        var shelterID = null;
      } else {
        var shelterID = getValueWithinBrackets(document.getElementById("shelterID").value);
      }
      var insert = 'insert';

      
      var req = new XMLHttpRequest();
      req.onload = getPets;
      req.open("post", apiBaseUrl + '/pets', true);
      req.setRequestHeader('Content-type', 'application/json');
      req.send(JSON.stringify({
        action: insert,
        registrationDate: registrationDate,
        name: name,
        birthday: birthday,
        animal: animal,
        breed: breed,
        personality: personality,
        adoptable: isAdoptable ? 1 : 0,
        goal: goal,
        shelterID: shelterID
      }));
    }

    function clearTable() {
      var tableBodyTag = document.getElementById("petsTableBody");
      tableBodyTag.innerHTML = "";
    }

    function populatePetsTable(pets) {
      clearTable();
      var tableBodyTag = document.getElementById("petsTableBody");
      for (var i = 0; i < pets.length; i++) {
        addRowToPetTable(pets[i], tableBodyTag);
      }
    }

    function addRowToPetTable(row, bodyElement) {
      var tr = document.createElement('tr');
      var petID = row["petID"];
      tr.id = petID;
      for (var dataColumn in row) {
        var td = document.createElement('td');
        if (dataColumn=="registrationDate" || dataColumn=="birthday") {
          td.innerHTML = row[dataColumn].split("T")[0]
        }
        else {
          td.innerHTML = row[dataColumn];
        }
        tr.appendChild(td);
      }
      var editRow = document.createElement('td');
      var editButton = document.createElement('button');
      editRow.appendChild(editButton);
      tr.appendChild(editRow);
      editButton.innerHTML = "Edit";
      editButton.addEventListener('click',function(event) {
        editPet(petID);
        editRow.innerHTML = ""
        var submitButton = document.createElement('button');
        submitButton.innerHTML = "Submit";
        editRow.appendChild(submitButton);
        submitButton.addEventListener('click', function(event) {
          updatePet(petID);
        })
      })
      
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

    function editPet(petID) {
      var row = document.getElementById(petID);
      var rowNodes = row.childNodes;
      var columns = ["name", "birthday", "animal", "breed", "personality", "adoptable", "goal", "shelterID"]
      for (var i = 2; i < rowNodes.length - 2; i++) {
        var td = rowNodes[i];
        var tdText = td.textContent;
        td.textContent = "";
        var input = document.createElement("input");
        input.id = columns[i-2]+petID;
        input.setAttribute("id",columns[i-2]+petID);
        input.defaultValue = tdText;
        if (columns[i-2]=="adoptable") {
          input.type = "checkbox";
          if (tdText == "true") {
            input.checked = true;
          }
        } else if (columns[i-2]=="shelterID") {
          input.innerHTML = "";
          //console.log(sampleShelters);
          for(element in sampleShelters)
          {
            var opt = document.createElement("option");
            opt.innerHTML = sampleShelters[element];
            opt.value =sampleShelters[element];
            input.appendChild(opt);
          }
        }
        input.size = 15;
        td.appendChild(input);
        input.classList.add("table");
      }
    }
    
    function updatePet(petID) {
      var row = document.getElementById(petID);
      var rowNodes = row.childNodes;
      var name = document.getElementById("name"+petID).value;
      var birthday = document.getElementById("birthday"+petID).value;
      var animal = document.getElementById("animal"+petID).value;
      var breed = document.getElementById("breed"+petID).value;
      var personality = document.getElementById("personality"+petID).value;
      var isAdoptable = document.getElementById("adoptable"+petID).checked;
      var goal = document.getElementById("goal"+petID).value;
      var shelterText = document.getElementById("shelterID"+petID).value;
      if (shelterText == "") {
        var shelterID = null;
      } else {
        var shelterID = getValueWithinBrackets(shelterText);
      }
      
      var action = 'update';
    
      var req = new XMLHttpRequest();
      req.onload = getPets;
      req.open("post", apiBaseUrl + '/pets', true);
      req.setRequestHeader('Content-type', 'application/json');
      req.send(JSON.stringify({
        petID: petID,
        action: action,
        name: name,
        birthday: birthday,
        animal: animal,
        breed: breed,
        personality: personality,
        adoptable: isAdoptable ? 1 : 0,
        goald: goal,
        shelterID: shelterID
      }));
    }

    function deletePet(petID) {
      var del = 'delete';
      var req = new XMLHttpRequest();
      req.onload = getPets;
      req.open("post", apiBaseUrl + '/pets', true);
      req.setRequestHeader('Content-type', 'application/json');
      req.send(JSON.stringify({
        action: del,
        petID: petID
      }));
    }
