require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const professoresRoutes = require("./src/routes/professores.routes");
const turmasRoutes = require("./src/routes/turmas.routes");
const atividadesRoutes = require("./src/routes/atividades.routes");

app.use("/professores", professoresRoutes);
app.use("/turmas", turmasRoutes);
app.use("/atividades", atividadesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});