var sampleShelters = [
    {
      "shelterID": 1,
      "registrationDate": "04/28/2021",
      "name": "Orange County Animal Shelter",
      "streetAddress": "1630 Victory Road",
      "city": "Tustin",
      "state": "CA",
      "phoneNumber": "714-935-6848",
      "fax": "714-259-1094",
      "email": "Foster@occr.ocgov.com",
      "sponsorable": true,
    },
    {
      "petID": 2,
      "registrationDate": "04/28/2021",
      "name": "Oregon Humane Society",
      "streetAddress": "1067 NE Columbia Blvd.",
      "city": "Portland",
      "state": "OR",
      "phoneNumber": "503-285-7722",
      "fax": null,
      "email": "Foster@ohs.orgov.com",
      "sponsorable": false,
    }
  ]

  function sheltersRecieved() {
    console.log(this.responseText);
    sampleShelters = JSON.parse(this.responseText);
    for(var i = 0; i < sampleShelters.length; i++ ) {
      var shelterData = sampleShelters[i];
      if (shelterData.sponsorable == 1) {
        shelterData.sponsorable = true;
      }
      else {
        shelterData.sponsorable = false;
      }
    }
    populateShelterTable(sampleShelters);
  }

  function getSheltersAndPopulateTable() {
    var req = new XMLHttpRequest();
    req.onload = sheltersRecieved;
    req.open("get", "http://localhost:7371/shelters", true);
    req.send();
  }

  getSheltersAndPopulateTable();
  function clearTable() {
    var tableBodyTag = document.getElementById("sheltersTableBody");
    tableBodyTag.innerHTML = "";
  }

  function onShelterCreated() {
    getSheltersAndPopulateTable();
  }

  function createShelter() {
    // Date code from: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    registrationDate = mm + '/' + dd + '/' + yyyy;
    var name = document.getElementById("name").value;
    var streetAddress = document.getElementById("streetAddress").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var fax = document.getElementById("fax").value;
    var email = document.getElementById("email").value;
    var radioOptions = document.getElementsByName('sponsorable');
    isSponsorable = false;
    for (var i = 0; i <  radioOptions.length; i++) {
      if (radioOptions[i].checked) {
        if (radioOptions[i].value == 'yes') {
          isSponsorable = true;
        }
        else {
          isSponsorable = false;
        }
        break;
      }
    }

    var req = new XMLHttpRequest();
    req.onload = onShelterCreated;
    req.open("post", "http://localhost:7371/shelters", true);
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify({
      registrationDate: registrationDate,
      name: name,
      streetAddress: streetAddress,
      city: city,
      state: state,
      phoneNumber: phoneNumber,
      fax: fax,
      email: email,
      sponsorable: isSponsorable ? 1 : 0
    }));
  }

  function populateShelterTable(shelters) {
    clearTable();
    var tableBodyTag = document.getElementById("sheltersTableBody");
    for (var i = 0; i < shelters.length; i++) {
      addRowToShelterTable(shelters[i], tableBodyTag);
    }
  }

  function addRowToShelterTable(row, bodyElement) {
    var tr = document.createElement('tr');
    for (var dataColumn in row) {
      var td = document.createElement('td');
        if (dataColumn=="registrationDate") {
          td.innerHTML = row[dataColumn].split("T")[0]
        }
        else {
          td.innerHTML = row[dataColumn];
        }
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
      deleteShelter(row["shelterID"]);
    })
    var deleteRow = document.createElement('td');
    deleteRow.appendChild(deleteButton);
    tr.appendChild(deleteRow);
    bodyElement.appendChild(tr);
  }

  function deleteShelter(shelterID) {
    for (var i = 0; i < sampleShelters.length; i++) {
      var shelterIDMatch = sampleShelters[i]["shelterID"]==shelterID;
      if (shelterIDMatch) {
        sampleShelters.splice(i,1);
        populateShelterTable(sampleShelters);
        break;
        }
    }
  }
