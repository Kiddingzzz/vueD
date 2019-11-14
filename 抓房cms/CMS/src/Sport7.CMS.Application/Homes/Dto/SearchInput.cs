using System;
using System.Collections.Generic;
using System.Text;

namespace Sport7.CMS.Homes.Dto
{
    public class SearchInput
    {
        /// <summary>
        /// 搜索名称
        /// </summary>
        public string SearchName { get; set; }

        public int minReceive { get; set; }

        public int maxReceive { get; set; }
    }
}
