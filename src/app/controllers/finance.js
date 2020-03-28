const express = require('express');
const authMiddleware = require('../middlewares/auth');
const AzureStorage = require('../middlewares/azureMulter');

const Finance = require('../models/finance');
const router = express.Router();
router.use(authMiddleware);


router.get('/', async (req,res)=>{
    try{
        const {page}=req.query;
        const finances = await Finance.paginate({}, {page:parseInt(page), limit: 12});
        return res.send(finances);
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
        const finance = await Finance.create(data);
        return res.send({finance});
    }catch{
        return res.status(400).send({error: 'Error creating new finance doc'});
    };
});

router.get('/:financeId', async (req,res)=>{
    try{
        const finance = await Finance.findById(req.params.financeId);
        if(!finance)
            return res.status(404).send({error: 'Finance doc not found'});
        return res.send({finance});
    }catch{
        return res.status(400).send({error: 'Error loading finance doc'});
    }
});

router.put('/:financeId', async (req,res)=>{
    try{
        const {title} = req.body;
        const finance = await Finance.findByIdAndUpdate(req.params.financeId,
            {title},{new:true});
        return res.send({finance});
    }catch{
        return res.status(400).send({error: 'Error updating event'});
    }
});

router.delete('/:financeId', async (req,res)=>{
    try{
        const finance = await Finance.findById(req.params.financeId);
        if(!finance)
            return res.status(404).send({error: 'Finance doc not found'});
        await Finance.remove(finance);
        return res.status(200).send();
    }catch{
        return res.status(400).send({error: 'Error deleting finance doc'});
    }
});

module.exports = app => app.use('/finance',router);