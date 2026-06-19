const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const data = req.body;

    const item = await prisma.professores.create({
        data
    });

    res.json(item).status(201).end();
};

const listar = async (req, res) => {
    const lista = await prisma.professores.findMany();

    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.professores.findUnique({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    
    const item = await prisma.professores.update({
        where: { id : Number(id) },
        data: dados
    });

    res.json(item).status(200).end();
};

const excluir = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.professores.delete({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

const login = async (req, res) => {

    const { email, senha } = req.body;

    const professor = await prisma.professores.findFirst({
        where: {
            email,
            senha
        }
    });

    if (!professor) {
        return res.json({
            erro: "Email ou senha inválidos"
        });
    }

    res.json(professor);
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir,
    login
}
