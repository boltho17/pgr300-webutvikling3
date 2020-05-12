using Microsoft.AspNetCore.Http;

namespace newsAPI.Models {
    public class ImageUpload
    {
        public IFormFile Image { get; set; }
        public string Name {get; set;}
    }
}

