using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PartyApi.Models
{
    [Microsoft.AspNetCore.Mvc.ModelMetadataType(typeof(MetadataClass))]
    public partial class Aa9log20
    {
        private class MetadataClass
        {
            [Key]
            public long Id { get; set; }
        }
    }
}
