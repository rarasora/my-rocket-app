import React, { useState } from 'react';
import { Rocket, Info, Maximize2, Scissors, RefreshCw, MousePointer2, Scan } from 'lucide-react';

export default function App() {
  const [activePart, setActivePart] = useState(null);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [isSeparated, setIsSeparated] = useState(false);

  const resetRocket = () => {
    setIsLaunching(false);
    setIsDoorOpen(false);
    setIsSeparated(false);
    setActivePart(null);
  };

  const getSequenceStatus = () => {
    if (isDoorOpen) return "ミッション：ペイロード放出中";
    if (isSeparated) return "第2段：軌道投入フェーズ";
    if (isLaunching) return "第1段：上昇中（燃焼フェーズ）";
    return "ステータス：発射準備完了";
  };

  const parts = [
    { id: 'nose-cone', name: 'ノーズコーン', description: 'ロケットの最先端部。高速飛行時の空気抵抗を抑える形状をしています。' },
    { id: 'payload-bay', name: 'ペイロードハッチ', description: 'ローバーを格納・放出するための開閉機構です。スムーズな放出を可能にします。' },
    { id: 'satellite', name: 'ローバー (ミッション機)', description: '打ち上げの主目的です。パラシュートによる減速落下後に自動走行制御を行い、目標地点まで移動します。' },
    { id: 'stage2-tank', name: '2段目 酸化剤タンク（N2O）', description: '酸化剤として亜酸化窒素(N2O)を貯蔵します。自己加圧性があるため、複雑なポンプなしで供給が可能です。' },
    { id: 'stage2-fuel', name: '2段目 固体燃料（グレイン）', description: '燃料にはABS樹脂を使用。中央に燃焼路を持つ形状で、N2Oと反応して安定した推力を発生させます。' },
    { id: 'stage2-nozzle', name: '2段目 真空用ノズル', description: '宇宙空間（真空に近い環境）で効率よく推力を得るための大型ノズルです。' },
    { id: 'interstage', name: '段間分離部', description: '1段目と2段目を結合し、所定の高度で切り離すための分離機構を備えています。' },
    { id: 'stage1-tank', name: '1段目 酸化剤タンク（N2O）', description: '大量の亜酸化窒素(N2O)を貯蔵。ハイブリッド方式のため、バルブの開閉で推力調整や停止が可能です。' },
    { id: 'stage1-fuel', name: '1段目 固体燃料（ABS樹脂）', description: '打ち上げ初期の機体を押し上げるABS樹脂製燃料。高密度なグレイン構造でパワフルな燃焼を実現します。' },
    { id: 'fins', name: '空力安定翼（フィン）', description: '大気圏内を飛行中に機体の姿勢を安定させ、直進性を保つための翼です。' },
    { id: 'stage1-nozzle', name: '1段目 メインノズル', description: '地上からの打ち上げ時に最大推力を発生させるためのメインエンジン出口です。' }
  ];

  const SectionalOxidizerTank = ({ x, y, width, height, onClick }) => (
    <g className="cursor-pointer group" onClick={onClick}>
      <rect x={x} y={y} width={width} height={height} fill="#334155" stroke="#475569" strokeWidth="1" />
      <path 
        d={`M ${x+6} ${y+10} Q ${x+6} ${y+5} ${x+width/2} ${y+5} Q ${x+width-6} ${y+5} ${x+width-6} ${y+10} L ${x+width-6} ${y+height-15} L ${x+width/2} ${y+height-2} L ${x+6} ${y+height-15} Z`} 
        fill="#ec4899" stroke="#be185d" strokeWidth="1.5" className="group-hover:fill-pink-400 transition-colors"
      />
      <path d={`M ${x+10} ${y+15} Q ${x+width/2} ${y+12} ${x+width-10} ${y+15} L ${x+width-10} ${y+height-20} L ${x+width/2} ${y+height-8} L ${x+10} ${y+height-20} Z`} fill="#0ea5e9" opacity="0.6" />
      <rect x={x + width/2 - 5} y={y + height - 4} width="10" height="6" fill="#94a3b8" rx="1" />
    </g>
  );

  const SectionalSolidFuel = ({ x, y, width, height, onClick }) => (
    <g className="cursor-pointer group" onClick={onClick}>
      <rect x={x} y={y} width={width} height={height} fill="#1e293b" stroke="#475569" strokeWidth="1" />
      <rect x={x + 5} y={y} width={width - 10} height={height} fill="#262626" className="group-hover:fill-stone-800 transition-colors" />
      <rect x={x + width/2 - 8} y={y} width="16" height={height} fill="#0a0a0a" />
      <line x1={x + width/2} y1={y} x2={x + width/2} y2={y + height} stroke="#dc2626" strokeWidth="0.5" strokeDasharray="4 2" opacity="0.6" />
    </g>
  );

  const Parachute = ({ x, y, color = "#ef4444", scale = 1, visible = false }) => {
    if (!visible) return null;
    return (
      <g className="animate-in fade-in zoom-in duration-1000 pointer-events-none">
        <path d={`M ${x - 35 * scale} ${y - 45 * scale} Q ${x} ${y - 110 * scale} ${x + 35 * scale} ${y - 45 * scale}`} fill={color} stroke="white" strokeWidth={1.5 * scale} />
        <g opacity="0.6">
          <line x1={x - 35 * scale} y1={y - 45 * scale} x2={x} y2={y} stroke="white" strokeWidth={0.8 * scale} />
          <line x1={x + 35 * scale} y1={y - 45 * scale} x2={x} y2={y} stroke="white" strokeWidth={0.8 * scale} />
        </g>
      </g>
    );
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#020617] text-slate-100 p-4 font-sans overflow-hidden">
      
      {/* Telemetry Panel */}
      <div className="md:w-1/3 w-full mb-8 md:mb-0 md:mr-12 flex flex-col items-start space-y-4 z-20">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 bg-clip-text text-transparent mb-1 not-italic tracking-tighter uppercase text-left">
            多段式ハイブリッドロケット
          </h1>
          <p className="text-slate-500 text-[10px] font-mono tracking-[0.3em]">内部構造とシーケンス</p>
        </div>
        
        <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 w-full shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2 mb-3 text-cyan-400 font-bold text-xs uppercase tracking-widest">
            <Info size={14} />
            <span>Telemetry Unit</span>
          </div>
          <div className="min-h-[140px] flex flex-col justify-center">
            {activePart ? (
              <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <Scan size={16} className="text-cyan-500" />
                  <h3 className="text-lg font-bold text-white border-l-4 border-cyan-500 pl-3">{activePart.name}</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed font-light text-left">{activePart.description}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 px-4 bg-slate-950/50 border border-slate-800 rounded-lg group">
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping" />
                  <div className="relative bg-slate-900 p-3 rounded-full border border-cyan-500/50 text-cyan-400">
                    <MousePointer2 size={24} />
                  </div>
                </div>
                <p className="text-cyan-400/80 text-xs font-bold tracking-widest uppercase mb-1">解析スタンバイ</p>
                <p className="text-slate-500 text-[10px] text-center leading-tight">
                  ロケットの各パーツをタップして<br />詳細データを展開してください
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          <button 
            onClick={() => setIsLaunching(!isLaunching)}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl font-bold transition-all border-2 ${
              isLaunching ? 'bg-red-500/10 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-blue-500 hover:text-blue-400'
            }`}
          >
            <Rocket size={20} className={isLaunching ? 'animate-bounce' : ''} />
            <span className="text-[10px] uppercase tracking-tighter">{isLaunching ? '燃焼終了' : '点火'}</span>
          </button>

          <button 
            disabled={!isLaunching}
            onClick={() => setIsSeparated(true)}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl font-bold transition-all border-2 ${
              !isLaunching ? 'opacity-20 cursor-not-allowed' : 
              isSeparated ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-orange-500 hover:text-orange-400'
            }`}
          >
            <Scissors size={20} />
            <span className="text-[10px] uppercase tracking-tighter">1段目分離</span>
          </button>

          <button 
            disabled={!isSeparated}
            onClick={() => setIsDoorOpen(!isDoorOpen)}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl font-bold transition-all border-2 ${
              !isSeparated ? 'opacity-20 cursor-not-allowed' :
              isDoorOpen ? 'bg-cyan-500 text-white border-cyan-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-cyan-500 hover:text-cyan-400'
            }`}
          >
            <Maximize2 size={20} />
            <span className="text-[10px] uppercase tracking-tighter">ハッチ開閉</span>
          </button>

          <button 
            onClick={resetRocket}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl font-bold transition-all border-2 bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
          >
            <RefreshCw size={20} />
            <span className="text-[10px] uppercase tracking-tighter">リセット</span>
          </button>
        </div>
      </div>

      {/* Rocket Visualization Area */}
      <div className="relative md:w-1/2 w-full max-w-[420px] h-[680px] bg-[#0f172a] rounded-[3rem] border-4 border-slate-800 flex justify-center items-center shadow-2xl overflow-hidden">
        <div className={`absolute inset-0 transition-opacity duration-[3000ms] ${isSeparated ? 'opacity-100 bg-[#020617]' : 'opacity-0'}`} />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        {/* Status Label (Top-center) */}
        <div className="absolute top-8 left-0 right-0 flex justify-center z-30 pointer-events-none">
          <div className="flex flex-col items-center gap-1 opacity-90 font-mono text-[11px] text-cyan-400 uppercase tracking-widest animate-pulse">
            <div className="bg-slate-950/80 border border-cyan-500/40 px-5 py-2 rounded-full backdrop-blur-md shadow-xl shadow-cyan-900/20">
              {getSequenceStatus()}
            </div>
          </div>
        </div>

        <svg viewBox="0 0 240 500" className={`w-full h-full p-8 transition-all duration-[2000ms] ${isLaunching ? 'translate-y-[10px]' : 'translate-y-[40px]'}`}>
          <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <radialGradient id="igniteFlame">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#fbbf24" />
              <stop offset="80%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Stage 1 (落下アニメーション) */}
          <g className={`transition-all duration-[4000ms] ease-out ${isSeparated ? 'translate-y-[400px] opacity-0 pointer-events-none' : ''}`}>
            {isLaunching && !isSeparated && (
              <path d="M 105 440 Q 120 500 135 440 Z" fill="url(#igniteFlame)" className="animate-pulse" />
            )}
            
            {/* 1段目用パラシュート（分離時に展開） */}
            <Parachute x={120} y={235} color="#ef4444" scale={1.2} visible={isSeparated} />

            <SectionalOxidizerTank x={90} y={255} width={60} height={80} onClick={() => setActivePart(parts.find(p => p.id==='stage1-tank'))} />
            <SectionalSolidFuel x={90} y={335} width={60} height={70} onClick={() => setActivePart(parts.find(p => p.id==='stage1-fuel'))} />
            <rect x="90" y="235" width="60" height="20" fill="#1e293b" stroke="#475569" onClick={() => setActivePart(parts.find(p => p.id==='interstage'))} className="cursor-pointer" />
            
            <path 
              d="M 105 405 L 90 440 L 150 440 L 135 405 Z" 
              fill="#0f172a" stroke="#475569" 
              className="cursor-pointer hover:fill-slate-800"
              onClick={() => setActivePart(parts.find(p => p.id==='stage1-nozzle'))}
            />
            
            <g className="cursor-pointer" onClick={() => setActivePart(parts.find(p => p.id==='fins'))}>
              <path d="M 90 385 L 60 435 L 90 420 Z" fill="#bef264" fillOpacity="0.6" stroke="#65a30d" className="hover:fill-opacity-100" />
              <path d="M 150 385 L 180 435 L 150 420 Z" fill="#bef264" fillOpacity="0.6" stroke="#65a30d" className="hover:fill-opacity-100" />
            </g>
          </g>

          {/* Stage 2 */}
          <g className={`${isLaunching ? 'rocket-vibration' : ''} transition-all duration-[5000ms] ${isDoorOpen ? 'translate-y-[100px]' : ''}`}>
            {isSeparated && !isDoorOpen && (
              <path d="M 110 235 Q 120 280 130 235 Z" fill="url(#igniteFlame)" className="animate-pulse" />
            )}
            <SectionalOxidizerTank x={90} y={120} width={60} height={50} onClick={() => setActivePart(parts.find(p => p.id==='stage2-tank'))} />
            <SectionalSolidFuel x={90} y={170} width={60} height={40} onClick={() => setActivePart(parts.find(p => p.id==='stage2-fuel'))} />
            
            <path 
              d="M 105 210 L 95 235 L 145 235 L 135 210 Z" 
              fill="#1e293b" stroke="#475569" 
              className="cursor-pointer hover:fill-slate-800"
              onClick={() => setActivePart(parts.find(p => p.id==='stage2-nozzle'))}
            />
            
            <path d="M 90 50 L 90 40 Q 90 10 120 10 Q 150 10 150 40 L 150 50 Z" fill="url(#bodyGradient)" stroke="#475569" onClick={() => setActivePart(parts.find(p => p.id==='nose-cone'))} className="cursor-pointer" />
            
            {/* フェアリング内パラシュート */}
            <Parachute x={120} y={10} color="#0ea5e9" scale={1.1} visible={isDoorOpen} />
            <rect x="90" y="50" width="60" height="70" fill="#020617" stroke="#334155" />
            
            <g 
              className="cursor-pointer transition-all duration-[3000ms]"
              style={{ transform: isDoorOpen ? 'translate(110px, -80px) rotate(20deg)' : 'translate(0px, 0px)', opacity: (isSeparated || isDoorOpen) ? 1 : 0 }}
              onClick={() => setActivePart(parts.find(p => p.id==='satellite'))}
            >
              <rect x="110" y="75" width="20" height="20" rx="3" fill="#6366f1" stroke="#818cf8" />
              <rect x="102" y="82" width="36" height="6" rx="1" fill="#2dd4bf" opacity="0.8" />
              {/* ローバー用小型パラシュート */}
              <Parachute x={120} y={75} color="#fbbf24" scale={0.4} visible={isDoorOpen} />
            </g>

            <g className="cursor-pointer" onClick={() => setActivePart(parts.find(p => p.id==='payload-bay'))}>
              <rect x="90" y="50" width="12" height="70" fill="url(#bodyGradient)" />
              <rect x="138" y="50" width="12" height="70" fill="url(#bodyGradient)" />
              <rect x="102" y="50" width="36" height="70" fill="#475569" stroke="#64748b"
                style={{ transformOrigin: '138px center', transition: 'transform 1.2s', transform: isDoorOpen ? 'rotateY(-110deg)' : 'rotateY(0deg)' }}
              />
            </g>
          </g>
        </svg>
      </div>

      <style>
        {`
          .rocket-vibration { animation: vibration 0.08s infinite; }
          @keyframes vibration {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(0.5px, 0.5px); }
          }
        `}
      </style>
    </div>
  );
}
