//Server starts here
const express = require('express');
const app = express();
app.listen(3000, () => console.log('Server started on port 3000'));

// Database connection starts here
const mongoose = require('mongoose');
app.use(express.json());
mongoose
.connect('mongodb+srv://admin:admin@cluster0.gzqwq.mongodb.net/Gold-Loan-Management?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("Database Connected Successfully");
})



//Collections get here
const customers = require('./models/CustomerDetails');





//Requests sends here
app.get('/test',async (req,res) =>  {

  const test = {

    name : "kk",

  }

  res.send(test);

})

app.post('/register',async (req, res) => {

    const { name, whatsApp, NIC } = req.body

    const oldCustomer = await customers.findOne({ NIC:NIC});

    if(oldCustomer){
        return res.send({status: 'fail',data:"Customer Already Registered"});
    }

    try {
        
        await customers.create({
            name:name,
            whatsApp:whatsApp,
            NIC:NIC
        });

        res.send({status: 'success', data:"Customer Registered Successfully"});


    } catch (error) {
      res.send({status: "Error While Registering Customer", data: error});
    }

})
