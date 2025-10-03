const { PrismaClient } = require("../generated/prisma/client")
const prisma = new PrismaClient()


exports.displayAddComputer = (req, res) => {
    res.render("pages/addComputer.twig")
}


exports.addComputer = async (req, res) => {
    try {
        const computer = await prisma.computer.create({
            data: {
                mac: req.body.mac,
                companyId: req.session.company.id 
            }
        })
        res.redirect('/home')
    } catch (error) {
        console.log(error);
        res.render('pages/addComputer.twig', {
            error: "Impossible d'ajouter l'ordinateur",
            computer: req.body
        })
    }
}