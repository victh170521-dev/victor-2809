import express from "express";
import cors from "cors";
import snailPayRouter from "./routes/snailPay.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

//implementacion local o cors 
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter((origin): origin is string => Boolean(origin));

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());

app.use("/api/snailpay", snailPayRouter);

app.get("/api/health", (req, res) => {
  res.json({ message: "SnailPay API funcionando" });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});