//Carregando módulos
   const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    const admin = require("./routes/admin")
    const path = require("path")
    const mongoose = require("mongoose")
    const session = require("express-session")
    const flash = require("connect-flash")

//Config
    //Sessão
        var sessionStore = new session.MemoryStore;
        app.use(session({
            secret: 'minhaappnode@@',
            resave: true,
            saveUninitialized: true,
            cookie: { maxAge: 60000 },
            store: sessionStore 
        }))
        app.use(flash())
    //Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg');
            res.locals.error_msg = req.flash("error_msg");
            next();
        })
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        }
        }));
        app.set('view engine', 'handlebars')
    //Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/blogapp",{   
        useNewUrlParser:true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Conectado ao Banco de Dados!")
    }).catch((erro) => {
        console.log("Um erro ao se conectar com o DB:" + erro)
    })
    //Public
        app.use(express.static(path.join(__dirname, "public")))

//Rotas
    app.get('/', (req, res) => {
        res.send("Pagina principal")
    })
    app.use('/admin', admin)

//Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log("Servidor Rodando!")
})