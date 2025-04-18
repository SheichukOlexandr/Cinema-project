using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MVC_Cinema_app.Models;
using System.Diagnostics;

namespace MVC_Cinema_app.Controllers
{
    [Authorize(Policy = Policies.AdminUserPolicy)]
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            // Mock data for the dashboard
            ViewBag.TotalSales = 12500.50;
            ViewBag.BookingsToday = 320;
            ViewBag.ActiveSessions = 15;

            // Initialize ViewBag.Sessions
            var sessions = new List<dynamic>
               {
                   new { Id = 1, MovieTitle = "Inception", ShowTime = "2025-04-18 18:00", TicketsSold = 120 },
                   new { Id = 2, MovieTitle = "The Matrix", ShowTime = "2025-04-18 20:00", TicketsSold = 95 },
                   new { Id = 3, MovieTitle = "Dune", ShowTime = "2025-04-18 22:00", TicketsSold = 150 }
               };
            ViewBag.Sessions = sessions;

            return View();
        }

        [HttpGet]
        public IActionResult GetStats()
        {
            // Simulate fetching updated stats
            var stats = new
            {
                totalSales = 12500.50 + new Random().Next(100, 500),
                bookingsToday = 320 + new Random().Next(1, 10),
                activeSessions = 15
            };

            return Json(stats);
        }
    }
}