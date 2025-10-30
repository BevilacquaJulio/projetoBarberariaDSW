import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { adicionarRotas } from './rotas.js'


const express = require('express');
const path = require('path');
const app = express();

// Configurar a pasta uploads como pública
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const api = express()
api.use(cors())
api.use(express.json())

adicionarRotas(api)

const PORT = process.env.PORT || 3000
api.listen(PORT, () => console.log(`--> API Barbearia subiu na porta ${PORT} <--`))

