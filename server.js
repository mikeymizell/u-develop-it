const express = require('express');
const db = require('./db/connections');
const apiRoutes = require('./routes/apiRoutes')

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRoutes);

//default response for any other request (Not found)
app.use((req, res) => {
    res.status(404).end();
})

//Start server after db connection
db.connect(err => {
    if (err) throw err;

    console.log('Database connected.');

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})
