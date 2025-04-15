const verificacaoCodigoStatus = (res, codigo, mensagem) => {
    return res.status(codigo).json({ mensagem });
};

module.exports = { verificacaoCodigoStatus };