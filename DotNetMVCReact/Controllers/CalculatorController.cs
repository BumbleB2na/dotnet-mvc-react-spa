using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DotNetMVCReact.ViewModels;
using DotNetMVCReact.Enums;
using DotNetMVCReact.Data;
using Microsoft.EntityFrameworkCore;

namespace DotNetMVCReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculatorController : Controller
    {
        private readonly IItemRepository itemRepository;
        public CalculatorController(IItemRepository itemRepository)
        {
            this.itemRepository = itemRepository;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            CalculatorViewModel calculatorViewModel = new CalculatorViewModel()
            {
                Categories = Enum.GetNames(typeof(CategoryEnum)).ToArray(),
                Items = await itemRepository.GetItems()
            };

            return Json(calculatorViewModel);
        }
    }
}