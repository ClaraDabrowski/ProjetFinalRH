const { PrismaClient } = require("../../generated/prisma/client")
const prisma = new PrismaClient()

const authguard = async (req, res, next) => {
    try {
        if (req.session.user) {
            const company = await prisma.company.findUnique({
                where: {
                    id: req.session.company.id
                }
            })
            if (company) {
                return next()
            }
        }
        throw new Error("Utilisateur non connecté")
    } catch (error) {
        res.redirect('/login')
    }
}

module.exports = authguard