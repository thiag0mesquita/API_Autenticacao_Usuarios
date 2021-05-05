import app from './app'
import path from "path"
const express = require('express');

app.use('/files', express.static(
    path.resolve(__dirname, "..", "tmp", "uploads")
));

app.listen(3333)