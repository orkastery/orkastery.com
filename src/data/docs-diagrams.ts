export default {
  "layers": {
    "pt": {
      "title": "Quem conduz, executa e confere",
      "description": "O host apresenta a intenção ao núcleo. O núcleo despacha o runtime e recebe código e evidência para verificar. Gates e ledger permanecem no núcleo.",
      "nodes": [
        "Host · pedido e decisões",
        "Núcleo ork · contratos e estado",
        "Runtime · código e evidência"
      ],
      "edges": [
        "Pedido → núcleo",
        "Despacho → runtime"
      ]
    },
    "en": {
      "title": "Who conducts, executes and checks",
      "description": "The host presents intent to the core. The core dispatches the runtime and receives code and evidence for verification. Gates and the ledger remain in the core.",
      "nodes": [
        "Host · requests and decisions",
        "ork core · contracts and state",
        "Runtime · code and evidence"
      ],
      "edges": [
        "Request → core",
        "Dispatch → runtime"
      ]
    },
    "es": {
      "title": "Quién conduce, ejecuta y comprueba",
      "description": "El host presenta la intención al núcleo. El núcleo despacha el runtime y recibe código y pruebas para verificar. Los gates y el ledger permanecen en el núcleo.",
      "nodes": [
        "Host · peticiones y decisiones",
        "Núcleo ork · contratos y estado",
        "Runtime · código y pruebas"
      ],
      "edges": [
        "Petición → núcleo",
        "Despacho → runtime"
      ]
    }
  },
  "cycle": {
    "pt": {
      "title": "Do objetivo à avaliação",
      "description": "GOAL e PLAN definem o trabalho; GO implementa; CHECK verifica; SHIP entrega com prova remota; MASTER registra avaliação e lições. Falhas de CHECK voltam ao GO.",
      "nodes": [
        "GOAL · objetivo",
        "PLAN · plano",
        "GO · implementação",
        "CHECK · evidência",
        "SHIP · entrega",
        "MASTER · aprendizado"
      ],
      "edges": [
        "Critérios",
        "Tarefas",
        "Provas",
        "Gates",
        "Resultado"
      ]
    },
    "en": {
      "title": "From goal to assessment",
      "description": "GOAL and PLAN define work; GO implements; CHECK verifies; SHIP delivers with remote proof; MASTER records assessment and lessons. CHECK failures return to GO.",
      "nodes": [
        "GOAL · objective",
        "PLAN · plan",
        "GO · implementation",
        "CHECK · evidence",
        "SHIP · delivery",
        "MASTER · learning"
      ],
      "edges": [
        "Criteria",
        "Tasks",
        "Evidence",
        "Gates",
        "Result"
      ]
    },
    "es": {
      "title": "Del objetivo a la evaluación",
      "description": "GOAL y PLAN definen el trabajo; GO implementa; CHECK verifica; SHIP entrega con prueba remota; MASTER registra evaluación y lecciones. Los fallos de CHECK vuelven a GO.",
      "nodes": [
        "GOAL · objetivo",
        "PLAN · plan",
        "GO · implementación",
        "CHECK · pruebas",
        "SHIP · entrega",
        "MASTER · aprendizaje"
      ],
      "edges": [
        "Criterios",
        "Tareas",
        "Pruebas",
        "Gates",
        "Resultado"
      ]
    }
  },
  "isolation": {
    "pt": {
      "title": "Isolamento e autorização",
      "description": "A thread define escopo e permissões. A worktree isola o código. Leases coordenam colisões. O gate da entrega reconfere autorização e evidência antes do merge.",
      "nodes": [
        "Thread · escopo",
        "Worktree · código isolado",
        "Lease · recurso compartilhado",
        "Gate · entrega autorizada"
      ],
      "edges": [
        "Limita a edição",
        "Coordena acesso",
        "Reconfere a entrega"
      ]
    },
    "en": {
      "title": "Isolation and authorization",
      "description": "The thread defines scope and permissions. The worktree isolates code. Leases coordinate collisions. The delivery gate rechecks authorization and evidence before merging.",
      "nodes": [
        "Thread · scope",
        "Worktree · isolated code",
        "Lease · shared resource",
        "Gate · authorized delivery"
      ],
      "edges": [
        "Bounds editing",
        "Coordinates access",
        "Rechecks delivery"
      ]
    },
    "es": {
      "title": "Aislamiento y autorización",
      "description": "La thread define alcance y permisos. La worktree aísla el código. Los leases coordinan colisiones. El gate de entrega comprueba autorización y pruebas antes del merge.",
      "nodes": [
        "Thread · alcance",
        "Worktree · código aislado",
        "Lease · recurso compartido",
        "Gate · entrega autorizada"
      ],
      "edges": [
        "Limita la edición",
        "Coordina acceso",
        "Comprueba la entrega"
      ]
    }
  }
};
