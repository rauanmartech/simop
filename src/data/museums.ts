import { Museum } from "@/types/museum";

export const museums: Museum[] = [
  {
    id: "01",
    slug: "museu-da-inconfidencia",
    nome: "Museu da Inconfidência",
    nome_curto: "Inconfidência",
    categoria: "História",
    subcategoria: "História de Ouro Preto",
    tags: ["História", "Brasil Colonial", "IBRAM"],
    hero_texto: "Museu da Inconfidência",
    hero_texto_auxiliar: "Preservando a memória política e sociocultural mineira dos séculos XVIII e XIX.",
    resumo: "O Museu da Inconfidência – MIN é uma instituição pública, situada em Ouro Preto, Minas Gerais, componente da estrutura organizacional do IBRAM – Instituto Brasileiro de Museus.",
    descricao_curta: "Preservação da memória política e sociocultural mineira dos séculos XVIII e XIX, componente do IBRAM.",
    sobre: "O Museu da Inconfidência – MIN é uma instituição pública, situada em Ouro Preto, Minas Gerais, componente da estrutura organizacional do IBRAM – Instituto Brasileiro de Museus. De inestimável valor histórico, cultural e artístico, o acervo do MIN mantém em seu resguardo objetos e arquivos de valor incalculável para a memória não só de Ouro Preto, mas para o Estado de Minas Gerais e a própria história e formação do Brasil. Essa especificidade de coleção faz com que o acervo seja intensamente pesquisado por estudiosos de todos os estados brasileiros e de várias partes do mundo.",
    historia: "O Museu da Inconfidência foi criado em 1938 e inaugurado em 1944 para homenagear os inconfidentes mineiros e resguardar a memória da Conjuração Mineira de 1789, constituindo uma das instituições culturais mais emblemáticas do Brasil.",
    acervo: "Constituído de um edifício sede — a antiga Casa de Câmara e Cadeia de Vila Rica —, o acervo do Museu é formado por cerca de 7.000 (sete mil) objetos em exposição, que retratam as mais variadas esferas da vida sociocultural e política mineira dos séculos XVIII e XIX. Os objetos estão intimamente relacionados à formação da sociedade brasileira, tais como: sistemas construtivos, transporte, objetos de uso cotidiano e religioso, indumentária, mobiliário, objetos de arte, ornamentação, proteção e guerra.\n\nSob a guarda do Museu, o Arquivo Histórico, localizado na Casa Setecentista do Pilar, é responsável pela guarda e conservação de cerca de mais de 40.000 (quarenta mil) documentos de significativo valor histórico, entre eles pode-se destacar: desenhos do Mestre Aleijadinho, inventários, testamentos, ações cíveis, decisões judiciais, documentos cartoriais, documentos relativos a crimes. Uma coleção com cerca de 5.000 (cinco mil) partituras de música colonial mineira, entre elas, a Coleção Curt Lange, reconhecida pela Unesco no Programa \"Memória do Mundo\". E por fim, uma biblioteca mineiriana doada pelo historiador Tarquinío Oliveira com cerca de 20.000 (vinte mil) volumes, com obras raras e primeiras edições.",
    destaques: [
      "Casa de Câmara e Cadeia de Vila Rica",
      "Desenhos do Mestre Aleijadinho",
      "Coleção Curt Lange",
      "Biblioteca mineiriana"
    ],
    visitacao: {
      horario: "Terça a quinta: 10h às 18h (acesso até às 17h)\nSexta e sábado: 10h às 20h (acesso até às 19h)",
      entrada: "Consulte a instituição para informações atualizadas sobre ingressos, gratuidades e isenções.",
      duracao_visita: "Aproximadamente 1 a 2 horas"
    },
    localizacao: {
      endereco: "Praça Tiradentes, 139",
      bairro: "Centro Histórico",
      cidade: "Ouro Preto",
      estado: "Minas Gerais",
      latitude: -20.3856,
      longitude: -43.5032
    },
    acessibilidade: "Consulte a instituição para informações sobre recursos de acessibilidade e suporte à visitação.",
    contato: {
      telefone: "Consulte no local",
      email: "mdinc@museus.gov.br",
      website: "https://museudainconfidencia.museus.gov.br",
      instagram: "@museudainconfidencia"
    },
    imagem_capa: "/images/museus/museu-da-inconfidencia/capa.webp",
    galeria: [
      { id: "01", imagem: "/images/museus/museu-da-inconfidencia/galeria-1.webp", legenda: "Detalhes do Acervo" },
      { id: "02", imagem: "/images/museus/museu-da-inconfidencia/galeria-2.webp", legenda: "Exposição Interna" },
      { id: "03", imagem: "/images/museus/museu-da-inconfidencia/galeria-3.webp", legenda: "Ambiente do Museu" }
    ],
    museus_relacionados: []
  },

  {
    id: "03",
    slug: "museu-casa-dos-contos",
    nome: "Museu Casa dos Contos",
    nome_curto: "Casa dos Contos",
    categoria: "História",
    subcategoria: "História de Ouro Preto",
    tags: ["História", "Economia", "Arquitetura"],
    hero_texto: "Museu Casa dos Contos",
    hero_texto_auxiliar: "Preservando a memória econômico-fiscal do Ciclo do Ouro e a arquitetura colonial.",
    resumo: "O Museu Casa dos Contos, inaugurado em 1974, é um dos mais importantes equipamentos culturais de Ouro Preto, desempenhando papel central na preservação do patrimônio relacionado ao Ciclo do Ouro.",
    descricao_curta: "Memória econômico-fiscal do Ciclo do Ouro, arquitetura barroca e numismática.",
    sobre: "O Museu Casa dos Contos, inaugurado em 1974, é um dos mais importantes equipamentos culturais de Ouro Preto, Minas Gerais. Instalado em um dos casarões mais imponentes do período colonial, desempenha um papel central na preservação e difusão do patrimônio histórico, artístico e documental relacionado ao Ciclo do Ouro. Recebe anualmente cerca de 170 mil visitantes de diversas partes do Brasil e do mundo, dos quais aproximadamente um quarto é composto por grupos escolares. A instituição se consolida como referência em ações educativas e culturais. Integra sua estrutura o Centro de Estudos do Ciclo do Ouro, que dispõe de um vasto acervo microfilmado de documentos históricos a partir do século XVII, além de uma biblioteca com milhares de exemplares e obras raras. Esse espaço é amplamente procurado por pesquisadores interessados na história econômica e social de Minas Gerais e no Ciclo do Ouro.",
    historia: "O imóvel que abriga o museu foi construído entre 1782 e 1784, com risco atribuído ao mestre Antônio de Souza Calheiros. Originalmente, funcionou como residência e Loja de Contratos do contratador João Rodrigues de Macedo. Em 1789, foi requisitado pela Coroa Portuguesa para sediar diligências da Devassa, abrigando tropas enviadas para reprimir a Conjuração Mineira. Nesse contexto, serviu de prisão para quatro inconfidentes, entre eles o poeta Cláudio Manoel da Costa, encontrado morto em uma das celas. Em 1792, passou a sediar a Administração e Contabilidade Pública da Capitania de Minas, recebendo o nome de “Casa dos Contos”, denominação usada para repartições fazendárias do Império Português. Entre 1820 e 1821, abrigou a Casa de Fundição e da Moeda de Vila Rica.",
    acervo: "A missão institucional da Casa dos Contos é preservar a memória econômico-fiscal do Ciclo do Ouro, a arquitetura barroca e promover as artes e a cultura nacional. Para cumpri-la, valoriza tanto a própria edificação quanto seus elementos artísticos integrados, além de apresentar exposições de longa duração. Destacam-se, entre elas, salas expositivas dedicadas à numismática, com acervos do Banco Central e da Casa da Moeda do Brasil, e conjuntos de mobiliário dos séculos XVIII e XIX. A programação inclui ainda exposições temporárias, atividades culturais e educativas, consolidando-se como um centro dinâmico de cultura e conhecimento, de relevância nacional e internacional.",
    destaques: ["Centro de Estudos do Ciclo do Ouro", "Acervo de numismática", "Mobiliário dos séculos XVIII e XIX", "Casarão histórico"],
    visitacao: {
      horario: "Terça à Sábado das 10h às 18h",
      entrada: "Consulte a instituição para informações atualizadas sobre ingressos, gratuidades e isenções.",
      duracao_visita: "Aproximadamente 1 hora"
    },
    localizacao: {
      endereco: "R. São José, 12",
      bairro: "Centro",
      cidade: "Ouro Preto",
      estado: "Minas Gerais",
      latitude: -20.3856,
      longitude: -43.5032
    },
    acessibilidade: "Consulte a instituição para informações sobre recursos de acessibilidade e suporte à visitação.",
    contato: {
      telefone: "Consulte no local",
      email: "casa.dos.contos@economia.gov.br",
      website: "https://www.gov.br",
      instagram: "@museucasadoscontos"
    },
    imagem_capa: "/images/museus/museu-casa-dos-contos/capa.webp",
    galeria: [
      { id: "01", imagem: "/images/museus/museu-casa-dos-contos/galeria-1.webp", legenda: "Ambiente Interno" },
      { id: "02", imagem: "/images/museus/museu-casa-dos-contos/galeria-2.webp", legenda: "Detalhes do Acervo" },
      { id: "03", imagem: "/images/museus/museu-casa-dos-contos/galeria-3.webp", legenda: "Fachada Externa" }
    ],
    museus_relacionados: []
  },
  {
    id: "04",
    slug: "mse-de-arte-sacra",
    nome: "Museu de Arte Sacra",
    nome_curto: "Arte Sacra",
    categoria: "Arte Sacra",
    subcategoria: "Arte Sacra de Ouro Preto",
    tags: ["Arte Sacra","Religiosidade"],
    hero_texto: "Museu de Arte Sacra Ouro Preto",
    hero_texto_auxiliar: "Obras maiores da arte colonial brasileira, testemunhando a rica herança cultural de Ouro Preto formada a mais de três séculos.",
    resumo: "Instalado na Basílica de Nossa Senhora do Pilar, o Museu de Arte Sacra se abre para democratizar o acesso a obras maiores da arte colonial brasileira.",
    descricao_curta: "A arte colonial mineira, patrimônio e museologia instalada na Basílica do Pilar.",
    sobre: "O Museu de Arte Sacra Ouro Preto - MAS, instalado na Basílica de Nossa Senhora do Pilar, envolve todo o edifício da padroeira de Ouro Preto, em plena utilização dos fiéis, mas, generosamente, se abre para democratizar o acesso a obras maiores da arte colonial brasileira. O objetivo é fornecer elementos para leitura e reflexão sobre a arte colonial mineira, dentro de uma perspectiva crítica que considere sua articulação com as condições históricas específicas da região, sem perder de vista o próprio fenômeno artístico.",
    historia: "A primeira instalação do museu foi inaugurada em 1965 se tornando modelo de conservação patrimonial e museologia e exemplo de engajamento da Igreja nos desafios da cultura de todos os brasileiros. Ao longo do século XVIII, a expressão artística deste povo encontrou na fé católica sua fonte de inspiração e a opulência do ouro se refletiu nos interiores de capelas e igrejas. Coube às agremiações religiosas leigas – irmandades e ordens terceiras - o mecenato das artes e na organização dos grupos sociais.",
    acervo: "Na mostra permanente apresenta-se, aí, pinturas, esculturas, paramentos e alfaias, prataria e ourivesaria, documentos e objetos diversos que testemunham a rica herança cultural de Ouro Preto formada a mais de três séculos. É no domínio da arquitetura, pintura, talha e escultura religiosas e, ainda, nas peças de culto que se revelam as formas mais expressivas e originais da arte no período Barroco e Rococó em Minas Gerais.",
    destaques: ["Roteiro “Os Caminhos do Pilar”", "Arte Barroco e Rococó", "Paramentos, prataria e ourivesaria", "Basílica de Nossa Senhora do Pilar"],
    visitacao: {
      horario: "Terça-feira à Domingo - Das 9h às 16:45",
      entrada: "Consulte no local",
      duracao_visita: "Aproximadamente 1 hora"
    },
    localizacao: {
      endereco: "Praça Monsenhor Castilho Barbosa",
      bairro: "Bairro Pilar",
      cidade: "Ouro Preto",
      estado: "Minas Gerais",
      latitude: -20.3856,
      longitude: -43.5032
    },
    acessibilidade: "Rampa de acesso e elevador disponíveis.",
    contato: {
      telefone: "(31) 3551-4735",
      email: "masouropreto@gmail.com",
      website: "",
      instagram: "@masouropreto"
    },
    imagem_capa: "/images/museus/museu-de-arte-sacra/capa.webp",
    galeria: [
      { id: "01", imagem: "/images/museus/museu-de-arte-sacra/galeria-1.webp", legenda: "Acervo" },
      { id: "02", imagem: "/images/museus/museu-de-arte-sacra/galeria-2.webp", legenda: "Detalhe" },
      { id: "03", imagem: "/images/museus/museu-de-arte-sacra/galeria-3.webp", legenda: "Interior" }
    ],
    museus_relacionados: []
  },
  {
    id: "05",
    slug: "mse-de-cie-ncia-e-te-cnica-da-escola-de-minas-op",
    nome: "Museu de Ciência e Técnica da Escola de Minas UFOP",
    nome_curto: "Ciência e Técnica da Escola de Minas UFOP",
    categoria: "Ciência",
    subcategoria: "Ciência de Ouro Preto",
    tags: ["Ciência","Mineralogia"],
    hero_texto: "Museu de Ciência e Técnica (UFOP)",
    hero_texto_auxiliar: "Preservando, pesquisando, documentando e difundindo a memória científica e técnica do país.",
    resumo: "Inaugurado em 1995, o Museu de Ciência e Técnica (MCT) da Escola de Minas reúne um rico acervo composto por amostras mineralógicas, maquetes didáticas e instrumentos.",
    descricao_curta: "Rico acervo mineralógico, histórico e científico da pioneira Escola de Minas.",
    sobre: "Durante grande parte do século XX, a Escola de Minas da UFOP funcionou no prédio do antigo Palácio dos Governadores, atualmente sede do Museu de Ciência e Técnica (MCT). A construção, localizada na Praça Tiradentes, teve sua planta elaborada pelo engenheiro José Fernandes Pinto Alpoim e as obras supervisionadas por Manoel Francisco Lisboa. O Museu foi inaugurado em 1995 com a missão de preservar, pesquisar, documentar e difundir a memória científica e técnica do país, promovendo ações educativas para visitantes, estudantes e pesquisadores.",
    historia: "Por iniciativa do Imperador Dom Pedro II, preocupado com o desenvolvimento do Brasil, foi fundada, em 12 de outubro de 1876, a Escola de Minas de Ouro Preto, pioneira nas áreas de Geologia, Mineração e Metalurgia no país. A instituição foi criada pelo professor francês Claude Henri Gorceix. Posteriormente, em 21 de agosto de 1969, foi criada a Universidade Federal de Ouro Preto (UFOP), cuja origem remonta às escolas de Farmácia e de Minas, fundadas em 1839 e 1876, respectivamente.",
    acervo: "Ao longo de sua trajetória, a Escola de Minas reuniu um rico acervo composto por amostras mineralógicas, maquetes didáticas, instrumentos de topografia e física, além de objetos relacionados à construção civil, metalurgia, mineração, antropologia, paleontologia e zoologia. O circuito expositivo do museu inclui os setores de História Natural, Mineração, Mineralogia, Metalurgia, Química, Física, Ciência Interativa, Topografia, Desenho e Astronomia. Complementam o roteiro a Biblioteca de Obras Raras, o Arquivo Histórico, o Observatório Astronômico, a Capela Imperial, a Galeria do Antigo Aluno, O Panteão Gorceix, o setor de Eletrotécnica e a Diretoria/Sala da Congregação.",
    destaques: ["Setores de História Natural, Mineração e Mineralogia", "Biblioteca de Obras Raras e Arquivo Histórico", "Observatório Astronômico e Panteão Gorceix", "Setor de Siderurgia e Transporte Ferroviário"],
    visitacao: {
      horario: "Temporariamente Fechado",
      entrada: "Consulte no local",
      duracao_visita: "Aproximadamente 2 horas"
    },
    localizacao: {
      endereco: "R. Henri Gorceix, 20",
      bairro: "Centro",
      cidade: "Ouro Preto",
      estado: "Minas Gerais",
      latitude: -20.3856,
      longitude: -43.5032
    },
    acessibilidade: "Rampa de acesso e elevador disponíveis.",
    contato: {
      telefone: "Consulte no local",
      email: "coordenacaomct.em@ufop.edu.br",
      website: "",
      instagram: "@museu_em_ufop"
    },
    imagem_capa: "/images/museus/museu-de-ciencia-e-tecnica/capa.webp",
    galeria: [
      { id: "01", imagem: "/images/museus/museu-de-ciencia-e-tecnica/galeria-1.webp", legenda: "Gemas" },
      { id: "02", imagem: "/images/museus/museu-de-ciencia-e-tecnica/galeria-2.webp", legenda: "Mineralogia I" },
      { id: "03", imagem: "/images/museus/museu-de-ciencia-e-tecnica/galeria-3.webp", legenda: "Mineralogia II" },
      { id: "04", imagem: "/images/museus/museu-de-ciencia-e-tecnica/galeria-4.webp", legenda: "Mineração" },
      { id: "05", imagem: "/images/museus/museu-de-ciencia-e-tecnica/galeria-5.webp", legenda: "Ouro Paladiado" },
      { id: "06", imagem: "/images/museus/museu-de-ciencia-e-tecnica/galeria-6.webp", legenda: "Quartzo Rosa" },
      { id: "07", imagem: "/images/museus/museu-de-ciencia-e-tecnica/galeria-7.webp", legenda: "Setor de História Natural" },
      { id: "08", imagem: "/images/museus/museu-de-ciencia-e-tecnica/galeria-8.webp", legenda: "Setor de Mineralogia" },
      { id: "09", imagem: "/images/museus/museu-de-ciencia-e-tecnica/galeria-9.webp", legenda: "Topázio Imperial" },
      { id: "10", imagem: "/images/museus/museu-de-ciencia-e-tecnica/galeria-10.webp", legenda: "Fachada" }
    ],
    museus_relacionados: []
  },
  {
    id: "06",
    slug: "museu-do-oratorio",
    nome: "Museu do Oratório",
    nome_curto: "Oratório",
    categoria: "Arte Sacra",
    subcategoria: "Arte Sacra de Ouro Preto",
    tags: ["Arte Sacra", "Devoção", "IPHAN"],
    hero_texto: "Museu do Oratório",
    hero_texto_auxiliar: "Uma viagem antropológica pela história do Brasil através de 162 oratórios e 300 imagens dos séculos XVII ao XX.",
    resumo: "O Museu do Oratório, inaugurado em 1998 no prédio setecentista da Venerável Ordem Terceira do Carmo, apresenta uma magnífica coleção genuinamente brasileira.",
    descricao_curta: "Magnífica coleção de 162 oratórios e 300 imagens dos séculos XVII ao XX, doada ao IPHAN.",
    sobre: "O Museu do Oratório foi inaugurado em 1998 na cidade de Ouro Preto, Minas Gerais, no prédio setecentista pertencente à Venerável Ordem Terceira do Carmo, que foi totalmente restaurado e adequado para abrigar o Museu. Visando a democratização do espaço museal, a instituição oferece gratuidade para estudantes, professores e moradores de Ouro Preto. O conjunto dessas ações e atividades possibilitam a construção de um museu vivo, hoje acolhido pela comunidade de Ouro Preto e que se mostra relevante para seus visitantes.",
    historia: "Desde sua abertura o Museu promoveu importantes exposições nacionais e internacionais, que levaram a riqueza da cultura de Minas Gerais para países como a França, Inglaterra, Espanha, Itália, Venezuela, Chile, dentre outros. Por meio do projeto “Museu Itinerante – Objetos da Fé” circulou o acervo também por capitais e cidades do interior do Brasil, democratizando o acesso do público a este patrimônio cultural. Lançou publicações de referência na área como “Objetos da Fé” e o livro “Museu do Oratório”.",
    acervo: "Apresenta uma magnífica coleção de 162 oratórios e 300 imagens dos séculos XVII ao XX. As peças do acervo foram doadas ao IPHAN (Instituto do Patrimônio Histórico e Artístico Nacional) pela colecionadora Angela Gutierrez e são genuinamente brasileiras, principalmente de Minas Gerais. Caracterizando-se pela diversidade de tipos, de tamanhos e de materiais, o acervo oferece detalhes valiosos da arquitetura, pintura, vestuário e costumes da época em que foram produzidos, permitindo uma verdadeira viagem antropológica pela história do Brasil.",
    destaques: ["Oratórios de Alcova", "Oratórios-Bala", "Oratório de Algibeira", "Oratório-Ermida"],
    visitacao: {
      horario: "Quartas às segundas-feiras de 9h30 às 17h30",
      entrada: "Gratuita para moradores",
      duracao_visita: "Aproximadamente 1 hora"
    },
    localizacao: {
      endereco: "Adro da Igreja do Carmo, 28º",
      bairro: "Centro",
      cidade: "Ouro Preto",
      estado: "Minas Gerais",
      latitude: -20.3854,
      longitude: -43.5028
    },
    acessibilidade: "Consulte a instituição para informações sobre recursos de acessibilidade e suporte à visitação.",
    contato: {
      telefone: "+55 [31] 3551-5369",
      email: "info@museudooratorio.org.br",
      website: "https://www.museudooratorio.org.br",
      instagram: "@museudooratorio"
    },
    imagem_capa: "/images/museus/museu-do-oratorio/fachada.webp",
    galeria: [
      { id: "01", imagem: "/images/museus/museu-do-oratorio/1.webp", legenda: "Oratório de Alcova - Diamantina/MG - Século XVIII/XIX" },
      { id: "02", imagem: "/images/museus/museu-do-oratorio/2.webp", legenda: "Oratório-Pingente - Diamantina/MG - Século XIX" },
      { id: "03", imagem: "/images/museus/museu-do-oratorio/3.webp", legenda: "Oratório de Convento - Bahia - Século XX" },
      { id: "04", imagem: "/images/museus/museu-do-oratorio/4.webp", legenda: "Oratório-Bala - Nordeste - Século XVIII" },
      { id: "05", imagem: "/images/museus/museu-do-oratorio/5.webp", legenda: "Oratório-Bala - Nordeste - Século XIX" },
      { id: "06", imagem: "/images/museus/museu-do-oratorio/6.webp", legenda: "Oratório de Algibeira (Primeiro da coleção) - Minas Gerais - Século XVIII" },
      { id: "07", imagem: "/images/museus/museu-do-oratorio/7.webp", legenda: "Oratório-Ermida (Mais antigo da coleção) - Ceará - Século XVII" },
      { id: "08", imagem: "/images/museus/museu-do-oratorio/8.webp", legenda: "Oratório Afro-Brasileiro - Vale do Jequitinhonha/MG - Século XIX" },
      { id: "09", imagem: "/images/museus/museu-do-oratorio/9.webp", legenda: "Oratório de Salão - Minas Gerais - Século XVIII" },
      { id: "10", imagem: "/images/museus/museu-do-oratorio/10.webp", legenda: "Oratório-Bala (Francisco Vieiras Servas) - Minas Gerais - Século XVIII/XIX" },
      { id: "11", imagem: "/images/museus/museu-do-oratorio/11.webp", legenda: "Oratório de Conchas (Francisco Xavier dos Santos) - Rio de Janeiro - Século XVIII/XIX" },
      { id: "12", imagem: "/images/museus/museu-do-oratorio/12.webp", legenda: "Oratório de Salão (Pintura atribuída a Manoel da Costa Athaíde) - Minas Gerais" }
    ],
    museus_relacionados: []
  },
  {
    id: "07",
    slug: "museu-casa-guignard",
    nome: "Museu Casa Guignard",
    nome_curto: "Casa Guignard",
    categoria: "Arte",
    subcategoria: "Arte de Ouro Preto",
    tags: ["Arte", "Modernismo", "Guignard"],
    hero_texto: "Museu Casa Guignard",
    hero_texto_auxiliar: "Reunindo obras, documentos e objetos que ilustram a vida de Alberto da Veiga Guignard.",
    resumo: "Instalado em uma edificação histórica, o Museu Casa Guignard é dedicado a preservar a memória e obra do mestre Guignard em sua cidade inspiração.",
    descricao_curta: "Obras, documentos e a vida de Alberto da Veiga Guignard em Ouro Preto.",
    sobre: "O Museu Casa Guignard está instalado em uma edificação histórica na Rua Conde de Bobadela, no centro de Ouro Preto. Antes de pertencer ao IEPHA-MG, o imóvel foi propriedade da família Costa Sena. O complexo arquitetônico recebe ainda em seu pátio um antigo chafariz, disposto em pedra-sabão, de atribuição do Mestre Aleijadinho.",
    historia: "O Museu dedicado a Guignard, não à toa tem sua sede na cidade de Ouro Preto, tida pelo artista como a Cidade inspiração. O mestre Guignard amava a cidade, suas igrejas, torres e colinas, o casario esparramado pelas ladeiras, balões juninos em revoada no céu. Não foram poucas as vezes que o artista fez da paisagem de Ouro Preto, cenário de seus quadros.",
    acervo: "O acervo da Casa Guignard reúne obras, documentos, além de objetos que ilustram a vida de Alberto da Veiga Guignard. O catre e o violão lembram que, diante dele, tudo era suporte para a pintura. A série de desenhos dedicados a Amalita revela a sensibilidade do artista. Há também trabalhos de Carlos Scliar e Amílcar de Castro, que referenciam o mestre.",
    destaques: ["Obras de Alberto da Veiga Guignard", "Chafariz do Mestre Aleijadinho", "Trabalhos de Carlos Scliar e Amílcar de Castro", "Catre e violão do mestre"],
    visitacao: {
      horario: "Terça-feira à sexta das 12h às 18h. Sáb, dom e feriados das 09h às 15h.",
      entrada: "Agendamento via WhatsApp: (31) 98467-1198",
      duracao_visita: "Aproximadamente 1 hora"
    },
    localizacao: {
      endereco: "Rua Conde de Bobadela, 110",
      bairro: "Centro",
      cidade: "Ouro Preto",
      estado: "Minas Gerais",
      latitude: -20.3856,
      longitude: -43.5032
    },
    acessibilidade: "Consulte a instituição para informações sobre recursos de acessibilidade e suporte à visitação.",
    contato: {
      telefone: "+55 [31] 98467-1198",
      email: "museu.guignard@gmail.com",
      website: "https://www.gov.br/pt-br",
      instagram: "@museucasaguignard"
    },
    imagem_capa: "/images/museus/museu-casa-guignard/capa.webp",
    galeria: [
      { id: "01", imagem: "/images/museus/museu-casa-guignard/galeria-1.webp", legenda: "Detalhes do Acervo e Obras" },
      { id: "02", imagem: "/images/museus/museu-casa-guignard/galeria-2.webp", legenda: "Exposição Interna" },
      { id: "03", imagem: "/images/museus/museu-casa-guignard/galeria-3.webp", legenda: "Fachada do Museu" },
      { id: "04", imagem: "/images/museus/museu-casa-guignard/galeria-4.webp", legenda: "Ambiente do Museu" },
      { id: "05", imagem: "/images/museus/museu-casa-guignard/galeria-5.webp", legenda: "Obras em Exposição" },
      { id: "06", imagem: "/images/museus/museu-casa-guignard/galeria-6.webp", legenda: "Detalhes Arquitetônicos" },
      { id: "07", imagem: "/images/museus/museu-casa-guignard/galeria-7.webp", legenda: "Peças do Acervo" },
      { id: "08", imagem: "/images/museus/museu-casa-guignard/galeria-8.webp", legenda: "Vista Interna" }
    ],
    museus_relacionados: []
  },
  {
    id: "09",
    slug: "mse-da-arma-cia-op",
    nome: "Museu da Farmácia UFOP",
    nome_curto: "Farmácia UFOP",
    categoria: "Ciência",
    subcategoria: "Ciência de Ouro Preto",
    tags: ["Ciência","Saúde"],
    hero_texto: "Museu de Farmácia",
    hero_texto_auxiliar: "Preservando o conhecimento, a coleção e a memória da ciência farmacêutica de Ouro Preto.",
    resumo: "Iniciado em 1968, o Museu de Farmácia realiza projetos de extensão com amplo foco na divulgação da coleção e desenvolvimento de ações educativas.",
    descricao_curta: "História, educação e preservação da antiga Escola de Farmácia da UFOP.",
    sobre: "Atualmente existem dois Projetos de Extensão que vêm acontecendo de forma contínua, o que têm possibilitado a ampla divulgação da coleção e o desenvolvimento de ações educativas. O projeto 'Museu da Farmácia como Espaço de Educação' tem desenvolvido atividades com o público infanto-juvenil e estabelecido parcerias com as escolas de Ouro Preto. O projeto 'Museu da Farmácia Preservando conhecimento' tem como foco as ações de preservação, organização e divulgação do acervo, recebendo alunos em estágios e sendo referência de pesquisa.",
    historia: "O Museu da Farmácia teve início das suas atividades em 04 de Abril de 1968. Desde a sua criação diversas ações foram realizadas, garantindo que o Museu não deixasse de existir. Desde 2013 o Museu passou a ocupar exclusivamente o prédio onde funcionava também a Escola de Farmácia, e desde então vem ampliando as suas atividades. Desde 2019 o museu está fechado à visitação pública principal, devido a obras de reformas e adequações necessárias, porém as atividades internas e de projetos seguem contínuas.",
    acervo: "O acervo é tema de artigos, trabalhos de conclusão de curso, dissertações e pesquisas acadêmicas variadas sobre as coleções do âmbito farmacêutico. Atualmente, o museu oferece visitas técnicas e orientadas às suas reservas técnicas, auxiliando na preservação contínua da história da farmácia no Brasil.",
    destaques: ["Projeto 'Espaço de Educação'", "Projeto 'Preservando conhecimento'", "Antiga sede da Escola de Farmácia"],
    visitacao: {
      horario: "Temporariamente Fechado",
      entrada: "Visitas técnicas sob demanda",
      duracao_visita: "Aproximadamente 1 hora"
    },
    localizacao: {
      endereco: "Rua Costa e Sena, nº 171",
      bairro: "Centro",
      cidade: "Ouro Preto",
      estado: "Minas Gerais",
      latitude: -20.3856,
      longitude: -43.5032
    },
    acessibilidade: "Rampa de acesso e elevador disponíveis.",
    contato: {
      telefone: "Consulte no local",
      email: "ingrid.borges@ufop.edu.br",
      website: "",
      instagram: "@museudafarmacia"
    },
    imagem_capa: "/images/museus/museu-da-farmacia/capa.webp",
    galeria: [
      { id: "01", imagem: "/images/museus/museu-da-farmacia/fachada.webp", legenda: "Fachada do Museu da Farmácia UFOP" }
    ],
    museus_relacionados: []
  },
  {
    id: "10",
    slug: "museu-boulieu",
    nome: "Museu Boulieu",
    nome_curto: "Boulieu",
    categoria: "Arte",
    subcategoria: "Arte Barroca Ibérica",
    tags: ["Arte", "Barroco", "Coleção", "Fé"],
    hero_texto: "Museu Boulieu",
    hero_texto_auxiliar: "A síntese global da arte barroca através da coleção de Maria Helena e Jacques Boulieu.",
    resumo: "O Museu Boulieu, em Ouro Preto, abriga a coleção do casal Maria Helena e Jacques Boulieu, composta por peças influenciadas pela cultura ibérica.",
    descricao_curta: "Arte barroca, encontros culturais e a rica coleção de Maria Helena e Jacques Boulieu.",
    sobre: "O Museu Boulieu, situado em Ouro Preto, abriga a coleção do casal Maria Helena e Jacques Boulieu, composta por peças de diversas regiões influenciadas pela cultura ibérica dos colonizadores portugueses e espanhóis. A criação do museu é um legado do casal, que desejava compartilhar com o público sua visão sobre religiosidade e arte.",
    historia: "A coleção teve início na década de 1950, após a lua de mel do casal na Bahia, e foi construída ao longo de mais de 60 anos com dedicação e sensibilidade à temática da fé. Instalado no antigo Asilo São Vicente de Paulo, em um prédio tombado pelo Iphan, o museu está localizado no centro histórico de Ouro Preto, principal símbolo do Barroco brasileiro.",
    acervo: "O acervo evidencia a síntese global da arte barroca e os encontros – muitas vezes conflituosos – entre culturas europeias e nativas, resultando em expressões artísticas únicas. As obras, feitas de diversos materiais como marfim, prata e madeira, percorrem os caminhos das grandes navegações e da colonização.",
    destaques: ["Obras em marfim, prata e madeira", "Antigo Asilo São Vicente de Paulo", "Síntese global da arte barroca", "Coleção construída ao longo de 60 anos"],
    visitacao: {
      horario: "Quinta a segunda: 10h às 18h. Quarta-feira: 13h às 21h.",
      entrada: "Consulte a instituição para informações atualizadas sobre ingressos, gratuidades e isenções.",
      duracao_visita: "Aproximadamente 1 hora"
    },
    localizacao: {
      endereco: "R. Padre Rolim, 412",
      bairro: "Centro",
      cidade: "Ouro Preto",
      estado: "Minas Gerais",
      latitude: -20.3831,
      longitude: -43.5042
    },
    acessibilidade: "Consulte a instituição para informações sobre recursos de acessibilidade e suporte à visitação.",
    contato: {
      telefone: "+55 (31) 3350-5246",
      email: "contato@museuboulieu.org.br",
      website: "https://museuboulieu.org.br",
      instagram: "@museuboulieu"
    },
    imagem_capa: "/images/museus/museu-boulieu/capa.webp",
    galeria: [
      { id: "01", imagem: "/images/museus/museu-boulieu/galeria-1.webp", legenda: "Exposição Interna" },
      { id: "02", imagem: "/images/museus/museu-boulieu/galeria-2.webp", legenda: "Detalhes do Acervo" },
      { id: "03", imagem: "/images/museus/museu-boulieu/galeria-3.webp", legenda: "Peças da Coleção" },
      { id: "04", imagem: "/images/museus/museu-boulieu/galeria-4.webp", legenda: "Obras em Marfim, Prata e Madeira" },
      { id: "05", imagem: "/images/museus/museu-boulieu/galeria-5.webp", legenda: "Ambiente do Museu" },
      { id: "06", imagem: "/images/museus/museu-boulieu/galeria-6.webp", legenda: "Detalhes da Coleção" },
      { id: "07", imagem: "/images/museus/museu-boulieu/galeria-7.webp", legenda: "Peças do Acervo" }
    ],
    museus_relacionados: []
  },
  {
    id: "11",
    slug: "mina-du-veloso",
    nome: "Mina DuVeloso",
    nome_curto: "Mina DuVeloso",
    categoria: "Patrimônio",
    subcategoria: "Memória e Resistência Negra",
    tags: ["Patrimônio", "Mineração", "Afroturismo", "Resistência"],
    hero_texto: "Mina DuVeloso",
    hero_texto_auxiliar: "Território de memória, resistência e afeto. Uma mina do século XVIII e um espaço vivo de preservação da história da escravidão negra.",
    resumo: "Localizada no bairro São Cristóvão, a Mina DuVeloso é um museu comunitário e espaço educativo que preserva a história da escravidão negra e das experiências culturais afro-brasileiras.",
    descricao_curta: "Museu comunitário de afroturismo e memória da resistência negra em Ouro Preto.",
    sobre: "Localizada no bairro São Cristóvão, em Ouro Preto (MG), a Mina Du Veloso é um território de memória, resistência e afeto. Mais do que uma antiga estrutura de mineração aurífera do século XVIII, ela é um espaço vivo de preservação da história da escravidão negra e das experiências culturais afro-brasileiras na região. Atuando como museu comunitário e espaço educativo, a Mina é gerida por moradores locais que desenvolvem ações de turismo de base comunitária e afroturismo, conectando o passado à luta por justiça e visibilidade no presente.",
    historia: "A Mina Du Veloso é uma antiga estrutura de mineração aurífera do século XVIII. Ao longo do tempo, tornou-se um espaço de preservação da memória da escravidão negra. A visita é uma experiência imersiva e sensível: os visitantes são conduzidos por trajetórias subterrâneas e narrativas muitas vezes silenciadas, que revelam a importância do trabalho escravizado, das técnicas ancestrais de mineração e da organização social das comunidades negras.",
    acervo: "Além das visitas guiadas, o espaço promove encontros, oficinas, vivências e formações com foco na valorização da cultura afro-brasileira, da memória local e da educação antirracista. A atuação da Mina Du Veloso fortalece os vínculos entre patrimônio, território e comunidade, colaborando para uma museologia mais democrática e inclusiva.",
    destaques: ["Visitas guiadas às estruturas subterrâneas", "Turismo de base comunitária", "Oficinas e vivências afro-brasileiras", "Educação antirracista"],
    visitacao: {
      horario: "Segunda à Sábado das 9h às 17h. Domingo das 9h às 15h.",
      entrada: "Consulte no local",
      duracao_visita: "Aproximadamente 1h30"
    },
    localizacao: {
      endereco: "R. Levindo Inácio André, 400",
      bairro: "São Cristóvão",
      cidade: "Ouro Preto",
      estado: "Minas Gerais",
      latitude: -20.3856,
      longitude: -43.5032
    },
    acessibilidade: "Consulte no local.",
    contato: {
      telefone: "31 987453494",
      email: "minaduveloso@gmail.com",
      website: "",
      instagram: "@minaduveloso"
    },
    imagem_capa: "/images/museus/mina-du-veloso/capa.webp",
    galeria: [
      { id: "01", imagem: "/images/museus/mina-du-veloso/galeria-1.webp", legenda: "Estrutura da Mina" },
      { id: "02", imagem: "/images/museus/mina-du-veloso/galeria-2.webp", legenda: "Interior" },
      { id: "03", imagem: "/images/museus/mina-du-veloso/galeria-3.webp", legenda: "Galeria Subterrânea" }
    ],
    museus_relacionados: []
  },
  {
    id: "12",
    slug: "ecomuseu-da-serra-de-ouro-preto",
    nome: "Ecomuseu da Serra de Ouro Preto",
    nome_curto: "Ecomuseu da Serra",
    categoria: "Cultura",
    subcategoria: "Museologia Comunitária",
    tags: ["Cultura", "Comunidade", "Patrimônio", "Museologia"],
    hero_texto: "Ecomuseu da Serra de Ouro Preto",
    hero_texto_auxiliar: "Valorização dos saberes, costumes e tradições da comunidade São Sebastião através da museologia comunitária.",
    resumo: "O Ecomuseu da Serra de Ouro Preto tem como prioridade a valorização dos saberes existentes no território São Sebastião, sensibilizando a comunidade para a preservação de seu patrimônio local.",
    descricao_curta: "Museologia comunitária e protagonismo local no Núcleo São Sebastião de Ouro Preto.",
    sobre: "O Ecomuseu e o Museu comunitário têm como prioridade a valorização dos saberes existentes em um determinado território. Um de seus objetivos é o de sensibilizar a comunidade em prol da preservação de seu patrimônio local, da memória coletiva dos costumes e tradições, visando sempre ao desenvolvimento da coletividade. O Território São Sebastião, núcleo do Ecomuseu da Serra de Ouro Preto, apresenta para a comunidade local novos horizontes em prol de seu desenvolvimento coletivo e a salvaguarda dos costumes e tradições daquele espaço.",
    historia: "A proposta original do Ecomuseu da Serra de Ouro Preto nasce em 2005, com projeto apresentado para o Ministério da Cultura pelo Museu de Arte Sacra de Ouro Preto. Seu objetivo inicial foi a sensibilização das populações que habitam os bairros circunvizinhos às ruínas do Séc. XVIII, situadas no Morro da Queimada e espalhadas pelo Morro Santana, Morro São João e Morro São Sebastião. A proposta contou com Hugues de Varine como orientador/consultor em questões de museologia comunitária e desenvolvimento local.",
    acervo: "A comunidade São Sebastião é sempre muito organizada e ativa com a preservação de seus costumes e ações culturais. O Ecomuseu valoriza os saberes e fazeres da comunidade, através de trabalhos e parcerias com coletivos e associações locais. Através do eco e ressoar da comunidade, preserva-se a memória viva de um povo e seu modo de vida.",
    destaques: ["Valorização da memória comunitária", "Ruínas do século XVIII no Morro da Queimada", "Protagonismo comunitário", "Parceria com coletivos e associações"],
    visitacao: {
      horario: "Consulte no local",
      entrada: "Consulte no local",
      duracao_visita: "Consulte no local"
    },
    localizacao: {
      endereco: "Bairro São Sebastião",
      bairro: "São Sebastião",
      cidade: "Ouro Preto",
      estado: "Minas Gerais",
      latitude: -20.3856,
      longitude: -43.5032
    },
    acessibilidade: "Consulte no local.",
    contato: {
      telefone: "Consulte no local",
      email: "Consulte no local",
      website: "",
      instagram: "@ecomuseudaserramss"
    },
    imagem_capa: "/images/museus/ecomuseu-da-serra-de-ouro-preto/capa.webp",
    galeria: [
      { id: "01", imagem: "/images/museus/ecomuseu-da-serra-de-ouro-preto/galeria-1.webp", legenda: "Comunidade São Sebastião" },
      { id: "02", imagem: "/images/museus/ecomuseu-da-serra-de-ouro-preto/galeria-2.webp", legenda: "Cultura e Tradição" },
      { id: "03", imagem: "/images/museus/ecomuseu-da-serra-de-ouro-preto/galeria-3.webp", legenda: "Território" }
    ],
    museus_relacionados: []
  },
  {
    id: "13",
    slug: "museu-casa-dos-inconfidentes",
    nome: "Museu Casa dos Inconfidentes",
    nome_curto: "Casa dos Inconfidentes",
    categoria: "História",
    subcategoria: "Inconfidência Mineira",
    tags: ["História", "Inconfidência", "Brasil Colonial"],
    hero_texto: "Museu Casa dos Inconfidentes",
    hero_texto_auxiliar: "Preservando a memória dos inconfidentes na histórica Chácara das Boas Vistas, com vista privilegiada da cidade de Ouro Preto.",
    resumo: "Inaugurado em 2010 por iniciativa da Prefeitura Municipal, o Museu Casa dos Inconfidentes preserva a memória dos inconfidentes nesta casa que foi palco de confabulações sobre a independência e república.",
    descricao_curta: "Casa-museu que preserva a memória da Inconfidência Mineira e o cotidiano colonial de Vila Rica.",
    sobre: "Conhecida como 'Chácara das Boas Vistas' no século XVIII, hoje o casarão colonial tornou-se, por iniciativa da Prefeitura Municipal de Ouro Preto, um Museu-Casa, desde 2010. Está localizado na meia encosta do Morro do Cruzeiro, de onde os visitantes ainda podem contemplar uma bela vista da cidade de Ouro Preto. A expografia apresenta o cotidiano dos espaços de uma casa de época, através de mobiliários e acervos que contextualizam a dinâmica do modo de vida na antiguidade de Vila Rica.",
    historia: "O Museu preserva a memória dos inconfidentes. No passado foi morada da família de José Álvares Maciel, capitão-mor das ordenanças de Vila Rica, cujo filho de mesmo nome se envolveu com a inconfidência. Era propriedade do tenente-coronel e inconfidente Francisco de Paula Freire de Andrade. A casa firmou-se, por meio da tradição oral, como um dos locais a acontecerem entre os conjurados, confabulações sobre a independência e república — um movimento que se tornou um marco histórico na Capitania das Minas Gerais: a Inconfidência Mineira.",
    acervo: "A expografia apresenta o cotidiano dos espaços de uma casa de época, através de mobiliários e acervos que contextualizam a dinâmica do modo de vida na antiguidade de Vila Rica. O acervo conecta o visitante ao período colonial e às personagens históricas que frequentaram estas salas.",
    destaques: ["Vista panorâmica de Ouro Preto", "Mobiliário colonial de época", "Conexão com a Inconfidência Mineira", "Casarão do século XVIII"],
    visitacao: {
      horario: "Segunda a Sexta, de 10h às 15h45",
      entrada: "Consulte no local",
      duracao_visita: "Aproximadamente 1 hora"
    },
    localizacao: {
      endereco: "Rua Engenheiro Correia s/n",
      bairro: "Vila Aparecida",
      cidade: "Ouro Preto",
      estado: "Minas Gerais",
      latitude: -20.3856,
      longitude: -43.5032
    },
    acessibilidade: "Consulte no local.",
    contato: {
      telefone: "31 3551 2739",
      email: "casadosinconfidentes@ouropreto.mg.gov.br",
      website: "",
      instagram: "@casa_dos_inconfidentes"
    },
    imagem_capa: "/images/museus/museu-casa-dos-inconfidentes/capa.webp",
    galeria: [
      { id: "01", imagem: "/images/museus/museu-casa-dos-inconfidentes/galeria-1.webp", legenda: "Interior da Casa" },
      { id: "02", imagem: "/images/museus/museu-casa-dos-inconfidentes/galeria-2.webp", legenda: "Ambientes Coloniais" },
      { id: "03", imagem: "/images/museus/museu-casa-dos-inconfidentes/galeria-3.webp", legenda: "Acervo" },
      { id: "04", imagem: "/images/museus/museu-casa-dos-inconfidentes/galeria-4.webp", legenda: "Vista da Cidade" }
    ],
    museus_relacionados: []
  },
  {
    id: "14",
    slug: "museu-do-cha",
    nome: "Museu do Chá",
    nome_curto: "Museu do Chá",
    categoria: "História",
    subcategoria: "Patrimônio Industrial",
    tags: ["Patrimônio Industrial", "História", "Meio Ambiente"],
    hero_texto: "Museu do Chá",
    hero_texto_auxiliar: "Preservando o patrimônio industrial da antiga Fazenda de São José do Manso, no Parque Estadual do Itacolomi.",
    resumo: "Instalado nas estruturas remanescentes da antiga Fazenda de São José do Manso, o Museu preserva parte significativa do patrimônio industrial associado à produção de chá preto em Ouro Preto.",
    descricao_curta: "Museu que preserva o patrimônio industrial da produção de chá preto na antiga Fazenda do Manso.",
    sobre: "O Museu do Chá está localizado no território do Parque Estadual do Itacolomi (PEIT), entre os municípios de Ouro Preto e Mariana, instalado nas estruturas remanescentes da antiga Fazenda de São José do Manso. O Museu preserva parte significativa do patrimônio industrial associado à produção de chá preto, reunindo equipamentos utilizados nas diferentes etapas de cultivo, beneficiamento e processamento do produto, mantidos em seu contexto original. Seu acervo constitui importante referência para a preservação e interpretação da história da produção de chá, das práticas de trabalho e das relações estabelecidas entre atividade produtiva, território e sociedade.",
    historia: "A trajetória do Museu está diretamente relacionada ao desenvolvimento da produção de chá preto em Ouro Preto. Na década de 1930, sob a administração de José de Salles Andrade, a Fazenda do Manso passou por um processo de expansão da atividade, com a introdução de sementes provenientes da Índia e de equipamentos industriais importados da Alemanha. Nesse período, foi criada a marca Chá Edelweiss, cuja produção alcançou reconhecimento comercial e envolveu um expressivo contingente de trabalhadores. A atividade estruturou um complexo produtivo destinado ao cultivo, beneficiamento e comercialização do chá, deixando como legado os equipamentos e as estruturas que atualmente constituem parte central do acervo do Museu, além de memórias e relações sociais vinculadas ao trabalho e às comunidades do entorno.\n\nCom a criação do Parque Estadual do Itacolomi, os remanescentes da antiga Fazenda do Manso passaram a integrar um território institucionalmente voltado à preservação de seu patrimônio natural, histórico e cultural. A permanência das estruturas e equipamentos da antiga fábrica possibilitou sua preservação e posterior musealização, dando origem ao atual Museu do Chá administrado pelo Instituto Estadual de Florestas de Minas Gerais (IEF). No âmbito do contrato de concessão firmado pelo Governo de Minas Gerais, os serviços do Parque estão sendo operacionalizados pela Parquetur. Nesse contexto, o Museu do Chá integra o conjunto de equipamentos culturais contemplados pela concessão.",
    acervo: "O acervo reúne equipamentos utilizados nas diferentes etapas de cultivo, beneficiamento e processamento do chá, importados da Alemanha na década de 1930, mantidos em seu contexto original na antiga fábrica da Fazenda de São José do Manso.",
    destaques: [
      "Equipamentos industriais alemães da década de 1930",
      "Estruturas originais da fábrica de chá",
      "História do Chá Edelweiss",
      "Localização no Parque Estadual do Itacolomi"
    ],
    visitacao: {
      horario: "De Terça-feira a domingo de 08h às 16h (Entrada no Parque até às 15:20)",
      entrada: "Consulte no local",
      duracao_visita: "Aproximadamente 1 hora"
    },
    localizacao: {
      endereco: "BR-356, Km 98 - Bauxita (Parque Estadual do Itacolomi)",
      bairro: "Bauxita",
      cidade: "Ouro Preto",
      estado: "Minas Gerais",
      latitude: -20.4287,
      longitude: -43.5132
    },
    acessibilidade: "Consulte no local.",
    contato: {
      telefone: "Consulte no local",
      email: "museu.itacolomi@parquetur.com.br",
      website: "https://parquedoitacolomi.com.br",
      instagram: ""
    },
    imagem_capa: "/images/museus/museu-do-cha/capa.webp",
    galeria: [
      { id: "01", imagem: "/images/museus/museu-do-cha/galeria-1.webp", legenda: "Instalações do Museu" },
      { id: "02", imagem: "/images/museus/museu-do-cha/galeria-2.webp", legenda: "Detalhes do acervo" },
      { id: "03", imagem: "/images/museus/museu-do-cha/capa.webp", legenda: "Fachada e equipamentos" }
    ],
    museus_relacionados: []
  }
];
