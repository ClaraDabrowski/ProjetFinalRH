const { PrismaClient } = require("../generated/prisma/client")
const prisma = new PrismaClient()


exports.displayAddComputer = (req, res) => {
    res.render("pages/addComputer.twig")
}

exports.addComputer = async (req, res) => {
    try{
    const employee = await prisma.computer.create({
            data: {
                mac: req.body.mac
            }
        })
        res.redirect('/home')
    } catch (error) {
        console.log(error);
    }
}