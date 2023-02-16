using BLL.interfaces;
using Dal.interfaces;
using EntitiesDTO;
using System.Security.Cryptography;
using System;
using System.Threading.Tasks;
using Dal.models;
using System.Collections.Generic;

namespace BLL.classes
{
    public class AccountsBll : IaccountsBll
    {
        private readonly Iaccounts dal;
        private readonly Ipeople peopleDal;        
        private readonly Iusers usersDal;
        public AccountsBll(Iaccounts _dal, Ipeople _peopleDal, Iusers _usersDal)
        {
            dal = _dal;
            peopleDal = _peopleDal;
            usersDal = _usersDal;
        }

        public async Task<AccountDTO> LogInAsync(string email, string password)
        {
            return await dal.LogInAsync(email, password);
        }

        public async Task<string> PostLawyerAsync(ShortPersonDTO participant)
        {
            int personId;
            string password;
            personId = await peopleDal.PostAsync(participant);
            password = GenerateToken(6);
            await usersDal.PostAsync(new() { PersonId = personId, UserPassword = password, UserType = participant.UserType = "LAWYER" });
        return password;    
    }

        private string GenerateToken(int length)
        {
            using (RNGCryptoServiceProvider cryptRNG = new RNGCryptoServiceProvider())
            {
                byte[] tokenBuffer = new byte[length];
                cryptRNG.GetBytes(tokenBuffer);
                return Convert.ToBase64String(tokenBuffer);
            }
        }

        public async Task RegisterAsync(RegisterDto registerDto)
        {
            await dal.RegisterAsync(registerDto);
        }

        public async Task<string> DeleteAsync(string email)
        {
         return   await dal.DeleteAsync(email);
        }
        public async Task<List<ShortPersonDTO>> GetAllAsync()
        {
            return await dal.GetAllAsync();
        }
        public async Task<List<ShortPersonDTO>> GetAllLawyerAsync()
        {
            return await dal.GetAllLawyerAsync();
        }

    }
}
