using System.Collections.Generic;

namespace CompanyGame.Api.Models
{
    public class PlayerScore
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public double Score { get; set; }
        public int Seconds { get; set; }
    }

    public class Rankings
    {
        public IEnumerable<PlayerScore> List{ get; set; }
        public int Page { get; set; }
        public int Count { get; set; }
    }

    public class Result
    {
        public IList<string> Answers { get; set; }
        public int Seconds { get; set; }
    }
}