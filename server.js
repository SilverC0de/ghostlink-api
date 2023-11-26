require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const { WebClient } = require('@slack/web-api');
const api = express()


const slack = new WebClient(process.env.SLACK_TOKEN, {});


const PORT = process.env.PORT;
const channelId = process.env.SLACK_CHANNEL_ID;


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
api.use(cors())

//require this for all routes
api.use(express.json())
api.use(express.urlencoded({ extended: true }))


//require major routes
api.post('/message', async (request, response) => {
    const { message } = request.body;

    // Send message
    try {
        const posted = await slack.chat.postMessage({
            text: message,
            channel: channelId,
        });
    
        if(!posted) {
            response.status(500).json({
                status: false,
                message: 'Unable to post message at this time'
            });
        } 
    
        response.status(200).json({
            status: true,
            message: 'Message posted'
        });
    } catch (e) {
        response.status(400).json({
            status: false,
            message: 'System error, try again later'
        });
    }
})

api.get('/', (request, response) => {
    response.status(200).send('Ghost api');
})

api.get('/stat', (request, response) => {
    response.status(200).json({
        status: true,
        message: 'System stats retrieved',
        data: {
            clicks: '33 people just clicked on the link'
        }
    });
})

api.all('*', (request, response) => {
    response.status(404).json({
        status: false,
        message: 'Ghost route has ghosted'
    });
});

api.listen(PORT, ()=> {
  console.log(`Ghost listening on port ${PORT}`)
})