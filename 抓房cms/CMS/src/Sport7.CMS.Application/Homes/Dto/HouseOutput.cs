using System;
using System.Collections.Generic;
using System.Text;

namespace Sport7.CMS.Homes.Dto
{
    public class HouseOutput
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
        /// 更新时间
        /// </summary>
        public DateTime readyTime { get; set; }

        /// <summary>
        /// 距离时间
        /// </summary>
        public TimeSpan ts { get; set; }

        public int Days { get; set; }

        public int hours { get; set; }

        public int Minutes { get; set; }

        public int temp { get; set; }

        public string def { get; set; }

        public string url { get; set; }

        public string Chaoxiang { get; set; }
    }
}
