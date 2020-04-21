using Microsoft.EntityFrameworkCore.Migrations;

namespace DotNetMVCReact.Migrations
{
    public partial class ItemModelUpdateValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Value",
                table: "Item",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real",
                oldMaxLength: 50);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Value",
                table: "Item",
                type: "real",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(decimal));
        }
    }
}
