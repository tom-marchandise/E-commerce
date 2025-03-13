using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Ecommerce.Mailer
{
    public class ForgetPasswordService
    {
        private readonly EmailSettings _emailSettings;
        private readonly ILogger<ForgetPasswordService> _logger;
        private readonly string _resetPasswordUrl = "https://localhost:3000/auth/resetpassword";

        public ForgetPasswordService(IOptions<EmailSettings> emailSettings, ILogger<ForgetPasswordService> logger)
        {
            _emailSettings = emailSettings.Value;
            _logger = logger;
        }

        public async Task SendForgotPasswordEmailAsync(string toEmail)
        {
            string subject = "E Commerce - Réinitialisation de votre mot de passe";
            string message = CreateResetPasswordEmailBody();

            try
            {
                using (var smtpClient = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.SmtpPort))
                {
                    smtpClient.Credentials = new NetworkCredential(_emailSettings.SmtpUser, _emailSettings.SmtpPass);
                    smtpClient.EnableSsl = true;

                    var mailMessage = CreateMailMessage(toEmail, subject, message);
                    await smtpClient.SendMailAsync(mailMessage);
                }
            }
            catch (SmtpException smtpEx)
            {
                _logger.LogError(smtpEx, "Erreur SMTP lors de l'envoi de l'email de réinitialisation du mot de passe.");
                throw;
            }
        }

        private string CreateResetPasswordEmailBody()
        {
            return $@"
<!DOCTYPE html>
<html lang='fr'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <style>
        body {{
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #171717;
            color: white;
        }}
        .container {{
            max-width: 600px;
            margin: 20px auto;
            background-color: #292929;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }}
        .header {{
            border-bottom: 2px solid #292929;
            padding-bottom: 10px;
            margin-bottom: 20px;
            background-color: #292929;
        }}
        .header h1 {{
            font-size: 24px;
            color: white;
            margin: 0;
        }}
        .content {{
            font-size: 16px;
            line-height: 1.5;
            color: #fff;
        }}
        .reset-link {{
            font-size: 18px;
            font-weight: bold;
            color: #1e90ff;
            padding: 10px;
            background-color: #292929;
            border-radius: 4px;
            display: inline-block;
            margin: 10px 0;
            text-decoration: none;
        }}
        .footer {{
            font-size: 14px;
            text-align: center;
            color: #777;
            margin-top: 20px;
        }}
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>Réinitialisation de votre mot de passe</h1>
        </div>
        <div class='content'>
            <p>Bonjour,</p>
            <p>Vous avez demandé à réinitialiser votre mot de passe. Veuillez cliquer sur le lien ci-dessous pour définir un nouveau mot de passe :</p>
            <p><a href='{_resetPasswordUrl}' class='reset-link'>Réinitialiser mon mot de passe</a></p>
            <p>Ce lien est valable pendant 1 heure.</p>
            <p>Merci !</p>
        </div>
        <div class='footer'>
            <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
        </div>
    </div>
</body>
</html>
";
        }

        private MailMessage CreateMailMessage(string toEmail, string subject, string body)
        {
            return new MailMessage
            {
                From = new MailAddress(_emailSettings.FromEmail),
                Subject = subject,
                Body = body,
                IsBodyHtml = true,
                To = { toEmail }
            };
        }
    }
}
