const express = require('express');
const cors = require('cors');
const dbConnection = require('./config/db');
const domainModel = require('./models/domainModel');
dbConnection();

const router = express.Router();

router.post('/post', async (req, res) => {
  try {
    const domain = await domainModel.create(req.body);
    domain.id = Math.floor(Math.random() * 99999);
    domain.price = Math.floor(Math.random() * 99)
    await domain.save();
    res.status(201).send('Domain created successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.get('/get', async (_, res) => {
  try {
    const domains = await domainModel.find();
    res.status(200).send(domains);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.delete('/del/:id', async (req, res) => {
  try {
    const domains = await domainModel.findByIdAndDelete(req.params.id);
    res.status(200).send('deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

const app = express();
app.use(
  cors({
    origin: '*',
  })
);

app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
