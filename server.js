const express = require('express');

const app = express();
const PORT = 4001 || process.env.PORT;
const bp = require('body-parser');
const path = require('path');
const axios = require('axios');

app.use(express.static('public'));
app.use(bp.json());

const selamContainer = 'http://ec2-18-191-231-115.us-east-2.compute.amazonaws.com:7000';
const alexContainer = 'http://ec2-34-217-10-22.us-west-2.compute.amazonaws.com:4000';

app.get('/app.bundle.js', (req, res) => {
  //get request to hosted EC2 alex app
  axios.get(`${alexContainer}/app.bundle.js`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      console.log(err)
      res.send(500)
    })
});
//get request to hosted EC2 Selam app (for her app bundle)
app.get('/app2.bundle.js', (req, res) => {
  axios.get(`${selamContainer}/app2.bundle.js`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      console.log(err)
      res.send(500)
    })
})
// get request to hosted EC2 Selam app (for vendor bundle)
app.get('/vendor.bundle.js', (req, res) => {
  axios.get(`${selamContainer}/vendor.bundle.js`)
  .then((response) => {
    res.send(response.data)
  })
  .catch((err) => {
    console.log(err)
    res.send(500)
  })
})

//get request for items to selam's app
app.get('/item/:id', (req, res) => {
  const id = req.params.id;
  axios.get(`${selamContainer}/item/${id}`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      console.log(err)
      res.send(500)
    })
})
//get request for items to alex's app
app.get('/items/:id', (req, res) => {
  const id = req.params.id;
  axios.get(`${alexContainer}/items/${id}`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      console.log(err)
      res.send(500)
    })
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port: ${PORT}`);
});