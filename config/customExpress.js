const express = require('express');
const consing = require('consign');
const consign = require('consign/lib/consign');


module.exports = () => {
    const app = express()

    consign()
    .include('controller')
    .into(app);

    return app
}





























/*
const express = require("express");

const consing = require('consign');

const app = express();

consing()
    .include('./controller')
    .into(app)

    */