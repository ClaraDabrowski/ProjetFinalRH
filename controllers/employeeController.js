const bcrypt = require('bcrypt')
const { PrismaClient } = require("../generated/prisma/client")
const hashExtension = require("../middleware/extensions/employeeHashPassword")
const validateEmployee = require('../middleware/extensions/validateEmployee')
const emailService = require('../middleware/services/emailService')
const prisma = new PrismaClient().$extends(hashExtension).$extends(validateEmployee)


exports.displayAddEmployee = (req, res) => {
    res.render("pages/addEmployee.twig")
}

exports.addEmployee = async (req, res) => {
    try {
        if (req.body.password !== req.body.confirm) {
            const error = new Error("Les mots de passe ne correspondent pas")
            error.confirm = error.message
            throw error
        }

        const plainPassword = req.body.password;

        const employee = await prisma.employee.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                mail: req.body.mail,
                password: req.body.password,
                age: parseInt(req.body.age),
                gender: req.body.gender,
                companyId: req.session.company.id
            }
        })

        const company = await prisma.company.findUnique({
            where: { id: req.session.company.id }
        });

        try {
            await emailService.sendWelcomeEmail({
                firstName: employee.firstName,
                lastName: employee.lastName,
                mail: employee.mail,
                password: plainPassword
            }, company.raisonSocial);
        } catch (emailError) {
            console.error('Erreur email (compte créé mais email non envoyé):', emailError);

        }

        res.redirect('/home')
    } catch (error) {
        console.log(error);

        if (error.code === 'P2002') {
            res.render('pages/addEmployee.twig', {
                duplicateEmail: 'Cet email est déjà utilisé',
                employee: req.body
            })
        } else {
            res.render('pages/addEmployee.twig', {
                errors: error.details,
                confirmError: error.confirm ? error.confirm : null,
                employee: req.body
            })
        }
    }
}

exports.removeEmployee = async (req, res) => {
    try {
        const deleteemployee = await prisma.employee.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.redirect('/home')

    } catch (error) {
        res.render("/home/twig", {
            error: " L'employé n'a pas pu être supprimé"
        });

    }
}



exports.displayUpdateEmployee = async (req, res) => {
    const employee = await prisma.employee.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    res.render('pages/addEmployee.twig', {
        employee: employee
    })
}


exports.updateEmployee = async (req, res) => {
    try {
        const employeeupdated = await prisma.employee.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                mail: req.body.mail,
                age: parseInt(req.body.age),
                gender: req.body.gender,
            }
        })
        res.redirect('/home')
    } catch (error) {
        res.render("pages/home.twig", {
            error: " L'employé n'a pas pu être modifié"
        });

    }
}


exports.getEmployees = async (req, res) => {
    if (!req.session.company) {
        return res.redirect('/login');
    }
    const company = await prisma.company.findUnique({
        where: { id: req.session.company.id },
        include: { 
            employees: {
                include: {
                    computer: true 
                }
            }
        }
    });
    res.render("pages/employees.twig", { company });
}



exports.linkComputer = async (req, res) => {
    const employeeId = parseInt(req.params.id);
    const computerId = req.body.computerId ? parseInt(req.body.computerId) : null;
    if (computerId) {
        await prisma.computer.update({
            where: { id: computerId },
            data: { employeeId: employeeId }
        });
    }
    res.redirect('/home');
}