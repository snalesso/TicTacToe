using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TicTacToe.Pgs.Migrations
{
    /// <inheritdoc />
    public partial class ChatRoomMessageChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Time",
                table: "ChatMessages",
                newName: "Timestamp");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Timestamp",
                table: "ChatMessages",
                newName: "Time");
        }
    }
}
