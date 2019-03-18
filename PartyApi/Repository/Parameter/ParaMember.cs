using System.Collections.Generic;

namespace PartyApi.Repository
{
    public class ParaMember : BaseParameter
    { 
        public int UserId { get; set; } //= 0;
        public int Sex { get; set; } //= 0;

        public int MinAge { get; set; } //= 20;
        public int MaxAge { get; set; } //= 60;

        public int MinHeights { get; set; } //= 140;
        public int MaxHeights { get; set; } //= 200;

        public int MinWeights { get; set; } //= 30;
        public int MaxWeights { get; set; } //= 100;

        public int MinEducation { get; set; } //= 1;
        public int MaxEducation { get; set; } //= 6;

        public int MinSalary { get; set; } //= 30;
        public int MaxSalary { get; set; } //= 300;

        public List<string> Blood { get; set; }
        public List<string> Star { get; set; }
        public List<string> City { get; set; }
        
        public string OrderBy { get; set; }
        public bool Likees { get; set; } = false;
        public bool Likers { get; set; } = false;

    }
}