using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EventPlanner.Data.Migrations
{
    /// <inheritdoc />
    public partial class Attendeedeletableproperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Attendees",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Attendees");
        }
    }
}
