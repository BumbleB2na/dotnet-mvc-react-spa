using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DotNetMVCReact.ViewModels;
using DotNetMVCReact.Enums;

namespace DotNetMVCReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculatorController : Controller
    {
        [HttpGet]
        public JsonResult Get()
        {
            CalculatorViewModel calculatorViewModel = new CalculatorViewModel()
            {
                Categories = Enum.GetNames(typeof(CategoryEnum)).ToArray()
            };

            return Json(calculatorViewModel);
        }
    }
}