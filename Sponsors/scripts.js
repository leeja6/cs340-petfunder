var sampleSponsors = [
  {
    "sponsorID": 1,
    "firstName": "Jane",
    "lastName":"Lee",
    "anonymous": false
  },
  {
    "sponsorID": 2,
    "firstName": "Kevin",
    "lastName":"Lee",
    "anonymous": false
  },
]

var apiBaseUrl = 'http://flip1.engr.oregonstate.edu:7371';

function sponsorsreceived() {
  console.log(this.responseText);
  sampleSponsors = JSON.parse(this.responseText);
  for(var i = 0; i < sampleSponsors.length; i++ ) {
    var sponsorData = sampleSponsors[i];
    if (sponsorData.anonymous == 1) {
      sponsorData.anonymous = true;
    }
    else {
      sponsorData.anonymous = false;
    }
  }
  populateSponsorTable(sampleSponsors);
}

function getSponsorsAndPopulateTable() {
  var req = new XMLHttpRequest();
  req.onload = sponsorsreceived;
  req.open("get", apiBaseUrl + '/sponsors', true);
  req.send();
}

getSponsorsAndPopulateTable();
//populateSponsorTable(sampleSponsors);
function clearTable() {
  var tableBodyTag = document.getElementById("sponsorsTableBody");
  tableBodyTag.innerHTML = "";
}

function onSponsorCreated() {
  getSponsorsAndPopulateTable();
}

function createSponsor() {
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var radioOptions = document.getElementsByName('anonymous');
  var isAnonymous = false;
  for (var i = 0; i <  radioOptions.length; i++) {
    if (radioOptions[i].checked) {
      if (radioOptions[i].value == 'yes') {
        isAnonymous = true;
      }
      else {
        isAnonymous = false;
      }
      break;
    }
  }
  var req = new XMLHttpRequest();
  req.onload = onSponsorCreated;
  req.open("post", apiBaseUrl + '/sponsors', true);
  req.setRequestHeader('Content-type', 'application/json');
  req.send(JSON.stringify({
    firstName: firstName,
    lastName: lastName,
    anonymous: isAnonymous ? 1 : 0
  }));
}

function populateSponsorTable(sponsors) {
  clearTable();
  var tableBodyTag = document.getElementById("sponsorsTableBody");
  for (var i = 0; i < sponsors.length; i++) {
    addRowToSponsorTable(sponsors[i], tableBodyTag);
  }
}

function addRowToSponsorTable(row, bodyElement) {
  var tr = document.createElement('tr');
  var sponsorID = row["sponsorID"]
  tr.id = sponsorID;
  for (var dataColumn in row) {
    var td = document.createElement('td');
      td.innerHTML = row[dataColumn];
    tr.appendChild(td);
  }
  var editRow = document.createElement('td');
  var editButton = document.createElement('button');
  editRow.appendChild(editButton);
  tr.appendChild(editRow);
  editButton.innerHTML = "Edit";
  editButton.addEventListener('click',function(event) {
    editSponsor(sponsorID);
    editRow.innerHTML = ""
    var submitButton = document.createElement('button');
    submitButton.innerHTML = "Submit";
    editRow.appendChild(submitButton);
    submitButton.addEventListener('click', function(event) {
      updateSponsor(sponsorID);
    })
  })
  var deleteButton = document.createElement('button');
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener('click',function(event) {
    deleteSponsor(sponsorID);
  })
  var deleteRow = document.createElement('td');
  deleteRow.appendChild(deleteButton);
  tr.appendChild(deleteRow);
  bodyElement.appendChild(tr);
}

function editSponsor(sponsorID) {
  var row = document.getElementById(sponsorID);
  var rowNodes = row.childNodes;
  var columns = ["firstName", "lastName", "anonymous"]
  for (var i = 1; i < rowNodes.length - 2; i++) {
    var td = rowNodes[i];
    var tdText = td.textContent;
    td.textContent = "";
    var input = document.createElement("input");
    input.id = columns[i-1]+sponsorID
    input.setAttribute("id",columns[i-1]+sponsorID)
    input.defaultValue = tdText;
    if (columns[i-1]=="anonymous") {
      input.type = "checkbox";
      if (tdText == "true") {
        input.checked = true;
      }
    }
    input.size = 10;
    td.appendChild(input);
    input.classList.add("table");
  }
}

function updateSponsor(sponsorID) {
  var row = document.getElementById(sponsorID);
  var rowNodes = row.childNodes;
  var firstName = document.getElementById("firstName"+sponsorID).value;
  var lastName = document.getElementById("lastName"+sponsorID).value;
  var isAnonymous = document.getElementById("anonymous"+sponsorID).checked;
  console.log(isAnonymous);
  var req = new XMLHttpRequest();
  req.onload = getSponsorsAndPopulateTable;
  req.open("put", apiBaseUrl + '/sponsors?sponsorID=' + sponsorID, true);
  req.setRequestHeader('Content-type', 'application/json');
  req.send(JSON.stringify({
    firstName: firstName,
    lastName: lastName,
    anonymous: isAnonymous ? 1 : "FALSE"
  }));
}

function deleteSponsor(sponsorID) {
  var req = new XMLHttpRequest();
  req.onload = getSponsorsAndPopulateTable;
  req.open("delete", apiBaseUrl + '/sponsors?sponsorID='+sponsorID, true);
  req.send();
}
