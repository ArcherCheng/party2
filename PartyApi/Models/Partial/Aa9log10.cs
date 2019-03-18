using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace PartyApi.Models
{
    [Microsoft.AspNetCore.Mvc.ModelMetadataType(typeof(MetadataClass))]
    public partial class Aa9log10
    {
        private class MetadataClass
        {
            [Key]
            public long Id { get; set; }
        }
    }
}
