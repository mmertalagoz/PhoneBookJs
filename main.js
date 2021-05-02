const name = document.getElementById('name');
const surname = document.getElementById('surname');
const email = document.getElementById('email');
const form = document.getElementById('form-Phonebook');
const successDiv = document.getElementsByClassName('info--success');
const errorDiv = document.getElementsByClassName('info--error');
const personList = document.getElementById('person-list');
const saveBtn = document.getElementById('saveBtn');
const arrayForEveryPerson = [];
let checkedButton = undefined;
const btnEdit = document.getElementsByClassName('btn--edit');
form.addEventListener('submit', save);
personList.addEventListener('click', toDoPersonProcess);
let editStatus = true;

function save(e) {
	e.preventDefault();
	const personData = {
		name: name.value,
		surname: surname.value,
		email: email.value,
	};
	let result = checkingData(personData);
	if (result.status) {
		console.log(arrayForEveryPerson);
		if (checkedButton) {
			updatePerson(personData);
		} else {
			addPerson(personData);
		}
		for (aaa of successDiv) {
			aaa.style.display = 'block';
			setTimeout(() => {
				aaa.style.display = 'none';
				clearInput();
			}, 1500);
		}
	} else {
		for (aaa of errorDiv) {
			aaa.style.display = 'block';
			setTimeout(() => {
				aaa.style.display = 'none';
				// clearInput(); if you want to clear data value after the error
			}, 1500);
		}
	}
}

function updatePerson(uptPers) {
	//kisi parametresinde secilen yeni kisinin degerleri var
	//Secilen lokalde guncellenmemis kisiler var

	checkedButton.cells[0].textContent = uptPers.name;
	checkedButton.cells[1].textContent = uptPers.surname;
	checkedButton.cells[2].textContent = uptPers.email;
	document.querySelector('.saveUpdateBtn').value = 'SAVE';
	checkedButton = undefined;
	console.log(arrayForEveryPerson);
}

function addPerson(personData) {
	const createTrElement = document.createElement('tr');

	createTrElement.innerHTML = `<td>${personData.name}</td>
	<td>${personData.surname}</td>
	<td>${personData.email}</td>
	<td>
	<button class="btn btn--edit">
	<i class="fas fa-edit"></i>
	</button>
	<button class="btn btn--delete">
	<i class="fas fa-trash-alt"></i>
	</button>
	</td>`;
	personList.append(createTrElement);
	arrayForEveryPerson.push(personData);
}

function checkingData(data) {
	for (val in data) {
		if (data[val]) {
		} else {
			const result = {
				status: false,
				error: 'Please enter every input',
			};
			return result;
		}
	}
	return {
		status: true,
		error: '',
	};
}

function clearInput() {
	name.value = '';
	surname.value = '';
	email.value = '';
}

function toDoPersonProcess(event) {
	// console.log(event.target.parentNode.parentNode);

	if (event.target.classList.contains('btn--delete')) {
		const clearTr = event.target.parentNode.parentNode;

		const clearMailFromArray =
			event.target.parentNode.previousElementSibling.textContent;

		removeFromList(clearTr, clearMailFromArray);
		clearInput();
		document.querySelector('.saveUpdateBtn').value = 'SAVE';
	} else if (event.target.classList.contains('btn--edit')) {
		document.querySelector('.saveUpdateBtn').value = 'Update';
		const chosenTR = event.target.parentNode.parentNode;
		const chosenMail = chosenTR.cells[2].textContent;
		name.value = chosenTR.cells[0].textContent;
		surname.value = chosenTR.cells[1].textContent;
		email.value = chosenTR.cells[2].textContent;
		checkedButton = chosenTR;
	}
}

function removeFromList(clearTr, clearMailFromArray) {
	clearTr.remove();

	//delete from array

	arrayForEveryPerson.forEach((person, index) => {
		if (person.email === clearMailFromArray) {
			arrayForEveryPerson.splice(index, 1);
		}
	});
	console.log(arrayForEveryPerson);
}
