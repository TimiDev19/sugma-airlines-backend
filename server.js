const express = require('express')
const mongoose = require('mongoose')
const PORT = 8080
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const User = require('./modules/user.model')



const swaggerDefinition = {
    openapi: '3.0.0', // or 'swagger': '2.0' for Swagger 2.0
    info: {
        title: 'SUGMA AIRLINES BACKEND',
        version: '1.0.0',
        description: 'All crud API endpoints',
    },
    servers: [
        {
            url: 'http://localhost:8080',
            description: 'Local server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./server.js'], // Path to your route file for Swagger docs
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect('mongodb+srv://timi:timi@users.r01eh.mongodb.net/Sugma-Airlines?retryWrites=true&w=majority&appName=users')
    .then(() => {
        console.log('connected to database')
        app.listen(PORT, () => {
            console.log("Server is up and running")
        })
    })
    .catch(() => {
        console.log('Error')
    })

app.get('/', (req, res) => {
    res.send('hello from the backend')
})

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   fistName:
 *                     type: string
 *                     description: The user's first name
 *                   lastName:
 *                     type: string
 *                     description: The user's last name
 *                   email:
 *                     type: string
 *                     description: The user's email
 *                   password:
 *                     type: string
 *                     description: The user's password
 */

app.get('/api/users', async (req, res) => {
    try {
        const products = await User.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * @swagger
 * /api/user/:id:
 *   get:
 *     summary: Retrieve all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   fistName:
 *                     type: string
 *                     description: The user's first name
 *                   lastName:
 *                     type: string
 *                     description: The user's last name
 *                   email:
 *                     type: string
 *                     description: The user's email
 *                   password:
 *                     type: string
 *                     description: The user's password
 */

app.get('/api/user/:id', async (req, res) => {

    try {
        const id = req.params.id
        const product = await User.findById(id)
        res.status(200).json(product)
        if (!product) {
            return res.status(404).json({ error: 'Course not found' });
        }
    } catch (error) {
        return res.status(404).json({ error: 'Course not found' });
    }
})

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Add a user
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   fistName:
 *                     type: string
 *                     description: The user's first name
 *                   lastName:
 *                     type: string
 *                     description: The user's last name
 *                   email:
 *                     type: string
 *                     description: The user's email
 *                   password:
 *                     type: string
 *                     description: The user's password
 */

app.post('/api/user', async (req, res) => {
    try {
        const product = await User.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * @swagger
 * /api/product/:id:
 *   put:
 *     summary: Edit a user
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   fistName:
 *                     type: string
 *                     description: The user's first name
 *                   lastName:
 *                     type: string
 *                     description: The user's last name
 *                   email:
 *                     type: string
 *                     description: The user's email
 *                   password:
 *                     type: string
 *                     description: The user's password
 */


app.put('/api/product/:id', async (req, res) => {
    try {
        const id = req.params.id
        const product = await User.findByIdAndUpdate(id, req.body)

        if (!product) {
            return res.status(400).json({ message: error.message })
        }

        const updatedProduct = await User.findById(id);
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * @swagger
 * /api/product/:id:
 *   delete:
 *     summary: Delete a user
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   fistName:
 *                     type: string
 *                     description: The user's first name
 *                   lastName:
 *                     type: string
 *                     description: The user's last name
 *                   email:
 *                     type: string
 *                     description: The user's email
 *                   password:
 *                     type: string
 *                     description: The user's password
 */


app.delete('/api/product/:id', async (req, res) => {
    try {
        const id = req.params.id
        const product = await User.findByIdAndDelete(id, req.body)

        if (!product) {
            return res.status(404).json({ message: error.message })
        }

        res.status(200).json({ message: "Product deleted succesfully" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})