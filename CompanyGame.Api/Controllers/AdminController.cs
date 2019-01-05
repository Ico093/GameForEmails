using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using CompanyGame.Api.Models;

namespace CompanyGame.Api.Controllers
{
    [Authorize(Roles = "Admin")]
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/Admin")]
    public class AdminController : ApiController
    {
        //GET api/Admin/Ranking
        [HttpGet]
        public IList<PlayerScore> Ranking()
        {
            IList<PlayerScore> results;

            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                results = (from p in db.Score
                           orderby p.UserScore descending, p.Seconds ascending
                           select new PlayerScore
                           {
                               Name = p.User.Name,
                               Score = p.UserScore,
                               Email = p.User.Email,
                               Seconds = p.Seconds
                           }).ToList();
            }

            return results;
        }

        //GET api/Admin/DeleteResult
        [HttpPost]
        public List<string> DeleteResult(List<string> emails)
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                var results = db.Score.Where(x => emails.Contains(x.User.Email)).ToList();

                foreach (var result in results)
                {
                    db.Score.Remove(result);
                }

                db.SaveChanges();
            }

            return emails;
        }
    }
}
