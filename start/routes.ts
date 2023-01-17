import Route from '@ioc:Adonis/Core/Route'

Route.post("login", "AuthController.login");
Route.post("logout", "AuthController.logout");


Route.get("/cidades", "CityController.index");
Route.get("/cidades/:id/estabelecimentos", "CityController.Establishments");

Route.get("/estabelecimentos/:id", "EstablishmentsController.show");
Route.group(() => {
  Route.get("auth/me", "AuthController.me");

  Route.resource("/enderecos", "AddressController").only([
    "index", "store", "update", "destroy",
  ]);
  Route.post("/cliente/cadastro", "ClientController.store");

  Route.post("/pedidos", "OrdersController.store");
  Route.get("/pedidos", "OrdersController.index");
  Route.get("/pedidos/:hash_id", "OrdersController.show");

  Route.get("/estabelecimento/pedidos", "EstablishmentsController.orders");

  Route.put("/cliente", "ClientController.update");

}).middleware("auth");

Route.get("/", async () => {
  return {
    project: "hortifruitti",
    version: "1.0.1",
  };
});
