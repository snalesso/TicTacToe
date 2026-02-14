using Microsoft.AspNetCore.Mvc;

namespace TicTacToe.Service.Web.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
