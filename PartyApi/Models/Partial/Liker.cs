using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PartyApi.Models
{
    [Microsoft.AspNetCore.Mvc.ModelMetadataType(typeof(MetadataClass))]
    public partial class Liker : IBaseEntity
    {
        private class MetadataClass 
        {
            [Key]
            public int PartyId { get; set; }
            [Key]
            public int UserId { get; set; }
            [Key]
            public int LikerId { get; set; }
        }

    }
}
