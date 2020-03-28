const express = require('express');
const authMiddleware = require('../middlewares/auth');
const AzureStorage = require('../middlewares/azureMulter');

const Advisor = require('../models/advisor');
const router = express.Router();
router.use(authMiddleware);

router.get('/', async (req,res)=>{
    try{
        const {page}=req.query;
        const advisors = await Advisor.paginate({}, {page:parseInt(page), limit: 6});
        return res.send(advisors);
    }catch{
        return res.status(400).send({error: 'Error loading advisors'});
    }
});

router.post('/', AzureStorage.any() ,async (req,res)=>{
    try{
        const data ={
            image_url:req.files[0].url,
            name:req.body.name,
            action:req.body.action,
            contact:req.body.contact,
            about:req.body.about,
        }
        const advisor = await Advisor.create(data);
        return res.send({advisor});
    }catch{
        return res.status(400).send({error: 'Error creating new advisor'});
    }
});

router.get('/:advisorId', async (req,res)=>{
    try{
        const advisor = await Advisor.findById(req.params.advisorId);
        if(!advisor)
            return res.status(404).send({error: 'Advisor doc not found'});
        return res.send({advisor});
    }catch{
        return res.status(400).send({error: 'Error loading advisor'});
    }
});

router.put('/:advisorId', async (req,res)=>{
    try{
        const {name, about, contact, action} = req.body;
        const advisor = await Advisor.findByIdAndUpdate(req.params.advisorId,
            {name, about, contact, action},{new:true});
        return res.send({advisor});
    }catch{
        return res.status(400).send({error: 'Error updating advisor'});
    }
});

router.delete('/:advisorId', async (req,res)=>{
    try{
        const advisor = await Advisor.findById(req.params.advisorId);
        if(!advisor)
            return res.status(404).send({error: 'Advisor not found'});
        await Advisor.remove(advisor);
        return res.status(200).send();
    }catch{
        return res.status(400).send({error: 'Error deleting advisor'});
    }
});

module.exports = app => app.use('/advisor',router);
