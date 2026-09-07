import React from "react";
import Link from "next/link";
import {
  Landmark,
  Scale,
  BookOpen,
  Users,
  UserCheck,
  FileText,
  CheckCircle2,
  Building2,
  GraduationCap,
  Shield,
  ArrowRight,
  Sparkles,
  Calendar,
  Layers,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Institucional — Sistema de Museus de Ouro Preto (SiMOP)",
  description:
    "Conheça o histórico, a estrutura organizacional, o Conselho Gestor, a Coordenação Executiva e o marco legal do SiMOP em Ouro Preto.",
};

export default function InstitucionalPage() {
  const memberInstitutions = [
    {
      name: "Departamento de Museologia da UFOP",
      category: "Ensino & Pesquisa",
      icon: GraduationCap,
      description: "Formação técnica, pesquisa acadêmica e fomento à museologia.",
    },
    {
      name: "Rede de Museus e Acervos da UFOP",
      category: "Universidade",
      icon: GraduationCap,
      description: "Articulação dos espaços museais e coleções universitárias.",
    },
    {
      name: "Museu de Ciência e Técnica da Escola de Minas",
      category: "Universidade / Ciência",
      icon: Landmark,
      description: "Referência em geologia, mineralogia, física e história tecnológica.",
    },
    {
      name: "Museu da Farmácia",
      category: "Universidade / Saúde",
      icon: Landmark,
      description: "Preservação da memória farmacêutica pioneira da América do Sul.",
    },
    {
      name: "Museu Casa dos Contos",
      category: "Federal / Histórico",
      icon: Landmark,
      description: "Monumento da história fiscal, numismática e ciclo do ouro.",
    },
    {
      name: "Museu da Inconfidência",
      category: "Federal / Nacional",
      icon: Landmark,
      description: "Guardião da memória inconfidente e da sociedade colonial mineira.",
    },
    {
      name: "Museu Casa Guignard",
      category: "Estadual / Artes",
      icon: Landmark,
      description: "Homenagem à vida e obra de Alberto da Veiga Guignard.",
    },
    {
      name: "Museu Casa dos Inconfidentes",
      category: "Municipal / Memória",
      icon: Landmark,
      description: "Espaço de celebração e preservação da tradição local de Ouro Preto.",
    },
    {
      name: "Museu Boulieu",
      category: "Fundacional / Arte Sacra",
      icon: Landmark,
      description: "Coleção Caminhos da Fé e diálogo intercultural sacro.",
    },
    {
      name: "Museu do Oratório",
      category: "Fundacional / Acervo",
      icon: Landmark,
      description: "Acervo singular de oratórios dos séculos XVII a XX.",
    },
    {
      name: "Museu de Arte Sacra de Ouro Preto",
      category: "Diocesano / Sacro",
      icon: Landmark,
      description: "Riqueza litúrgica e artística da Paróquia de Nossa Senhora do Pilar.",
    },
    {
      name: "Museu do Chá",
      category: "Especializado / Histórico",
      icon: Landmark,
      description: "Memória da secular produção e tradição do chá na região.",
    },
    {
      name: "Mina Du Veloso",
      category: "Patrimônio Subterrâneo",
      icon: Landmark,
      description: "Engenharia colonial aurífera e arqueologia da mineração.",
    },
    {
      name: "Ecomuseu da Serra de Ouro Preto",
      category: "Comunitário & Ambiental",
      icon: Landmark,
      description: "Paisagem cultural, memória viva e território ecológico.",
    },
    {
      name: "Museu do Parque Estadual do Itacolomi",
      category: "Estadual / Natureza",
      icon: Landmark,
      description: "História natural, botânica e ocupação da serra do Itacolomi.",
    },
    {
      name: "Secretarias Municipais de Cultura, Turismo e/ou Patrimônio",
      category: "Poder Executivo Municipal",
      icon: Building2,
      description: "Gestão executiva, articulação de políticas públicas e fomento municipal.",
    },
  ];

  const executiveDuties = [
    "Representar o SiMOP junto aos órgãos competentes, eventos e reuniões institucionais.",
    "Organizar e dirigir atividades científicas, acadêmicas e culturais de integração.",
    "Coordenar as publicações, guias e catálogos do Sistema de Museus.",
    "Propor projetos, ações estratégicas e parcerias ao Conselho Gestor.",
    "Supervisionar e orientar a execução dos serviços administrativos do SiMOP.",
    "Convocar e conduzir reuniões, além de acompanhar o cumprimento das deliberações.",
  ];

  const legalFramework = [
    {
      law: "Lei Municipal nº 305/2006",
      date: "07 de dezembro de 2006",
      title: "Criação do SiMOP",
      description:
        "Institui e regulamenta o Sistema de Museus de Ouro Preto para organizar, sob a forma de sistema, as atividades museológicas no município.",
    },
    {
      law: "Lei Federal nº 11.904/2009",
      date: "14 de janeiro de 2009",
      title: "Estatuto Nacional de Museus",
      description:
        "Marco federal que orienta as políticas públicas de preservação, gestão e difusão do patrimônio museológico em âmbito nacional.",
    },
    {
      law: "Lei Municipal nº 932/2014",
      date: "12 de dezembro de 2014",
      title: "Estatuto Municipal de Museus",
      description:
        "Estabelece normas e diretrizes municipais complementares para salvaguarda, qualificação e funcionamento dos museus ouro-pretanos.",
    },
    {
      law: "Regimento Interno",
      date: "Aprovado em 2026",
      title: "Governança & Conselho Gestor",
      description:
        "Define as atribuições, funcionamento colegiado e composição oficial do Conselho Gestor e da Coordenação Executiva.",
    },
  ];

  return (
    <div className="space-y-16 md:space-y-24 pb-20 pt-8">
      {/* 1. Header Editorial / Hero */}
      <section className="relative overflow-hidden bg-night text-ivory border-b border-stone-dark/30">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C99A45_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-gold/15 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest">
              <Landmark className="w-4 h-4" />
              <span>Institucional • SiMOP</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-ivory tracking-tight leading-tight">
              Sistema de Museus de <span className="text-gold italic font-serif">Ouro Preto</span>
            </h1>

            <p className="text-base sm:text-xl text-stone font-light leading-relaxed max-w-3xl">
              Entidade pública colegiada dedicada a articular, coordenar e integrar as instituições museológicas de Ouro Preto, salvaguardando a memória e o patrimônio da primeira cidade brasileira reconhecida como Patrimônio Mundial pela UNESCO.
            </p>

            {/* Quick Metrics / Badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-stone-dark/30 text-stone">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-stone-dark font-medium block">Regulamentação</span>
                <span className="text-sm font-semibold text-gold">Lei nº 305/2006</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-stone-dark font-medium block">Autonomia</span>
                <span className="text-sm font-semibold text-gold">Conselho Gestor</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-stone-dark font-medium block">Composição</span>
                <span className="text-sm font-semibold text-gold">16 Instituições</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-stone-dark font-medium block">Regimento</span>
                <span className="text-sm font-semibold text-gold">Vigência 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container: 2-Column Grid (Main Narrative + Sidebar) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Column (8 cols) */}
          <main className="lg:col-span-8 space-y-20">
            
            {/* Seção 1: Histórico do SiMOP */}
            <section id="historico" className="space-y-8 scroll-mt-28">
              <SectionHeader
                eyebrow="Nossa Trajetória"
                title="Histórico do SiMOP"
                subtitle="A construção de um sistema unificado para o patrimônio museal ouro-pretano."
              />

              <div className="clay-card p-8 md:p-10 space-y-6 text-stone-dark leading-relaxed">
                <p className="text-base sm:text-lg text-blue-deep leading-relaxed">
                  O <strong>Sistema de Museus de Ouro Preto (SiMOP)</strong> é uma entidade pública do Município de Ouro Preto, regulamentada pela <strong>Lei Municipal nº 305, de 7 de dezembro de 2006</strong>. O Sistema foi instituído com a finalidade de organizar, sob a forma de sistema, as atividades dos museus localizados nos limites do município.
                </p>

                <p className="text-base leading-relaxed">
                  A articulação do SiMOP baseia-se na cooperação mútua entre instituições federais, estaduais, municipais, universitárias, confessionais e privadas, promovendo o intercâmbio técnico-científico, a qualificação profissional e a democratização do acesso aos acervos.
                </p>

                <div className="p-6 bg-stone-light/30 border-l-4 border-gold space-y-3 my-6 bg-ivory">
                  <div className="flex items-center gap-2 text-night font-serif font-bold text-base">
                    <Scale className="w-5 h-5 text-gold" />
                    <span>Orientação e Fundamentação Normativa</span>
                  </div>
                  <p className="text-sm text-blue-deep leading-relaxed">
                    As atividades desenvolvidas pelas instituições museológicas integrantes do Sistema orientam-se pelo <strong>Estatuto Nacional de Museus</strong> (Lei Federal nº 11.904, de 14 de janeiro de 2009) e pelo <strong>Estatuto Municipal de Museus</strong> (estabelecido pela Lei Municipal nº 932, de 12 de dezembro de 2014).
                  </p>
                </div>
              </div>
            </section>

            {/* Seção 2: Quem Somos & Estrutura de Governança */}
            <section id="quem-somos" className="space-y-8 scroll-mt-28">
              <SectionHeader
                eyebrow="Natureza & Estrutura"
                title="Quem Somos"
                subtitle="Governança colegiada, autonomia deliberativa e cooperação interinstitucional."
              />

              <div className="clay-card p-8 md:p-10 space-y-6 text-stone-dark leading-relaxed">
                <p className="text-base sm:text-lg text-blue-deep leading-relaxed">
                  O SiMOP configura-se como um <strong>órgão colegiado</strong> inserido na gestão executiva municipal e articulado, em cooperação, com as unidades organizacionais dos setores de <strong>Cultura, Turismo e/ou Patrimônio</strong>, conforme a gestão executiva vigente.
                </p>

                <p className="text-base leading-relaxed">
                  Sua autonomia deliberativa é plenamente assegurada por meio do seu <strong>Conselho Gestor</strong>, garantindo pluralidade na tomada de decisões e representatividade equitativa para todas as instituições parceiras.
                </p>

                {/* Grid dos dois eixos estruturais */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="p-6 bg-white border border-stone space-y-3">
                    <div className="w-10 h-10 bg-gold/15 text-gold flex items-center justify-center border border-gold/30">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif font-bold text-night text-lg">Conselho Gestor</h3>
                    <p className="text-xs text-blue-deep leading-relaxed">
                      Instância deliberativa e participativa superior, composta por representantes indicados por cada museu e instituição afim integrante do Sistema.
                    </p>
                  </div>

                  <div className="p-6 bg-white border border-stone space-y-3">
                    <div className="w-10 h-10 bg-gold/15 text-gold flex items-center justify-center border border-gold/30">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif font-bold text-night text-lg">Coordenação Executiva</h3>
                    <p className="text-xs text-blue-deep leading-relaxed">
                      Instância executiva responsável pela direção dos trabalhos organizacionais, proposição de projetos e condução dos serviços administrativos do SiMOP.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Seção 3: Coordenação Executiva */}
            <section id="coordenacao-executiva" className="space-y-8 scroll-mt-28">
              <SectionHeader
                eyebrow="Gestão Ativa"
                title="Coordenação Executiva"
                subtitle="Direção dos trabalhos organizacionais e serviços administrativos do SiMOP."
              />

              <div className="clay-card p-8 md:p-10 space-y-8">
                <div className="prose prose-stone text-stone-dark leading-relaxed space-y-4 max-w-none">
                  <p className="text-base sm:text-lg text-blue-deep">
                    A <strong>Coordenação Executiva</strong> é responsável pela direção dos trabalhos organizacionais e dos serviços administrativos do Sistema de Museus de Ouro Preto (SiMOP).
                  </p>
                  <p className="text-sm text-stone-dark">
                    De acordo com o Regimento Interno, ela é formada por representantes indicados pelo Conselho Gestor dentre seus membros titulares, com <strong>mandato de dois anos</strong>, permitida a recondução conforme as disposições regimentais.
                  </p>
                </div>

                {/* Atribuições da Coordenação Executiva */}
                <div className="bg-ivory p-6 border border-stone space-y-4">
                  <h3 className="font-serif font-bold text-night text-base flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gold" />
                    <span>Principais Atribuições Regimentais</span>
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-blue-deep">
                    {executiveDuties.map((duty, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <span>{duty}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cards dos Coordenadores Atuais */}
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-gold font-bold mb-6">
                    Coordenadores Atuais
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Ranielle Menezes de Figueiredo */}
                    <div className="clay-card p-6 bg-white flex flex-col items-center text-center group hover:border-gold transition-all duration-300">
                      <div className="w-36 h-36 mb-5 overflow-hidden border-2 border-gold/40 relative shadow-md bg-stone-light/20">
                        <img
                          src="/images/sobre/ranielle-figueiredo.webp"
                          alt="Ranielle Menezes de Figueiredo — Coordenadora Executiva"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-gold mb-1">
                        Coordenação Executiva
                      </span>
                      <h4 className="font-serif font-bold text-night text-lg mb-2">
                        Ranielle Menezes de Figueiredo
                      </h4>
                      <p className="text-xs text-blue-deep leading-relaxed mt-auto pt-2 border-t border-stone/50 w-full">
                        Representante do <strong>Museu de Ciência e Técnica da Escola de Minas</strong> da Universidade Federal de Ouro Preto (UFOP).
                      </p>
                    </div>

                    {/* Matheus José Mendes Bernardes */}
                    <div className="clay-card p-6 bg-white flex flex-col items-center text-center group hover:border-gold transition-all duration-300">
                      <div className="w-36 h-36 mb-5 overflow-hidden border-2 border-gold/40 relative shadow-md bg-stone-light/20">
                        <img
                          src="/images/sobre/matheus-bernardes.webp"
                          alt="Matheus José Mendes Bernardes — Coordenador Executivo"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-gold mb-1">
                        Coordenação Executiva
                      </span>
                      <h4 className="font-serif font-bold text-night text-lg mb-2">
                        Matheus José Mendes Bernardes
                      </h4>
                      <p className="text-xs text-blue-deep leading-relaxed mt-auto pt-2 border-t border-stone/50 w-full">
                        Representante do <strong>Museu Casa dos Contos</strong>.
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </section>

            {/* Seção 4: Equipe & Monitoria */}
            <section id="equipe" className="space-y-8 scroll-mt-28">
              <SectionHeader
                eyebrow="Corpo Técnico"
                title="Equipe & Monitoria"
                subtitle="Suporte operacional, mediação e atendimento técnico institucional."
              />

              <div className="clay-card p-8 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  
                  {/* Foto Stella Ker */}
                  <div className="md:col-span-4 flex justify-center">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 overflow-hidden border-2 border-gold/40 shadow-lg relative bg-stone-light/20">
                      <img
                        src="/images/sobre/stella-ker.webp"
                        alt="Stella de Abreu Alves Ker — Monitora do SiMOP"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Informações da Monitora */}
                  <div className="md:col-span-8 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/15 text-gold text-xs font-semibold uppercase tracking-wider border border-gold/30">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Equipe Técnica</span>
                    </div>

                    <h3 className="font-serif font-bold text-night text-2xl">
                      Stella de Abreu Alves Ker
                    </h3>

                    <p className="text-sm font-semibold text-gold uppercase tracking-wider">
                      Monitora do Sistema de Museus de Ouro Preto (SiMOP)
                    </p>

                    <p className="text-sm text-blue-deep leading-relaxed">
                      Atua no suporte e acompanhamento técnico das atividades do Sistema, contribuindo com a articulação de projetos, atendimento aos museus associados e apoio executivo aos planos de ação do SiMOP.
                    </p>
                  </div>

                </div>
              </div>
            </section>

            {/* Seção 5: Conselho Gestor & Instituições Integrantes */}
            <section id="conselho-gestor" className="space-y-8 scroll-mt-28">
              <SectionHeader
                eyebrow="Colegiado Deliberativo"
                title="Conselho Gestor"
                subtitle="Órgão máximo de participação, consulta e deliberação institucional do SiMOP."
              />

              <div className="clay-card-dark p-8 md:p-10 bg-night text-ivory space-y-8 border border-stone-dark/30">
                <div className="space-y-4">
                  <p className="text-base sm:text-lg text-stone leading-relaxed">
                    O <strong>Conselho Gestor</strong> é o órgão responsável pela participação e deliberação no âmbito do Sistema de Museus de Ouro Preto. É constituído por dois representantes — <strong>um titular e um suplente</strong> — indicados por cada museu e/ou instituição afim integrante do SiMOP.
                  </p>
                  <div className="p-4 bg-stone-dark/20 border-l-2 border-gold text-xs text-stone leading-relaxed">
                    Entre suas atribuições estatutárias estão apoiar e aconselhar as ações do Sistema, participar das reuniões ordinárias e extraordinárias, representar o SiMOP em outros conselhos, grupos e coletivos, e deliberar democraticamente sobre questões pertinentes ao pleno funcionamento do Sistema.
                  </div>
                </div>

                {/* Lista / Grid de Instituições Integrantes (Regimento 2026) */}
                <div className="space-y-6 pt-4 border-t border-stone-dark/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-serif font-bold text-ivory text-xl">
                      Instituições Integrantes do Conselho Gestor
                    </h3>
                    <span className="text-xs text-gold font-mono uppercase tracking-wider">
                      Regimento Interno (2026)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {memberInstitutions.map((inst, index) => {
                      const IconComp = inst.icon;
                      return (
                        <div
                          key={index}
                          className="clay-card-dark bg-stone-dark/15 border border-stone-dark/30 p-4 hover:border-gold/60 transition-all flex flex-col justify-between group"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-gold">
                                {inst.category}
                              </span>
                              <IconComp className="w-3.5 h-3.5 text-stone-dark group-hover:text-gold transition-colors" />
                            </div>
                            <h4 className="font-serif font-bold text-ivory text-sm leading-snug group-hover:text-gold-light transition-colors">
                              {inst.name}
                            </h4>
                          </div>
                          <p className="text-xs text-stone-dark pt-2 leading-relaxed">
                            {inst.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

          </main>

          {/* Sidebar / Coluna Lateral (4 cols) */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Card Lateral 1: Sumário / Navegação Rápida */}
            <div className="clay-card p-6 bg-white space-y-6">
              <div className="flex items-center gap-2 text-night font-serif font-bold text-base pb-3 border-b border-stone/60">
                <Layers className="w-4 h-4 text-gold" />
                <span>Navegação Institucional</span>
              </div>

              <nav className="space-y-2 text-sm" aria-label="Sumário da página">
                <a
                  href="#historico"
                  className="flex items-center justify-between p-2 hover:bg-ivory transition-colors text-blue-deep hover:text-gold font-medium"
                >
                  <span>1. Histórico do SiMOP</span>
                  <span className="text-xs text-stone-dark">→</span>
                </a>
                <a
                  href="#quem-somos"
                  className="flex items-center justify-between p-2 hover:bg-ivory transition-colors text-blue-deep hover:text-gold font-medium"
                >
                  <span>2. Quem Somos & Estrutura</span>
                  <span className="text-xs text-stone-dark">→</span>
                </a>
                <a
                  href="#coordenacao-executiva"
                  className="flex items-center justify-between p-2 hover:bg-ivory transition-colors text-blue-deep hover:text-gold font-medium"
                >
                  <span>3. Coordenação Executiva</span>
                  <span className="text-xs text-stone-dark">→</span>
                </a>
                <a
                  href="#equipe"
                  className="flex items-center justify-between p-2 hover:bg-ivory transition-colors text-blue-deep hover:text-gold font-medium"
                >
                  <span>4. Equipe & Monitoria</span>
                  <span className="text-xs text-stone-dark">→</span>
                </a>
                <a
                  href="#conselho-gestor"
                  className="flex items-center justify-between p-2 hover:bg-ivory transition-colors text-blue-deep hover:text-gold font-medium"
                >
                  <span>5. Conselho Gestor</span>
                  <span className="text-xs text-stone-dark">→</span>
                </a>
                <a
                  href="#marcos-legais"
                  className="flex items-center justify-between p-2 hover:bg-ivory transition-colors text-blue-deep hover:text-gold font-medium"
                >
                  <span>6. Marco Regulatório</span>
                  <span className="text-xs text-stone-dark">→</span>
                </a>
              </nav>

              {/* Destaque / Atalho Catálogo de Museus */}
              <div className="pt-4 border-t border-stone/60">
                <Link
                  href="/museus"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-night text-ivory text-xs font-semibold uppercase tracking-wider hover:bg-gold hover:text-night transition-colors"
                >
                  <Landmark className="w-4 h-4" />
                  <span>Explorar Museus</span>
                </Link>
              </div>
            </div>

            {/* Card Lateral 2: Marco Regulatório & Legislações */}
            <div id="marcos-legais" className="clay-card p-6 bg-ivory space-y-6 scroll-mt-28">
              <div className="flex items-center gap-2 text-night font-serif font-bold text-base pb-3 border-b border-stone/60">
                <FileText className="w-4 h-4 text-gold" />
                <span>Marco Regulatório</span>
              </div>

              <div className="space-y-4">
                {legalFramework.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-white border border-stone/60 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-gold uppercase tracking-wider">
                        {item.law}
                      </span>
                      <span className="text-[10px] text-stone-dark font-mono">
                        {item.date}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-night text-xs">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-stone-dark leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/legislacoes"
                  className="inline-flex items-center gap-1.5 text-xs text-gold font-semibold uppercase tracking-wider hover:underline"
                >
                  <span>Acessar acervo de legislações</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card Lateral 3: Informações & Contato Institucional */}
            <div className="clay-card-dark p-6 bg-night text-ivory space-y-5 border border-stone-dark/30">
              <div className="flex items-center gap-2 text-ivory font-serif font-bold text-base pb-3 border-b border-stone-dark/30">
                <Building2 className="w-4 h-4 text-gold" />
                <span>Articulação Institucional</span>
              </div>

              <div className="space-y-4 text-xs text-stone leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>
                    Município de Ouro Preto, Minas Gerais — Brasil
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Landmark className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>
                    Articulação em cooperação com as Secretarias de Cultura, Turismo e Patrimônio da Prefeitura Municipal de Ouro Preto.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <GraduationCap className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>
                    Parceria técnico-científica com o Departamento de Museologia e a Rede de Museus da UFOP.
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-dark/30 text-[11px] text-stone-dark">
                Para assuntos institucionais, projetos conjuntos ou informações do Conselho Gestor, consulte os canais oficiais do SiMOP.
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
