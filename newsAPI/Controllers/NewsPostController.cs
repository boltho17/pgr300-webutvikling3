// Controller utfører CRUD operations mot databasen

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
[Route("[controller]")]

    public class NewsPostController : Controller {
        private readonly NewsContext _context;

        public NewsPostController(NewsContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<NewsPost>> Get() {

            List<NewsPost> newsList = await _context.NewsPost.ToListAsync();

            return newsList;
        }

        [HttpGet("{id}")]
        public async Task<NewsPost> Get(int id) {

            NewsPost newsPostToGet = await _context.NewsPost.FirstAsync(newsPost => newsPost.Id == id);
            
            return newsPostToGet;
        }

        [HttpPost]
        public async Task<NewsPost> Post(NewsPost newNewsPost) {
            _context.NewsPost.Add(newNewsPost);
            await _context.SaveChangesAsync(); // Lagrer endringen i Databasen
            return newNewsPost; // Kan returnere hva som helst feks String/Int eller Status Code feks 201 Created
        }

       
        [HttpPut]
        public async Task<NewsPost> Put(NewsPost updateNewsPost) {
            _context.Update(updateNewsPost);
            await _context.SaveChangesAsync();
            return updateNewsPost;
        }

        [HttpDelete("{id}")] // Kan slette alt, eller kun et objekt basert på id
        public async void Delete(int id) {
            NewsPost newsPostToDelete = await _context.NewsPost.FirstAsync(newsPost => newsPost.Id == id);
            _context.NewsPost.Remove(newsPostToDelete);
            await _context.SaveChangesAsync();
        }

    }
}