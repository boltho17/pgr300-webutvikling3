using System.ComponentModel.DataAnnotations;

namespace newsAPI.Models {

    public class NewsPost {
        [Key] // Annotation

        public int Id {get; set;}

        public string Author {get; set;}

        public string Category {get; set;}

        public string Title {get; set;}

        public string Description {get; set;}

        public string Content {get; set;}

        public string UrlToImage {get; set;}
    }
}