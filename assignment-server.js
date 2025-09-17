const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'assignment.html'));
});

app.get('/api', async (req, res) => {
    try {
        const results = parseInt(req.query.results) || 10;
        
        if (isNaN(results) || results < 1 || results > 1000) {
            return res.status(400).json({ error: 'Please enter a valid number from 1 to 1000.' });
        }
        
        const url = `https://randomuser.me/api/?results=${results}&inc=name,gender,location,email,phone,cell,dob,picture`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch users from external API. Status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('API fetch error:', error);
        res.status(500).json({ error: 'Failed to retrieve data from the Random User API.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});