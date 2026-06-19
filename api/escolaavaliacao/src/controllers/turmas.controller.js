const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const data = req.body;

    const item = await prisma.turmas.create({
        data
    });

    res.json(item).status(201).end();
};

const listar = async (req, res) => {
    const lista = await prisma.turmas.findMany();

    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.turmas.findUnique({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    
    const item = await prisma.turmas.update({
        where: { id : Number(id) },
        data: dados
    });

    res.json(item).status(200).end();
};

const excluir = async (req, res) => {

    const id = Number(req.params.id);

    const turma = await prisma.turmas.findUnique({
        where: { id }
    });

    if (!turma) {
        return res.json({
            erro: "Turma não encontrada"
        });
    }

    const atividades = await prisma.atividades.findMany({
        where: {
            turmaId: id
        }
    });

    if (atividades.length > 0) {
        return res.json({
            erro: "Você não pode excluir uma turma com atividades cadastradas"
        });
    }

    await prisma.turmas.delete({
        where: { id }
    });

    res.json({
        mensagem: "Turma excluída com sucesso"
    });
};

const listarPorProfessor = async (req, res) => {

    const lista = await prisma.turmas.findMany({
        where: {
            professorId: Number(req.params.professorId)
        }
    });

    res.json(lista);
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir,
    listarPorProfessor
}
