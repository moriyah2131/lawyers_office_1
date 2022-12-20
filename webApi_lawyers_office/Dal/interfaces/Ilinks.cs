using Dal.models;
using EntitiesDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.interfaces
{
    public interface Ilinks
    {
        public Task<List<LinksDto>> GetAllAsync();
        public LinksDto GetById(int id);
        public LinksDto post(LinksDto obj);
        public LinksDto put(LinksDto obj);
        public LinksDto delete(int id);
    }
}
