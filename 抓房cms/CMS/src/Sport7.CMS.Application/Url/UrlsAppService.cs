using Sport7.Application.Services;
using Sport7.CMS.Url.Dto;
using Sport7.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.Linq;

namespace Sport7.CMS.Url
{
    public class UrlsAppService : ApplicationService, IUrlsAppService
    {
        public readonly IRepository<Urls, Guid> _repositoryUrl;
        public readonly IRepository<PythonHome, Guid> _repositoryPython;

        public UrlsAppService(IRepository<Urls, Guid> repositoryUrl,
            IRepository<PythonHome, Guid> repositoryPython
            )
        {
            _repositoryUrl = repositoryUrl;
            _repositoryPython = repositoryPython;
        }

        /// <summary>
        /// 插入Url接口
        /// </summary>
        public async Task<HouseOutPut> GetUrl(string Urls)
        {
            var Ids = GuidGenerator.Create();
            var query = new Urls()
            {
                Id = Ids,
                Url = Urls,
            };
            await _repositoryUrl.InsertAsync(query);

            var SearchUrl = _repositoryPython.FirstOrDefault(t => t.UrlsId == Ids);
            while(SearchUrl != null)
            {
                SearchUrl = _repositoryPython.FirstOrDefault(t => t.UrlsId == Ids);
                Thread.Sleep(800);
            }
            var querys = from a in _repositoryPython.Where(t => t.UrlsId == Ids)
                         select new HouseOutPut
                         {
                             Address = a.Address,
                             Chaoxiang = a.Chaoxiang,
                             LianxiPeople = a.LianxiPeople,
                             Rice = a.Rice,
                             Phone = a.Phone,
                             XiaoquName = a.XiaoquName,


                         };
        }
    }
}
