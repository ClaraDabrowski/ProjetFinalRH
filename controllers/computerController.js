const { PrismaClient } = require("../generated/prisma/client")
const prisma = new PrismaClient()


exports.displayAddComputer = async (req, res) => {
    const employees = await prisma.employee.findMany({
        where: {
            companyId: req.session.company.id
        }
    })
    
    res.render("pages/addComputer.twig", {
        employees: employees
    })
}

exports.displayComputers = async (req, res) => {
    const company = await prisma.company.findUnique({
        where: { id: req.session.company.id },
        include: {
            computers: {
                include: { employee: true }
            }
        }
    });
    res.render("pages/computers.twig", { company });
};


exports.addComputer = async (req, res) => {
    try {
        const computer = await prisma.computer.create({
            data: {
                mac: req.body.mac,
                companyId: req.session.company.id,
                employeeId: req.body.employeeId ? parseInt(req.body.employeeId): null 
            }
        })
        res.redirect('/computers')
    } catch (error) {
        console.log(error);

        const employees = await prisma.employee.findMany({
            where: {
                companyId: req.session.company.id
            }
        })

        res.render('pages/addComputer.twig', {
            error: "Impossible d'ajouter l'ordinateur",
            computer: req.body,
            employees: employees
        })
    }
}


exports.displayUpdateComputer = async (req, res) => {
    try {
        const computer = await prisma.computer.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })

        const employees = await prisma.employee.findMany({
            where: {
                companyId: req.session.company.id
            }
        })

        res.render('pages/addComputer.twig', {
            computer: computer,
            employees: employees
        })
    } catch (error) {
        console.log(error);
        res.redirect('/computers')
    }
}


exports.updateComputer = async (req, res) => {
    try {
        const computerUpdated = await prisma.computer.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                mac: req.body.mac,
                employeeId: req.body.employeeId ? parseInt(req.body.employeeId) : null
            }
        })
        res.redirect('/computers')
    } catch (error) {
        console.log(error);
        
        const employees = await prisma.employee.findMany({
            where: {
                companyId: req.session.company.id
            }
        })

        res.render('pages/addComputer.twig', {
            error: "Impossible de modifier l'ordinateur",
            computer: req.body,
            employees: employees
        })
    }
}


exports.removeComputer = async (req, res) => {
    try {
        await prisma.computer.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.redirect('/computers')
    } catch (error) {
        console.log(error);
        res.redirect('/computers')
    }
}