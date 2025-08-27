function showError(message) {
    document.getElementById("errorModalBody").innerText = message;
    const modal = new bootstrap.Modal(document.getElementById("errorModal"));
    modal.show();
}

function renderUsers() {
    const count = parseInt(document.getElementById("randomUserNumber").value);
    const nameSelect = document.getElementById("name").value;

    if (isNaN(count) || count < 1 || count > 1000) {
        showError("Please enter a number between 1 and 1000.");
        return;
    }

    const url = `https://randomuser.me/api/?results=${count}&inc=name,gender,location,email`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch users. Please try again.");
            }
            return response.json();
        })
        .then(data => {
            const users = data.results;
            let html = '';

            users.forEach(user => {
                let displayName = (nameSelect === "first-name") ? user.name.first : user.name.last;

                html += `
                    <tr>
                        <td>${displayName}</td>
                        <td>${user.gender}</td>
                        <td>${user.email}</td>
                        <td>${user.location.country}</td>
                    </tr>
                `;
            });

            document.querySelector("#user-list tbody").innerHTML = html;
        })
        .catch(error => {
            showError(error.message);
        });
}


document.getElementById("randomUserNumber").addEventListener("change", renderUsers);
document.getElementById("name").addEventListener("change", renderUsers);