using HtmlAgilityPack;
using Sport7.Application.Dtos;
using Sport7.Application.Services;
using Sport7.CMS.Homes.Dto;
using Sport7.CMS.House;
using Sport7.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Sport7.CMS.Homes
{
    public class HomeInAppService : ApplicationService, IHomeInAppService
    {
        public readonly IRepository<homeinf, Guid> _repositoryHome;

        public HomeInAppService(IRepository<homeinf, Guid> repositoryHome)
        {
            _repositoryHome = repositoryHome;
        }

        public async Task<ReturnOutput> GetContentFromUrl(string url)
        {
            var wc = new WebClient();
            wc.Encoding = Encoding.GetEncoding("UTF-8"); //转格式
            var html = wc.DownloadString(url); //获取内容
            HtmlDocument doc = new HtmlDocument();
            doc.LoadHtml(html);
            HtmlNode nodeinfo = doc.GetElementbyId("floatNav");//获取该id内容
            return new ReturnOutput
            {
                htmlstr = nodeinfo.OuterHtml //如果获取网站页面采用的是UTF-8，则使用这句
                
            };
        }

        /// <summary>
        /// 获取房源信息列表=
        /// </summary>
        public async Task<ListResultDto<HouseOutput>> GetPythonHomeList(SearchInput input)
        {
            DateTime time1 = DateTime.Now;
            var query = from a in _repositoryHome.OrderByDescending(a => a.CreationTime)
                        select new HouseOutput
                        {
                            Address = a.Address,
                            Huxing = a.Huxing,
                            LianxiPeople = a.LianxiPeople,
                            Louceng = a.Louceng,
                            Phone = a.Phone,
                            Rice = a.Rice,
                            simpleRice = a.simpleRice,
                            Source = a.Source,
                            Square = a.Square,
                            Title = a.Title,
                            XiaoquName = a.XiaoquName,
                            Yongtu = a.Yongtu,
                            Zhuangxiu = a.Zhuangxiu,
                            readyTime = a.CreationTime,
                            ts = a.CreationTime - time1,
                            url = a.Url,
                            Days = (a.CreationTime - time1).Days,
                            hours = (a.CreationTime - time1).Hours,
                            Minutes = (a.CreationTime - time1).Minutes,
                            temp = -((a.CreationTime - time1).Days == 0 ? (a.CreationTime - time1).Hours == 0 ? (a.CreationTime - time1).Minutes : (a.CreationTime - time1).Hours : (a.CreationTime - DateTime.Now).Days),
                            def = (a.CreationTime - time1).Days == 0 ? (a.CreationTime - time1).Hours == 0 ? Convert.ToString(-(a.CreationTime - time1).Minutes + "分钟前")
                            : Convert.ToString(-(a.CreationTime - time1).Hours)+"小时前"
                            : Convert.ToString(-(a.CreationTime - time1).Days) + "天前",
                            Chaoxiang = a.Chaoxiang
                        };
            //搜索条件功能
            query = query.WhereIf(!input.SearchName.IsNullOrEmpty(),
                t => t.Address.Contains(input.SearchName) ||
                //Convert.ToString(t.simpleRice).Contains(Convert.ToString(input.maxReceive>t.simpleRice && input.minReceive<t.simpleRice)) ||
                t.Huxing.Contains(input.SearchName) ||
                t.Zhuangxiu.Contains(input.SearchName) ||
                t.Chaoxiang.Contains(input.SearchName)
                );
            return new ListResultDto<HouseOutput>(query.ToList());
        }
    }
}
