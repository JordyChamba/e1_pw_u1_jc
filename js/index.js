
const STORAGE_KEY = 'people_list_v1';
const formEl = () => document.getElementById('personForm');
const firstNameEl = () => document.getElementById('firstName');
const lastNameEl = () => document.getElementById('lastName');
const tableBodyEl = () => document.querySelector('#peopleTable tbody');
const emptyMessageEl = () => document.getElementById('emptyMessage');

let people = [];

function savePeople() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
}

function renderPeople() {
    const tbody = tableBodyEl();
    const empty = emptyMessageEl();
    if (!tbody || !empty) return;

    tbody.innerHTML = '';
    people.forEach((p) => {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdSurname = document.createElement('td');

        tdName.textContent = p.firstName;
        tdSurname.textContent = p.lastName;

        tr.appendChild(tdName);
        tr.appendChild(tdSurname);
        tbody.appendChild(tr);
    });

    empty.style.display = tbody.children.length === 0 ? 'block' : 'none';
}

function guardar() {
    const form = formEl();
    const firstName = firstNameEl();
    const lastName = lastNameEl();
    if (!form || !firstName || !lastName) return;

    const name = firstName.value.trim();
    const surname = lastName.value.trim();
    if (!name || !surname) {
        alert('Por favor ingresa Nombre y Apellido.');
        return;
    }

    people.push({ firstName: name, lastName: surname });
    savePeople();
    renderPeople();

    form.reset();
    firstName.focus();
}

function mostrar() {
    renderPeople();
}

function init() {
    const form = formEl();
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            guardar();
        });
    }

    loadPeople();
    renderPeople();

    window.guardar = guardar;
    window.mostrar = mostrar;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}