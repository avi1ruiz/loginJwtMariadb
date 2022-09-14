import pool from '../database.js'
import jwt from 'jsonwebtoken'

export const renderSignUp = (req, res) => {
    res.render('pages/signup.hbs')
}

export const signUpFunc = async (req, res) => {
    const {username, email, password, confirmPassword} = req.body
    
    if( confirmPassword != password ) {
        return res.send('Contraseñas no coinciden')
    }

    await pool.query(`INSERT INTO users (username, email, pass) VALUES ('${username}', '${email}', '${password}')`)
        .catch(error => console.log(error))

    res.redirect('/signin')
}

export const renderSignIn = (req, res) => {
    res.render('pages/signin.hbs')
}

export const signInFunc = async (req, res) => {
    const {email, password} = req.body
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    
    if( rows == null || password != rows[0]['pass']) {
        return res.json('email or password incorrect')
    }

    const userJwt = {
        id: rows[0]['id'],
        username: rows[0]['username']
    }

    let token = await jwt.sign(JSON.stringify(userJwt), 'secret');

    res.cookie('token', token).redirect('/profile')
}

export const verifyToken = (req, res, next) => {
    let { token } = req.cookies
    jwt.verify(token, 'secret', (err, decoded) => {
        err ? res.redirect('/signin') : next()
    })
}


export const renderProfile = async (req, res) => {
    let { token } = req.cookies

    let { username } = jwt.verify(token, 'secret')

    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [ username ])
    res.render('pages/profile.hbs', {userProf : rows})
}

