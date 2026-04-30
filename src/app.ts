import express from "express";
import { pool } from "./db";

const app = express();

app.get("/diagnosticos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM TemplateDiagnosticos");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener datos" });
  }
});

export default app;

