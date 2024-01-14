using GGCPortal.Shared.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GGCPortal.Server.DataApi.ViewModels.Identity
{
    public class UserDataViewModel
    {
        public string? Id { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? FullName { get; set; }
        public string? Gender { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Picture { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Religion { get; set; }
        public string? AboutMe { get; set; }
        public string[]? Roles { get; set; }
    }
}
