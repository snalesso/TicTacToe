using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TicTacToe.Chat;

namespace TicTacToe.Pgs;

// Improvement 5: explicit configuration enforces data integrity constraints absent from the default convention mapping
public class ChatRoomPgsConfiguration : IEntityTypeConfiguration<ChatRoom>
{
    public void Configure(EntityTypeBuilder<ChatRoom> builder)
    {
        // Bounded lengths prevent unbounded 'text' columns and protect against oversized input at the DB level.
        //
        builder.Property(x => x.Name).IsRequired().HasMaxLength(100);
        builder.Property(x => x.Description).IsRequired().HasMaxLength(500);
    }
}
