using Dal.models;
using EntitiesDTO;
using System.Collections.Generic;

namespace Dal.converters
{
    public class PeopleConverter
    {
        public static ShortPersonDTO toDto(models.Person obj)
        {
            return new ShortPersonDTO()
            {
                FirstName = obj.FirstName,
                LastName = obj.LastName,
                Phone = obj.Phone,
                SecondPhone = obj.SecondPhone,
                Tz = obj.Tz,
                LivingAddress = obj.LivingAddress,
                Email = obj.Email,
                Id = obj.Id,
            };
        }

        public static Person toDal(ShortPersonDTO obj)
        {
            return new Person()
            {
                FirstName = obj.FirstName,
                LastName = obj.LastName,
                Phone = obj.Phone,
                SecondPhone = obj.SecondPhone,
                Tz = obj.Tz,
                LivingAddress = obj.LivingAddress,
                Email = obj.Email,
                Id = obj.Id,
            };
        }

        public static List<ShortPersonDTO> toDtoList(List<models.Person> objList)
        {
            List<ShortPersonDTO> l = new();
            foreach (models.Person item in objList)
            {
                l.Add(toDto(item));
            }
            return l;
        }

        public static List<models.Person> toDalList(List<ShortPersonDTO> objList)
        {
            List<Person> l = new();
            foreach (ShortPersonDTO item in objList)
            {
                l.Add(toDal(item));
            }
            return l;
        }
    }
}
