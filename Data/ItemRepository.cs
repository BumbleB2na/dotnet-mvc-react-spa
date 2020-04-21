using DotNetMVCReact.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetMVCReact.Data
{
    public interface IItemRepository : IDisposable
    {
        Task<IEnumerable<Item>> GetItems();
        Task<Item> GetItemByID(int itemId);
        Task<Item> InsertItem(Item item);
        Task<bool> DeleteItem(Item item);
        Task<int> Save();
    }

    public class ItemRepository : IItemRepository, IDisposable
    {
        private readonly CalculatorContext context;

        public ItemRepository(CalculatorContext context)
        {
            this.context = context;
        }
        public async Task<IEnumerable<Item>> GetItems()
        {
            IEnumerable<Item> items = await context.Items.ToListAsync();
            return items;
        }
        public async Task<Item> GetItemByID(int itemId)
        {
            Item item = await context.Items.FindAsync(itemId);
            return item;
        }
        public async Task<Item> InsertItem(Item item)
        {
            context.Items.Add(item);
            await this.Save();
            return item;
        }
        public async Task<bool> DeleteItem(Item item)
        {
            context.Items.Remove(item);
            await this.Save();
            return true;
        }

        public async Task<int> Save()
        {
            try
            {
                return await context.SaveChangesAsync();
            }
            catch (DbUpdateException /* ex */)
            {
                //Log the error (uncomment ex variable name and write a log.
                throw new Exception("Unable to save changes.");
            }
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
