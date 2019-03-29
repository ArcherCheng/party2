using System;
using System.Collections.Generic;

namespace PartyApi.Models
{
    public partial class MemberCondition
    {
        public int UserId { get; set; }
        public int MarryMin { get; set; }
        public int MarryMax { get; set; }
        public int OldsMin { get; set; }
        public int OldsMax { get; set; }
        public int EducationMin { get; set; }
        public int EducationMax { get; set; }
        public int HeightsMin { get; set; }
        public int HeightsMax { get; set; }
        public int WeightsMin { get; set; }
        public int WeightsMax { get; set; }
        public int SalaryMin { get; set; }
        public string BloodInclude { get; set; }
        public string StarInclude { get; set; }
        public string CityInclude { get; set; }
        public string JobTypeInclude { get; set; }
        public string ReligionInclude { get; set; }
        public int? WriteType { get; set; }
        public DateTime? WriteTime { get; set; }
        public string WriteUser { get; set; }
        public string WriteIp { get; set; }

        public virtual Member Member { get; set; }
    }
}
