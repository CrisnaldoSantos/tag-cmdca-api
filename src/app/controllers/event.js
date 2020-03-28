const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Event = require('../models/event');

const router = express.Router();
router.use(authMiddleware);

 /**
   * @swagger
   * /events:
   *  get:
   *    description: Use to request all customers
   *    responses:
   *      '200':
   *        description: A successful response
   */
router.get('/', async (req,res)=>{
    try{
        const {page}=req.query;
        const events = await Event.paginate({}, {page:parseInt(page), limit: 12, populate:'createdBy' });
        return res.send(events);
    }catch{
        return res.status(400).send({error: 'Error loading events'});
    }
});

router.post('/', async (req,res)=>{
    try{
        const event = await Event.create({...req.body, createdBy: req.userId});
        return res.send({event});
    }catch{
        return res.status(400).send({error: 'Error creating new event'});
    }
});

router.get('/:eventId', async (req,res)=>{
    try{
        const event = await Event.findById(req.params.eventId).populate('createdBy');
        if(!event)
            return res.status(404).send({error: 'Event not found'});
        return res.send({event});
    }catch{
        return res.status(400).send({error: 'Error loading event'});
    }
});

router.put('/:eventId', async (req,res)=>{
    try{
        const {name, location, date, hour} = req.body;
        const event = await Event.findByIdAndUpdate(req.params.eventId,
            {name, location, date, hour},{new:true});
        return res.send({event});
    }catch{
        return res.status(400).send({error: 'Error updating event'});
    }
});

router.delete('/:eventId', async (req,res)=>{
    try{
        const event = await Event.findById(req.params.eventId);
        if(!event)
            return res.status(404).send({error: 'Event not found'});
        await Event.remove(event);
        return res.status(200).send();
    }catch{
        return res.status(400).send({error: 'Error deleting new event'});
    }
});

module.exports = app => app.use('/events',router);