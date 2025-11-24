import express from "express";
import mysql2 from "mysql2";
import dotenv from 'dotenv';


dotenv.config();
const app = express();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise()



const PORT = 3003;
const contacts = [];

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));


app.get('/db-test', async(req,res) =>{
    try{
        const [contacts] = await pool.query('SELECT * FROM contacts');
        res.send(contacts);
    } catch(err){
        console.error('Database error:', err)
    }
});



app.get('/', (req,res) => {
    res.render('home');
});
app.get('/contact', (req,res) => {
    res.render('contact');
});
app.get('/confirm', (req,res) => {
    res.render('confirmation');
});


app.get('/admin', async (req, res) => {
    try{
        const [contacts] = await pool.query('SELECT * FROM contacts ORDER BY timestamp DESC');
        res.render('admin', {contacts});
    } catch(err){
        console.error('Database error:', err);
        res.status(500).send('Error loading contacts' + err.message);
    }
});

app.listen(PORT,() =>{
    console.log(`Server is running at http://localhost:${PORT}`);
});  

app.post('/submit-form', async (req,res) => {
    try{
        const contact = req.body;
        console.log('New contact submitted: ', contact);

        const sql = 
       `INSERT INTO contacts (firstName, lastName, jobTitle, company, linkedIn, email, meetWhere, other, message, mailingFormat, mailingList)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

            const params = [
            contact.fName,
            contact.lName,
            contact.job,
            contact.company,
            contact.linkedin || '',
            contact.email,
            contact.meet,
            contact.other || '',
            contact.message || '',
            contact.format || '',
            contact.mailing || ''
            ];


        const[result] = await pool.execute(sql, params);
        console.log('contact saved with Id:', result.insertId)
         res.render('confirmation', {contact});
    }catch(err){
        console.error('Database error:', err);
        res.status(500).send('Sorry there is a problem processing your Information:  ' + err.message);
    }

   
});