const urlBase = 'http://knightconnect.online//LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin() {
	userId = 0;
	firstName = "";
	lastName = "";

	let login = document.getElementById("username-login").value;
	let password = document.getElementById("password-login").value;

	document.getElementById("loginResult").innerHTML = "";

	var hash = md5(password);

	let tmp = { login: login, password: hash };

	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);
				userId = jsonObject.id;

				if (userId < 1) {
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}

				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();

				window.location.href = "contacts.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doSignUp() {
	if (validatePassword() & validateUsername()) {
		let firstname = document.getElementById("firstname").value;
		let lastname = document.getElementById("lastname").value;
		let login = document.getElementById("username-signup").value;
		let password = document.getElementById("password-signup").value;

		document.getElementById("signupResult").innerHTML = "";

		var hash = md5(password);

		let tmp = { firstName: firstname, lastName: lastname, login: login, password: hash };

		let jsonPayload = JSON.stringify(tmp);

		let url = urlBase + '/SignUp.' + extension;

		let xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try {
			xhr.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					document.getElementById("username-login").value = login;
					document.getElementById("password-login").value = password;
					doLogin();
				}
				else {
					document.getElementById("signupResult").innerHTML = "Username taken";
				}
			};
			xhr.send(jsonPayload);
		}
		catch (err) {
			console.log("AHHHHHH");
			document.getElementById("signupResult").innerHTML = err.message;
		}
	}
}

function saveCookie() {
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime() + (minutes * 60 * 1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie() {
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for (var i = 0; i < splits.length; i++) {
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if (tokens[0] == "firstName") {
			firstName = tokens[1];
		}
		else if (tokens[0] == "lastName") {
			lastName = tokens[1];
		}
		else if (tokens[0] == "userId") {
			userId = parseInt(tokens[1].trim());
		}
	}

	if (userId < 0) {
		window.location.href = "index.html";
	}
	else {
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout() {
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function validatePassword() {
	let password = document.getElementById("password-signup").value;
	if (!/^.{8,}$/.test(password)) {
		document.getElementById("password-signup").style.outlineColor = "#FF0000";
		document.getElementById("password-valid").textContent = "Password must contain at least 8 characters";
		document.getElementById("password-valid").style.display = "block";
	}
	else if (!/.*[a-zA-Z]/.test(password)) {
		document.getElementById("password-signup").style.outlineColor = "#FF0000";
		document.getElementById("password-valid").textContent = "Password must contain at least one letter";
		document.getElementById("password-valid").style.display = "block";
	}
	else if (!/.*[0-9]/.test(password)) {
		document.getElementById("password-signup").style.outlineColor = "#FF0000";
		document.getElementById("password-valid").textContent = "Password must contain at least one number";
		document.getElementById("password-valid").style.display = "block";
	}
	else if (!/.*\W/.test(password)) {
		document.getElementById("password-signup").style.outlineColor = "#FF0000";
		document.getElementById("password-valid").textContent = "Password must contain at least one special character";
		document.getElementById("password-valid").style.display = "block";
	}
	else {
		document.getElementById("password-signup").style.outlineColor = "#00FF00";
		document.getElementById("password-valid").style.display = "none";
		return true;
	}
	return false;
}

function validateUsername() {
	let username = document.getElementById("username-signup").value;
	if (!/^.{5,}$/.test(username)) {
		document.getElementById("username-signup").style.outlineColor = "#FF0000";
		document.getElementById("username-signup").style.outlineColor = "#FF0000";
		document.getElementById("username-valid").textContent = "Username must contain at least 5 characters";
		document.getElementById("username-valid").style.display = "block";
	}
	else {
		document.getElementById("username-signup").style.outlineColor = "#00FF00";
		document.getElementById("username-valid").style.display = "none";
		return true;
	}
	return false;
}

function saveCookie() {
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime() + (minutes * 60 * 1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function enterSignUp() {
	document.getElementById("login-container").style.display = "none";
	document.getElementById("signup-container").style.display = "block";
}

function enterLogIn() {
	document.getElementById("signup-container").style.display = "none";
	document.getElementById("login-container").style.display = "block";
}

function initialPanUp() {
	let background = document.getElementById("background");
	background.style.animationName = "initialPanUp";
	background.style.animationDuration = "1s";
	background.style.animationTimingFunction = "cubic-bezier(.18,-0.01,.56,1.06)";
	background.style.animationIterationCount = 1;
	background.style.position = "top";
	document.getElementById("panUp").style.display = "none";
	document.getElementById("panDown").style.display = "block";
	let fountain = document.getElementById("fountain");
	fountain.style.visibility = "hidden";
}

function panUp() {
	let background = document.getElementById("background");
	background.style.animationName = "panUp";
	background.style.animationDuration = "1s";
	background.style.animationTimingFunction = "cubic-bezier(.18,-0.01,.56,1.06)";
	background.style.animationIterationCount = 1;
	background.style.backgroundPosition = "top";
	document.getElementById("panUp").style.display = "none";
	document.getElementById("panDown").style.display = "block";
	document.querySelector(".search-container").style.display = "flex";
	let sharks = document.getElementById("sharks");
	sharks.style.visibility = "hidden";
	let fountain = document.getElementById("fountain");
	fountain.style.visibility = "hidden";
}

function panDown() {
	let background = document.getElementById("background");
	background.style.animationName = "panDown";
	background.style.animationDuration = "1s";
	background.style.animationTimingFunction = "cubic-bezier(.18,-0.01,.56,1.06)";
	background.style.animationIterationCount = 1;
	background.style.backgroundPosition = "bottom";
	document.getElementById("panDown").style.display = "none";
	document.getElementById("panUp").style.display = "block";
	document.querySelector(".search-container").style.display = "none";
	document.querySelector(".add-container").style.display = "none";
	let fountain = document.getElementById("fountain");
	fountain.style.visibility = "visible";
}

function enterAddContact() {
	document.querySelector(".search-container").style.display = "none";
	document.querySelector(".add-container").style.display = "flex";
}

function enterSearchContact() {
	document.querySelector(".search-container").style.display = "flex";
	document.querySelector(".add-container").style.display = "none";
}

function isValidEmail(email) {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailRegex.test(email);
}

function isValidPhone(phone) {
	const phoneRegex = /^\d{10}$/;
	return phoneRegex.test(phone);
}


function addContact() {

	let newFirstName = document.getElementById("firstName").value;
	let newLastName = document.getElementById("lastName").value;
	let newPhoneNumber = document.getElementById("phoneNumber").value;
	let newEmailAddress = document.getElementById("emailAddress").value;

	document.getElementById("contactAddResult").innerHTML = "";

	if (!isValidEmail(newEmailAddress)) {
		document.getElementById("contactAddResult").style.color = "red";
		document.getElementById("contactAddResult").innerHTML = "Invalid email!";
		return;
	}

	if (!isValidPhone(newPhoneNumber)) {
		document.getElementById("contactAddResult").style.color = "red";
		document.getElementById("contactAddResult").innerHTML = "Invalid phone number format!";
		return;
	}

	let tmp = {
		firstName: newFirstName,
		lastName: newLastName,
		phoneNumber: newPhoneNumber,
		emailAddress: newEmailAddress,
		userId: userId
	};

	let jsonPayload = JSON.stringify(tmp);
	let url = urlBase + "/AddContact." + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}
		};

		xhr.send(jsonPayload);
		window.location.reload();
	} catch (err) {
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
}

function searchContact2() {
	let srch = document.getElementById("searchContact").value;

	let tmp = {
		search: srch,
		userId: userId
	};
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + "/SearchContact." + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);

				let results = jsonObject.results;
				let contactsTable = document.getElementById("contactsBody");

				contactsTable.innerHTML = "";

				for (let i = 0; i < results.length; i++) {
					let row = contactsTable.insertRow();

					let insertFirstName = row.insertCell();
					let insertLastName = row.insertCell();
					let insertPhone = row.insertCell();
					let insertEmail = row.insertCell();
					let insertEdit = row.insertCell();
					let insertDelete = row.insertCell();
					let contactId = results[i].ID;

					insertFirstName.innerHTML = results[i].FirstName;
					insertLastName.innerHTML = results[i].LastName;
					insertPhone.innerHTML = results[i].Phone;
					insertEmail.innerHTML = results[i].Email;

					// Declare DELETE / CANCEL
					const deleteButton = document.createElement("button");
					deleteButton.textContent = "Delete";
					deleteButton.classList.add("delete-button");

					// EDIT / SAVE
					const editButton = document.createElement("button");
					editButton.textContent = "Edit";
					editButton.classList.add("edit-button");
					editButton.onclick = function () {
						event.preventDefault();
						if (editButton.textContent === "Edit") {
							editButton.textContent = "Save";
							deleteButton.textContent = "Cancel";

							insertFirstName.innerHTML = `<input type="text" class="edit-input" id="editFirstName" value="${insertFirstName.textContent}" required="false">`;
							insertLastName.innerHTML = `<input type="text" class="edit-input" id="editLastName" value="${insertLastName.textContent}" required="false">`;
							insertPhone.innerHTML = `<input type="text" class="edit-input" id="editPhone" value="${insertPhone.textContent}" required="false">`;
							insertEmail.innerHTML = `<input type="text" class="edit-input" id="editEmail" value="${insertEmail.textContent}" required="false">`;

						} else {
							editButton.textContent = "Edit";
							deleteButton.textContent = "Delete";
							let tmp3 = {
								newFirst: document.getElementById("editFirstName").value.trim(),
								newLast: document.getElementById("editLastName").value.trim(),
								phoneNumber: document.getElementById("editPhone").value.trim(),
								emailAddress: document.getElementById("editEmail").value.trim(),
								id: contactId,
								userId: userId
							};

							let jsonPayload = JSON.stringify(tmp3);
							let url3 = urlBase + "/EditContact." + extension;
							let xhr3 = new XMLHttpRequest();
							xhr3.open("POST", url3, true);
							xhr3.setRequestHeader("Content-type", "application/json; charset=UTF-8");
							xhr3.send(jsonPayload);
							window.location.reload();
						}


					};
					insertEdit.appendChild(editButton);

					// DELETE / CANCEL
					deleteButton.onclick = function () {
						if (deleteButton.textContent === "Delete") {
							if (!confirm("Delete this contact?")) {
								return;
							}
							let tmp2 = {
								userId: userId,
								firstName: results[i].FirstName,
								lastName: results[i].LastName
							};
							let jsonPayload = JSON.stringify(tmp2);
							let url2 = urlBase + "/DeleteContact." + extension;
							let xhr2 = new XMLHttpRequest();
							xhr2.open("POST", url2, true);
							xhr2.setRequestHeader("Content-type", "application/json; charset=UTF-8");
							xhr2.send(jsonPayload);
							window.location.reload();
						}
						else {
							insertFirstName.innerHTML = results[i].FirstName;
							insertLastName.innerHTML = results[i].LastName;
							insertPhone.innerHTML = results[i].Phone;
							insertEmail.innerHTML = results[i].Email;

							editButton.textContent = "Edit";
							deleteButton.textContent = "Delete";
						}
					};
					insertDelete.appendChild(deleteButton);
				}
			}
		};

		xhr.send(jsonPayload);
	} catch (err) {
		document.getElementById("searchResults").innerHTML = err.message;
	}

}

function spiritSplash() {
    let tmp = {
        search: "splash",
        userId: userId
    };
    
    let jsonPayload = JSON.stringify(tmp);
    let url = urlBase + "/SearchContact." + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let jsonObject = JSON.parse(xhr.responseText);

            if (!jsonObject.results || jsonObject.results.length === 0) {
                return;
            }

            let found = jsonObject.results.some(contact => 
                contact.FirstName.toLowerCase() === "spirit" && 
                contact.LastName.toLowerCase() === "splash"
            );

            if (found) {
                document.querySelector(".background").style.backgroundImage = "url('/LAMPSTACK/images/SpiritSplash.png')";
            } 
        }
    };

    xhr.send(jsonPayload);
}

var fountainClickCounter = 0;

function fountain() {
	fountainClickCounter++;
	let fountain = document.getElementById("fountain");
	fountain.style.opacity = fountain.style.opacity == 0 ? 1 : 0;

	if(fountainClickCounter == 5) {
		let sharks = document.getElementById("sharks");
	 	sharks.style.visibility = "visible";
	}
}

function collapseSearchContainer() {
	let collapseButton = document.getElementById("collapse-button");
	if(document.getElementById("contact-form").style.display == "block") {
		document.getElementById("contact-form").style.display = "none";
		document.getElementById("search-container").style.height = "70px";
		collapseButton.style.animationName = "collapse";
		collapseButton.style.animationDuration = ".5s";
		collapseButton.style.animationIterationCount = 1;
		collapseButton.style.transform = "rotate(135deg)";
	}
	else {
		document.getElementById("contact-form").style.display = "block";
		document.getElementById("search-container").style.height = "600px";
		collapseButton.style.animationName = "collapse";
		collapseButton.style.animationDirection = "reverse";
		collapseButton.style.animationDuration = ".25s";
		collapseButton.style.animationIterationCount = 1;
		collapseButton.style.transform = "rotate(45deg)";
	}
	collapseButton.addEventListener("animationend", function() {
		collapseButton.style.animation = "none";
	});
}

// Fixes bug with search bar
document.addEventListener("DOMContentLoaded", function () {
    let searchInput = document.getElementById("searchContact");

    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            searchContact2();
        }
    });
});
