const express = require("express");

const router = express.Router();

const { 
    cadastrar, 
    listar, 
    buscar, 
    atualizar, 
    excluir, 
    login
} = require("../controllers/professores.controller");

router.post("/cadastrar", cadastrar); //Testado
router.get("/listar", listar); //Testado
router.get("/buscar/:id", buscar); //Testado
router.put("/atualizar/:id", atualizar); //Testado
router.delete("/excluir/:id", excluir); //Testado
router.post("/login", login); //Testado

module.exports = router;
