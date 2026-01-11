
import React, { useState, useEffect } from 'react';
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
  ChevronDown
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-habilit-blue py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-extrabold text-white tracking-tight">
              Habilit
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-10">
            <a href="#solucao" className="text-white/80 hover:text-habilit-yellow transition-colors font-medium">O App</a>
            <a href="#como-funciona" className="text-white/80 hover:text-habilit-yellow transition-colors font-medium">Como Funciona</a>
            <a href="#instrutores" className="text-white/80 hover:text-habilit-yellow transition-colors font-medium">Para Instrutores</a>
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
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-habilit-blue px-6 pt-4 pb-10 space-y-4 border-t border-white/10 animate-in fade-in duration-300">
          <a href="#solucao" onClick={() => setIsOpen(false)} className="block text-lg text-white/90 py-2">O App</a>
          <a href="#como-funciona" onClick={() => setIsOpen(false)} className="block text-lg text-white/90 py-2">Como Funciona</a>
          <a href="#instrutores" onClick={() => setIsOpen(false)} className="block text-lg text-white/90 py-2">Para Instrutores</a>
          <button className="w-full bg-habilit-yellow text-habilit-blue py-4 rounded-xl font-bold">Acesso Antecipado</button>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC = () => {
  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const generateImage = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: "A high-end SaaS marketing visual showing a professional blue hatchback car on a modern street with a digital smartphone overlay showing a sleek app interface for booking driving lessons. Clean, minimalist, professional business look, daylight." }]
          },
          config: { imageConfig: { aspectRatio: "16:9" } }
        });
        const imagePart = response.candidates?.[0].content.parts.find(p => p.inlineData);
        if (imagePart?.inlineData) {
          setHeroImageUrl(`data:image/png;base64,${imagePart.inlineData.data}`);
        } else {
          setHeroImageUrl("https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200");
        }
      } catch (error) {
        setHeroImageUrl("https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200");
      } finally {
        setIsGenerating(false);
      }
    };
    generateImage();
  }, []);

  return (
    <section className="relative gradient-bg pt-40 pb-24 lg:pt-56 lg:pb-40 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center lg:text-left">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-habilit-yellow text-sm font-semibold mb-8 backdrop-blur-sm">
              <TrendingUp size={16} />
              <span>A revolução das autoescolas chegou</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-[1.15]">
              Tire sua CNH <br />
              <span className="text-habilit-yellow underline decoration-habilit-yellow/30">sem estresse.</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Escolha o instrutor ideal para o seu perfil e aprenda a dirigir no seu tempo. Liberdade, flexibilidade e segurança em uma única plataforma.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center">
              <button className="bg-habilit-yellow text-habilit-blue px-8 py-5 rounded-2xl font-black text-lg hover:brightness-110 transition-all flex items-center gap-3 group cta-shadow">
                Quero garantir meu acesso antecipado
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex flex-col items-center lg:items-start ml-4">
                <div className="flex gap-1 text-habilit-yellow mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-sm text-white/60">5.0 de aprovação no Beta</p>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="relative z-10 transform hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute -inset-4 bg-habilit-yellow/20 blur-3xl rounded-full"></div>
              <div className="relative bg-white/5 backdrop-blur-md rounded-[2.5rem] p-4 border border-white/10 shadow-2xl overflow-hidden aspect-video">
                {isGenerating ? (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-habilit-dark/40 rounded-[2rem]">
                    <Loader2 className="animate-spin text-habilit-yellow" size={40} />
                    <p className="text-white/40 text-sm">Carregando inovação...</p>
                  </div>
                ) : (
                  <img src={heroImageUrl!} alt="Habilit Platform" className="w-full h-full object-cover rounded-[2rem]" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

const PainPoints: React.FC = () => {
  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-habilit-blue mb-6">A jornada para sua CNH não precisa ser um peso</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Cansado de aulas genéricas, instrutores impacientes e horários rígidos na autoescola? Nós entendemos sua frustração.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { 
              icon: <Clock className="text-red-500" />, 
              title: "Horários Inflexíveis", 
              desc: "Pare de tentar encaixar sua vida na agenda da autoescola. Tenha controle total." 
            },
            { 
              icon: <Users className="text-red-500" />, 
              title: "Instrutores Mal Avaliados", 
              desc: "Sem surpresas. No Habilit você escolhe quem vai te ensinar baseado em avaliações reais." 
            },
            { 
              icon: <Smartphone className="text-red-500" />, 
              title: "Processos Analógicos", 
              desc: "Agendamentos por papel e burocracia infinita são coisas do passado." 
            }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-red-100 transition-colors group">
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-habilit-blue mb-4">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Solution: React.FC = () => {
  return (
    <section id="solucao" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
          <div>
            <span className="text-habilit-blue font-bold tracking-widest uppercase text-sm mb-4 block">A Solução Habilit</span>
            <h2 className="text-4xl font-extrabold text-habilit-blue mb-8 leading-tight">A ponte definitiva entre você e a sua liberdade.</h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              O Habilit conecta você aos melhores instrutores credenciados através de um sistema inteligente de escolha por perfil, avaliações detalhadas e flexibilidade total de agenda.
            </p>
            <ul className="space-y-6">
              {[
                "Seleção inteligente baseada no seu perfil de aprendizado.",
                "Agendamento instantâneo via aplicativo.",
                "Pagamento seguro e transparente.",
                "Acompanhamento de progresso em tempo real."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 bg-habilit-yellow/20 p-1 rounded-full text-habilit-blue">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="text-slate-700 font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-16 lg:mt-0 grid grid-cols-2 gap-6">
            <div className="space-y-6 pt-12">
              <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
                <MapPin className="text-habilit-blue mb-4" />
                <h4 className="font-bold text-habilit-blue mb-2">Perto de você</h4>
                <p className="text-sm text-slate-500">Encontre instrutores na sua região.</p>
              </div>
              <div className="bg-habilit-blue p-8 rounded-[2rem] shadow-xl text-white">
                <ShieldCheck className="text-habilit-yellow mb-4" />
                <h4 className="font-bold mb-2">100% Credenciados</h4>
                <p className="text-sm text-white/70">Apenas profissionais verificados.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
                <Calendar className="text-habilit-blue mb-4" />
                <h4 className="font-bold text-habilit-blue mb-2">Flexibilidade</h4>
                <p className="text-sm text-slate-500">Aulas no seu horário disponível.</p>
              </div>
              <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
                <Users className="text-habilit-blue mb-4" />
                <h4 className="font-bold text-habilit-blue mb-2">Avaliações</h4>
                <p className="text-sm text-slate-500">Transparência total no ensino.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <section id="como-funciona" className="py-24 bg-habilit-blue text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 italic">3 Passos para a sua Habilitação</h2>
          <p className="text-lg text-white/60">Sem complicações. Sem burocracia.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { step: "01", title: "Crie seu Perfil", desc: "Defina seus objetivos e preferências de aprendizado no app." },
            { step: "02", title: "Escolha o Instrutor", desc: "Compare perfis e avaliações para encontrar o match perfeito." },
            { step: "03", title: "Agende sua Aula", desc: "Escolha o dia, hora e local. Tudo direto pelo seu celular." }
          ].map((item, i) => (
            <div key={i} className="relative group p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-colors">
              <span className="absolute top-8 right-10 text-6xl font-black text-white/5 group-hover:text-habilit-yellow/10 transition-colors">{item.step}</span>
              <h3 className="text-2xl font-bold mb-4 relative z-10">{item.title}</h3>
              <p className="text-white/60 leading-relaxed relative z-10">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ForInstructors: React.FC = () => {
  return (
    <section id="instrutores" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-slate-50 rounded-[3rem] p-8 lg:p-20 relative border border-slate-100">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-habilit-blue mb-8">É Instrutor? Fature mais e trabalhe no seu tempo.</h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                Nós cuidamos da captação de alunos e da burocracia. Você foca no que faz de melhor: ensinar com excelência.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                <div className="flex gap-4">
                  <div className="bg-habilit-blue text-habilit-yellow w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-habilit-blue">Maior Faturamento</h4>
                    <p className="text-sm text-slate-500">Receba por aula dada, sem intermediários abusivos.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-habilit-blue text-habilit-yellow w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-habilit-blue">Gestão de Agenda</h4>
                    <p className="text-sm text-slate-500">Defina sua disponibilidade e gerencie tudo via app.</p>
                  </div>
                </div>
              </div>
              <button className="bg-habilit-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-habilit-dark transition-colors">
                Quero ser Instrutor Habilit
              </button>
            </div>
            <div className="mt-16 lg:mt-0 relative">
               <div className="rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                 <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800" alt="Instrutor no carro" className="w-full h-full object-cover aspect-square" />
               </div>
            </div>
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
        contents: `Você é um assistente de vendas e suporte de alta performance da plataforma Habilit (startup de conexão aluno-instrutor). Seja persuasivo, empático e rápido. Perg: ${userMsg}`,
      });
      setMessages(prev => [...prev, { role: 'bot', text: response.text || "Estou com instabilidade, me chame novamente em um minuto." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Erro na conexão. Tente novamente mais tarde." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen ? (
        <div className="bg-white w-[90vw] sm:w-96 h-[500px] rounded-[2rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8">
          <div className="bg-habilit-blue p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-habilit-yellow rounded-full flex items-center justify-center text-habilit-blue">
                <MessageSquare size={20} />
              </div>
              <div>
                <span className="font-bold block">Suporte VIP</span>
                <span className="text-[10px] text-white/60 uppercase tracking-widest">IA Powered</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform"><X size={24} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-habilit-blue text-white rounded-tr-none shadow-lg' : 'bg-slate-100 text-slate-800 rounded-tl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium italic animate-pulse"><Loader2 size={12} className="animate-spin" /> Digitando...</div>}
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Sua dúvida aqui..."
              className="flex-1 bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-habilit-yellow"
            />
            <button onClick={handleSend} className="bg-habilit-blue text-white p-3 rounded-xl hover:bg-habilit-dark transition-colors"><ArrowRight size={20} /></button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="bg-habilit-yellow text-habilit-blue p-5 rounded-full shadow-[0_15px_40px_-10px_rgba(255,214,0,0.8)] hover:scale-110 active:scale-95 transition-all flex items-center gap-3 font-black">
          <MessageSquare size={28} />
          <span className="hidden sm:inline">Dúvidas?</span>
        </button>
      )}
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-habilit-dark text-white/40 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-16 mb-16">
          <div className="col-span-2">
            <span className="text-2xl font-black text-white tracking-tighter mb-8 block">
              Habilit
            </span>
            <p className="max-w-sm mb-10 leading-relaxed font-light text-white/60">
              Estamos transformando a jornada de milhares de brasileiros rumo à CNH. Mais que um app, somos sua liberdade no trânsito.
            </p>
            <div className="flex gap-6">
              {[<i className="fa-brands fa-instagram text-xl"></i>, <i className="fa-brands fa-facebook text-xl"></i>, <i className="fa-brands fa-twitter text-xl"></i>, <i className="fa-brands fa-linkedin text-xl"></i>].map((icon, i) => (
                <a key={i} href="#" className="text-white/40 hover:text-habilit-yellow transition-colors">{icon}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-widest">Plataforma</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Para Alunos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Para Instrutores</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Segurança</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Novidades</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-widest">Empresa</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-10 text-xs flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© {new Date().getFullYear()} Habilit Tecnologia S/A. Feito com paixão no Brasil.</p>
          <p className="flex items-center gap-2"><MapPin size={12} className="text-habilit-yellow" /> Sede em São Paulo, SP</p>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <PainPoints />
      <Solution />
      <HowItWorks />
      <ForInstructors />
      
      {/* Final Call to Action */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="relative gradient-bg rounded-[3rem] p-12 lg:p-24 text-center shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">O volante está esperando <br /> <span className="text-habilit-yellow">por você.</span></h2>
              <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto font-light">
                Junte-se à lista VIP e receba um desconto exclusivo de 30% na sua primeira aula ao lançarmos oficialmente.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="bg-habilit-yellow text-habilit-blue px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-habilit-yellow/20">
                  Quero garantir meu acesso antecipado
                </button>
              </div>
              <p className="mt-8 text-xs text-white/30 uppercase tracking-[0.2em]">Lançamento em Breve • Disponível em todo Brasil</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default App;
