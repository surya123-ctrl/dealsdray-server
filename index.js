const express = require('express');
const app = express();
const env = require('dotenv');
const cors = require('cors');
env.config();
const connectionDatabase = require('./db/connectionDatabase');
const PORT = process.env.PORT || 8080;
const authRoutes = require('./routes/auth.routes')
app.use(express.json())
app.use(cors());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send("Hello, world!");
})

app.listen(PORT, () => {
    connectionDatabase();
    console.log(`Server is running at ${PORT}`);
});