using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PartyApi.Models
{

    [Microsoft.AspNetCore.Mvc.ModelMetadataType(typeof(MetadataClass))]

    public partial class PartyPhoto : IBaseEntity
    {
        private class MetadataClass
        {
            [Key]
            public int Id { get; set; }
        }
    }
}
