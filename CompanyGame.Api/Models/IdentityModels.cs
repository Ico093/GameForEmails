using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace CompanyGame.Api.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit https://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);

            userIdentity.AddClaim(new Claim("UserName", this.Name));
            userIdentity.AddClaim(new Claim("Email", this.Email));

            // Add custom user claims here
            return userIdentity;
        }
    }

    public static class IdentityExtensions
    {
        public static string GetEmail(this IIdentity identity)
        {
            var claim = ((ClaimsIdentity)identity).FindFirst("UserEmail");
            // Test for null to avoid issues during local testing
            return (claim != null) ? claim.Value : string.Empty;
        }

        public static string GetName(this IIdentity identity)
        {
            var claim = ((ClaimsIdentity)identity).FindFirst("UserName");
            // Test for null to avoid issues during local testing
            return (claim != null) ? claim.Value : string.Empty;
        }
    }

    public class Score
    {
        [Key,ForeignKey("User")]
        public string UserId { get; set; }
        public string Name { get; set; }
        public double UserScore  { get; set; }
        public int Seconds  { get; set; }

        public ApplicationUser User { get; set; }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
            Database.SetInitializer<ApplicationDbContext>(new DropCreateDatabaseIfModelChanges<ApplicationDbContext>());
        }
        
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        public DbSet<Score> Score { get; set; }
    }
}