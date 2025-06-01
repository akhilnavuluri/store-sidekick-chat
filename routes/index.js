var express = require('express');
var router = express.Router();

router.post('/chat', function(req, res) {
  res.json({ reply: 'Mock reply from Store Sidekick Chat' });
});

module.exports = router;
