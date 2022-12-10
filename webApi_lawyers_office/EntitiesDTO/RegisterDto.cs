using System.ComponentModel.DataAnnotations;

namespace EntitiesDTO
{
    public class RegisterDto
    {
        [Required]
        public int PersonID { get; set; }
        [MaxLength(10)]
        [MinLength(9)]
        [Phone]
        public string? Fax { get; set; }
        [MaxLength(10)]
        [MinLength(9)]
        [Phone]
        public string? SecondPhone { get; set; }
        [Required]
        [MinLength(7)]
        [MaxLength(50)]
        public string LivingAddress { get; set; }
        [Required]
        [MinLength(6)]
        [MaxLength(50)]
        public string Password { get; set; }
    }
}
