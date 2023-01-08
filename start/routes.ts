import Route from '@ioc:Adonis/Core/Route'

Route.post("login", "AuthController.login");
Route.post("logout", "AuthController.logout");

Route.post("/cliente/cadastro", "ClientsController.store");

Route.group(() => {
  Route.get("auth/me", "AuthController.me");

  Route.put("/cliente", "ClientsController.update");
}).middleware("auth");

Route.get("/", async () => {
  return {
    project: "hortifruitti",
    version: "1.0.1",
  };
});
