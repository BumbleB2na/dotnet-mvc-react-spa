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
        private readonly CalculatorContext _context;

        public ItemsController(CalculatorContext context)
        {
            _context = context;
        }

        // GET: api/Items
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            return await _context.Items.ToListAsync();
        }

        // POST: api/Items
        [HttpPost]
        public async Task<ActionResult<Item>> PostItem([Bind( // prevent from overposting
            "Name,Value,Category")] Item item)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Items.Add(item);
                    await _context.SaveChangesAsync();
                    return CreatedAtAction("GetItem", new { id = item.ID }, item);
                }
            }
            catch (DbUpdateException /* ex */)
            {
                //Log the error (uncomment ex variable name and write a log.
                ModelState.AddModelError("", "Unable to save changes. " +
                    "Try again, and if the problem persists " +
                    "see your system administrator.");
            }
            return NoContent();
        }

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Item>> DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return item;
        }
    }
}
