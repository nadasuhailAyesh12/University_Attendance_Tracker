const sectionController = require('../Controllers/SectionController');
const isAuthenticatedUser = require('../middlewars/AuthMiddleware');
const sectionRouter = require('express').Router();

sectionRouter.post('/:id', isAuthenticatedUser, sectionController.addSectionandLecture);
sectionRouter.get('/:id', isAuthenticatedUser, sectionController.getSectionsRecordsRelatedtoCourse);

module.exports = sectionRouter;



