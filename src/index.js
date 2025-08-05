const fastify = require("fastify")({ logger: true });
const path = require("path");
const { Eta } = require("eta");

require("dotenv").config();

(async () => {

    const eta = new Eta();

	try {
		await fastify.register(require("@fastify/static"), {
			root: path.join(__dirname, "public"),
			prefix: "/public/",
		});

		await fastify.register(require("@fastify/view"), {
			engine: {
				eta: eta,
			},
			viewExt: "eta",
			root: path.join(__dirname, "views"),
		});

		fastify.get("/", async (request, reply) => {
			return reply.view("index");
		});

		fastify.get("/play", async (request, reply) => {
			return reply.view("game");
		});

		const port = process.env.PORT || 8080;
		await fastify.listen({ port, host: "0.0.0.0" });
		console.log(`🚀 Typ0saur running on http://localhost:${port}`);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
})();