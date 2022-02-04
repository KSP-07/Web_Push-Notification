const express=require('express')
const webpush=require('web-push')
const bodyParser=require('body-parser')
const path=require('path')

const app=express();  // app var

//set static path
app.use(express.static(path.join(__dirname,"client")));

app.use(bodyParser.json());

// const vapidKeys=webpush.generateVAPIDKeys();
// console.log(vapidKeys)

const publicVapidKey='BDnQD1XJNlCKd7_u1aCYZ8_LubRE-dDEgBs_apkFIhzIb_eu2XyVzQqhsLR8_ZxN5nGTQ0EeVgpEhQ2coWmFFvA'
const privateVapidKey='zRbL-YLmk07JHfpQJtom7HakVT8rOCi18Gn3k34OkFw'

webpush.setVapidDetails(
    'mailto:abc@abc.com',
    publicVapidKey,privateVapidKey);

//subscribe route   - client to this route..it will be responsible for sending the notification

app.post('/subscribe',(req,res)=>{
    //Get pushSubscription object
    const subscription=req.body;

    //send 201=resource created
    res.status(201).json({});

    //create payload
    const payload=JSON.stringify({title:'Push Test'});

    //pass object into sendNotification
    webpush.sendNotification(subscription,payload).catch(err=>console.error(err));
});

const port=5000;
app.listen(port, () => console.log(`Server started on port ${port}`));