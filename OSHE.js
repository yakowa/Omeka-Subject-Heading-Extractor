// Omeka Subject Heading Extractor

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

// Sync user input...
readline.question('\n\nWhat is the URL to your Omeka API (items)?\nExample: https://example.com/api/items/\n>>> ', url => {
	console.log('\nPLEASE WAIT • Loading data from API...');
	var xhttp = new XMLHttpRequest();
	xhttp.addEventListener('load', function() { if (this.readyState == 4 && this.status == 200) {
		if (typeof callBackFunc === 'function') { callBackFunc(xhttp.responseText); }
		}
		else { console.error('\nERROR • Failed loading data from API.'); }
	});

	xhttp.open("GET", url, true);
	xhttp.send();
});



// Main logic - ran when data from the database is returned
function callBackFunc(rawData) {
	console.log('PLEASE WAIT • Formatting data from API...');
	let subjects = [];
	let db = JSON.parse(rawData);

	// For every item in the returned database...
	for (let i = 0; i < db.length; i++) {
		const element = db[i];
		let elementTexts = element['element_texts'];
		var elementId = element['id'];

		// For every item in its element_texts subdirectory...
		for (let j = 0; j < elementTexts.length; j++) {
			const elementName = elementTexts[j]['element']['name'];
			const elementData = elementTexts[j]['text'];
			// If it is a subject...
			if (elementName == 'Subject') {
				// Add it to the list of all subjects
				subjects.push({'id': elementId, 'subject': elementData});
			}
		}
	}
	// Done the formatting logic
	console.log('SUCCESS!');


	// Sync user input...
	readline.question('\n\nWhat would you like to search for?\n>>> ', usr => {
		// Close the user input (query)
		readline.close();

		mainLogic(usr, subjects);
	});

}


function mainLogic(usr, subjects) {
	let rawFoundSubjects = [];

	// User input in lower case for regex
	usr = usr.toLowerCase()
	
	for (let i = 0; i < subjects.length; i++) {
		const element = subjects[i];
		let subject = element['subject'].toLowerCase();
		let id = element['id'];

		// For all subjects, If the query fits...
		if (!(subject.search(`^${usr}`) == '-1')) {
			for (let j = 0; j < subjects.length; j++) {
				// For all subjects, if the id matches the query-corrent one...
				const thisId = subjects[j]['id'];
				const thisSub = subjects[j]['subject'];
				if (id == thisId) {
					// And the subject does not contain bad characters...
					if ( !(subject.includes('\n')) && !(subject.includes('\r')) ) {
						// And it to the list of items to display to the user
						rawFoundSubjects.push(thisSub);
					}
				}
			}
		}
	}


	// Filtering out duplicates
	foundSubjects = rawFoundSubjects.filter(function(item, pos) {
		return rawFoundSubjects.indexOf(item) == pos;
	});


	// Converting to CSV
	let foundSubjectsCSV = "";

	for (let i = 0; i < foundSubjects.length; i++) {
		const element = foundSubjects[i];
		if (!(foundSubjectsCSV.length == 0)) {
			foundSubjectsCSV += `, ${element}`;
		}
		else { foundSubjectsCSV += element; }
	}

	// Show the values we want ot show to the user, but it **SHOULD** have no duplicates
	console.log("SUCCESS!\n\nSubjects related to your query:\n", foundSubjectsCSV);
	console.warn("\n\n\n\nCreated by https://JacobEM.com");
}