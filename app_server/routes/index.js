var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');

/* Location pages  */
router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new',ctrlLocations.addReview);
/* Location pages  */
router.get('/about', ctrlOthers.about);
module.exports = router;
