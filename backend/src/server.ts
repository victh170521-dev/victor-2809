import express from "express";
import cors from "cors";
import snailPayRouter from "./routes/snailPay.routes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/snailpay", snailPayRouter);

app.get("/api/health", (req, res) => {
  res.json({ message: "SnailPay API funcionando" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});