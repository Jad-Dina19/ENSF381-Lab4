const userGrid = document.getElementById('userGrid');
const viewTogggle = document.getElementById('viewToggleBtn');
const deleteIdInput = document.getElementById('deleteIdInput');
const deleteButton = document.getElementById('deleteBtn');
const sortByGroupBtn = document.getElementById('sortByGroupBtn');
const sortByIdBtn = document.getElementById('sortByIdBtn');

let users = [];

async function retreiveData(){
    let json_data = await fetch('http://69a1e1612e82ee536fa2755d.mockapi.io/users_api')
    users = await json_data.json();
    render(users);
    console.log(users);
}

retreiveData();

function render(usersArray){
    userGrid.innerHTML = "";
    usersArray.forEach(user => {
    userGrid.innerHTML += 
    `<article class="user-card">
    <h3>${user.first_name ?? ""}</h3>
    <p>first_name: ${user.first_name ?? ""}</p>
    <p>user_group: ${user.user_group ?? ""}</p>
    <p>id: ${user.id ?? ""}</p>
    </article>`;   
}); 
}

viewTogggle.addEventListener('click', () => {
    userGrid.classList.toggle('list-view');
});

sortByGroupBtn.addEventListener("click", () => {
    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users.length - i - 1; j++) {
            if (users[j].user_group >= users[j + 1].user_group) {
                let temp = users[j + 1];
                users[j + 1] = users[j];
                users[j] = temp;
            }
        }
    }
    render(users);
});

sortByIdBtn.addEventListener("click", () => {
   for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users.length - i - 1; j++) {
            if (Number(users[j].id) >= Number(users[j + 1].id)) {
                let temp = users[j + 1];
                users[j + 1] = users[j];
                users[j] = temp;
            }
        }
    }
    render(users); 
})

deleteButton.addEventListener("click", async () => {
    let idToDelete = deleteIdInput.value.trim();
    const userIndex = users.findIndex(user => user.id === idToDelete);

    if (userIndex === -1) {
        console.error("No matching user found.");
        return;
    }

    try {
        const response = await fetch(
            `http://69a1e1612e82ee536fa2755d.mockapi.io/users_api/${idToDelete}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("API deletion failed.");
        }

        users.splice(userIndex, 1);

     
        render(users);

        console.log(`User with ID ${idToDelete} deleted successfully.`);

    } catch (error) {
        console.error("Deletion error:", error.message);
    }
});

