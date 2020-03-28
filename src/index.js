require('dotenv').config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const express = require('express');
const app = express();
const cors = require('cors')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require('body-parser');
const morgan = require('morgan');
    
const port = process.env.PORT || 3333;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "Tag API CMDCA",
        description: "API design for module tag sofwtare",
        contact: {
          name: "Amazing Developer"
        },
        servers: ["http://localhost:3333"]
      }
    },
    // ['.routes/*.js']
    apis: ["src/index.js","src/app/controllers/event.js","src/app/controllers/authController.js"]
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
  // Routes

  /**
   * @swagger
   * /home:
   *  get:
   *    description: Use to request all customers
   *    responses:
   *      '200':
   *        description: A successful response
   */
app.get('/home', (req,res)=>{
    res.status(200).send("ok");
});

require('./app/controllers/index')(app);

app.listen(port,()=>{
    console.log(`server enable listening ${port}!`)
});

module.exports = app;