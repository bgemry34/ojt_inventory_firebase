const functions = require('firebase-functions');
const admin = require('firebase-admin');

var serviceAccount = require("./inventory_permission.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://inventory-system-944c6.firebaseio.com"
});

const express = require('express');
const app = express();
const db = admin.firestore();


const cors = require('cors');
app.use( cors({origin:true}) );


const getId = () => {
    let currDate = new Date();
    let id = currDate.getFullYear().toString() + 
    currDate.getMonth().toString() + currDate.getDay().toString() + 
    currDate.getHours().toString() + currDate.getMinutes().toString() + currDate.getSeconds().toString();
    return id;
}

// app.get('/hello-world', (req, res)=>{
    
//     return res.status(200).send(id);
// });



//Create
app.post('/api/items/create', (req, res)=>{
    (async ()=>{
        try{
            let id = getId().toString()
            await db.collection('items').doc('/'+ id +'/')
            .create({
                name: req.body.name, 
                company : req.body.company ,
                model : req.body.model, 
                qty : req.body.qty, 
                price :req.body.price,
                depre_price :req.body.depre_price,
                department: req.body.department,
                purchase_order_no: req.body.purchase_order_no
            });

            return res.status(200).send({
                status:'success',
                data:{
                id,
                name: req.body.name, 
                company : req.body.company ,
                model : req.body.model, 
                qty : req.body.qty, 
                price :req.body.price,
                depre_price :req.body.depre_price,
                department: req.body.department,
                purchase_order_no: req.body.purchase_order_no
                }
            });
        }catch(e){
            return res.status(500).send({
                status:'failed',
                error:e
            });
        }
    })();
})

//Read
app.get('/api/items/read/:id', (req, res)=>{
    (async ()=>{
        try{
            const document =  db.collection('items').doc(req.params.id);
            const item = await document.get();
            let response = item.data();


            return res.status(200).send({
                status:'success',
                data: response
            });
        }catch(e){
            return res.status(500).send({
                status:'failed',
                error:e
            });
        }
    })();
})


app.get('/api/items/read', (req, res)=>{
    (async ()=>{
        try{
            let query = db.collection('items');
            let response = [];

            await query.get().then(querySnapshot=>{
                let docs = querySnapshot.docs;
                
                for(let doc of docs){
                    const {id} = doc;
                    const {name, company, model, qty, price, depre_price, department, purchase_order_no} =doc.data();
                    const selectedItem = {
                        id, name, company, model, qty, price, depre_price, department, purchase_order_no
                    }
                    response.push(selectedItem)
                }
            })

            return res.status(200).send({
                status:'success',
                data: response
            });
        }catch(e){
            return res.status(500).send({
                status:'failed',
                error:e
            });
        }
    })();
})

//Count
app.get('/api/items/count', (req, res)=>{
    (async ()=>{
        try{
            let query = db.collection('items');
            let response = '';

            await query.get().then(querySnapshot=>{
                response = querySnapshot.size;
            })

            return res.status(200).send({
                status:'success',
                data: response
            });
        }catch(e){
            return res.status(500).send({
                status:'failed',
                error:e
            });
        }
    })();
})


//Update

app.put('/api/items/update/:id', (req, res)=>{
    (async ()=>{
        try{
            const document = db.collection('items').doc(req.params.id);
            const item = await document.get();
            await document.update({
                name: req.body.name, 
                company : req.body.company ,
                model : req.body.model, 
                qty : req.body.qty,
                price :req.body.price,
                depre_price :req.body.depre_price,
                department: req.body.department,
                purchase_order_no: req.body.purchase_order_no
            })
            return res.status(200).send({
                status:'success',
                data:item
            });
        }catch(error){
            return res.status(500).send({
                status:'failed',
                error,
                param:req.body.name
            });
        }
    })();
})

//Delete
app.delete('/api/items/delete/:id', (req, res)=>{
    (async ()=>{
        try{
            const document = db.collection('items').doc(req.params.id);
            const item = await document.get();
            await document.delete();

            return res.status(200).send({
                status:'success',
                data:item
            });
        }catch(e){
            return res.status(500).send({
                status:'failed',
                error:e
            });
        }
    })();
})


//Company

//Create
app.post('/api/company/create', (req, res)=>{
    (async ()=>{
        try{
            let id = getId().toString()
            await db.collection('companies').doc('/'+ id +'/')
            .create({
                name: req.body.name
            });

            return res.status(200).send({
                status:'success',
                data:{
                id,
                name: req.body.name
                }
            });
        }catch(e){
            return res.status(500).send({
                status:'failed',
                error:e
            });
        }
    })();
});

//Read
app.get('/api/company/read/:id', (req, res)=>{
    (async ()=>{
        try{
            const document =  db.collection('companies').doc(req.params.id);
            const company = await document.get();
            let response = item.data();


            return res.status(200).send({
                status:'success',
                data: response
            });
        }catch(e){
            return res.status(500).send({
                status:'failed',
                error:e
            });
        }
    })();
});

app.get('/api/company/read', (req, res)=>{
    (async ()=>{
        try{
            let query = db.collection('companies');
            let response = [];

            await query.get().then(querySnapshot=>{
                let docs = querySnapshot.docs;
                
                for(let doc of docs){
                    const {id} = doc;
                    const {name} =doc.data();
                    const selectedItem = {
                        id, name
                    }
                    response.push(selectedItem)
                }
            })

            return res.status(200).send({
                status:'success',
                data: response
            });
        }catch(e){
            return res.status(500).send({
                status:'failed',
                error:e
            });
        }
    })();
})

//Count
app.get('/api/company/count', (req, res)=>{
    (async ()=>{
        try{
            let query = db.collection('companies');
            let response = '';

            await query.get().then(querySnapshot=>{
                response = querySnapshot.size;
            });

            return res.status(200).send({
                status:'success',
                data: response
            });
        }catch(e){
            return res.status(500).send({
                status:'failed',
                error:e
            });
        }
    })();
});



//Update

app.put('/api/company/update/:id', (req, res)=>{
    (async ()=>{
        try{
            const document = db.collection('companies').doc(req.params.id);
            await document.update({
                name: req.body.name
            })
            return res.status(200).send({
                status:'success'
            });
        }catch(error){
            return res.status(500).send({
                status:'failed',
                error,
                param:req.body.name
            });
        }
    })();
})

//Delete
app.delete('/api/company/delete/:id', (req, res)=>{
    (async ()=>{
        try{
            const document = db.collection('companies').doc(req.params.id);
            await document.delete();
            

            return res.status(200).send({
                status:'success'
            });
        }catch(e){
            return res.status(500).send({
                status:'failed',
                error:e
            });
        }
    })();
})


//Department

//Create
app.post('/api/department/create', (req, res)=>{
    (async ()=>{
        try{
            let id = getId().toString()
            await db.collection('departments').doc('/'+ id +'/')
            .create({
                name: req.body.name
            });

            return res.status(200).send({
                status:'success',
                data:{
                id,
                name: req.body.name
                }
            });
        }catch(e){
            return res.status(500).send({
                status:'failed',
                error:e
            });
        }
    })();
})

//Read
app.get('/api/department/read/:id', (req, res)=>{
    (async ()=>{
        try{
            const document =  db.collection('departments').doc(req.params.id);
            const department = await document.get();
            let response = department.data();


            return res.status(200).send({
                status:'success',
                data: response
            });
        }catch(e){
            return res.status(500).send({
                status:'failed',
                error:e
            });
        }
    })();
})


app.get('/api/department/read', (req, res)=>{
    (async ()=>{
        try{
            let query = db.collection('departments');
            let response = [];

            await query.get().then(querySnapshot=>{
                let docs = querySnapshot.docs;
                
                for(let doc of docs){
                    const {id} = doc;
                    const {name} =doc.data();
                    const selectedItem = {
                        id, name
                    }
                    response.push(selectedItem)
                }
            })

            return res.status(200).send({
                status:'success',
                data: response
            });
        }catch(e){
            return res.status(500).send({
                status:'failed',
                error:e
            });
        }
    })();
});

//Count
app.get('/api/department/count', (req, res)=>{
    (async ()=>{
        try{
            let query = db.collection('departments');
            let response = '';

            await query.get().then(querySnapshot=>{
                response = querySnapshot.size;
            });

            return res.status(200).send({
                status:'success',
                data: response
            });
        }catch(e){
            return res.status(500).send({
                status:'failed',
                error:e
            });
        }
    })();
});



//Update

app.put('/api/department/update/:id', (req, res)=>{
    (async ()=>{
        try{
            const document = db.collection('department').doc(req.params.id);
            await document.update({
                name: req.body.name
            })
            return res.status(200).send({
                status:'success'
            });
        }catch(error){
            return res.status(500).send({
                status:'failed',
                error
            });
        }
    })();
})

//Delete
app.delete('/api/department/delete/:id', (req, res)=>{
    (async ()=>{
        try{
            const document = db.collection('departments').doc(req.params.id);
            await document.delete();
            

            return res.status(200).send({
                status:'success'
            });
        }catch(e){
            return res.status(500).send({
                status:'failed',
                error:e
            });
        }
    })();
});

//USER
app.get('/api/department/users/read', (req, res)=>{
    (async ()=>{
        const listAllUsers = (nextPageToken) => {
            // List batch of users, 1000 at a time.
            admin
              .auth()
              .listUsers(1000, nextPageToken)
              .then((listUsersResult) => {
                listUsersResult.users.forEach((userRecord) => {
                  console.log('user', userRecord.toJSON());
                });
                if (listUsersResult.pageToken) {
                  // List next batch of users.
                  listAllUsers(listUsersResult.pageToken);
                }
              })
              .catch((error) => {
                console.log('Error listing users:', error);
              });
          };
          // Start listing users from the beginning, 1000 at a time.
          listAllUsers();

          return res.status(200).send({
            status:'success',
            data:users
        });
    })();
});


//Export the api to firebase
exports.app = functions.https.onRequest(app);