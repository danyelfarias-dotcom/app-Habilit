
import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Calendar, 
  ArrowRight,
  Menu,
  X,
  MessageSquare,
  Loader2,
  TrendingUp,
  Star,
  Smartphone,
  ChevronDown,
  Search,
  DollarSign,
  Layers,
  Award,
  Send,
  Info
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const navItems = [
    { 
      name: 'O App', 
      title: 'Mais que um app, seu parceiro de habilitação.',
      content: 'O Habilit nasceu para tirar a burocracia do banco do passageiro. Criamos uma interface intuitiva onde você resolve tudo pelo celular: da escolha do instrutor ao pagamento das aulas. Chega de processos obscuros; aqui, a jornada até a sua carteira de motorista é clara, digital e segura.',
      highlights: [
        'Tudo em um só lugar: Agenda, pagamentos e histórico de aulas.',
        'Feedback em tempo real: Saiba exatamente onde você precisa melhorar após cada aula.',
        'Segurança Garantida: Apenas instrutores credenciados e avaliados pela comunidade.'
      ]
    },
    { 
      name: 'Como Funciona', 
      title: 'Simples e Direto.',
      content: 'Do primeiro clique à aprovação final. Agende aulas com flexibilidade total, acompanhe seu progresso e tenha todo o suporte necessário para sua aprovação.',
      highlights: ['Agendamento Fácil', 'Relatórios Mensais', 'Suporte 24/7']
    },
    { 
      name: 'Para Instrutores', 
      title: 'Sua Escola Digital.',
      content: 'Seja dono da sua agenda e fature mais com a nossa plataforma de gestão integrada. Encontre alunos qualificados e organize seu dia a dia sem papelada.',
      highlights: ['Gestão de Faturamento', 'Agenda Automática', 'Maior Visibilidade']
    }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-habilit-blue py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-extrabold text-white tracking-tight">Habilit</span>
          </div>
          <div className="hidden md:flex items-center space-x-10" ref={dropdownRef}>
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <button 
                  onClick={() => toggleDropdown(item.name)}
                  className="flex items-center gap-1.5 text-white/80 hover:text-habilit-yellow transition-colors font-medium"
                >
                  {item.name}
                  <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === item.name && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 bg-white rounded-2xl shadow-2xl p-6 text-slate-800 animate-in fade-in zoom-in duration-200">
                    <h4 className="font-bold text-habilit-blue mb-2 text-sm">{item.title}</h4>
                    <p className="text-xs leading-relaxed text-slate-600 mb-4">{item.content}</p>
                    <div className="space-y-2 border-t border-slate-100 pt-4">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex gap-2 items-start">
                          <CheckCircle2 size={12} className="text-habilit-yellow shrink-0 mt-0.5" />
                          <span className="text-[10px] font-medium leading-tight">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button className="bg-habilit-yellow text-habilit-blue px-6 py-2.5 rounded-full font-bold hover:brightness-110 transition-all transform hover:scale-105 cta-shadow">
              Acesso Antecipado
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-0 left-0 w-full h-screen bg-habilit-blue z-[60] px-6 pt-24 animate-in slide-in-from-top duration-300">
          <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white">
            <X size={32} />
          </button>
          <div className="flex flex-col gap-6">
            <span className="text-2xl font-black text-white mb-4">Habilit</span>
            {navItems.map(item => (
              <div key={item.name} className="border-b border-white/10 pb-4">
                <button 
                  onClick={() => setMobileExpanded(mobileExpanded === item.name ? null : item.name)}
                  className="w-full flex justify-between items-center text-xl text-white font-bold py-2"
                >
                  {item.name}
                  <ChevronDown size={20} className={`transition-transform duration-300 ${mobileExpanded === item.name ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === item.name && (
                  <div className="mt-4 bg-white/5 rounded-2xl p-5 text-white/90 animate-in fade-in slide-in-from-top-4 duration-200">
                    <h5 className="font-extrabold text-habilit-yellow mb-3 text-lg leading-tight">{item.title}</h5>
                    <p className="text-sm leading-relaxed mb-6 opacity-80">{item.content}</p>
                    <div className="space-y-4">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <div className="bg-habilit-yellow/20 p-1 rounded-full text-habilit-yellow">
                            <CheckCircle2 size={16} />
                          </div>
                          <span className="text-xs font-semibold leading-normal">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button className="w-full bg-habilit-yellow text-habilit-blue py-5 rounded-2xl font-black text-lg mt-4 shadow-xl shadow-habilit-yellow/20">
              Acesso Antecipado
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative gradient-bg pt-24 pb-20 lg:pt-44 lg:pb-32 text-white overflow-hidden flex items-center justify-center min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="relative bg-white/5 backdrop-blur-md rounded-[2.5rem] p-4 border border-white/10 shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
               <Smartphone size={120} className="text-habilit-yellow/20" />
               <div className="absolute inset-0 bg-gradient-to-tr from-habilit-blue/20 to-transparent"></div>
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold mb-6 backdrop-blur-sm">
              <TrendingUp size={16} />
              <span>O volante está esperando</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.15]">
              Tire sua CNH <br />
              <span className="text-habilit-yellow">sem stresse</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-lg lg:max-w-2xl leading-relaxed font-light">
              O Habilit nasceu para tirar a burocracia do processo de habilitação. Simples, digital e focado em você.
            </p>
            <div className="flex flex-col items-center lg:items-start w-full gap-6">
              <button className="w-full sm:w-auto bg-habilit-yellow text-habilit-blue px-10 py-5 rounded-2xl font-black text-lg sm:text-xl hover:brightness-110 transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 group cta-shadow text-center">
                <span>Quero garantir meu acesso</span>
                <span>antecipado <ArrowRight size={22} className="hidden sm:inline-block group-hover:translate-x-1 transition-transform" /></span>
              </button>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex gap-1 text-habilit-yellow mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-sm text-white/60">5.0 de aprovação no Beta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

const Solution: React.FC = () => {
  const cards = [
    { icon: <MapPin size={24} />, title: 'Perto de você', desc: 'Encontre os melhores instrutores que atendem exatamente na sua região ou bairro.', theme: 'white' },
    { icon: <Calendar size={24} />, title: 'Flexibilidade', desc: 'Agende suas aulas nos dias e horários que melhor se adaptam à sua rotina atual.', theme: 'white' },
    { icon: <Users size={24} />, title: 'Avaliações', desc: 'Escolha baseado em notas reais e feedbacks detalhados de outros alunos.', theme: 'white' },
    { icon: <ShieldCheck size={24} />, title: '100% Credenciados', desc: 'Todos os nossos profissionais passam por uma rigorosa verificação de credenciais.', theme: 'blue' }
  ];

  return (
    <section id="solucao" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
          <div>
            <span className="text-habilit-blue font-bold tracking-widest uppercase text-sm mb-4 block">A Solução Habilit</span>
            <h2 className="text-4xl font-extrabold text-habilit-blue mb-8 leading-tight">A ponte definitiva entre você e a sua liberdade.</h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              O Habilit conecta você aos melhores instrutores credenciados através de um sistema inteligente de escolha por perfil.
            </p>
            <ul className="space-y-6">
              {["Seleção inteligente", "Agendamento instantâneo", "Pagamento seguro", "Acompanhamento de progresso"].map((text, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 bg-habilit-yellow/20 p-1 rounded-full text-habilit-blue">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="text-slate-700 font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-16 lg:mt-0 flex flex-col gap-8 items-center lg:items-stretch max-w-md mx-auto lg:ml-auto lg:mr-0">
            {cards.map((card, i) => (
              <div key={i} className={`${card.theme === 'blue' ? 'bg-habilit-blue text-white' : 'bg-white text-habilit-blue'} p-8 rounded-[2.5rem] shadow-xl border border-slate-100 hover:shadow-2xl transition-all transform hover:scale-[1.02] w-full`}>
                <div className={`${card.theme === 'blue' ? 'text-habilit-yellow' : 'text-habilit-blue'} mb-4`}>{card.icon}</div>
                <h4 className="text-xl font-bold mb-2">{card.title}</h4>
                <p className={`text-sm ${card.theme === 'blue' ? 'text-white/70' : 'text-slate-500'} leading-relaxed`}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: 'Olá! Sou o assistente Habilit. Tem alguma dúvida sobre como revolucionar sua jornada para a CNH?' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Você é um assistente proativo da Habilit. Ajude o usuário com dúvidas sobre o processo de CNH. Responda de forma curta e objetiva. Pergunta: ${userMsg}`,
      });
      setMessages(prev => [...prev, { role: 'bot', text: response.text || "Desculpe, tive um problema técnico. Tente novamente." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Erro na conexão. Verifique sua rede." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {isOpen ? (
        <div className="bg-white w-[90vw] sm:w-[360px] h-[550px] max-h-[85vh] rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-12 fade-in duration-300">
          <div className="bg-habilit-blue p-6 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-habilit-yellow rounded-full flex items-center justify-center text-habilit-blue shadow-inner">
                <MessageSquare size={20} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">Suporte Habilit</span>
                <span className="text-[10px] text-habilit-yellow font-medium uppercase tracking-wider">Online</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 hover:bg-white/10 rounded-xl transition-all"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm ${m.role === 'user' ? 'bg-habilit-blue text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                  <div className="w-1.5 h-1.5 bg-habilit-blue/30 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-habilit-blue/30 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-habilit-blue/30 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 bg-white border-t border-slate-100 flex gap-2 shrink-0">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escreva sua dúvida..."
              className="flex-1 bg-slate-100 border-none rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-habilit-blue/20 transition-all placeholder:text-slate-400"
            />
            <button 
              onClick={handleSend} 
              disabled={!input.trim() || loading}
              className="bg-habilit-blue text-white p-3.5 rounded-2xl hover:bg-habilit-dark disabled:opacity-50 transition-all shadow-md active:scale-95"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-habilit-yellow text-habilit-blue p-5 rounded-full shadow-[0_15px_35px_-5px_rgba(255,214,0,0.5)] hover:scale-110 active:scale-95 transition-all flex items-center gap-3 font-black group"
        >
          <MessageSquare size={32} className="group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline text-lg pr-1">Dúvidas?</span>
        </button>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-habilit-yellow selection:text-habilit-blue">
      <Navbar />
      <Hero />
      <Solution />
      <section className="py-32 bg-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-habilit-yellow/5 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-black mb-8 leading-tight text-habilit-blue">
            Sua liberdade começa <br /> com um clique.
          </h2>
          <p className="text-lg text-slate-500 mb-12 max-w-xl mx-auto">
            Junte-se a milhares de alunos que já escolheram a Habilit para conquistar sua carteira de motorista sem estresse.
          </p>
          <button className="bg-habilit-yellow text-habilit-blue px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-habilit-yellow/20 active:scale-95">
            Garantir Acesso Antecipado
          </button>
        </div>
      </section>
      <footer className="bg-habilit-dark text-white/40 py-16 text-center text-sm border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xl font-black text-white mb-6 block">Habilit</span>
          <p>© {new Date().getFullYear()} Habilit Tecnologia S/A. Todos os direitos reservados.</p>
        </div>
      </footer>
      <ChatAssistant />
    </div>
  );
};

export default App;
