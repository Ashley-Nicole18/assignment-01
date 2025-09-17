const path = require("path");
const express = require("express");

const app = express();
const PORT = 3000;

let listOfUsers = [];

// Load users from Random User API
async function loadUsers() {
    try {
        const response = await fetch(
            "https://randomuser.me/api/?results=1000&inc=name,gender,location,email,phone,cell,dob,picture"
        );
        const data = await response.json();
        listOfUsers = data.results;
    } catch (err) {
        console.error("Failed to load users: ", err);
    }
}

// API route
app.get("/api", (req, res) => {
    let results = parseInt(req.query.results);

    if (isNaN(results) || results < 1) {
        results = 1;
    }
    if (results > listOfUsers.length) {
        results = listOfUsers.length;
    }

    res.json({
        results: listOfUsers.slice(0, results),
    });
});

// Serve static files from current folder
app.use(express.static(__dirname));

// Start server
app.listen(PORT, async () => {
    await loadUsers();
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
