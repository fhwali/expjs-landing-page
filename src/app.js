const express = require ('express')
const path = require ('path')
const hbs = require ('hbs')
require('./db/conn')
const User = require('./models/usermessage')
const app = express();

// Port set up
const port = process.env.PORT || 8000;

// Static Path
const staticPath = path.join(__dirname, '../public')

// Dynamic Path
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Middleware
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')))
app.use('/jq', express.static(path.join(__dirname, '../node_modules/jquery/dist')))

app.use(express.urlencoded({extended:false}))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(staticPath))

// Routing
app.get('/', (req, res) => {
    res.render('index')
})

app.post('/contact', async(req, res) => {
    try{
        const userData = new User(req.body)
        await userData.save()
        res.status(201).render('index')
    }catch(e) {
        res.status(500).send(e)
    }
})

app.listen(port, () => {
    console.log(`Connection is up on port ${port}`);
})