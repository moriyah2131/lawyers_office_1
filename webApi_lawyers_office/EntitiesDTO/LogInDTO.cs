using System.ComponentModel.DataAnnotations;

namespace EntitiesDTO
{
    public class LogInDTO
    {
        [Required]
        [EmailAddress]
        [MaxLength(50)]
        public string Email { get; set; }
        [Required]
        [MinLength(5)]
        public string Password { get; set; }
    }
}
