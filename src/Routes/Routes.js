import { Router } from "express";
import { 
    renderProfile, 
    renderSignIn, 
    renderSignUp, 
    signInFunc, 
    signUpFunc, 
    verifyToken } 
from "../Controllers/controllers.js";

const router = Router();

// Pagina principal
router.get('/', (req, res) => {
    res.render('pages/home.hbs')
})

// Rutas de sesion
router.get('/signup', renderSignUp)
router.post('/signup', signUpFunc)

router.get('/signin', renderSignIn)
router.post('/signin', signInFunc)

// Pagina del usuario
router.get('/profile', verifyToken, renderProfile)

export default router;