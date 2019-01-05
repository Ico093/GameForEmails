using CompanyGame.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Microsoft.AspNet.Identity.Owin;
using System.Threading.Tasks;

namespace CompanyGame.Api.Controllers
{
    [Authorize]
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/Game")]
    public class GameController : ApiController
    {
        private Tuple<string, string>[] correct = new Tuple<string, string>[]
        {
            new Tuple<string, string>("number","27"),
            new Tuple<string, string>("number","51"),
            new Tuple<string, string>("number","84"),
            new Tuple<string, string>("string","оcda-ori"),
            new Tuple<string, string>("string","txut-meti"),
            new Tuple<string, string>("string","orm-ocda-tekvs-meti"),
            new Tuple<string, string>("string","otxm-ocda-ati")
        };

        private double[] scores = new double[]
        {
            2,
            1.5,
            1.5,
            1, 1,
            1, 1,
            1, 1, 1, 1,
            1, 1, 1
        };

        public ApplicationUserManager UserManager
        {
            get { return Request.GetOwinContext().GetUserManager<ApplicationUserManager>(); }
        }

        //POST api/Game/Results
        [HttpPost]
        public async Task<object> Results([FromBody] Result result)
        {
            var asd = User.Identity.GetEmail();

            double score = 0;
            var scoreIndex = 0;

            for (int i = 0; i < result.Answers.Count; i++)
            {
                int numberAnswer;
                if (correct[i].Item1 == "number")
                {
                    if (int.TryParse(result.Answers[i], out numberAnswer) && result.Answers[i] == correct[i].Item2)
                    {
                        score += scores[scoreIndex];
                    }

                    scoreIndex++;
                }
                else
                {
                    var answerArray = result.Answers[i].Split(new[] { '-' });
                    var answerArrayLength = answerArray.Length;

                    var correctArray = correct[i].Item2.Split('-');


                    for (int j = 0; j < correctArray.Length; j++)
                    {
                        if (answerArrayLength > j && answerArray[j] == correctArray[j])
                        {
                            score += scores[scoreIndex];
                        }

                        scoreIndex++;
                    }
                }
            }

            var user = await UserManager.FindByEmailAsync(User.Identity.Name);

            var record = new Score
            {
                User = user,
                UserScore = score,
                Seconds = result.Seconds
            };

            using (ApplicationDbContext db = Request.GetOwinContext().Get<ApplicationDbContext>())
            {
                db.Score.Add(record);

                try
                {
                    var resultObj = await db.SaveChangesAsync();

                    if (resultObj != 1)
                    {
                        return -1;
                    }
                }
                catch (Exception)
                {
                    return -1;
                }
            }

            return new
            {
                score = score,
                hasWon = score > 10
            };
        }
    }
}
