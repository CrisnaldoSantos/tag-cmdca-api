const express = require('express');
const authMiddleware = require('../middlewares/auth');
const AzureStorage = require('../middlewares/azureMulter');

const Resolution = require('../models/resolution');
const router = express.Router();
router.use(authMiddleware);


router.get('/', async (req,res)=>{
    try{
        const {page}=req.query;
        const resolutions = await Resolution.paginate({}, {page:parseInt(page), limit: 12});
        return res.send(resolutions);
    }catch{
        return res.status(400).send({error: 'Error loading resolutions'});
    }
});

router.post('/', AzureStorage.any() ,async (req,res)=>{
    try{
        const data ={
            url:req.files[0].url,
            title:req.body.title,
            responsable:req.body.responsable,
            office:req.body.office,
        }
        const resolution = await Resolution.create(data);
        return res.send({resolution});
    }catch{
        return res.status(400).send({error: 'Error creating new resolution doc'});
    };
});

router.get('/:resolutionId', async (req,res)=>{
    try{
        const resolution = await Resolution.findById(req.params.resolutionId);
        if(!resolution)
            return res.status(404).send({error: 'Resolution doc not found'});
        return res.send({resolution});
    }catch{
        return res.status(400).send({error: 'Error loading resolution doc'});
    }
});

router.put('/:resolutionId', async (req,res)=>{
    try{
        const {title, responsable, office} = req.body;
        const resolution = await Resolution.findByIdAndUpdate(req.params.resolutionId,
            {title, responsable, office},{new:true});
        return res.send({resolution});
    }catch{
        return res.status(400).send({error: 'Error updating resolution'});
    }
});

router.delete('/:resolutionId', async (req,res)=>{
    try{
        const resolution = await Resolution.findById(req.params.resolutionId);
        if(!resolution)
            return res.status(404).send({error: 'Resolution doc not found'});
        await Resolution.remove(resolution);
        return res.status(200).send();
    }catch{
        return res.status(400).send({error: 'Error deleting resolution doc'});
    }
});

module.exports = app => app.use('/resolution',router);