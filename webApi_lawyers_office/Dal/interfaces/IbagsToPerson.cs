using Dal.models;
using System.Threading.Tasks;

namespace Dal.interfaces
{
    public interface IbagsToPerson
    {
        Task deleteByIdAsync(Bag bagToDelete);
        Task<string> GetUserType(int bagID, int personID);
        Task<int> PostAsync(int personId, string userType, int bagId);
    }
}
