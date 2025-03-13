using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Ecommerce.Mailer
{
    public class EmailSettings
    {
        public string SmtpServer { get; set; }
        public int SmtpPort { get; set; }
        public string SmtpUser { get; set; }
        public string SmtpPass { get; set; }
        public string FromEmail { get; set; }
    }

    public class EmailService
    {
        private readonly EmailSettings _emailSettings;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IOptions<EmailSettings> emailSettings, ILogger<EmailService> logger)
        {
            _emailSettings = emailSettings.Value;
            _logger = logger;
        }

        public async Task SendEmailAsync(string toEmail, string activationToken, int userId)
        {
            string subject = "TechYard - Veuillez vérifier votre inscription !";
            string message = CreateEmailBody(activationToken, userId);

            await SendEmail(toEmail, subject, message);
        }

        public async Task SendBackInStockEmailAsync(string toEmail, string productName)
        {
            string subject = "TechYard - Disponibilité produit";
            string message = CreateBackInStockEmailBody(productName);

            await SendEmail(toEmail, subject, message);
        }

        private async Task SendEmail(string toEmail, string subject, string message)
        {
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
                _logger.LogError(smtpEx, "Erreur SMTP lors de l'envoi de l'email.");
                throw;
            }
        }
        
        public async Task SendOrderConfirmedEmail(string toEmail, string orderReference)
        {
            string subject = "TechYard - Confirmation de votre commande";
            string body = CreateEmailBodyConfirmedOrder(orderReference);

            await SendEmail(toEmail, subject, body);
        }

        private string CreateEmailBodyConfirmedOrder(string orderReference)
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
            display: flex;
            align-items: center;
            border-bottom: 2px solid #292929;
            padding-bottom: 10px;
            margin-bottom: 20px;
            background-color: #292929;
        }}
        .header img {{
            width: 50px;
            height: 50px;
            margin-right: 10px;
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
        .code {{
            font-size: 24px;
            font-weight: bold;
            color: white;
            padding: 10px;
            background-color: #292929;
            border-radius: 4px;
            display: inline-block;
            margin: 10px 0;
        }}
        .link {{
            display: inline-block;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
            text-decoration: none;
            margin-top: 10px;
            text-decoration: underline;
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
            <h1>Merci pour votre commande !</h1>
        </div>
        <div class='content'>
            <p>Retrouvez ci-dessous le numéro de référence de votre commande :</p>
            <div class='code'>{orderReference}</div>
            <p>En cliquant <a href='https://localhost:3000/orders/list-orders' class='link'>ici</a>, vous pourrez retrouver son détail et le suivi.</p>
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
        
        private string CreateEmailBody(string otp, int userId)
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
            display: flex;
            align-items: center;
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
        .code {{
            font-size: 24px;
            font-weight: bold;
            color: white;
            padding: 10px;
            background-color: #292929;
            border-radius: 4px;
            display: inline-block;
            margin: 10px 0;
        }}
        .button {{
            display: inline-block;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
            background-color: #292929;
            padding: 10px 20px;
            border-radius: 4px;
            text-decoration: none;
            margin-top: 10px;
            border: 2px solid #171717;
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
            <h1>Bienvenue !</h1>
        </div>
        <div class='content'>
            <p>Bonjour,</p>
            <p>Merci de vous être inscrit. Veuillez vérifier votre inscription en utilisant le code à 6 chiffres ci-dessous :</p>
            <div class='code'>{otp}</div>
            <p><a href='https://localhost:3000/auth/mailredirection?userId={userId}' class='button'>Valider votre inscription</a></p>
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

        private string CreateBackInStockEmailBody(string productName)
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
            display: flex;
            align-items: center;
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
            <h1>Notification de disponibilité</h1>
        </div>
        <div class='content'>
            <p>Bonjour,</p>
            <p>Vous serez notifié lorsque l'article <strong>{productName}</strong> sera de nouveau en stock.</p>
            <p>Merci pour votre patience !</p>
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

    public static class EmailServiceExtensions
    {
        public static IServiceCollection AddEmailService(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
            services.AddTransient<EmailService>();
            return services;
        }
    }
}
