require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const api = express()


const PORT = process.env.PORT;

api.use(express.json())
api.use(express.urlencoded({ extended: true }))
api.use(helmet.contentSecurityPolicy())
api.use(helmet.permittedCrossDomainPolicies())
api.use(helmet.hidePoweredBy())
api.use(helmet.hsts())
api.use(helmet.referrerPolicy());
api.use(helmet.noSniff())
api.use(helmet.xssFilter())
api.use(helmet.frameguard())

//require this for all routes
api.use(express.json())
api.use(express.urlencoded({ extended: true }))


//require major routes
api.post('/message', (request, response) => {
    const { message } = request.body;
    response.status(200).send(`Message posted ${message}`);
})

api.get('/', (request, response) => {
    response.status(200).send('Ghost api');
})

api.get('/stat', (request, response) => {
    response.status(200).send('233 people just clicked on the link');
})

api.all('*', (request, response) => {
    response.status(200).send('Ghost route has ghosted');
});


api.listen(PORT, ()=> {
  console.log(`Ghost listening on port ${PORT}`)
})