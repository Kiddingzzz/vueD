using Sport7.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Sport7.CMS.House
{
    [Table("homeinf")]
    public class homeinf : FullAuditedEntity<Guid>
    {
        /// <summary>
        /// 用途
        /// </summary>
        public string Yongtu { get; set; }

        /// <summary>
        /// 小区
        /// </summary>
        public string XiaoquName { get; set; }

        /// <summary>
        /// 标题
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// 价格
        /// </summary>
        public int Rice { get; set; }

        /// <summary>
        /// 单价
        /// </summary>
        public int simpleRice { get; set; }

        /// <summary>
        /// 面积
        /// </summary>
        public int Square { get; set; }

        /// <summary>
        /// 户型
        /// </summary>
        public string Huxing { get; set; }

        /// <summary>
        /// 楼层
        /// </summary>
        public string Louceng { get; set; }

        /// <summary>
        /// 装修
        /// </summary>
        public string Zhuangxiu { get; set; }

        /// <summary>
        /// 联系人
        /// </summary>
        public string LianxiPeople { get; set; }

        /// <summary>
        /// 电话
        /// </summary>
        public string Phone { get; set; }
        
        /// <summary>
        /// 地址
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// 来源
        /// </summary>
        public string Source { get; set; }

        /// <summary>
        /// url连接地址
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// 朝向
        /// </summary>
        public string Chaoxiang { get; set; }
    }
}
