using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetMVCReact.Models
{
    public class Item
    {
        public int ID { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; }

        [Required]
        [DataType(DataType.Currency)]
        public decimal Value { get; set; }

        [Required]
        [MaxLength(150)]
        public string Category { get; set; }
    }
}
