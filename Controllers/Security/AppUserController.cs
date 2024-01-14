using GGCPortal.Server.DataApi.ViewModels.Identity;
using GGCPortal.Server.ViewModels.Identity;
using GGCPortal.Shared.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GGCPortal.Server.Controllers.Security
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppUserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AppUserController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/AppUser
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDataViewModel>>> GetAppUsers()
        {
            var users = await _context.AppUsers.ToListAsync();

            return Ok(users);
        }

        // GET: api/AppUser/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDataViewModel>> GetAppUserById(string id)
        {
            var user = await _context.AppUsers.FirstOrDefaultAsync(u=>u.Id== id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(MapToViewModel(user));
        }

        // GET: api/AppUser/username/{username}
        [HttpGet("userName")]
        public async Task<ActionResult<UserDataViewModel>> GetAppUserByUsername(string username)
        {
            var user = await _context.AppUsers
                .FirstOrDefaultAsync(u => u.UserName == username);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(MapToViewModel(user));
        }

        // POST: api/AppUser
        [HttpPost]
        public async Task<ActionResult<UserDataViewModel>> PostAppUser(UserDataViewModel viewModel)
        {
            var user = MapToModel(viewModel);

            _context.AppUsers.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAppUserById), new { id = user.Id }, MapToViewModel(user));
        }

        // PUT: api/AppUser/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppUser(string id, UserDataViewModel viewModel)
        {
            if (id != viewModel.Id)
            {
                return BadRequest();
            }

            var user = MapToModel(viewModel);

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.AppUsers.Any(u => u.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/AppUser/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppUser(string id)
        {
            var user = await _context.AppUsers.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.AppUsers.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private UserDataViewModel MapToViewModel(AppUser user)
        {
            
            return new UserDataViewModel
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                // Map other properties...
            };
        }

        private AppUser MapToModel(UserDataViewModel viewModel)
        {
            // Implement the mapping logic from UserDataViewModel to AppUser
            // Use AutoMapper or manual mapping depending on your preference
            // For simplicity, a manual mapping example is shown below
            return new AppUser
            {
                Id = viewModel.Id,
                UserName = viewModel.UserName,
                Email = viewModel.Email,
                PhoneNumber = viewModel.PhoneNumber,
                // Map other properties...
            };
        }
    }
}