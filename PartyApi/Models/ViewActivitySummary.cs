using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PartyApi.Models
{
    public partial class ViewActivitySummary
    {
        [Key]
        public int PartyId { get; set; }
        public string PartyName { get; set; }
        public int Marry { get; set; }
        public DateTime PartyDate { get; set; }
        public string Restaurant { get; set; }
        public int TotalPersons { get; set; }
        public int AvgOlds { get; set; }
        public int TotalMen { get; set; }
        public int AvgMenOlds { get; set; }
        public int TotalWomen { get; set; }
        public int AvgWomenOlds { get; set; }
        public int TotalVotes { get; set; }
        public int TotalMatch { get; set; }
    }
}
