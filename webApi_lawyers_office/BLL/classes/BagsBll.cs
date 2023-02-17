using BLL.interfaces;
using Dal.interfaces;
using Dal.models;
using EntitiesDTO;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace BLL.classes
{
    public class BagsBll : IbagsBll
    {
        private readonly  Ibags dal;
        private readonly  Iassets assetsDal;
        private readonly Ipeople peopleDal;
        private readonly IbagsToPerson bagsToPersonDal;
        private readonly Iusers usersDal;

        public BagsBll(Ibags _dal, Iassets _assetsDal, Ipeople _peopleDal, IbagsToPerson _bagsToPersonDal, Iusers _usersDal)
        {
            dal = _dal;
            assetsDal = _assetsDal;
            peopleDal = _peopleDal;
            bagsToPersonDal = _bagsToPersonDal;
            usersDal = _usersDal;
        }

        public async Task<List<GetBagDTO>> GetBagsByIDsAsync(int[] IDs)
        {
            return await dal.GetBagsByIDsAsync(IDs);
        }

        public async Task<GetBagDTO> GetByIdAsync(int id)
        {
            return await dal.GetByIdAsync(id);
        }

        public async Task<List<GetBagDTO>> GetAllAsync(int currentPage, int pageSize)
        {
            return await dal.GetAllAsync(currentPage, pageSize);
        }

        public async Task<List<LogInDTO>> GetLoginsByIDAsync(int bagID, ICollection<ShortPersonDTO> participans)
        {
            return await postOrGetParticipants(false, bagID, participans);
        }

        public async Task<List<LogInDTO>> post(string bagName, PostBagDTO postBagDTO)
        {
            int assetId = await assetsDal.PostAsync(postBagDTO.Asset);
            int bagId = await dal.PostAsync(bagName, assetId);
            return await postOrGetParticipants(true, bagId, postBagDTO.Participants);
        }

        private  async Task<List<LogInDTO>> postOrGetParticipants(bool toPostBag, int bagId, ICollection<ShortPersonDTO> participants)
        {
            List<LogInDTO> logIns = new();
            foreach (ShortPersonDTO participant in participants)
            {
                int personId;
                string password;

                if (participant.Tz == null || toPostBag == false)
                {
                    personId = await peopleDal.GetByEmailAsync(participant.Email);
                    User exsitingUser = await usersDal.GetByIdAsync(personId);
                    password = exsitingUser.UserPassword;
                }
                else
                {
                    personId = await peopleDal.PostAsync(participant);
                    password = GenerateToken(6);
                    await usersDal.PostAsync(new() { PersonId = personId, UserPassword = password, UserType = "CUSTOMER" });
                }
                if(toPostBag)
                    await bagsToPersonDal.PostAsync(personId, participant.UserType, bagId);
                logIns.Add(new() { Email = participant.Email, Password = password });
            }
            return logIns;
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

        public async Task DeleteAsync(int bagId)
        {
            await dal.deleteByIdAsync(bagId);
        }

        public async Task<List<LogInDTO>> PutAsync(int bagId, string bagName, PostBagDTO postBagDTO)
        {
            await assetsDal.PutAsync(bagId, postBagDTO.Asset);
            await dal.PutAsync(bagId, bagName, null);
            List<LogInDTO> logins = new();
            List<ShortPersonDTO> existingParticipant = new(), notExistingParticipant = new();
            foreach (var participant in postBagDTO.Participants)
            {
                if(participant?.Id > 0)
                    existingParticipant.Add(participant);
                else
                    notExistingParticipant.Add(participant);
            }

            logins.AddRange(await postOrGetParticipants(true, bagId, notExistingParticipant));
            logins.AddRange(await peopleDal.PutListAsync(existingParticipant));
            return logins;
        }

        public async Task PutBagStateAsync(int bagId, int status)
        {
            await dal.PutAsync(bagId, null, status);
        }
    }
}
