const express = require('express');
const authMiddleware = require('../middlewares/auth');
const AzureStorage = require('../middlewares/azureMulter');

const Notice = require('../models/notice');
const router = express.Router();
router.use(authMiddleware);


router.get('/', async (req,res)=>{
    try{
        const {page}=req.query;
        const notices = await Notice.paginate({}, {page:parseInt(page), limit: 12});
        return res.send(notices);
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
        const notice = await Notice.create(data);
        return res.send({notice});
    }catch{
        return res.status(400).send({error: 'Error creating new notice doc'});
    };
});

router.get('/:noticeId', async (req,res)=>{
    try{
        const notice = await Notice.findById(req.params.noticeId);
        if(!notice)
            return res.status(404).send({error: 'Notice doc not found'});
        return res.send({notice});
    }catch{
        return res.status(400).send({error: 'Error loading notice doc'});
    }
});

router.put('/:noticeId', async (req,res)=>{
    try{
        const {title} = req.body;
        const notice = await Notice.findByIdAndUpdate(req.params.noticeId,
            {title},{new:true});
        return res.send({notice});
    }catch{
        return res.status(400).send({error: 'Error updating event'});
    }
});

router.delete('/:noticeId', async (req,res)=>{
    try{
        const notice = await Notice.findById(req.params.noticeId);
        if(!notice)
            return res.status(404).send({error: 'Notice doc not found'});
        await Notice.remove(notice);
        return res.status(200).send();
    }catch{
        return res.status(400).send({error: 'Error deleting notice doc'});
    }
});

module.exports = app => app.use('/notice',router);