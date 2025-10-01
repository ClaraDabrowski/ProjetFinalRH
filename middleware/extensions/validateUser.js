const {Prisma} = require('@prisma/client')
const bcrypt = require ('bcrypt')


module.exports = Prisma.defineExtension({
    name: "userValidateExtension",
    query: {
        company: {
            create: async({args, query})=>{
                 const errors = {}

                if (!/^[a-zA-ZÀ-ÿ' -]{2,30}$/.test(args.data.raisonSocial)) {
                    errors.raisonSocial = "Veuillez entrer une raison sociale valide.."
                }
                if (!/^[0-9]{14}$/.test(args.data.siret)) {
                    errors.siret = "Veuillez entrer un SIRET valide (14 chiffres)"
                }
                if (!/^[a-zA-ZÀ-ÿ' -]{2,30}$/.test(args.data.lastName)) {
                    errors.lastName = "Veuillez entrer un nom valide.."
                }   
                if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(args.data.password)) {
                    errors.password = "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
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