const transporter = require('../../config/emailConfig');

exports.sendWelcomeEmail = async (employeeData, companyName) => {

    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: employeeData.mail,
        subject: `Bienvenue chez ${companyName}`,
        html: `
            <h2>Bienvenue ${employeeData.firstName} ${employeeData.lastName} !</h2>
            <p>Votre compte a été créé avec succès chez <strong>${companyName}</strong>.</p>
            <p><strong>Informations de connexion :</strong></p>
            <ul>
                <li>Email : ${employeeData.mail}</li>
                <li>Mot de passe : ${employeeData.password}</li>
            </ul>
            <p>Nous vous recommandons de changer votre mot de passe dès votre première connexion.</p>
            <p>Cordialement,<br>L'équipe ${companyName}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email envoyé avec succès à', employeeData.mail);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        throw error;
    }
};