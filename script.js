const container = document.getElementById("user-container");
const loading = document.getElementById("loading");
const search = document.getElementById("search");

let users = [];

async function fetchUsers() {

    try {

        loading.style.display = "block";

        const response = await fetch("https://randomuser.me/api/?results=20");

        const data = await response.json();

        users = data.results;

        displayUsers(users);

    }

    catch(error){

        container.innerHTML = "<h2>Failed to load users.</h2>";

    }

    finally{

        loading.style.display = "none";

    }

}

function displayUsers(userArray){

    container.innerHTML = "";

    userArray.forEach(user=>{

        const card=document.createElement("div");

        card.classList.add("card");

        card.innerHTML=`

            <img src="${user.picture.large}">

            <h3>${user.name.first} ${user.name.last}</h3>

            <p>${user.email}</p>

            <p>${user.phone}</p>

            <p>${user.location.country}</p>

        `;

        container.appendChild(card);

    });

}

search.addEventListener("keyup",()=>{

    const value=search.value.toLowerCase();

    const filtered=users.filter(user=>

        (`${user.name.first} ${user.name.last}`)
        .toLowerCase()
        .includes(value)

    );

    displayUsers(filtered);

});
const reload = document.getElementById("reload");

reload.addEventListener("click", fetchUsers);

fetchUsers();