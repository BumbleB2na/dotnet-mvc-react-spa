using DotNetMVCReact.Data;
using DotNetMVCReact.Models;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Xunit;

namespace Tests
{
    /**
     * Each test creates a temporary, in-memory SQL Server database using SQLite - https://docs.microsoft.com/en-us/ef/core/miscellaneous/testing/sqlite
     */
    public class TestItemRepository
    {
        [Fact]
        public void Insert_writes_to_database()
        {
            // In-memory database only exists while the connection is open
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            try
            {
                var options = new DbContextOptionsBuilder<CalculatorContext>()
                    .UseSqlite(connection)
                    .Options;

                // Create the schema in the database
                using (var context = new CalculatorContext(options))
                {
                    context.Database.EnsureCreated();
                }

                // Run the test against one instance of the context
                using (var context = new CalculatorContext(options))
                {
                    Item item = new Item
                    {
                        Name = "Smartphone",
                        Value = 600,
                        Category = "Electronics"
                    };
                    var itemRepository = new ItemRepository(context);
                    var newItem = itemRepository.InsertItem(item);
                }

                // Use a separate instance of the context to verify correct data was saved to database
                using (var context = new CalculatorContext(options))
                {
                    Assert.Equal(1, context.Items.Count());
                    Assert.Equal(1, context.Items.Single().ID);
                    Assert.Equal("Smartphone", context.Items.Single().Name);
                    Assert.Equal(600, context.Items.Single().Value);
                    Assert.Equal("Electronics", context.Items.Single().Category);
                }
            }
            finally
            {
                connection.Close();
            }
        }

        [Fact]
        public async System.Threading.Tasks.Task Delete_writes_to_databaseAsync()
        {
            // In-memory database only exists while the connection is open
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            try
            {
                var options = new DbContextOptionsBuilder<CalculatorContext>()
                    .UseSqlite(connection)
                    .Options;

                // Create the schema in the database
                using (var context = new CalculatorContext(options))
                {
                    context.Database.EnsureCreated();
                }

                // Run the test against one instance of the context
                using (var context = new CalculatorContext(options))
                {
                    Item item = new Item
                    {
                        Name = "Smartphone",
                        Value = 600,
                        Category = "Electronics"
                    };
                    var itemRepository = new ItemRepository(context);
                    var newItem = await itemRepository.InsertItem(item);
                    if (newItem.ID > 0)
                    {
                        var success = await itemRepository.DeleteItem(newItem);
                    }
                }

                // Use a separate instance of the context to verify correct data was saved to database
                using (var context = new CalculatorContext(options))
                {
                    Assert.Equal(0, context.Items.Count());
                }
            }
            finally
            {
                connection.Close();
            }
        }

    }
}