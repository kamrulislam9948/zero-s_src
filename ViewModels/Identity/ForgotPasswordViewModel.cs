using System.ComponentModel.DataAnnotations;

namespace GGCPortal.Server.ViewModels.Identity
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
    }
}
