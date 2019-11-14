using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sport7.CMS.Migrations
{
    public partial class _12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "homeinf",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorId = table.Column<Guid>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierId = table.Column<Guid>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValue: false),
                    DeleterId = table.Column<Guid>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    Yongtu = table.Column<string>(nullable: true),
                    XiaoquName = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Rice = table.Column<int>(nullable: false),
                    simpleRice = table.Column<int>(nullable: false),
                    Square = table.Column<int>(nullable: false),
                    Huxing = table.Column<string>(nullable: true),
                    Louceng = table.Column<string>(nullable: true),
                    Zhuangxiu = table.Column<string>(nullable: true),
                    LianxiPeople = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    Source = table.Column<string>(nullable: true),
                    Url = table.Column<string>(nullable: true),
                    Chaoxiang = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_homeinf", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sport7AuditLogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ExtraProperties = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    ApplicationName = table.Column<string>(maxLength: 96, nullable: true),
                    UserId = table.Column<Guid>(nullable: true),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    TenantId = table.Column<Guid>(nullable: true),
                    TenantName = table.Column<string>(nullable: true),
                    ImpersonatorUserId = table.Column<Guid>(nullable: true),
                    ImpersonatorTenantId = table.Column<Guid>(nullable: true),
                    ExecutionTime = table.Column<DateTime>(nullable: false),
                    ExecutionDuration = table.Column<int>(nullable: false),
                    ClientIpAddress = table.Column<string>(maxLength: 64, nullable: true),
                    ClientName = table.Column<string>(maxLength: 128, nullable: true),
                    ClientId = table.Column<string>(maxLength: 64, nullable: true),
                    CorrelationId = table.Column<string>(maxLength: 64, nullable: true),
                    BrowserInfo = table.Column<string>(maxLength: 512, nullable: true),
                    HttpMethod = table.Column<string>(maxLength: 16, nullable: true),
                    Url = table.Column<string>(maxLength: 256, nullable: true),
                    Exceptions = table.Column<string>(maxLength: 4000, nullable: true),
                    Comments = table.Column<string>(maxLength: 256, nullable: true),
                    HttpStatusCode = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sport7AuditLogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sport7PermissionGrants",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    TenantId = table.Column<Guid>(nullable: true),
                    Name = table.Column<string>(maxLength: 128, nullable: false),
                    ProviderName = table.Column<string>(maxLength: 64, nullable: false),
                    ProviderKey = table.Column<string>(maxLength: 64, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sport7PermissionGrants", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sport7Settings",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 128, nullable: false),
                    Value = table.Column<string>(maxLength: 2048, nullable: false),
                    ProviderName = table.Column<string>(maxLength: 64, nullable: true),
                    ProviderKey = table.Column<string>(maxLength: 64, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sport7Settings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sport7AuditLogActions",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    TenantId = table.Column<Guid>(nullable: true),
                    AuditLogId = table.Column<Guid>(nullable: false),
                    ServiceName = table.Column<string>(maxLength: 256, nullable: true),
                    MethodName = table.Column<string>(maxLength: 128, nullable: true),
                    Parameters = table.Column<string>(maxLength: 2000, nullable: true),
                    ExecutionTime = table.Column<DateTime>(nullable: false),
                    ExecutionDuration = table.Column<int>(nullable: false),
                    ExtraProperties = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sport7AuditLogActions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sport7AuditLogActions_Sport7AuditLogs_AuditLogId",
                        column: x => x.AuditLogId,
                        principalTable: "Sport7AuditLogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Sport7EntityChanges",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    AuditLogId = table.Column<Guid>(nullable: false),
                    TenantId = table.Column<Guid>(nullable: true),
                    ChangeTime = table.Column<DateTime>(nullable: false),
                    ChangeType = table.Column<byte>(nullable: false),
                    EntityTenantId = table.Column<Guid>(nullable: true),
                    EntityId = table.Column<string>(maxLength: 128, nullable: false),
                    EntityTypeFullName = table.Column<string>(maxLength: 128, nullable: false),
                    ExtraProperties = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sport7EntityChanges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sport7EntityChanges_Sport7AuditLogs_AuditLogId",
                        column: x => x.AuditLogId,
                        principalTable: "Sport7AuditLogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Sport7EntityPropertyChanges",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    TenantId = table.Column<Guid>(nullable: true),
                    EntityChangeId = table.Column<Guid>(nullable: false),
                    NewValue = table.Column<string>(maxLength: 512, nullable: true),
                    OriginalValue = table.Column<string>(maxLength: 512, nullable: true),
                    PropertyName = table.Column<string>(maxLength: 128, nullable: false),
                    PropertyTypeFullName = table.Column<string>(maxLength: 64, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sport7EntityPropertyChanges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sport7EntityPropertyChanges_Sport7EntityChanges_EntityChangeId",
                        column: x => x.EntityChangeId,
                        principalTable: "Sport7EntityChanges",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Sport7AuditLogActions_AuditLogId",
                table: "Sport7AuditLogActions",
                column: "AuditLogId");

            migrationBuilder.CreateIndex(
                name: "IX_Sport7AuditLogActions_TenantId_ServiceName_MethodName_ExecutionTime",
                table: "Sport7AuditLogActions",
                columns: new[] { "TenantId", "ServiceName", "MethodName", "ExecutionTime" });

            migrationBuilder.CreateIndex(
                name: "IX_Sport7AuditLogs_TenantId_ExecutionTime",
                table: "Sport7AuditLogs",
                columns: new[] { "TenantId", "ExecutionTime" });

            migrationBuilder.CreateIndex(
                name: "IX_Sport7AuditLogs_TenantId_UserId_ExecutionTime",
                table: "Sport7AuditLogs",
                columns: new[] { "TenantId", "UserId", "ExecutionTime" });

            migrationBuilder.CreateIndex(
                name: "IX_Sport7EntityChanges_AuditLogId",
                table: "Sport7EntityChanges",
                column: "AuditLogId");

            migrationBuilder.CreateIndex(
                name: "IX_Sport7EntityChanges_TenantId_EntityTypeFullName_EntityId",
                table: "Sport7EntityChanges",
                columns: new[] { "TenantId", "EntityTypeFullName", "EntityId" });

            migrationBuilder.CreateIndex(
                name: "IX_Sport7EntityPropertyChanges_EntityChangeId",
                table: "Sport7EntityPropertyChanges",
                column: "EntityChangeId");

            migrationBuilder.CreateIndex(
                name: "IX_Sport7PermissionGrants_Name_ProviderName_ProviderKey",
                table: "Sport7PermissionGrants",
                columns: new[] { "Name", "ProviderName", "ProviderKey" });

            migrationBuilder.CreateIndex(
                name: "IX_Sport7Settings_Name_ProviderName_ProviderKey",
                table: "Sport7Settings",
                columns: new[] { "Name", "ProviderName", "ProviderKey" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "homeinf");

            migrationBuilder.DropTable(
                name: "Sport7AuditLogActions");

            migrationBuilder.DropTable(
                name: "Sport7EntityPropertyChanges");

            migrationBuilder.DropTable(
                name: "Sport7PermissionGrants");

            migrationBuilder.DropTable(
                name: "Sport7Settings");

            migrationBuilder.DropTable(
                name: "Sport7EntityChanges");

            migrationBuilder.DropTable(
                name: "Sport7AuditLogs");
        }
    }
}
