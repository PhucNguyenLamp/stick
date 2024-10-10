var express = require('express');
var router = express.Router();
var Message = require('../models/message');


router.get('/notes', async function (req, res, next) {
  const data = await Message.find();
  res.status(200).json(data);
});

router.post('/note', async function (req, res, next) {
  const data = new Message({
    _id: req.body._id,
    header: req.body.header,
    message: req.body.message,
    position: {
      x: req.body.position.x,
      y: req.body.position.y,
    },
    color: req.body.color,
  })
  await data.save();
  res.status(200).send();
});

router.patch('/note/:note_id', async function (req, res, next) {
  const note_id = req.params.note_id;
  const { position, header, message } = req.body;
  let updatedFields = {};
  if (position) updatedFields.position = position;
  if (header) updatedFields.header = header;
  if (message) updatedFields.message = message;

  await Message.findOneAndUpdate({ _id: note_id }, updatedFields);
  res.status(200).send();
})

router.delete('/note/:note_id', async function (req, res, next) {
  const note_id = req.params.note_id;
  await Message.findByIdAndDelete({ _id: note_id });
  res.status(200).send();
})

module.exports = router;
