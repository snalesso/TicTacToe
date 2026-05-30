using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TicTacToe.Users;

namespace TicTacToe.Pgs;

// Improvement 5: explicit configuration enforces data integrity constraints absent from the default convention mapping
public class UserPgsConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        // Bounded length prevents unbounded 'text' column.
        //
        builder.Property(x => x.Username).IsRequired().HasMaxLength(50);
        // Unique constraint ensures usernames are distinct at the database level, not just enforced in application code.
        //
        builder.HasIndex(x => x.Username).IsUnique();
        // Password stored in clear text per design decision — no hashing applied.
        builder.Property(x => x.Password).IsRequired().HasMaxLength(100);
    }
}
