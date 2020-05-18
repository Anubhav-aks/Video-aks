const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { Video } = require('../model/video.js')

const db = 'mongodb+srv://Anubhav:NnQCPZRSbS2tsERu@cluster0-s0uiw.mongodb.net/test?retryWrites=true&w=majority'
// mongoose.Promise = global.Promise;

mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => {

   if (err)
      console.error('Error! ' + err)
})


router.get('/videos', (req, res) => {
   console.log('Get req for all videos')
   Video.find((err, doc) => {
      if (!err) {
         res.send(doc)
      }
      else {
         console.log('Error' + err)
      }
   })
})

router.get('/videos/:id',(req,res)=>{
console.log('get req for a single video')
Video.findById(req.params.id)
.exec((err,doc)=>{
   if(!err){
      res.json(doc)
   }
   else{
      console.log("Error! "+err)
   }
})
})

router.post('/video',  (req, res)=> {
   console.log('Post a video');
   var newVideo = new Video();
   newVideo.title = req.body.title;
   newVideo.url = req.body.url;
   newVideo.description = req.body.description;
   newVideo.save(function (err, insertedVideo) {
      if (err) {
         console.log('Error saving video');
      }
      else {
         res.json(insertedVideo);
      }
   });
});

router.put('/video/:id',(req,res)=>{
   Video.findByIdAndUpdate(req.params.id,
      {$set:{title:req.body.title,url:req.body.url,description:req.body.description}},
      {new :true},
      (err,updatedData)=>{
         if(!err){
            res.json(updatedData)
         }
         else{
            res.send("Error in uploading")
         }
      })
})

router.delete('/video/:id',(req,res)=>{
   Video.findByIdAndRemove(req.params.id,
      (err,Data)=>{
         if(!err){
            res.json(Data)
         }
         else{
            res.send("Error in Deleting")
         }
      })
})





module.exports = router;