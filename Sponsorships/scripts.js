var sampleSponsors = [
  "Jane Lee [1]",
  "Kevin Lee [2]",
  "Rebecca Starr [3]"
]

var samplePets = [
  "Ratchet [1]",
  "Clank [2]",
  "Banjo [3]"
]

var sampleShelters = [
  "Orange County Animal Shelter [1]",
  "Oregon Humane Society [2]",
  "Seattle Humane Society [3]",
]

var sampleShelterSponsorships = [
  {
    "sponsorID": "Jane Lee [1]",
    "shelterID": "Orange County Animal Shelter [1]",
    "amount":"1000",
    "beginDate": "01-01-2020",
    "endDate": "01-01-2021"
  },
  {
    "sponsorID": "Kevin Lee [2]",
    "shelterID": "Oregon Humane Society [2]",
    "amount":"2000",
    "beginDate": "02-01-2020",
    "endDate": "02-01-2021"
  },
]

var samplePetSponsorships = [
  {
    "sponsorID": "Jane Lee [1]",
    "petID": "Ratchet [1]",
    "amount":"100",
    "beginDate": "01-01-2020",
    "endDate": "01-01-2021"
  },
  {
    "sponsorID": "Kevin Lee [2]",
    "petID": "Clank [2]",
    "amount":"200",
    "beginDate": "02-01-2020",
    "endDate": "02-01-2021"
  },
]

var displayTypeToHeaderMapping = {
  "pets": "petID",
  "shelters":"shelterID"
};

var apiBaseUrl = 'http://localhost:7371';
getPetSponsorships();
getShelterSponsorships();
getSponsorData();
getPetData();
getShelterData();

function getValueWithinBrackes(string) {
  var idMatch = string.match(/\[(.*?)\]/);
  return idMatch[1];
}

function petSponsorshipsReceived() {
  var response = JSON.parse(this.responseText);
  var petSponsorshipsList = [];
  for(var i = 0; i < response.length; i++ ) {
    var petSponsorshipData = response[i];
    var newSponsorship = {
      sponsorID: petSponsorshipData.firstName + ' ' + petSponsorshipData.lastName + ' [' + petSponsorshipData.sponsorID + ']',
      petID: petSponsorshipData.name + ' [' + petSponsorshipData.petID + ']',
      amount: petSponsorshipData.amount,
      beginDate: petSponsorshipData.beginDate.split("T")[0],
      endDate: (petSponsorshipData.endDate ? petSponsorshipData.endDate.split("T")[0] : null )
    }
    petSponsorshipsList.push(newSponsorship);
  }
  samplePetSponsorships = petSponsorshipsList;
  populateSponsorshipsTable(sampleShelterSponsorships,samplePetSponsorships);
}

function getPetSponsorships() {
  var req = new XMLHttpRequest();
  req.onload = petSponsorshipsReceived;
  req.open("get", apiBaseUrl + "/petSponsorships", true);
  req.send();
}

function shelterSponsorshipsReceived() {
  var response = JSON.parse(this.responseText);
  var shelterSponsorshipsList = [];
  for(var i = 0; i < response.length; i++ ) {
    var shelterSponsorshipData = response[i];
    var newSponsorship = {
      sponsorID: shelterSponsorshipData.firstName + ' ' + shelterSponsorshipData.lastName + ' [' + shelterSponsorshipData.sponsorID + ']',
      shelterID: shelterSponsorshipData.name + ' [' + shelterSponsorshipData.shelterID   + ']',
      amount: shelterSponsorshipData.amount,
      beginDate: shelterSponsorshipData.beginDate.split("T")[0],
      endDate: shelterSponsorshipData.endDate ? shelterSponsorshipData.endDate.split("T")[0] : null
    }
    shelterSponsorshipsList.push(newSponsorship);
  }
  sampleShelterSponsorships = shelterSponsorshipsList;
  populateSponsorshipsTable(sampleShelterSponsorships,samplePetSponsorships);
}

function getShelterSponsorships() {
  var req = new XMLHttpRequest();
  req.onload = shelterSponsorshipsReceived;
  req.open("get", apiBaseUrl + "/shelterSponsorships", true);
  req.send();
}

function sponsorsRecieved() {
  console.log(this.responseText);
  var response = JSON.parse(this.responseText);
  var sponsorsList = [];
  for(var i = 0; i < response.length; i++ ) {
    var sponsorData = response[i];
    sponsorsList.push(sponsorData.firstName + ' ' + sponsorData.lastName + ' [' + sponsorData.sponsorID + ']');
  }
  sampleSponsors = sponsorsList;
  createSponsorSelect();
}

function getSponsorData() {
  var req = new XMLHttpRequest();
  req.onload = sponsorsRecieved;
  req.open("get", apiBaseUrl + "/sponsors?short=true", true);
  req.send();
}

function petsReceived() {
  console.log(this.responseText);
  var response = JSON.parse(this.responseText);
  var petsList = [];
  for(var i = 0; i < response.length; i++ ) {
    var petData = response[i];
    petsList.push(petData.name + ' [' + petData.petID + ']');
  }
  samplePets = petsList;
  createPetSelect();
}

function getPetData() {
  var req = new XMLHttpRequest();
  req.onload = petsReceived;
  req.open("get", apiBaseUrl + "/pets?short=true", true);
  req.send();
}

function sheltersRecieved() {
  console.log(this.responseText);
  var response = JSON.parse(this.responseText);
  var sheltersList = [];
  for(var i = 0; i < response.length; i++ ) {
    var shelterData = response[i];
    sheltersList.push(shelterData.name + ' [' + shelterData.shelterID + ']');
  }
  sampleShelters = sheltersList;
}

function getShelterData() {
  var req = new XMLHttpRequest();
  req.onload = sheltersRecieved;
  req.open("get", apiBaseUrl + "/shelters?short=true", true);
  req.send();
}

function createSponsorSelect() {
  var sponsorSelect = document.getElementById("sponsorID");
  for(element in sampleSponsors)
  {
    var opt = document.createElement("option");
    opt.innerHTML = sampleSponsors[element];
    opt.value =sampleSponsors[element];
    sponsorSelect.appendChild(opt);
  }
}

function createPetSelect() {
  var petSelect = document.getElementById("sponsoredID");
  petSelect.innerHTML = "";
  console.log(samplePets);
  for(element in samplePets)
  {
    var opt = document.createElement("option");
    opt.innerHTML = samplePets[element];
    opt.value =samplePets[element];
    petSelect.appendChild(opt);
  }
}

function createShelterSelect() {
  var shelterSelect = document.getElementById("sponsoredID");
  shelterSelect.innerHTML = "";
  console.log(sampleShelters);
  for(element in sampleShelters)
  {
    var opt = document.createElement("option");
    opt.innerHTML = sampleShelters[element];
    opt.value =sampleShelters[element];
    shelterSelect.appendChild(opt);
  }
}

function onSponsorshipCreated() {
  if (this.responseURL.includes('pet')) {
    getPetSponsorships();
  }
  else {
    getShelterSponsorships();
  }
}

function createSponsorship() {
  var sponsorID = getValueWithinBrackes(document.getElementById("sponsorID").value);
  var sponsoredID = getValueWithinBrackes(document.getElementById("sponsoredID").value);
  var amount = document.getElementById("amount").value;
  var beginDate = document.getElementById("beginDate").value;
  var endDate = document.getElementById("endDate").value;
  var radioOptions = document.getElementsByName('createType');
  var createType = "pets";
  for (var i = 0; i <  radioOptions.length; i++) {
    if (radioOptions[i].checked) {
      createType = radioOptions[i].value;
      break;
    }
  }

  var newSponsorship = {
    "sponsorID": sponsorID,
    "amount":amount,
    "beginDate": beginDate,
    "endDate": endDate
  };
  newSponsorship[displayTypeToHeaderMapping[createType]] = sponsoredID;

  var url = apiBaseUrl + '/shelterSponsorships';
  if (createType == "pets") {
    url = apiBaseUrl + '/petSponsorships';
  }
  var req = new XMLHttpRequest();
  req.onload = onSponsorshipCreated;
  req.open("post", url, true);
  req.setRequestHeader('Content-type', 'application/json');
  req.send(JSON.stringify(newSponsorship));
}

function getCurrentDisplayType() {
  var radioOptions = document.getElementsByName('displayType');
  var displayType = "pets";
  for (var i = 0; i <  radioOptions.length; i++) {
    if (radioOptions[i].checked) {
      displayType = radioOptions[i].value;
      break;
    }
  }
  return displayType;
}

function clearTable() {
  var tableBodyTag = document.getElementById("sponsorshipsTableBody");
  tableBodyTag.innerHTML = "";
}

function tableDisplayToggled(radioElement) {
  var selectedValue = radioElement.value;
  var headerIdElement = document.getElementById('idHeaderValue');
  var displayValue = displayTypeToHeaderMapping[selectedValue];
  displayValue = displayValue.substring(0, displayValue.length - 2);
  displayValue = displayValue.charAt(0).toUpperCase() + displayValue.slice(1)
  headerIdElement.innerHTML = displayValue;
  populateSponsorshipsTable(sampleShelterSponsorships,samplePetSponsorships);
}

function formCreateToggled(radioElement) {
  var selectedValue = radioElement.value;
  var sponsoredIDLabelElement = document.getElementById('sponsoredIDLabel');
  var displayValue = displayTypeToHeaderMapping[selectedValue].charAt(0).toUpperCase() + displayTypeToHeaderMapping[selectedValue].slice(1);
  displayValue = displayValue.substring(0, displayValue.length - 2);
  sponsoredIDLabelElement.innerHTML = displayValue;
  if (selectedValue == "shelters") {
    createShelterSelect();
  }
  else {
    createPetSelect();
  }
}

function isFilterActive() {
  return document.getElementById('filterUsed').checked;
}

function populateSponsorshipsTable(shelterSponsorships, petSponsorships) {
  var type = getCurrentDisplayType();
  clearTable();
  var sponsorIDFilter = document.getElementById("sponsorIDSearch").value;
  var currentDisplayTypeSponsorships = type == "pets" ? petSponsorships : shelterSponsorships;
  var filteredSponsorships = [];
  if (isFilterActive()) {
    for (var i = 0; i < currentDisplayTypeSponsorships.length; i++) {
      var sponsorField = currentDisplayTypeSponsorships[i]["sponsorID"];
      if (getValueWithinBrackes(sponsorField) == sponsorIDFilter) {
        filteredSponsorships.push(currentDisplayTypeSponsorships[i]);
      }
    }
    currentDisplayTypeSponsorships = filteredSponsorships;
  }

  var tableBodyTag = document.getElementById("sponsorshipsTableBody");
  for (var i = 0; i < currentDisplayTypeSponsorships.length; i++) {
    addRowToSponsorshipsTable(currentDisplayTypeSponsorships[i], tableBodyTag, type);
  }

}

function addRowToSponsorshipsTable(row, bodyElement, type) {
  var tr = document.createElement('tr');
  var orderedRow = [];
  orderedRow.push(row["sponsorID"]);
  orderedRow.push(row[displayTypeToHeaderMapping[type]]);
  orderedRow.push(row["amount"]);
  orderedRow.push(row["beginDate"]);
  orderedRow.push(row["endDate"]);
  var sponsorID = getValueWithinBrackes(orderedRow[0]);
  var sponsoredID = getValueWithinBrackes(orderedRow[1]);
  var identifier = sponsorID + '_' + sponsoredID;
  tr.id = identifier;
  for (var i = 0; i < orderedRow.length; i++) {
    var td = document.createElement('td');
    td.innerHTML = orderedRow[i];
    tr.appendChild(td);
  }
  var editButton = document.createElement('button');
  var editRow = document.createElement('td');
  editRow.appendChild(editButton);
  tr.appendChild(editRow);
  editButton.innerHTML = "Edit";
  editButton.addEventListener('click',function(event) {
    editSponsorship(sponsorID,sponsoredID,type);
    editRow.innerHTML = ""
    var submitButton = document.createElement('button');
    submitButton.innerHTML = "Submit";
    editRow.appendChild(submitButton);
    submitButton.addEventListener('click', function(event) {
      updateSponsorship(sponsorID, sponsoredID, type)
    })
  })
  var deleteButton = document.createElement('button');
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener('click',function(event) {
    deleteSponsorship(sponsorID,sponsoredID,type);
  })
  var deleteRow = document.createElement('td');
  deleteRow.appendChild(deleteButton);
  tr.appendChild(deleteRow);
  bodyElement.appendChild(tr);
}

function editSponsorship(sponsorID, sponsoredID, type) {
  var row = document.getElementById(sponsorID + "_" + sponsoredID);
  var rowNodes = row.childNodes;
  var columns = ["amount", "beginDate", "endDate"]
  for (var i = 2; i < rowNodes.length - 2; i++) {
    var td = rowNodes[i];
    var tdText = td.textContent;
    td.textContent = "";
    var input = document.createElement("input");
    input.id = columns[i-2]+sponsorID+"_"+sponsoredID
    input.defaultValue = tdText;
    if (columns[i-2]=="beginDate"||columns[i-2]=="endDate") {
      input.type = "date"
      console.log("hello");
    }
    input.size = 10;
    td.appendChild(input);
    input.classList.add("table");
  }
}

function updateSponsorship(sponsorID, sponsoredID, type) {
  var identifier = sponsorID + "_" + sponsoredID;
  var row = document.getElementById(identifier);
  var rowNodes = row.childNodes;
  var amount = document.getElementById("amount"+identifier).value;
  var beginDate = document.getElementById("beginDate"+identifier).value;
  var endDate = document.getElementById("endDate"+identifier).value;
  var req = new XMLHttpRequest();
  var apiCallString = '/shelterSponsorships?shelterID=';
  var displayCall = getShelterSponsorships;
  if (type == "pets") {
    apiCallString = '/petSponsorships?petID=';
    displayCall = getPetSponsorships;
  }
  var apiCallString = apiBaseUrl + apiCallString + sponsoredID + '&sponsorID=' + sponsorID
  req.onload = displayCall;
  req.open("put", apiCallString, true);
  req.setRequestHeader('Content-type', 'application/json');
  req.send(JSON.stringify({
    amount: amount,
    beginDate: beginDate,
    endDate: endDate
  }));
}

function deleteSponsorship(sponsorID, sponsoredID, type) {
  var apiCallString = '/shelterSponsorships?shelterID=';
  var displayCall = getShelterSponsorships;
  if (type == "pets") {
    apiCallString = '/petSponsorships?petID=';
    displayCall = getPetSponsorships;
  }
  var req = new XMLHttpRequest();
  req.onload = displayCall;
  var apiCallString = apiBaseUrl + apiCallString + sponsoredID + '&sponsorID=' + sponsorID;
  console.log(apiCallString);
  req.open("delete", apiCallString, true)
  req.send();
}

function resetTable() {
  console.log("reset");
  populateSponsorshipsTable(sampleShelterSponsorships, samplePetSponsorships);
}
