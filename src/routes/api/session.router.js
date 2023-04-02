import { Router } from "express";
import passport from "passport";
import userModel from "../../dao/models/user.model.js";
import { createHash, isValidPassword } from "../../utils.js";

const router = Router();


router.post('/register', passport.authenticate('register', { failureRedirect: 'fail-register'}) ,async (req, res) => {
   res.send({ status: 'success', message: 'User registered'});
})

router.get('/fail-register', (req, res) => {
    res.send({ status: 'error', message: 'Register failed'})
})

router.post('/login', passport.authenticate('login', { failureRedirect: 'fail-login'}) ,async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: 'error', message: 'Invalid credentials'})
    }

    let rol = 'user'

    if (req.user.email.substring(0,5) === 'admin') rol = 'admin'

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        rol
    }

    res.send({status:'success', message:'Login success'})
})

router.get('/fail-login', (req, res) => {
    res.send({ status: 'error', message: 'Login failed'})
})

router.post('/reset', async (req, res) => {
    const { email, password} = req.body

    if (!email || !password) {
        return res.status(400).send({ status: 'error', message: 'Incomplete values' })
    }

    try {
        const user = await userModel.findOne({ email: email })


        if (!user) {
            return res.status(404).send({ status: 'error', error: 'User not found'})
        }

        user.password = createHash(password)

        await userModel.updateOne({ email: email}, user)

        res.send({ status: 'success', message: 'Login success'})

    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
})


router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: 'error', error: 'couldnt logout' });
        res.redirect('/login');
    })
});

export default router