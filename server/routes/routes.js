const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/',userController.view);

router.post('/',userController.find);

router.get('/addUser',(req,res)=>{
    res.render('addUser',{
        title: 'Add User',
        action: 'addUser'
    });
});

router.post('/addUser',userController.form);

router.get('/editUser/:id',userController.editGet)

router.post('/editUser/:id',userController.editPost);

router.get('/:id',userController.remove);

router.get('/viewUser/:id',userController.showDetails)






module.exports = router;