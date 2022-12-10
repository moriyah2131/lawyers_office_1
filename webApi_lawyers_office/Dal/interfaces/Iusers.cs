using Dal.models;
using System.Threading.Tasks;

namespace Dal.interfaces
{
    public interface Iusers
    {
        Task<User> GetByIdAsync(int personId);
        Task<int> PostAsync(User newUser);
    }
}
