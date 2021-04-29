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
populateSponsorTable(sampleSponsors);
function clearTable() {
  var tableBodyTag = document.getElementById("sponsorsTableBody");
  tableBodyTag.innerHTML = "";
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
  var newSponsor = {
    "sponsorID": sampleSponsors.length + 1,
    "firstName": firstName,
    "lastName": lastName,
    "anonymous": isAnonymous
  };
  sampleSponsors.push(newSponsor);
  var tableBodyTag = document.getElementById("sponsorsTableBody");
  addRowToSponsorTable(newSponsor, tableBodyTag);
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
  for (var dataColumn in row) {
    var td = document.createElement('td');
      td.innerHTML = row[dataColumn];
    tr.appendChild(td);
  }
  bodyElement.appendChild(tr);
}
