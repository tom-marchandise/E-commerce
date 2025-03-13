using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        // Chemin où les fichiers seront stockés
        private readonly string _storagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/img");

        public UploadController()
        {
            //  Crée le répertoire s'il n'existe pas
            if (!Directory.Exists(_storagePath))
            {
                Directory.CreateDirectory(_storagePath);
            }
        }

        // Endpoint pour télécharger un fichier
        [HttpPost("upload")]
        public async Task<IActionResult> Upload(IFormFile file)
        { 
            Console.WriteLine("jesuisrentré");
            
            // Vérifie si le fichier est null ou vide
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }
        
            // Construit le chemin du fichier où il sera stocké
            var filePath = Path.Combine(_storagePath, file.FileName);
        
            // Sauvegarde le fichier sur le serveur
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
        
            // Renvoie une réponse avec le chemin du fichier téléchargé
            return Ok(new
            {
                Message = "File uploaded successfully.",
                FileName = file.FileName,
                FilePath = $"https://localhost:7240/img/{file.FileName}"
            });        }
    }
}