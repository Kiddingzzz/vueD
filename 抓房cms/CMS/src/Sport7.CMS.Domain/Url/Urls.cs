using Sport7.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Sport7.CMS.Url
{
    [Table("Urls")]
    public class Urls : FullAuditedEntity<Guid>
    {
        /// <summary>
        /// url链接
        /// </summary>
        public string Url { get; set; }
    }
}
