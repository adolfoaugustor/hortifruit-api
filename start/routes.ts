import Route from '@ioc:Adonis/Core/Route'

Route.get("/", async () => {
  return {
    project: "hortifruitti",
    version: "1.0.1",
  };
});
