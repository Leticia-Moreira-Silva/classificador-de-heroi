function gerarCodigo() {
    const tipo = document.getElementById("tipoProjeto").value;
    const linguagem = document.getElementById("linguagem").value;
    const login = document.getElementById("login").checked;
    const banco = document.getElementById("banco").checked;
    const promptLivre = document.getElementById("promptLivre").value;
    const crud = document.getElementById("crud").checked;
    let codigo = "";

    // Verificar se há um prompt livre
    if (promptLivre.trim() !== "") {
        codigo += `// Código gerado com base no pedido:\n`;
        codigo += `// "${promptLivre}"\n\n`;

        if (promptLivre.toLowerCase().includes("api")) {
            codigo += `const express = require('express');\nconst app = express();\napp.use(express.json());\n\napp.get('/', (req,res)=> res.send('API OK'));\n\napp.listen(3000);`;
        }
        else if (promptLivre.toLowerCase().includes("site")) {
            codigo += `<!DOCTYPE html>\n<html>\n<body>\n<h1>Site gerado</h1>\n</body>\n</html>`;
        }
        else if (promptLivre.toLowerCase().includes("login")) {
            codigo += `function login(user, pass) {\n  if(user === 'admin') return 'OK';\n}`;
        }
        else {
            codigo += `// Estrutura base\nconsole.log('Projeto criado');`;
        }

        document.getElementById("resultado").value = codigo;
        return;
    }

    // Gerar código baseado no tipo de projeto
    if (tipo === "site") {
        switch (linguagem) {
            case "javascript":
                codigo += `<!DOCTYPE html>\n<html>\n<head>\n  <title>Meu Site</title>\n  <style>\n    body { font-family: Arial; margin: 20px; }\n  </style>\n</head>\n<body>\n  <h1>Bem-vindo</h1>\n  <p>Seu site foi criado com sucesso</p>\n</body>\n</html>`;
                break;
            case "python":
                codigo += `# Site com Flask\nfrom flask import Flask\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return '<h1>Bem-vindo</h1>'\n\napp.run()`;
                break;
            case "php":
                codigo += `<?php\necho '<h1>Bem-vindo</h1>';\necho '<p>Seu site foi criado com sucesso</p>';\n?>`;
                break;
            default:
                codigo += `<!DOCTYPE html>\n<html>\n<body>\n  <h1>Site genérico</h1>\n</body>\n</html>`;
        }
    }

    if (tipo === "api") {
        switch (linguagem) {
            case "javascript":
                codigo += `// API com Node.js\nconst express = require('express');\nconst app = express();\n\napp.use(express.json());\n\napp.get('/', (req, res) => {\n    res.send('API rodando');\n});\n`;
                if (crud) {
                    codigo += `\nlet dados = [];\n\napp.get('/dados', (req,res)=> res.json(dados));\napp.post('/dados', (req,res)=> { dados.push(req.body); res.send('Criado'); });\napp.put('/dados/:id', (req,res)=> { dados[req.params.id]=req.body; res.send('Atualizado'); });\napp.delete('/dados/:id', (req,res)=> { dados.splice(req.params.id,1); res.send('Deletado'); });\n`;
                }
                codigo += `\napp.listen(3000);`;
                break;
            case "python":
                codigo += `# API com Flask\nfrom flask import Flask, request, jsonify\napp = Flask(__name__)\n\n@app.route('/')\ndef api():\n    return jsonify({'status': 'API rodando'})\n`;
                if (crud) {
                    codigo += `\ndados = []\n\n@app.route('/dados', methods=['GET'])\ndef get_dados():\n    return jsonify(dados)\n\n@app.route('/dados', methods=['POST'])\ndef criar_dados():\n    dados.append(request.json)\n    return jsonify({'status': 'Criado'})\n\n@app.route('/dados/<int:id>', methods=['PUT'])\ndef atualizar_dados(id):\n    dados[id] = request.json\n    return jsonify({'status': 'Atualizado'})\n\n@app.route('/dados/<int:id>', methods=['DELETE'])\ndef deletar_dados(id):\n    dados.pop(id)\n    return jsonify({'status': 'Deletado'})\n`;
                }
                codigo += `\napp.run()`;
                break;
            case "java":
                codigo += `// API em Java (Spring Boot)\n@RestController\npublic class ApiController {\n    @GetMapping("/")\n    public String home() {\n        return "API rodando";\n    }\n}`;
                break;
            case "csharp":
                codigo += `// API em C# (.NET)\nvar app = WebApplication.CreateBuilder().Build();\n\napp.MapGet("/", () => "API rodando");\n\napp.Run();`;
                break;
            case "php":
                codigo += `<?php\nheader('Content-Type: application/json');\n\nif ($_SERVER['REQUEST_METHOD'] === 'GET') {\n    echo json_encode(['status' => 'API rodando']);\n}\n?>`;
                break;
            case "go":
                codigo += `package main\n\nimport (\n    "fmt"\n    "net/http"\n)\n\nfunc handler(w http.ResponseWriter, r *http.Request) {\n    fmt.Fprintf(w, "API rodando")\n}\n\nfunc main() {\n    http.HandleFunc("/", handler)\n    http.ListenAndServe(":3000", nil)\n}`;
                break;
            case "ruby":
                codigo += `require 'sinatra'\n\nget '/' do\n  'API rodando'\nend`;
                break;
        }
    }

    if (tipo === "app") {
        switch (linguagem) {
            case "javascript":
                codigo += `// App React Native\nimport React from 'react';\nimport { Text, View } from 'react-native';\n\nexport default function App() {\n  return (\n    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>\n      <Text>Meu App</Text>\n    </View>\n  );\n}`;
                break;
            case "java":
                codigo += `// App Android (Java)\npublic class MainActivity extends AppCompatActivity {\n  @Override\n  protected void onCreate(Bundle savedInstanceState) {\n    super.onCreate(savedInstanceState);\n    setContentView(R.layout.activity_main);\n  }\n}`;
                break;
            case "csharp":
                codigo += `// App com .NET MAUI\npublic partial class App : Application {\n  public App() {\n    InitializeComponent();\n    MainPage = new AppShell();\n  }\n}`;
                break;
            case "python":
                codigo += `# App com Kivy\nfrom kivy.app import App\nfrom kivy.uix.label import Label\nfrom kivy.uix.boxlayout import BoxLayout\n\nclass MeuApp(App):\n    def build(self):\n        layout = BoxLayout()\n        layout.add_widget(Label(text='App rodando'))\n        return layout\n\nMeuApp().run()`;
                break;
            default:
                codigo += `// App básico`;
        }
    }

    if (login) {
        codigo += `\n\n// Sistema de Login\nfunction login(usuario, senha) {\n  if (usuario && senha) {\n    console.log('Login realizado: ' + usuario);\n    return true;\n  }\n  return false;\n}`;
    }

    if (banco) {
        codigo += `\n\n// Conexão com Banco de Dados\nconst db = {\n  conectar: function() {\n    console.log('Banco conectado');\n  },\n  query: function(sql) {\n    console.log('Executando: ' + sql);\n  }\n};`;
    }

    document.getElementById("resultado").value = codigo;
}

function copiarCodigo() {
    const textarea = document.getElementById("resultado");
    textarea.select();
    document.execCommand("copy");
    alert("Código copiado para a área de transferência!");
}

function baixarCodigo() {
    const codigo = document.getElementById("resultado").value;
    const linguagem = document.getElementById("linguagem").value;
    
    let nomeArquivo = "codigo.";
    
    switch (linguagem) {
        case "javascript":
            nomeArquivo += "js";
            break;
        case "python":
            nomeArquivo += "py";
            break;
        case "java":
            nomeArquivo += "java";
            break;
        case "csharp":
            nomeArquivo += "cs";
            break;
        case "php":
            nomeArquivo += "php";
            break;
        case "ruby":
            nomeArquivo += "rb";
            break;
        case "go":
            nomeArquivo += "go";
            break;
        default:
            nomeArquivo += "txt";
    }
    
    const elemento = document.createElement("a");
    elemento.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(codigo));
    elemento.setAttribute("download", nomeArquivo);
    elemento.style.display = "none";
    document.body.appendChild(elemento);
    elemento.click();
    document.body.removeChild(elemento);
}


    document.getElementById("resultado").value = codigo


function copiarCodigo() {
    const textarea = document.getElementById("resultado");
    textarea.select();
    document.execCommand("copy");
    alert("Código copiado!");
}
function baixarCodigo() {
    const texto = document.getElementById("resultado").value;
    const blob = new Blob([texto], { type: 'text/plain' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = 'codigo.txt';
    link.click();
}