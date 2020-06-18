import express from 'express';

const app = express();

app.get('/', (req, res) => {
    return res.json({ message: 'Hellow World' });
});

app.listen(4444);