# SIMOP — Sistema de Museus de Ouro Preto

Portal institucional, turístico e documental do **Sistema de Museus de Ouro Preto (SIMOP)**, articulador dos espaços museais, centros culturais e iniciativas de preservação da memória histórica de Ouro Preto, Minas Gerais.

---

## Visão Geral

Ouro Preto abriga um dos mais expressivos conjuntos arquitetônicos e museológicos do barroco mundial. O **SIMOP** surge como plataforma centralizadora de articulação, difusão e preservação, conectando os diversos museus municipais, federais, estaduais e comunitários a um ecossistema digital integrado.

- **Problema que resolve:** A dispersão das informações sobre os museus de Ouro Preto, dificuldades de consulta a horários e acervos, e a fragmentação do registro de eventos históricos anuais (como a Semana de Museus e a Primavera de Museus).
- **Objetivo da aplicação:** Fornecer uma experiência de navegação rica, fluida e acessível sobre os espaços culturais, acervo documental, leis patrimoniais, publicações e eventos da cidade.
- **Público-alvo:** Turistas, pesquisadores, educadores, estudantes e a comunidade ouro-pretana.

---

## Stack Tecnológica

O projeto utiliza exclusivamente tecnologias modernas e estáveis do ecossistema React/Next.js:

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Components e Static Site Generation)
- **Biblioteca Base:** [React 19](https://react.dev/)
- **Linguagem:** [TypeScript 5](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS 3](https://tailwindcss.com/) com PostCSS e Autoprefixer
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Otimização de Imagens:** [Sharp](https://sharp.pixelplumbing.com/) (otimizador nativo para produção no Next.js)
- **Qualidade de Código:** [ESLint 9](https://eslint.org/) com `eslint-config-next`
- **Camada Opcional de Persistência:** `@supabase/ssr` e `@supabase/supabase-js` (com graceful fallback quando não configurado)

---

## Arquitetura

A aplicação é orientada à arquitetura do **Next.js App Router**:

- **Server-First Rendering:** A maior parte das páginas (Home, Museus, Publicações, Legislações, Tecnologia) é renderizada no servidor como Server Components com ISR/SSG, assegurando alta performance (Core Web Vitals) e excelente indexação (SEO).
- **Graceful Fallback & Resiliência:** Os serviços de dados em `src/lib/` foram desenhados de forma desacoplada e defensiva. Se variáveis de ambiente de banco de dados não estiverem configuradas, o sistema opera de forma autônoma com fallbacks locais elegantes, sem travar nem quebrar a experiência do usuário.
- **Módulos Principais:**
  - `/` — Página inicial com destaques, indicadores, acesso rápido e cards de eventos.
  - `/museus` e `/museus/[slug]` — Catálogo de museus com filtros dinâmicos e páginas de detalhes (acervo, história, galeria, horários e mapas).
  - `/memoria-e-eventos` — Hub de memória contendo acervo fotográfico histórico e edições da Semana e da Primavera de Museus.
  - `/publicacoes` — Central de informativos e matérias do projeto editorial *Olhar Museu*.
  - `/institucional` e `/legislacoes` — Marco regulatório, diretrizes de governança e repositório de documentos legislativos.
  - `/buscar` — Mecanismo de busca textual em todo o ecossistema cultural.
  - `/tecnologia` — Apresentação técnica do portal e padrões arquiteturais adotados.
  - `/admin` e `/admin/login` — Painel administrativo para curadoria de fotos e edições de eventos.

---

## Estrutura do Projeto

```
sistema-de-museus/
├── public/                     # Arquivos estáticos públicos
│   ├── favicon.ico             # Ícone de favoritos
│   └── images/                 # Fotografias de museus, heróis e logotipos
├── src/                        # Código-fonte principal
│   ├── app/                    # Rotas e layouts do Next.js App Router
│   │   ├── admin/              # Painel administrativo e autenticação
│   │   ├── buscar/             # Página de busca global
│   │   ├── institucional/      # Apresentação do SiMOP e governança
│   │   ├── legislacoes/        # Acervo normativo e leis patrimoniais
│   │   ├── memoria-e-eventos/  # Hub de eventos e acervo fotográfico
│   │   ├── museus/             # Catálogo e páginas dinâmicas por slug
│   │   ├── publicacoes/        # Hub editorial Olhar Museu
│   │   ├── sobre/              # Sobre a iniciativa
│   │   ├── tecnologia/         # Página de arquitetura técnica
│   │   ├── layout.tsx          # Layout global (Header, Footer, Fontes)
│   │   ├── page.tsx            # Página inicial
│   │   └── globals.css         # Variáveis CSS e temas
│   ├── components/             # Componentes modulares reutilizáveis
│   │   ├── admin/              # Componentes de gestão de fotos e eventos
│   │   ├── layout/             # Header, Footer, Navegação
│   │   ├── memoria/            # Cards, galerias e cronologias
│   │   ├── museum/             # Cards, acordeons e mapas de museus
│   │   └── ui/                 # Componentes genéricos de UI (botões, headers)
│   ├── lib/                    # Camada de lógica de dados e serviços
│   │   ├── memoria.ts          # Consulta de eventos e fotos com fallback
│   │   ├── museums.ts          # Catálogo tipado dos museus de Ouro Preto
│   │   ├── olharMuseuService.ts# Integração editorial
│   │   └── supabase.ts         # Inicialização segura do cliente Supabase
│   ├── types/                  # Tipagens TypeScript (museus, eventos, fotos)
│   ├── utils/                  # Utilitários auxiliares (middleware Supabase)
│   └── middleware.ts           # Middleware Next.js com proteção defensiva
├── .env.example                # Exemplo documentado de variáveis de ambiente
├── .gitignore                  # Regras de exclusão do Git
├── eslint.config.mjs           # Configuração moderna do ESLint 9
├── next.config.ts              # Configuração do Next.js
├── package.json                # Manifesto de dependências e scripts
├── package-lock.json           # Lockfile oficial (npm)
├── postcss.config.mjs          # Configuração PostCSS
├── tailwind.config.ts          # Design System e tema de cores do Tailwind
└── tsconfig.json               # Configuração do compilador TypeScript
```

---

## Pré-requisitos

- **Node.js:** Versão 20.x ou superior (conforme especificado em `package.json` em `engines`)
- **Package Manager:** `npm` (versão 10.x ou superior)

---

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/rauanmartech/simop.git
cd simop
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (opcional):
```bash
cp .env.example .env.local
```
> *Nota: A aplicação inicializa e executa perfeitamente em modo estático mesmo sem o preenchimento do `.env.local`.*

---

## Desenvolvimento

Inicie o servidor de desenvolvimento local:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## Build de Produção

Para validar a integridade dos tipos e gerar o bundle de produção otimizado:

```bash
npm run build
```

Para executar o servidor de produção localmente a partir do build gerado:

```bash
npm run start
```

---

## Deploy

O projeto está otimizado para deploy em plataformas de hospedagem compatíveis com Next.js:

### Vercel (Recomendado)
1. Conecte o repositório GitHub à [Vercel](https://vercel.com/).
2. O framework Next.js será detectado automaticamente.
3. Se desejar habilitar persistência dinâmica, adicione as variáveis de ambiente descritas em `.env.example` no painel do projeto na Vercel.
4. Conclua o deploy.

### Servidores Node.js / Docker
O projeto pode ser executado em qualquer ambiente Linux/Windows capaz de rodar Node.js 20+, executando `npm run build` seguido de `npm run start`.

---

## Variáveis de Ambiente

As variáveis de ambiente são **opcionais**. Quando ausentes, o sistema ativa automaticamente respostas seguras e fallbacks locais.

| Variável | Finalidade | Obrigatória | Exemplo Seguro |
| :--- | :--- | :---: | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL da instância Supabase (acervo dinâmico/fotos) | Não | `https://xyzcompany.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave pública anônima do Supabase | Não | `sb_publishable_...` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Chave publicável do Supabase (alternativa à anon) | Não | `sb_publishable_...` |
| `NEXT_PUBLIC_OLHAR_MUSEU_URL` | URL do hub editorial externo Olhar Museu | Não | `http://localhost:3001` |

> ⚠️ **Atenção:** Nunca versione arquivos `.env`, `.env.local` ou credenciais privadas no repositório Git.

---

## Scripts Disponíveis

| Script | Comando | Descrição |
| :--- | :--- | :--- |
| `dev` | `next dev` | Inicia o servidor local de desenvolvimento com hot-reload |
| `build` | `next build` | Compila o projeto e gera os pacotes otimizados de produção |
| `start` | `next start` | Inicia o servidor HTTP em modo de produção |
| `lint` | `eslint .` | Executa a verificação estática de código com ESLint 9 |

---

## Qualidade e Lint

Para verificar a conformidade do código com as regras de tipagem e boas práticas:

```bash
npm run lint
```

Para validar a tipagem TypeScript:

```bash
npx tsc --noEmit
```

---

## Convenções de Desenvolvimento

- **Nomenclatura:** PascalCase para componentes React (`MuseumCard.tsx`), camelCase para utilitários e serviços (`museums.ts`).
- **Segurança de Tipos:** Estrito cumprimento de contratos TypeScript, evitando uso de `any` em rotas e componentes públicos.
- **Isolamento de Componentes:** Componentes que exigem estado ou hooks do browser devem declarar `"use client"` no topo. Demais componentes devem permanecer como Server Components para preservar a performance.
- **Design System:** Estilização utilitária via Tailwind CSS, preservando a identidade visual barroca e institucional da plataforma (tons de dourado, marfim e escuro patrimonial).

---

## Licença

Projeto privado e proprietário — Sistema de Museus de Ouro Preto (SIMOP). Todos os direitos reservados.
