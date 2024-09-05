using espsapi.Dto;
using espsapi.Helpers;
using espsapi.Interfaces;
using espsapi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace espsapi.Controllers
{
    [Route(template:"api")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;
        private readonly IUserDetailsRepository _context;
        public AuthController(IUserRepository repository, JwtService jwtService, IUserDetailsRepository context) {
            _repository = repository;
            _jwtService = jwtService;
            _context = context;
        }
        [HttpGet]
        public IActionResult Hello()
        {
            return Ok("S");
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = dto.Role
            };

            return Created("success", _repository.Create(user));
        }
        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _repository.GetByEmail(dto.Email);

            if (user == null) return BadRequest(new { message = "Invalid Credentials" });

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            var jwt = _jwtService.Generate(user.Id);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new
            {
                message = "success"
            });
        }
        [HttpGet("user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = _repository.GetById(userId);

                return Ok(user);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new
            {
                message = "success"
            });
        }

        [HttpGet("users")]
        public IActionResult Users()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = _repository.GetById(userId);

               
                if (user.Role != 1)
                {
                    return Unauthorized("Only admins can access all user information.");
                }

                var allUsers = _repository.GetAll();  

                return Ok(allUsers);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }


        [HttpDelete("users/{userId}/delete")]
        public IActionResult DeleteUser(int userId)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);

                int requestingUserId = int.Parse(token.Issuer);
                var requestingUser = _repository.GetById(requestingUserId);

                if (requestingUser.Role != 1)
                {
                    return Unauthorized("Only admins can delete users.");
                }

                var userToDelete = _repository.GetById(userId);

                if (userToDelete == null)
                {
                    return NotFound("User not found");
                }
                else
                {
                    var userDetailsToDelete = _context.GetById(userId);

                    if (userDetailsToDelete != null)
                    {
                        _context.Delete(userId);
                    }

                    
                   
                }

                _repository.Delete(userId);

                return Ok(new { message = "success" });
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }




    }
}
