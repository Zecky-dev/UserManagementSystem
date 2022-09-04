const connection = require('../connection/connection');

const controller = {
    // Get all users from database
    view: function(req,res){
            connection.query(
            'SELECT * FROM user WHERE status = "active"',
            function(err,results){
                if(err){
                    throw new Error(err.message);
                }
                else{
                    let removedUser = req.query.removedUser;
                    res.render('home',{results,removedUser});
                }
            }
            )
    },
    // Find user by Search
    find: function(req,res){
        let searchTerm = req.body.search;
        connection.query(
            "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?",
            ['%' + searchTerm + '%','%' + searchTerm + '%',],
            function(err,results){
                if(err){
                    throw new Error(err.message);
                }
                else{
                    res.render('home',{results});
                }
            }
        );
    },

    form: function(req,res){
        let {first_name,last_name,email,phone,comments} = req.body;
        connection.query(
            "INSERT INTO user(first_name,last_name,email,phone,comments) VALUES (?,?,?,?,?);",
            [first_name,last_name,email,phone,comments],
            function(err,result){
                if(err){
                    throw new Error(err.message);
                }
                else{
                    console.log(result);
                    res.render('addUser',{
                        message: 'User added successfully!',
                        userAdded: true,
                        title: 'Add User',
                        action: 'addUser'
                    });
                }
            }
        )
    },

    editGet: function(req,res){
        let id = req.params.id;
        connection.query(
            "SELECT * FROM user WHERE id = ?",
            [id],
            function(err,result){
                if(err) {throw Error(err.message);}
                else{
                    let {first_name,last_name,email,phone,comments} = result[0];
                    res.render('editUser',{
                        userID: id,
                        first_name,last_name,email,phone,comments,
                        title: 'Edit User',
                        action: 'editUser'
                    });
                }
            }
        )
    },

    editPost: function(req,res){
        let {first_name,last_name,email,phone,comments} = req.body;
        console.log(req.params.id);
        connection.query(
            "UPDATE user SET first_name=?, last_name=?,email=?,phone=?,comments=? WHERE id=?",
            [
                first_name,
                last_name,
                email,
                phone,
                comments,
                req.params.id
            ],
            function(err,results){
                if(err) { throw new Error(err.message) }
                else{
                    res.render(
                        'editUser',{
                            title: 'Edit User',
                            action: 'editUser',
                            message: 'User updated successfully!',
                            userUpdated: true,
                            first_name,
                            last_name,
                            email,
                            phone,
                            comments
                        }
                    );
                    console.log(results);
                }
            }
        )
    },

    remove: function(req,res){
        let id = req.params.id;
        connection.query("DELETE FROM user WHERE id = ?",[id],function(err,result){
            if(err){throw new Error(err.message)}
            else{
                let removedUser = 'User removed successfully!';
                res.redirect('/?removedUser='+removedUser);
            }
        })
    },

    showDetails: function(req,res){
        let id = req.params.id;
        new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM user WHERE id = ?",[id],function(err,result){
                if(err){
                    reject(err.message);
                }
                else{
                    resolve(result);
                }
            })
        }).then(
            (data) => {
                let {first_name,last_name,email,phone,comments} = data[0];
                res.render('viewUser',{
                    title: 'View User',
                    first_name,
                    last_name,
                    email,
                    phone,
                    comments
                });
            }
        )
    }

}


module.exports = controller;