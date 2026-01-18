
import React, { useState } from 'react';

// --- TYPY ---
interface FAQItem {
  question: string;
  answer: string;
}

// --- ŠABLONA HORNÍHO POPISU ---
const TopTemplate = ({ 
  imageUrl, 
  text, 
  subtext, 
  accentColor,
  showSecondButton,
  secondButtonText,
  secondButtonUrl
}: { 
  imageUrl: string; 
  text: string; 
  subtext: string; 
  accentColor: string;
  showSecondButton: boolean;
  secondButtonText: string;
  secondButtonUrl: string;
}) => {
  const secondButtonHtml = showSecondButton ? `
        <a href="${secondButtonUrl}" class="sh-faq-btn">
            <span>${secondButtonText}</span>
        </a>
  ` : '';

  // Generování odstavců s explicitním uzavřením
  const paragraphs = subtext
    .split('\n')
    .filter(t => t.trim())
    .map(t => `<p style="margin: 0 0 12px 0;">${t.trim()}</p>`)
    .join('');

  return `
<!-- SHOPTET HORNÍ POPIS - START -->
<style>
    .sh-faq-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: ${accentColor};
        color: #ffffff !important;
        text-decoration: none !important;
        padding: 12px 10px;
        border-radius: 10px;
        font-weight: 700;
        font-size: 13px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        flex: 1 1 140px;
        text-align: center;
        line-height: 1.2;
    }
    .sh-faq-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0,0,0,0.15);
        opacity: 0.9;
        filter: brightness(1.1);
    }
    @media (min-width: 480px) {
        .sh-faq-btn {
            font-size: 14px;
            padding: 12px 20px;
        }
    }
</style>

<div class="sh-cat-header" style="display: flex; flex-wrap: wrap; gap: 30px; align-items: center; margin-bottom: 40px; font-family: inherit; line-height: 1.5; text-align: left;">
    <div class="sh-cat-img" style="flex: 1 1 300px; max-width: 480px;">
        <img src="${imageUrl}" alt="Kategorie" style="width: 100%; height: auto; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); object-fit: cover; display: block;">
    </div>
    <div class="sh-cat-content" style="flex: 2 1 300px; min-width: 280px;">
        <h2 style="font-size: 20px; color: #111827; margin: 0 0 14px 0; font-weight: 800; line-height: 1.2; letter-spacing: -0.01em;">${text}</h2>
        <div style="font-size: 16px; color: #4b5563; margin: 0 0 24px 0; line-height: 1.6;">
            ${paragraphs}
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 10px; width: 100%;">
            <a href="#sh-faq-anchor" class="sh-faq-btn">
                <span>Často kladené otázky</span>
            </a>
            ${secondButtonHtml}
        </div>
    </div>
</div>
<!-- SHOPTET HORNÍ POPIS - KONEC -->
  `.trim();
};

// --- ŠABLONA SPODNÍHO POPISU ---
const BottomTemplate = ({ 
  seoText, 
  faqs, 
  accentColor 
}: { 
  seoText: string; 
  faqs: FAQItem[]; 
  accentColor: string;
}) => {
  const seoParagraphs = seoText
    .split('\n')
    .filter(t => t.trim())
    .map(t => `<p style="margin: 0 0 12px 0;">${t.trim()}</p>`)
    .join('');

  const faqHtml = faqs.map(faq => {
    const answerParagraphs = faq.answer
      .split('\n')
      .filter(t => t.trim())
      .map(t => `<p style="margin: 0 0 12px 0;">${t.trim()}</p>`)
      .join('');

    return `
    <details style="margin-bottom: 12px; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background: #fff; transition: all 0.2s ease;">
        <summary style="padding: 18px; font-weight: 700; font-size: 15px; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; color: #111827; outline: none; background: #f9fafb;">
            <span>${faq.question}</span>
            <span class="sh-faq-plus" aria-hidden="true" style="font-size: 24px; line-height: 1; color: ${accentColor}; font-weight: 300; transition: transform 0.3s ease; display: inline-block;">+</span>
        </summary>
        <div style="padding: 18px; border-top: 1px solid #e5e7eb; font-size: 14px; line-height: 1.6; color: #4b5563; background: #ffffff;">
            ${answerParagraphs}
        </div>
    </details>
    `;
  }).join('');

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/\n/g, ' ')
      }
    }))
  };

  return `
<!-- SHOPTET SPODNÍ POPIS - START -->
<div class="sh-cat-footer" style="margin-top: 50px; font-family: inherit; line-height: 1.6; color: #374151;">
    
    <div class="sh-cat-seo-text" style="font-size: 15px; margin-bottom: 45px; color: #4b5563; border-left: 4px solid #e5e7eb; padding-left: 20px;">
        ${seoParagraphs}
    </div>

    <!-- KOTVA PRO SCROLL - ABSOLUTNĚ PRÁZDNÁ -->
    <div id="sh-faq-anchor" style="padding-top: 40px; margin-bottom: 10px;"></div>

    <div class="sh-cat-faq-section" style="max-width: 850px;">
        <h2 style="font-size: 22px; color: #111827; margin-bottom: 25px; font-weight: 800; border-bottom: 3px solid ${accentColor}; display: inline-block; padding-bottom: 6px; letter-spacing: -0.01em;">Odpovídáme na vaše dotazy</h2>
        <div class="sh-faq-container">
            ${faqHtml}
        </div>
    </div>

    <script type="application/ld+json">
    ${JSON.stringify(jsonLd, null, 2)}
    </script>
</div>

<style>
    details summary::-webkit-details-marker { display:none; }
    details summary { list-style: none; }
    details[open] summary { background: #ffffff; border-bottom: 1px solid #f3f4f6; }
    details[open] .sh-faq-plus { transform: rotate(45deg); }
</style>
<!-- SHOPTET SPODNÍ POPIS - KONEC -->
  `.trim();
};

const App: React.FC = () => {
  const [imageUrl, setImageUrl] = useState('/user/documents/upload/mceclip1-1.jpg?1739207858');
  const [topTitle, setTopTitle] = useState('Klasická fotoalba s prokladovými listy pro ty nejcennější vzpomínky.');
  const [topSubtext, setTopSubtext] = useState('Díky průhledným pauzákům se vaše fotky nikdy neslepí.\nZesílený hřbet navíc zaručuje, že album zůstane dokonale ploché i po úplném naplnění.');
  
  const [showSecondButton, setShowSecondButton] = useState(false);
  const [secondButtonText, setSecondButtonText] = useState('Více informací');
  const [secondButtonUrl, setSecondButtonUrl] = useState('https://www.vas-web.cz/clanek');

  const [bottomSeoText, setBottomSeoText] = useState('V této kategorii naleznete široký výběr klasických fotoalb, která jsou synonymem pro kvalitu a dlouhověkost.\nKaždé album je pečlivě zpracováno, aby vyhovovalo potřebám i těch nejnáročnějších zákazníků.');
  const [faqs, setFaqs] = useState<FAQItem[]>([
    { question: 'Kolik fotek se do alba vejde?', answer: 'Záleží na počtu listů (30 nebo 50) a formátu fotografií.\nDo alba o 50 listech se obvykle vejde 100-200 fotografií při klasickém formátu 10x15 cm.' },
    { question: 'Lze do alb psát?', answer: 'Ano, listy jsou vyrobeny z vysokogramážního papíru.\nTen je ideální pro popisování běžnými fixy nebo gelovými pery.' }
  ]);

  const [accentColor, setAccentColor] = useState('#75943b');
  const [activeTab, setActiveTab] = useState<'top' | 'bottom'>('top');

  const generatedTopCode = TopTemplate({ imageUrl, text: topTitle, subtext: topSubtext, accentColor, showSecondButton, secondButtonText, secondButtonUrl });
  const generatedBottomCode = BottomTemplate({ seoText: bottomSeoText, faqs, accentColor });

  const addFaq = () => setFaqs([...faqs, { question: 'Nová otázka', answer: 'Nová odpověď' }]);
  const removeFaq = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));
  const updateFaq = (index: number, field: keyof FAQItem, value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Kód byl zkopírován!');
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-50 font-sans text-left">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              <i className="fas fa-check-circle text-emerald-600"></i>
              Shoptet UX Optimizer
            </h1>
            <p className="text-slate-500 text-sm mt-1">Technicky vyčištěný kód bez duplicit a HTML chyb.</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner">
            <button onClick={() => setActiveTab('top')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'top' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Horní popis</button>
            <button onClick={() => setActiveTab('bottom')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'bottom' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Spodní popis</button>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4 text-left">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase text-xs tracking-wider">Editor obsahu</h3>
              {activeTab === 'top' ? (
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">URL obrázku</span>
                    <input type="text" className="w-full p-3 bg-slate-50 border rounded-xl text-sm mt-1" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Nadpis (H2)</span>
                    <textarea rows={2} className="w-full p-3 bg-slate-50 border rounded-xl text-sm font-bold mt-1" value={topTitle} onChange={(e) => setTopTitle(e.target.value)} />
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Text</span>
                    <textarea rows={4} className="w-full p-3 bg-slate-50 border rounded-xl text-sm mt-1" value={topSubtext} onChange={(e) => setTopSubtext(e.target.value)} />
                  </label>
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Druhé tlačítko</span>
                      <button onClick={() => setShowSecondButton(!showSecondButton)} className={`text-[10px] px-3 py-1 rounded-full font-bold transition-all ${showSecondButton ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {showSecondButton ? 'ZAPNUTO' : 'VYPNUTO'}
                      </button>
                    </div>
                    {showSecondButton && (
                      <div className="space-y-3">
                        <input type="text" className="w-full p-2 bg-slate-50 border rounded-lg text-xs" value={secondButtonText} onChange={(e) => setSecondButtonText(e.target.value)} placeholder="Text tlačítka" />
                        <input type="text" className="w-full p-2 bg-slate-50 border rounded-lg text-xs" value={secondButtonUrl} onChange={(e) => setSecondButtonUrl(e.target.value)} placeholder="URL odkazu" />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">SEO Text</span>
                    <textarea rows={6} className="w-full p-3 bg-slate-50 border rounded-xl text-sm mt-1" value={bottomSeoText} onChange={(e) => setBottomSeoText(e.target.value)} />
                  </label>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">FAQ Sekce</span>
                    <button onClick={addFaq} className="text-[10px] bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-bold">PŘIDAT DOTAZ</button>
                  </div>
                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
                    {faqs.map((faq, index) => (
                      <div key={index} className="p-3 bg-slate-50 border rounded-xl space-y-2 relative group">
                        <button onClick={() => removeFaq(index)} className="absolute top-2 right-2 text-slate-300 hover:text-rose-500"><i className="fas fa-times-circle"></i></button>
                        <input type="text" className="w-full p-2 bg-white border rounded-lg text-xs font-bold" value={faq.question} onChange={(e) => updateFaq(index, 'question', e.target.value)} />
                        <textarea rows={2} className="w-full p-2 bg-white border rounded-lg text-xs" value={faq.answer} onChange={(e) => updateFaq(index, 'answer', e.target.value)} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="pt-4 border-t">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Barva tlačítek a akcentů</label>
                <div className="flex gap-3">
                  <input type="color" className="h-10 w-12 rounded-lg cursor-pointer border-none" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
                  <input type="text" className="flex-1 p-2 bg-slate-50 border rounded-lg text-xs font-mono uppercase" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 overflow-hidden text-left">
              <h3 className="font-bold text-slate-800 text-sm uppercase mb-6 flex items-center gap-2"><i className="fas fa-eye text-slate-400"></i> Náhled</h3>
              <div className="border border-slate-50 rounded-2xl p-4 md:p-6 bg-white min-h-[300px]">
                {activeTab === 'top' ? <div dangerouslySetInnerHTML={{ __html: generatedTopCode }} /> : <div dangerouslySetInnerHTML={{ __html: generatedBottomCode }} />}
              </div>
            </div>
            <div className="bg-slate-900 rounded-3xl shadow-xl p-6 md:p-8 relative text-left">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide uppercase">Zdrojový kód</h3>
                </div>
                <button onClick={() => copyToClipboard(activeTab === 'top' ? generatedTopCode : generatedBottomCode)} className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3 rounded-xl text-xs font-black transition-all shadow-lg uppercase tracking-widest">Kopírovat</button>
              </div>
              <div className="bg-black/40 rounded-xl p-5 font-mono text-[10px] text-emerald-300/80 overflow-x-auto max-h-[350px] scrollbar-thin">
                <pre className="whitespace-pre-wrap">{activeTab === 'top' ? generatedTopCode : generatedBottomCode}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
