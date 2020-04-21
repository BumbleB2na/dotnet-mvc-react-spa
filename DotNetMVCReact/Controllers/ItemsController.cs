using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DotNetMVCReact.Data;
using DotNetMVCReact.Models;

namespace DotNetMVCReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemRepository itemRepository;

        public ItemsController(IItemRepository itemRepository)
        {
            this.itemRepository = itemRepository;
        }

        // GET: api/Items
        [HttpGet]
        public async Task<IEnumerable<Item>> GetItems()
        {
            IEnumerable<Item> items = await itemRepository.GetItems();
            return items;
        }

        // POST: api/Items
        [HttpPost]
        public async Task<ActionResult> PostItem([Bind( // prevent from overposting
            "Name,Value,Category")] Item item)
        {
            if (ModelState.IsValid)
            {
                item = await itemRepository.InsertItem(item);
                return CreatedAtAction("GetItem", new { id = item.ID }, item);
            }
            return BadRequest("Unable to save changes.");
        }

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItem(int id)
        {
            Item item = await itemRepository.GetItemByID(id);
            if (item == null)
            {
                return NotFound();
            }
            bool success = await itemRepository.DeleteItem(item);
            if (success)
            {
                return AcceptedAtAction("DeleteItem", item);
            }
            return BadRequest("Unable to save changes.");
        }
    }
}
