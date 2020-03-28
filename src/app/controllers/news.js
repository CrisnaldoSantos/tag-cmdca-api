const express = require('express');
const authMiddleware = require('../middlewares/auth');
const AzureStorage = require('../middlewares/azureMulter');

const News = require('../models/news');
const router = express.Router();
router.use(authMiddleware);


router.get('/', async (req,res)=>{
    try{
        const {page}=req.query;
        const news = await News.paginate({}, {page:parseInt(page), limit: 12});
        return res.send(news);
    }catch{
        return res.status(400).send({error: 'Error loading news'});
    }
});

router.post('/', AzureStorage.any() ,async (req,res)=>{
    try{
        const data ={
            url:req.files[0].url,
            title:req.body.title,
            content:req.body.content,
        }
        const news = await News.create(data);
        return res.send({news});
    }catch{
        return res.status(400).send({error: 'Error creating news'});
    };
});

router.get('/:newsId', async (req,res)=>{
    try{
        const news = await News.findById(req.params.newsId);
        if(!news)
            return res.status(404).send({error: 'News not found'});
        return res.send({news});
    }catch{
        return res.status(400).send({error: 'Error loading news'});
    }
});

router.put('/:newsId', async (req,res)=>{
    try{
        const {title, content} = req.body;
        const news = await News.findByIdAndUpdate(req.params.newsId,
            {title, content},{new:true});
        return res.send({news});
    }catch{
        return res.status(400).send({error: 'Error updating event'});
    }
});

router.delete('/:newsId', async (req,res)=>{
    try{
        const news = await News.findById(req.params.newsId);
        if(!news)
            return res.status(404).send({error: 'News not found'});
        await News.remove(news);
        return res.status(200).send();
    }catch{
        return res.status(400).send({error: 'Error deleting news'});
    }
});

module.exports = app => app.use('/news',router);