import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { create } from 'express-handlebars'
import router from './Routes/Routes.js'

import { dirname, join }from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

//Inicializar express
const app = express();

//Configuraciones
app.set("port", process.env.PORT || 3000);
app.set('views', join(__dirname, 'Views'));
app.engine('.hbs', create({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: 'hbs'
}).engine);
app.set('view engine', '.hbs');

//Middleware
app.use(morgan('dev'));
app.use(cookieParser())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Rutas
app.use(router)

export default app