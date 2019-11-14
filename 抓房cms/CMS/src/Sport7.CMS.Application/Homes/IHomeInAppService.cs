using Sport7.Application.Dtos;
using Sport7.CMS.Homes.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sport7.CMS.Homes
{
    public interface IHomeInAppService
    {
        /// <summary>
        /// 获取房源信息列表=
        /// </summary>
        Task<ListResultDto<HouseOutput>> GetPythonHomeList(SearchInput input);

        Task<ReturnOutput> GetContentFromUrl(string url);
    }
}
