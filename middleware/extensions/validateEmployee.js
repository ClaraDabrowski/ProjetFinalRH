const { Prisma } = require('@prisma/client')
const bcrypt = require('bcrypt')


module.exports = Prisma.defineExtension({
    name: "employeeValidateExtension",
    query: {
        Employee: {
            create: async ({ args, query }) => {
                const errors = {}
                if (!/^[a-zA-ZÀ-ÿ' -]{2,30}$/.test(args.data.firstName)) {
                    errors.firstName = "Veuillez entrer un prénom valide (pas de chiffres, ni de caractères spéciaux)"
                }

                if (!/^[a-zA-ZÀ-ÿ' -]{2,30}$/.test(args.data.lastName)) {
                    errors.lastName = "Veuillez entrer un nom valide (pas de chiffres, ni de caractères spéciaux)"
                }

                if (!/^[a-zA-ZÀ-ÿ' -]{2,30}$/.test(args.data.gender)) {
                    errors.gender = "Veuillez entrer un genre valide (pas de chiffres, ni de caractères spéciaux)"
                }

                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(args.data.mail)) {
                    errors.mail = "Email invalide"
                }

                if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(args.data.password)) {
                    errors.password = "Veuillez entrer un mot de passe valide ( min 8 caractères, lettres, chiffres et caractères spéciaux)"
                }

                if (Object.keys(errors).length > 0) {
                    const error = new Error("Erreur de validation")
                    error.details = errors
                    throw error
                }
                return query(args)
            }
        }
    }

})  