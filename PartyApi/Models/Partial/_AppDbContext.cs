using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PartyApi.Models
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext() 
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Aa9log10> Aa9log10 { get; set; }
        public virtual DbSet<Aa9log20> Aa9log20 { get; set; }
        public virtual DbSet<Activity> Activity { get; set; }
        public virtual DbSet<Liker> Liker { get; set; }
        public virtual DbSet<Member> Member { get; set; }
        public virtual DbSet<MemberCondition> MemberCondition { get; set; }
        public virtual DbSet<MemberPhoto> MemberPhoto { get; set; }
        public virtual DbSet<Message> Message { get; set; }
        public virtual DbSet<Party> Party { get; set; }
        public virtual DbSet<PartyPhoto> PartyPhoto { get; set; }
        public virtual DbSet<ViewActivitySummary> ViewActivitySummary { get; set; }
        public virtual DbSet<ViewActivityMatchUser> ViewActivityMatchUser { get; set; }
        public virtual DbSet<CheckboxItem> CheckboxItem { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("name=DefaultConnection");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Member>(entity =>
            {
                entity.HasKey(e => e.UserId); 
            });

            modelBuilder.Entity<MemberCondition>(entity =>
            {
                entity.HasKey(e => e.UserId); 
                entity.HasOne(d => d.Member)
                    .WithOne(p => p.MemberCondition)
                    .HasForeignKey<MemberCondition>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Condition_Member");                
            });

            modelBuilder.Entity<Party>(entity =>
            {
                entity.HasKey(e => e.PartyId); 
            });

            modelBuilder.Entity<Activity>(entity => 
            {
                entity.HasKey(e => e.Id);
                
                entity.HasIndex(e => new { e.PartyId, e.UserId })
                    .HasName("Activity_in1")
                    .IsUnique();

                entity.HasIndex(e => new { e.UserId, e.PartyId })
                    .HasName("Activity_in2")
                    .IsUnique();

                entity.HasOne(d => d.Party)
                    .WithMany(p => p.Activity)
                    .HasForeignKey(d => d.PartyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Activity_Party");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Activity)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Activity_Member");

            });

            modelBuilder.Entity<Liker>(entity =>
            {
                entity.HasKey(e => new { e.PartyId, e.UserId, e.LikerId });
        
                entity.HasOne(d => d.Party)
                    .WithMany(p => p.Liker)
                    .HasForeignKey(d => d.PartyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Liker_Party");

                entity.HasOne(d => d.LikerMe)
                    .WithMany(p => p.MyLiker)
                    .HasForeignKey(d => d.LikerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Liker_LikerMe");

                entity.HasOne(d => d.MyLiker)
                    .WithMany(p => p.LikerMe)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Liker_MyLiker");
            });
   
            modelBuilder.Entity<Message>(entity =>
            {
                entity.HasOne(d => d.Recipient)
                    .WithMany(p => p.MessageRecipient)
                    .HasForeignKey(d => d.RecipientId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Message_Recipient");

                entity.HasOne(d => d.Sender)
                    .WithMany(p => p.MessageSender)
                    .HasForeignKey(d => d.SenderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Message_Sender");
            });

        }
    
    }
}
