import usuarioController from './controller/usuarioController.js'
import barbeiroController from './controller/barbeiroController.js'
import servicoController from './controller/servicoController.js'
import agendamentoController from './controller/agendamentoController.js'

export function adicionarRotas(api) {
  api.use(usuarioController)
  api.use(barbeiroController)
  api.use(servicoController)
  api.use(agendamentoController)
}

