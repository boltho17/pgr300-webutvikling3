// Kobler modell-klassene opp mot SQL database
using Microsoft.EntityFrameworkCore;

namespace newsAPI.Models {

    public class NewsContext : DbContext {
        public NewsContext(DbContextOptions<NewsContext> options) : base(options){}

        public DbSet<NewsPost> NewsPost { get; set; }
    }
}