const express = require('express');
const authMiddleware = require('../middlewares/auth');
const AzureStorage = require('../middlewares/azureMulter');

const Record = require('../models/record');
const router = express.Router();
router.use(authMiddleware);


router.get('/', async (req,res)=>{
    try{
        const {page}=req.query;
        const records = await Record.paginate({}, {page:parseInt(page), limit: 12});
        return res.send(records);
    }catch{
        return res.status(400).send({error: 'Error loading events'});
    }
});

router.post('/', AzureStorage.any() ,async (req,res)=>{
    try{
        const data ={
            url:req.files[0].url,
            title:req.body.title,
        }
        const record = await Record.create(data);
        return res.send({record});
    }catch{
        return res.status(400).send({error: 'Error creating new record doc'});
    };
});

router.get('/:recordId', async (req,res)=>{
    try{
        const record = await Record.findById(req.params.recordId);
        if(!record)
            return res.status(404).send({error: 'Record doc not found'});
        return res.send({record});
    }catch{
        return res.status(400).send({error: 'Error loading record doc'});
    }
});

router.put('/:recordId', async (req,res)=>{
    try{
        const {title} = req.body;
        const record = await Record.findByIdAndUpdate(req.params.recordId,
            {title},{new:true});
        return res.send({record});
    }catch{
        return res.status(400).send({error: 'Error updating event'});
    }
});

router.delete('/:recordId', async (req,res)=>{
    try{
        const record = await Record.findById(req.params.recordId);
        if(!record)
            return res.status(404).send({error: 'Record doc not found'});
        await Record.remove(record);
        return res.status(200).send();
    }catch{
        return res.status(400).send({error: 'Error deleting record doc'});
    }
});

module.exports = app => app.use('/record',router);