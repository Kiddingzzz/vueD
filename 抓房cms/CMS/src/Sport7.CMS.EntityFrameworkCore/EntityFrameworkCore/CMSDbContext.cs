using Announcements;
using Microsoft.EntityFrameworkCore;
using Sport7.AuditLogging.EntityFrameworkCore;
using Sport7.CMS.Comments;
using Sport7.CMS.Feedbacks;
using Sport7.CMS.House;
using Sport7.CMS.Posts;
using Sport7.CMS.Tagging;
using Sport7.CMS.Url;
using Sport7.CMS.VoteOptions;
using Sport7.CMS.Votes;
using Sport7.EntityFrameworkCore;
using Sport7.PermissionManagement.EntityFrameworkCore;
using Sport7.SettingManagement.EntityFrameworkCore;

namespace Sport7.CMS.EntityFrameworkCore
{
    public class CMSDbContext : Sport7DbContext<CMSDbContext>
    {
        public static string TablePrefix { get; set; } = CMSConsts.DefaultDbTablePrefix;

        public static string Schema { get; set; } = CMSConsts.DefaultDbSchema;

        public DbSet<Urls> urls { get; set; }

        public DbSet<homeinf> homeinfs { get; set; }

        public DbSet<PythonHome> pythonHomes { get; set; }

        public CMSDbContext(DbContextOptions<CMSDbContext> options) 
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ConfigureCMS(options =>
            {
                options.TablePrefix = TablePrefix;
                options.Schema = Schema;
            });


            builder.ConfigurePermissionManagement();
            builder.ConfigureSettingManagement();
            builder.ConfigureAuditLogging();
        }
    }
}
