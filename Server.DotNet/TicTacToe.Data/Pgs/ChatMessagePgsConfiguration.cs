using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TicTacToe.Chat;

namespace TicTacToe.Pgs;

public class ChatMessagePgsConfiguration : IEntityTypeConfiguration<ChatMessage>
{
    public void Configure(EntityTypeBuilder<ChatMessage> builder)
    {
        builder.ToTable(ChatMessage.TABLE_NAME);

        builder
            .HasKey(x => x.Id)
            .HasName($"PK_{nameof(ChatMessage)}Key");

        builder
            .HasOne(x => x.Room)
            .WithMany(x => x.Messages)
            .HasForeignKey(x => x.ChatRoomId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasOne(x => x.Author)
            .WithMany(x => x.Messages)
            .HasForeignKey(x => x.AuthorId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .Property(x => x.Text)
            .IsRequired()
            .HasMaxLength(ChatMessage.TEXT_MAX_LENGTH);

        builder
            .Property(x => x.Time)
            .IsRequired()
            .HasDefaultValueSql("CURRENT_TIMESTAMP");
    }
}
