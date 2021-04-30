var sampleShelterSponsorships = [
  {
    "sponsorID": 1,
    "shelterID": "1",
    "amount":"1000",
    "beginDate": "01-01-2020",
    "endDate": "01-01-2021"
  },
  {
    "sponsorID": 2,
    "shelterID": "2",
    "amount":"2000",
    "beginDate": "02-01-2020",
    "endDate": "02-01-2021"
  },
]

var samplePetSponsorships = [
  {
    "sponsorID": 1,
    "petID": "1",
    "amount":"100",
    "beginDate": "01-01-2020",
    "endDate": "01-01-2021"
  },
  {
    "sponsorID": 2,
    "petID": "2",
    "amount":"200",
    "beginDate": "02-01-2020",
    "endDate": "02-01-2021"
  },
]

var displayTypeToHeaderMapping = {
  "pets": "petID",
  "shelters":"shelterID"
};

populateSponsorshipsTable(sampleShelterSponsorships,samplePetSponsorships);

function createSponsorship() {
  var sponsorID = document.getElementById("sponsorID").value;
  var sponsoredID = document.getElementById("sponsoredID").value;
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

  if (createType == "pets") {
    samplePetSponsorships.push(newSponsorship);
  }
  else {
    sampleShelterSponsorships.push(newSponsorship);
  }
  populateSponsorshipsTable(sampleShelterSponsorships, samplePetSponsorships);
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
  headerIdElement.innerHTML = displayTypeToHeaderMapping[selectedValue];
  populateSponsorshipsTable(sampleShelterSponsorships,samplePetSponsorships);
}

function formCreateToggled(radioElement) {
  var selectedValue = radioElement.value;
  var sponsoredIDLabelElement = document.getElementById('sponsoredIDLabel');
  var displayValue = displayTypeToHeaderMapping[selectedValue].charAt(0).toUpperCase() + displayTypeToHeaderMapping[selectedValue].slice(1);
  sponsoredIDLabelElement.innerHTML = displayValue;
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
      var a = currentDisplayTypeSponsorships[i]["sponsorID"];
      if (currentDisplayTypeSponsorships[i]["sponsorID"] == sponsorIDFilter) {
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
  for (var i = 0; i < orderedRow.length; i++) {
    var td = document.createElement('td');
    td.innerHTML = orderedRow[i];
    tr.appendChild(td);
  }
  var deleteButton = document.createElement('button');
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener('click',function(event) {
    deleteSponsorship(orderedRow[0],orderedRow[1],type);
  })
  var editButton = document.createElement('button');
  editButton.innerHTML = "Edit";
  var editRow = document.createElement('td');
  editRow.appendChild(editButton);
  tr.appendChild(editRow);
  var deleteRow = document.createElement('td');
  deleteRow.appendChild(deleteButton);
  tr.appendChild(deleteRow);
  bodyElement.appendChild(tr);
}

function deleteSponsorship(sponsorID, sponsoredID, type) {
  var sampleSponsorships;
  if (type == "pets") {
    sampleSponsorships = samplePetSponsorships;
  }
  else {
    sampleSponsorships = sampleShelterSponsorships;
  }
  for (var i = 0; i < sampleSponsorships.length; i++) {
    var sponsorIDMatch = sampleSponsorships[i]["sponsorID"]==sponsorID;
    var sponsoredIDMatch = sampleSponsorships[i][displayTypeToHeaderMapping[type]]==sponsoredID;
    if (sponsorIDMatch && sponsoredIDMatch) {
      sampleSponsorships.splice(i,1);
      populateSponsorshipsTable(sampleShelterSponsorships, samplePetSponsorships);
      break;
      }
  }
}

function resetTable() {
  console.log("reset");
  populateSponsorshipsTable(sampleShelterSponsorships, samplePetSponsorships);
}
