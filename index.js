import express from "express"
import pg from "pg"

const app = express();
app.use(express.json());

const { Pool } = pg;

const pool = new Pool({
    user: "postgres",
    password: "admin123",
    host: "localhost",
    port: 5432,
    database: "avanti"
})

app.get("/usuarios", async (request, response) => {
    const usuarios = await pool.query("SELECT * FROM usuarios");
   
    return response.json(usuarios.rows).status(200);
})

app.post("/usuarios", async (request, response) => {
    const { nome, email, telefone } = request.body;

    const usuario = await pool.query("INSERT INTO usuarios (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *", [nome, email, telefone])
    
    return response.status(201).json(usuario.rows[0]);
})

app.put("/usuario/:id", async (request, response) => {
    const { nome, email, telefone } = request.body;
    const { id } = request.params;

    const u = await pool.query("SELECT * FROM usuarios WHERE id = $1",[id]);

    if (u.rowCount < 1){
         return response.status(404).json("Usuario nao encontrado");
    }
    const usuario = await pool.query("UPDATE usuarios SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *", [nome, email, telefone, id])
    
    return response.status(200).json(usuario.rows[0]);

})

app.delete("/usuario/:id", async (request, response) => {
    const { id } = request.params;

    const usuario = await pool.query("SELECT * FROM usuarios WHERE id = $1",[id]);

    if (usuario.rowCount < 1){
         return response.status(404).json("Usuario nao encontrado");
    }
    
    await pool.query("DELETE FROM usuarios WHERE id = $1",[id]);
    return response.status(204).send();

})

app.listen(8082, () => {
    console.log("Running on port 8082")
})