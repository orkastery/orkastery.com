export default [
  {
    "slug": "comecar",
    "group": "start",
    "sources": [
      "docs/comecar/quickstart.md",
      "README.md",
      "core/package.json"
    ],
    "translations": {
      "pt": {
        "title": "Comece pelo primeiro ciclo",
        "description": "Instale o CLI, confira o ambiente e transforme um pedido em trabalho verificável.",
        "sections": [
          {
            "id": "instalar",
            "title": "Instale e confira",
            "paragraphs": [
              "Use Node.js 20 ou superior, Git e um repositório de trabalho. O pacote se chama @orkastery/cli; o executável é ork. O núcleo não contém um modelo de IA. O runtime de agente configurado executa as fases."
            ],
            "code": "npm install -g @orkastery/cli\nork doctor\nork demo"
          },
          {
            "id": "projeto",
            "title": "Prepare o projeto",
            "paragraphs": [
              "Execute init na raiz do seu repositório. O manifesto define verificações, modo e integração com runtimes. Em seguida, responda à pauta de onboarding. Registre apenas nomes de variáveis de credenciais; mantenha os valores no ambiente protegido."
            ],
            "code": "ork init --name \"meu-produto\" --abbrev prd\nork onboarding\nork doctor"
          },
          {
            "id": "primeira-thread",
            "title": "Crie uma thread",
            "paragraphs": [
              "Uma thread reúne objetivo, plano, implementação, verificação e entrega. Comece com um pedido pequeno e um critério observável. Consulte o ID retornado e use-o nos comandos seguintes; não reutilize o ID de exemplo como se fosse um recibo real."
            ],
            "code": "ork thread new \"corrigir o filtro de data\" --modo classic\nork thread status <thread>\nork phase list <thread>"
          },
          {
            "id": "confirmar",
            "title": "Confirme antes de avançar",
            "paragraphs": [
              "Um doctor bloqueado impede novo despacho. Resolva a causa indicada e execute-o novamente. A demo é um exercício local de uma alegação que falha e depois passa; não comprova que seu projeto está pronto para publicação."
            ]
          }
        ]
      },
      "en": {
        "title": "Start with your first cycle",
        "description": "Install the CLI, check your environment and turn a request into verifiable work.",
        "sections": [
          {
            "id": "instalar",
            "title": "Install and check",
            "paragraphs": [
              "Use Node.js 20 or later, Git and a working repository. The package is @orkastery/cli; its executable is ork. The core contains no AI model. Your configured agent runtime executes the phases."
            ],
            "code": "npm install -g @orkastery/cli\nork doctor\nork demo"
          },
          {
            "id": "projeto",
            "title": "Prepare the project",
            "paragraphs": [
              "Run init at the root of your repository. The manifest defines checks, conduction mode and runtime integration. Then complete onboarding. Record credential variable names only; keep their values in the protected environment."
            ],
            "code": "ork init --name \"meu-produto\" --abbrev prd\nork onboarding\nork doctor"
          },
          {
            "id": "primeira-thread",
            "title": "Create a thread",
            "paragraphs": [
              "A thread brings together the goal, plan, implementation, verification and delivery. Start with a small request and an observable criterion. Use the returned ID in subsequent commands; the example ID is not a real receipt."
            ],
            "code": "ork thread new \"corrigir o filtro de data\" --modo classic\nork thread status <thread>\nork phase list <thread>"
          },
          {
            "id": "confirmar",
            "title": "Confirm before proceeding",
            "paragraphs": [
              "A blocked doctor prevents a new dispatch. Resolve the reported cause and rerun it. The demo is a local exercise in a claim that fails and then passes; it does not establish that your project is ready for publication."
            ]
          }
        ]
      },
      "es": {
        "title": "Empiece por el primer ciclo",
        "description": "Instale el CLI, compruebe el entorno y convierta una petición en trabajo verificable.",
        "sections": [
          {
            "id": "instalar",
            "title": "Instale y compruebe",
            "paragraphs": [
              "Utilice Node.js 20 o posterior, Git y un repositorio de trabajo. El paquete se llama @orkastery/cli; su ejecutable es ork. El núcleo no contiene un modelo de IA. El runtime de agente configurado ejecuta las fases."
            ],
            "code": "npm install -g @orkastery/cli\nork doctor\nork demo"
          },
          {
            "id": "projeto",
            "title": "Prepare el proyecto",
            "paragraphs": [
              "Ejecute init en la raíz del repositorio. El manifiesto define las verificaciones, el modo de conducción y la integración con runtimes. Después complete el onboarding. Registre solo los nombres de las variables de credenciales; guarde los valores en el entorno protegido."
            ],
            "code": "ork init --name \"meu-produto\" --abbrev prd\nork onboarding\nork doctor"
          },
          {
            "id": "primeira-thread",
            "title": "Cree una thread",
            "paragraphs": [
              "Una thread reúne objetivo, plan, implementación, verificación y entrega. Empiece con una petición pequeña y un criterio observable. Utilice el ID devuelto en los siguientes comandos; el ID del ejemplo no es un comprobante real."
            ],
            "code": "ork thread new \"corrigir o filtro de data\" --modo classic\nork thread status <thread>\nork phase list <thread>"
          },
          {
            "id": "confirmar",
            "title": "Confirme antes de avanzar",
            "paragraphs": [
              "Un doctor bloqueado impide un nuevo despacho. Resuelva la causa indicada y vuelva a ejecutarlo. La demo muestra una alegación que falla y después pasa; no demuestra que su proyecto esté listo para publicarse."
            ]
          }
        ]
      }
    }
  }
];
