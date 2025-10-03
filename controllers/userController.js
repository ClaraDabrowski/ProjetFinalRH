const bcrypt = require('bcrypt')
const { PrismaClient } = require("../generated/prisma/client")
const hashExtension = require("../middleware/extensions/userHashPassword")
const validateUser = require('../middleware/extensions/validateUser')
const prisma = new PrismaClient().$extends(hashExtension).$extends(validateUser)



exports.displayRegister = async (req, res) => {
    res.render("pages/register.twig")
}

exports.postUser = async (req, res) => {
    try {
        if (req.body.password == req.body.confirm) {
            const company = await prisma.company.create({

                data: {
                    raisonSocial: req.body.raisonSocial,
                    siret: req.body.siret,
                    lastName: req.body.lastName,
                    password: req.body.password,
                }
            })

            res.redirect("/login")

        } else {
            const error = new Error("Les mots de passe ne correspondent pas")
            error.confirm = error.message
            throw error
        }
    } catch (error) {
        console.log(error);
        
        if (error.code == 'P2002') {
            res.render("pages/register.twig", {
                duplicateSiret: 'Ce SIRET est déjà utilisé'
            })

        } else {
            res.render("pages/register.twig", {
                errors: error.details,
                confirmError: error.confirm ? error.confirm : null
            })
        }
    }
}



exports.displayLogin = async (req, res) => {
    res.render("pages/login.twig")
}

exports.login = async (req, res) => {
    try {
        const error = {}
        const company = await prisma.company.findUnique({
            where: {
                siret: req.body.siret
            }
        })

        if (company) {
            if (bcrypt.compareSync(req.body.password, company.password)) {
                req.session.company = company
                res.redirect("/home")
            } else {
                throw { password: "Mauvais mot de passe" }
            }
        } else {
            throw { siret: "Ce SIRET n'existe pas" }
        }
    } catch (error) {
        res.render("pages/login.twig", {
            error: error
        })
    }
}


exports.displayHome = async (req, res) => {
    if (!req.session.company) {
        return res.redirect('/login');
    }
    const company = await prisma.company.findUnique({
        where: {
            id: req.session.company.id
        },
        include: {
            employees: {
                include: {
                    computer: true 
                }
            },
            computers: true,
        }
    });
    const employeeCount = company.employees.length;
    const computerCount = company.computers.length; 
    res.render("pages/home.twig", {
        company: company,
        employeeCount: employeeCount,
        computerCount: computerCount 
    });
}

exports.logout = async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
}
