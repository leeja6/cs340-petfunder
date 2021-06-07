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

var apiBaseUrl = 'http://flip1.engr.oregonstate.edu:7371';

  function sheltersReceived() {
    //console.log(this.responseText);
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
    req.onload = sheltersReceived;
    req.open("get", apiBaseUrl + '/shelters', true);
    req.send();
  }

  getSheltersAndPopulateTable();
  function clearTable() {
    var tableBodyTag = document.getElementById("sheltersTableBody");
    tableBodyTag.innerHTML = "";
  }

  function createShelter() {
    // Date code from: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    var registrationDate = new Date().toISOString();
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
    var insert = 'insert';
      
    if (name==''||streetAddress==''||city==''||state==''||phoneNumber=='') {
      alert('Name, Street Address, City, State, and Phone Number are required fields.');
      return;
    }


    var req = new XMLHttpRequest();
    req.onload = getSheltersAndPopulateTable;
    req.open("post", apiBaseUrl + '/shelters', true);
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify({
      action: insert,
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
    var shelterID = row["shelterID"];
    tr.id = shelterID;
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
    var editRow = document.createElement('td');
    var editButton = document.createElement('button');
    editRow.appendChild(editButton);
    tr.appendChild(editRow);
    editButton.innerHTML = "Edit";
    editButton.addEventListener('click',function(event) {
      editShelter(shelterID);
      editRow.innerHTML = ""
      var submitButton = document.createElement('button');
      submitButton.innerHTML = "Submit";
      editRow.appendChild(submitButton);
      submitButton.addEventListener('click', function(event) {
        updateShelter(shelterID);
      })
    })

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


function editShelter(shelterID) {
  var row = document.getElementById(shelterID);
  var rowNodes = row.childNodes;
  var columns = ["name", "streetAddress", "city", "state", "phoneNumber", "fax", "email", "sponsorable"]
  for (var i = 2; i < rowNodes.length - 2; i++) {
    var td = rowNodes[i];
    var tdText = td.textContent;
    td.textContent = "";
    var input = document.createElement("input");
    input.id = columns[i-2]+shelterID;
    input.setAttribute("id",columns[i-2]+shelterID);
    input.defaultValue = tdText;
    if (columns[i-2]=="sponsorable") {
      input.type = "checkbox";
      if (tdText == "true") {
        input.checked = true;
      }
    }
    input.size = 15;
    td.appendChild(input);
    input.classList.add("table");
  }
}

function updateShelter(shelterID) {
  var row = document.getElementById(shelterID);
  var rowNodes = row.childNodes;
  var name = document.getElementById("name"+shelterID).value;
  var streetAddress = document.getElementById("streetAddress"+shelterID).value;
  var city = document.getElementById("city"+shelterID).value;
  var state = document.getElementById("state"+shelterID).value;
  var phoneNumber = document.getElementById("phoneNumber"+shelterID).value;
  var fax = document.getElementById("fax"+shelterID).value;
  var email = document.getElementById("email"+shelterID).value;
  var isSponsorable = document.getElementById("sponsorable"+shelterID).checked;

  var action = 'update';
    
  if (name==''||streetAddress==''||city==''||state==''||phoneNumber=='') {
    alert('Name, Street Address, City, State, and Phone Number are required fields.');
    return;
  }

  var req = new XMLHttpRequest();
  req.onload = getSheltersAndPopulateTable;
  req.open("post", apiBaseUrl + '/shelters', true);
  req.setRequestHeader('Content-type', 'application/json');
  req.send(JSON.stringify({
    shelterID: shelterID,
    action: action,
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

  function deleteShelter(shelterID) {
    var del = 'delete';
    var req = new XMLHttpRequest();
    req.onload = getSheltersAndPopulateTable;
    req.open("post", apiBaseUrl + '/shelters', true);
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify({
      action: del,
      shelterID: shelterID
    }));
  }
