```markdown
# 🛠️ Gestão Oficina Mecânica

Sistema de gerenciamento para oficinas mecânicas, permitindo o controle de clientes, veículos, ordens de serviço.
O projeto é dividido em **backend** (API em .NET 8) e **frontend** (React).

---

## 📌 Funcionalidades Principais
- **Cadastro de clientes**  
- **Cadastro de veículos** vinculados aos clientes  
- **Criação e gerenciamento de ordens de serviço**  

---

## ⚙️ Tecnologias Utilizadas
### Backend
- **.NET 8** (API REST)
- **C#**
- **MongoDB** (Banco de dados NoSQL)
- **Docker** (Containerização)
  
### Frontend
- **React**
- **JavaScript/TypeScript**
- **Axios** (Consumo de API)
- **CSS Modules** / **Styled Components** (Estilização)
````

### 2️⃣ Rodar a API (Backend)

```bash
cd Gestao.API
dotnet restore
dotnet build
dotnet run
```

A API estará disponível em:

```
http://localhost:5005
```

### 3️⃣ Rodar o Frontend (React)

```bash
cd gestao-site
npm install
npm start
```

O site estará disponível em:

```
http://localhost:5173
```

---

## 📄 Documento de Requisitos

O documento de requisitos funcionais e não funcionais está disponível em:

```
Doc_Requisitos_V1.pdf
```

---

## 📌 Próximos Passos

* Implementar autenticação e autorização
* Melhorar UI/UX do frontend
* Adicionar exportação de relatórios
* Criar testes de Unidade


---

**Desenvolvido por [Fabio Zenatti Ferrenha](https://github.com/Fabio313)**
