import express from "express";

const app = express();
const PORT = 3006;
const contacts = [];

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));




app.get('/', (req,res) => {
    // res.sendFile(`${import.meta.dirname}/views/home.html`); 
    res.render('home');
});
app.get('/confirm', (req,res) => {
    // res.sendFile(`${import.meta.dirname}/views/confirmation.html`); 
    res.render('confirmation');
});
app.get('/admin', (req,res) => {

    res.send(contacts);
});

app.listen(PORT,() =>{
    console.log(`Server is running at http://localhost:${PORT}`);
});  

app.post('/submit-form', (req,res) => {
    const contact = req.body;
    // console.log(contact);

    contacts.push(contact);

    res.render('confirmation', {contact});
});