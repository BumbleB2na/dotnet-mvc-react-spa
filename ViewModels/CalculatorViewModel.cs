using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetMVCReact.Models;

namespace DotNetMVCReact.ViewModels
{
    public class CalculatorViewModel
    {
        public string[] Categories { get; set; }

        public IEnumerable<Item> Items { get; set; }
    }
}
