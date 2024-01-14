using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using GGCPortal.Server.DataApi.ViewModels.Identity;
using GGCPortal.Shared.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using Org.BouncyCastle.Crypto;
using AutoMapper;
using EmailService;
using Microsoft.AspNetCore.WebUtilities;
using GGCPortal.Server.ViewModels.Identity;
using Microsoft.AspNetCore.Authorization;
using MailKit.Security;
using MimeKit;
using MailKit.Net.Smtp;
using System.Web;
namespace GGCPortal.Server.Controllers.Security
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IConfiguration config;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;
        public AccountController(UserManager<AppUser> userManager, IConfiguration config, IMapper mapper, IEmailSender emailSender )
        {
            this.userManager = userManager;
            this.config = config;
            this._mapper = mapper;
            this._emailSender = emailSender;
            
        }
        [Route("Register")]
        [HttpPost]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            try
            {
                // Check if the username is already in use
                var existingUserByUsername = await userManager.FindByNameAsync(model.Username);
                if (existingUserByUsername != null)
                {
                    return BadRequest("Username is already in use.");
                }

                // Check if the email is already in use
                var existingUserByEmail = await userManager.FindByEmailAsync(model.Email);
                if (existingUserByEmail != null)
                {
                    return BadRequest("Email is already in use.");
                }

                // Check if the phone number is already in use
                var existingUserByPhoneNumber = await userManager.Users.FirstOrDefaultAsync(u => u.PhoneNumber == model.PhoneNumber);
                if (existingUserByPhoneNumber != null)
                {
                    return BadRequest("Phone number is already in use.");
                }

                // If not, proceed with user registration
                var user = new AppUser
                {
                    Email = model.Email,
                    UserName = model.Username,
                    PhoneNumber = model.PhoneNumber,
                    SecurityStamp = Guid.NewGuid().ToString()
                };

                // Ensure that the password is not empty or null
                if (string.IsNullOrEmpty(model.Password))
                {
                    return BadRequest("Password cannot be empty.");
                }

                var result = await userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
                    string codeHtmlVersion = HttpUtility.UrlEncode(token);
                    //byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(token);
                    //var codeEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);
                    //var confirmationLink = Url.Action("EmailConfirm", "Account", new { token, email = user.Email }, Request.Scheme);
                    //var confirmationLink = Url.Action("ConfirmEmail", "Account",
                    //        new { UserId = user.Id, Token = token }, protocol: HttpContext.Request.Scheme);
                    var confirmationLink = $"<a href='https://localhost:7218/api/Account/ConfirmEmail?email={user.Email}&token={codeHtmlVersion}'>https://localhost:7218/api/Account/ConfirmEmail/?email={user.Email}&token={codeHtmlVersion}</a>";
                   

                    // added HTML encoding
                    

                    // for some weird reason the following commented out line (which should return an absolute URL) returns null instead
                    // var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);

                    string callbackUrl = "https://localhost:7218/api/Account/ConfirmEmail?email=" +
                        user.Email + "&token=" + codeHtmlVersion;
                    await this.SendAsync(confirmationLink ?? "", user.Email);
                    // Add the user to the "User" role
                    await userManager.AddToRoleAsync(user, "User");
                    return Ok(new { Username = user.UserName, message= "A confirmation sent ro your mail. Please confirm the mail address" });
                }

                // Handle password validation errors separately
                var passwordErrors = result.Errors.Where(error => error.Code.StartsWith("Password")).ToList();
                if (passwordErrors.Any())
                {
                    return BadRequest(passwordErrors.Select(error => error.Description));
                }

                return BadRequest(result.Errors.Select(error => error.Description));
            }
            catch (Exception ex)
            {
                // Log the exception for further investigation
                Console.WriteLine(ex);

                // Return a more informative response to the client
                return StatusCode(500, $"An error occurred while processing your request. Details: {ex.Message}");
            }
        }      
        [Route("Login")]
        [HttpPost]
        public async Task<ActionResult> Login(LoginViewModel model)
        {
            var user = await FindUserAsync(model.Identifier);

            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var roles = await userManager.GetRolesAsync(user);
                var signingKey = Encoding.UTF8.GetBytes(config["Jwt:SigningKey"] ?? "IsDB-BISEW ESAD-54");
                var expiryDuration = int.Parse(config["Jwt:ExpiryInMinutes"] ?? "30");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Issuer = null,
                    Audience = null,
                    IssuedAt = DateTime.UtcNow,
                    NotBefore = DateTime.UtcNow,
                    Expires = DateTime.UtcNow.AddMinutes(expiryDuration),
                    Subject = new ClaimsIdentity(
                        new List<Claim> {
                    new Claim("username", user.UserName ?? ""),
                    new Claim("phone", user.PhoneNumber ?? ""),
                    new Claim("email", user.Email ?? ""),
                    new Claim("fullName", user.FullName ?? ""),
                    new Claim("roles", string.Join(",", roles)),
                    new Claim("expires", DateTime.UtcNow.AddMinutes(expiryDuration).ToString("yyyy-MM-ddTHH:mm:ss"))
                        }),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(signingKey), SecurityAlgorithms.HmacSha256Signature)
                };

                var jwtTokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = jwtTokenHandler.CreateJwtSecurityToken(tokenDescriptor);
                var token = jwtTokenHandler.WriteToken(jwtToken);

                return Ok(new { Token = token });
            }

            // Log details for debugging
            if (user == null)
            {
                Console.WriteLine("User not found.");
                return NotFound(new { Message = "User not found." });
            }
            else
            {
                Console.WriteLine("Password check failed.");
                return BadRequest(new { Message = "Incorrect password." });
            }
        }

        private async Task<AppUser?> FindUserAsync(string identifier)
        {
            // Try finding the user by email
            var user = await userManager.FindByEmailAsync(identifier);

            // If not found, try finding by username
            if (user == null)
            {
                user = await userManager.FindByNameAsync(identifier);
            }

            // If still not found, try finding by phone number
            if (user == null && !string.IsNullOrEmpty(identifier) && new PhoneAttribute().IsValid(identifier))
            {
                user = await userManager.Users.FirstOrDefaultAsync(u => u.PhoneNumber == identifier);
            }

            return user;
        }
        [Route("ForgotPassword")]
        [HttpPost]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null || !(await userManager.IsEmailConfirmedAsync(user)))
            {
                // Don't reveal that the user does not exist or is not confirmed
                return Ok(new { Message = "If the provided email is registered, a password reset email has been sent." });
            }

            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.Id, token }, protocol: HttpContext.Request.Scheme);

            // Send the reset link to the user's email
            await _emailSender.SendEmailAsync(user.Email, "Reset Password",
                $"Please reset your password by clicking <a href='{callbackUrl}'>here</a>.");

            return Ok(new { Message = "If the provided email is registered, a password reset email has been sent." });
        }

        [Route("ResetPassword")]
        [HttpPost]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return BadRequest(new { Message = "User not found." });
            }

            var result = await userManager.ResetPasswordAsync(user, model.Token, model.Password);
            if (result.Succeeded)
            {
                return Ok(new { Message = "Password has been successfully reset." });
            }

            // Handle password validation errors separately
            var passwordErrors = result.Errors.Where(error => error.Code.StartsWith("Password")).ToList();
            if (passwordErrors.Any())
            {
                return BadRequest(passwordErrors.Select(error => error.Description));
            }

            return BadRequest(result.Errors.Select(error => error.Description));
        }
        [HttpGet("ConfirmEmail")]
        public async Task<ActionResult> ConfirmEmail(string email, string token)
        {
            
            var user = await userManager.FindByEmailAsync(email);
          var t  =HttpUtility.UrlDecode(token);
            if (user == null)
                return BadRequest();
            var result = await userManager.ConfirmEmailAsync(user, token);
            await userManager.SetLockoutEnabledAsync(user, false);
            user.EmailConfirmed = true;
            if (result.Succeeded)
            {
                user.EmailConfirmed=true;
            }
            return Ok(new { success=true, mesaage="Email confirmd"});
        }
        private async Task<ActionResult> SendAsync(string message, string email)
        {
            try
            {
                var mail = new MimeMessage();
                mail.From.Add(new MailboxAddress("Manuel Stoltenberg", "manuel.stoltenberg63@ethereal.email"));
                mail.Sender = new MailboxAddress("Manuel Stoltenberg", "manuel.stoltenberg63@ethereal.email");
                mail.To.Add(MailboxAddress.Parse(email));
                var body = new BodyBuilder();
                mail.Subject = "Email confirmation link";
                body.HtmlBody = message;
                mail.Body = body.ToMessageBody();
                using var smtp = new SmtpClient();
                await smtp.ConnectAsync("smtp.ethereal.email", 587, SecureSocketOptions.StartTls, CancellationToken.None);
                await smtp.AuthenticateAsync("manuel.stoltenberg63@ethereal.email", "tM3UKwf675ZTwskVbN", CancellationToken.None);
                await smtp.SendAsync(mail, default);
                await smtp.DisconnectAsync(true, default);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok();
        }
    }
    
}
