using Microsoft.AspNetCore.Mvc;
using newsAPI.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace newsAPI.Controllers {

[ApiController]
//[Route("[controller]")]

    public class FileUploadController : Controller {
        private readonly IWebHostEnvironment _hosting;

        public FileUploadController(IWebHostEnvironment hosting) {
            _hosting = hosting;
        }

        // This method works with POST request from Postman. Saves the uploaded image to wwwroot/images
        [HttpPost("upload")]
        public ActionResult Upload([FromForm]ImageUpload imageUpload)
        {
            // Getting Name
            string name = imageUpload.Name;
            // Getting Image
            var image = imageUpload.Image;
            // Saving Image on Server
            if (image.Length > 0) {
                var filePath = Path.Combine("wwwroot/images", image.FileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create)) {
                    image.CopyTo(fileStream);
                }
            }
            return Ok(new { status = true, message = "Image Posted Successfully"});
        }

        /* I have also tried the following methods wihtout success:
        NB! Have done several changes to the model after trying these methods.
    
        [HttpPost]
        [Route("[action]")]
        public void SavePicture(IFormFile file) {
            string webrootpath = _hosting.WebRootPath;
            string absolutepath = Path.Combine($"{webrootpath}/images/{file.FileName}");
            using(var filestream = new FileStream(absolutepath, FileMode.Create)) {
                file.CopyTo(filestream);
            }
        }

        [HttpPost]
        [Route("upload")]
        public async Task<IActionResult> Upload([FromForm]FileUpload model) {
            var file = model.File;

            if (file.Length > 0) {
                string path = Path.Combine(_hosting.WebRootPath, "uploadFiles");
                using (var fs = new FileStream(Path.Combine(path, file.FileName), FileMode.Create))
                {
                    await file.CopyToAsync(fs);
                }
            }   
                return BadRequest();
        }
        */
    }
}