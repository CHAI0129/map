/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map as MapIcon, 
  MapPin, 
  Navigation, 
  BookOpen, 
  Award, 
  ChevronRight, 
  X, 
  Info, 
  Camera, 
  Star,
  CheckCircle2,
  Clock,
  ArrowRight,
  Share2
} from 'lucide-react';
import { SPOTS, ROUTES, Spot, Route } from './data';

// --- Components ---

const Header = () => (
  <header className="p-4 flex justify-between items-center bg-heritage-paper/80 backdrop-blur-md sticky top-0 z-50">
    <div>
      <h1 className="text-xl font-serif font-bold text-heritage-red leading-tight">枫桥遗韵</h1>
      <p className="text-[10px] uppercase tracking-widest text-heritage-ink/50">Maple Bridge Heritage</p>
    </div>
    <div className="flex gap-2">
      <button className="p-2 rounded-full bg-white shadow-sm border border-heritage-ink/5">
        <Info className="w-5 h-5 text-heritage-teal" />
      </button>
    </div>
  </header>
);

const InteractiveMap = ({ onSelectSpot, selectedId, visitedIds }: { 
  onSelectSpot: (spot: Spot) => void, 
  selectedId: string | null,
  visitedIds: string[]
}) => {
  return (
    <div className="relative w-full h-[350px] bg-[#E8E2D2] rounded-3xl overflow-hidden shadow-inner border-2 border-white/50">
      {/* Abstract Map Background (Simplified SVG) */}
      <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.1" strokeOpacity="0.1" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        {/* River */}
        <path d="M 20 0 Q 30 50 20 100" fill="none" stroke="#2D5A5A" strokeWidth="12" strokeOpacity="0.2" />
        <path d="M 25 30 L 100 60" fill="none" stroke="#2D5A5A" strokeWidth="8" strokeOpacity="0.2" />
      </svg>
      
      <div className="absolute inset-0 map-gradient pointer-events-none" />

      {/* Spot Pins */}
      {SPOTS.map((spot) => (
        <motion.button
          key={spot.id}
          id={`pin-${spot.id}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: [0, -4, 0] }}
          transition={{ delay: 0.2, duration: 2, repeat: Infinity }}
          onClick={() => onSelectSpot(spot)}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
          style={{ left: `${spot.coordinates.x}%`, top: `${spot.coordinates.y}%` }}
        >
          <div className="relative">
            <div className={`p-2 rounded-full transition-all duration-300 ${
              selectedId === spot.id 
                ? 'bg-heritage-red scale-125' 
                : visitedIds.includes(spot.id)
                  ? 'bg-heritage-teal'
                  : 'bg-white'
            } shadow-lg shadow-black/10`}>
              {visitedIds.includes(spot.id) ? (
                <CheckCircle2 className={`w-5 h-5 ${selectedId === spot.id ? 'text-white' : 'text-white'}`} />
              ) : (
                <MapPin className={`w-5 h-5 ${selectedId === spot.id ? 'text-white' : 'text-heritage-red'}`} />
              )}
            </div>
            {selectedId === spot.id && (
              <motion.div 
                layoutId="pulse"
                className="absolute inset-0 rounded-full bg-heritage-red/30"
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </div>
          <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold uppercase bg-white/90 px-1.5 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
            {spot.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

const SpotDrawer = ({ spot, onClose, onVisit }: { spot: Spot | null, onClose: () => void, onVisit: (id: string) => void }) => {
  if (!spot) return null;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed bottom-0 left-0 right-0 z-[60] bg-white rounded-t-[32px] shadow-2xl max-h-[85vh] overflow-y-auto"
    >
      <div className="sticky top-0 bg-white pt-4 pb-2 px-6 border-b border-heritage-ink/5">
        <div className="w-12 h-1 bg-heritage-ink/10 rounded-full mx-auto mb-4" onClick={onClose} />
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-serif font-bold text-heritage-ink">{spot.name}</h2>
            <p className="text-heritage-teal font-medium text-sm">{spot.title}</p>
          </div>
          <button onClick={onClose} className="p-1.25 bg-heritage-paper rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9]">
          <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white flex items-center gap-2">
            <Camera className="w-4 h-4" />
            <span className="text-xs uppercase tracking-tighter">View Site Gallery</span>
          </div>
        </div>

        <div className="space-y-4">
          <section>
            <h3 className="text-xs uppercase tracking-wider text-heritage-ink/40 font-bold mb-2 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" /> Discovery Chunks
            </h3>
            <p className="text-heritage-ink/80 leading-relaxed text-sm">
              {spot.history}
            </p>
          </section>

          {spot.poetry && (
            <section className="bg-heritage-paper p-5 rounded-2xl border border-heritage-red/10 relative overflow-hidden">
               <div className="absolute -right-4 -bottom-4 opacity-5">
                 <BookOpen className="w-24 h-24" />
               </div>
               <h3 className="text-[10px] uppercase font-bold text-heritage-red/60 mb-3 block">Cultural Whisper</h3>
               <p className="font-serif text-lg text-heritage-ink whitespace-pre-line mb-3 leading-snug">
                 {spot.poetry.text}
               </p>
               <p className="text-xs text-heritage-ink/40 italic">— {spot.poetry.author}</p>
               <div className="mt-4 pt-4 border-t border-heritage-red/5">
                 <p className="text-xs text-heritage-teal italic leading-normal">"{spot.poetry.translation}"</p>
               </div>
            </section>
          )}

          <div className="flex gap-3">
            <button 
              onClick={() => { onVisit(spot.id); onClose(); }}
              className="flex-1 bg-heritage-red text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <CheckCircle2 className="w-5 h-5" />
              I am here
            </button>
            <button className="w-14 bg-heritage-paper border border-heritage-ink/5 rounded-xl flex items-center justify-center text-heritage-ink/60">
              <Navigation className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const RouteCard = ({ route, onSelect }: { route: Route, onSelect: (route: Route) => void }) => (
  <button 
    onClick={() => onSelect(route)}
    className="w-full text-left bg-white p-4 rounded-2xl border border-heritage-ink/5 shadow-sm group active:scale-[0.98] transition-all"
  >
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-serif font-bold text-lg text-heritage-ink group-hover:text-heritage-red transition-colors">{route.name}</h3>
      <span className="text-[10px] font-bold bg-heritage-teal/10 text-heritage-teal px-2 py-1 rounded-full flex items-center gap-1">
        <Clock className="w-3 h-3" /> {route.duration}
      </span>
    </div>
    <p className="text-xs text-heritage-ink/60 mb-3">{route.description}</p>
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {route.stops.slice(0, 3).map((stopId, i) => (
          <div key={stopId} className="w-6 h-6 rounded-full bg-heritage-paper border-2 border-white flex items-center justify-center">
            <span className="text-[8px] font-bold">{i + 1}</span>
          </div>
        ))}
      </div>
      <span className="text-[10px] text-heritage-ink/40 font-medium">{route.stops.length} key spots</span>
      <ArrowRight className="w-3.5 h-3.5 ml-auto text-heritage-teal group-hover:translate-x-1 transition-transform" />
    </div>
  </button>
);

const VisitSummary = ({ visitedIds, onClose }: { visitedIds: string[], onClose: () => void }) => {
  const visitedSpots = SPOTS.filter(s => visitedIds.includes(s.id));
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] bg-heritage-paper p-6 overflow-y-auto"
    >
      <div className="max-w-md mx-auto space-y-8 py-8">
        <div className="text-center space-y-2">
          <div className="w-20 h-20 bg-heritage-red rounded-full flex items-center justify-center mx-auto shadow-xl shadow-heritage-red/20 mb-4">
            <Star className="text-white w-10 h-10" />
          </div>
          <h2 className="text-3xl font-serif font-bold">Visit Summary</h2>
          <p className="text-heritage-teal font-medium uppercase tracking-[3px] text-xs">Fengqiao Reflections</p>
        </div>

        <section className="bg-white p-6 rounded-3xl shadow-lg shadow-black/5 space-y-4">
          <div className="flex items-center justify-between text-xs text-heritage-ink/40 font-bold uppercase tracking-widest">
            <span>Exploration Progress</span>
            <span>{visitedSpots.length} / {SPOTS.length}</span>
          </div>
          <div className="w-full h-2 bg-heritage-paper rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(visitedIds.length / SPOTS.length) * 100}%` }}
              className="h-full bg-heritage-red"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3 pt-2">
            {visitedSpots.map(spot => (
              <div key={spot.id} className="flex flex-col items-center p-3 bg-heritage-paper rounded-xl border border-heritage-ink/5">
                <CheckCircle2 className="w-5 h-5 text-heritage-teal mb-2" />
                <span className="text-[10px] font-bold text-center leading-tight">{spot.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-heritage-ink text-white p-6 rounded-3xl space-y-4">
          <div className="flex gap-2 mb-2">
            <Award className="w-6 h-6 text-orange-400" />
            <h3 className="font-serif text-xl">Journey Achievements</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="p-1 rounded bg-white/10"><CheckCircle2 className="w-4 h-4" /></div>
              <span className="text-sm">Found Hanshan's Anchor</span>
            </li>
            <li className="flex items-center gap-3 opacity-50">
              <div className="p-1 rounded bg-white/10"><Clock className="w-4 h-4" /></div>
              <span className="text-sm">Midnight Caller (Unlock at 00:00)</span>
            </li>
          </ul>
        </section>

        <div className="flex gap-3">
          <button className="flex-1 bg-heritage-red text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" /> Share Memory
          </button>
          <button 
            onClick={onClose}
            className="flex-1 bg-white border border-heritage-ink/10 py-4 rounded-2xl font-bold"
          >
            Finish Visit
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [visitedIds, setVisitedIds] = useState<string[]>([]);
  const [activeRoute, setActiveRoute] = useState<Route | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [activeTab, setActiveTab] = useState<'explore' | 'routes' | 'profile'>('explore');

  const handleVisitSpot = (id: string) => {
    if (!visitedIds.includes(id)) {
      setVisitedIds([...visitedIds, id]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-heritage-paper max-w-lg mx-auto shadow-2xl relative shadow-black/10 overflow-x-hidden">
      <Header />

      <main className="flex-1 pb-24">
        {activeTab === 'explore' && (
          <div className="p-4 space-y-6">
            <section className="space-y-3">
              <div className="flex justify-between items-end px-1">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-heritage-ink">On Site</h2>
                  <p className="text-xs text-heritage-ink/50">Your heritage coordinates</p>
                </div>
                <button className="bg-heritage-teal/10 text-heritage-teal px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                  <Navigation className="w-3 h-3" />
                  ENABLE GPS
                </button>
              </div>
              <InteractiveMap 
                onSelectSpot={setSelectedSpot} 
                selectedId={selectedSpot?.id || null}
                visitedIds={visitedIds}
              />
            </section>

            <section className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h2 className="text-xl font-serif font-bold text-heritage-ink">Missions</h2>
                <span className="text-[10px] font-bold text-heritage-red uppercase tracking-widest bg-heritage-red/5 px-2 py-1 rounded">3 Active</span>
              </div>
              <div className="bg-white border border-heritage-ink/5 rounded-2xl p-4 flex gap-4 items-center shadow-sm">
                <div className="w-12 h-12 bg-heritage-paper rounded-xl flex items-center justify-center text-heritage-red">
                  <Award className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold">Poetry Collector</h4>
                  <p className="text-[10px] text-heritage-ink/50">Visit 3 bridges to unlock the exclusive hidden verse card.</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-heritage-teal">{visitedIds.length}/3</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'routes' && (
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="p-4 space-y-4"
          >
            <div className="px-1 mb-6">
              <h2 className="text-3xl font-serif font-bold text-heritage-ink">Curated Routes</h2>
              <p className="text-heritage-ink/50 text-sm">Guided walks through history & soul.</p>
            </div>
            {ROUTES.map(route => (
              <RouteCard 
                key={route.id} 
                route={route} 
                onSelect={(r) => { 
                  setActiveRoute(r); 
                  setActiveTab('explore');
                  // Optional: Focus the map on the first stop
                  const firstSpot = SPOTS.find(s => s.id === r.stops[0]);
                  if (firstSpot) setSelectedSpot(firstSpot);
                }} 
              />
            ))}
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 space-y-6"
          >
            <div className="bg-heritage-ink text-white p-6 rounded-3xl space-y-4">
               <div className="flex items-center gap-4">
                 <div className="w-16 h-16 rounded-full bg-heritage-paper flex items-center justify-center text-heritage-ink font-bold text-2xl border-4 border-heritage-red">
                   M
                 </div>
                 <div>
                   <h3 className="text-xl font-serif">Heritage Explorer</h3>
                   <p className="text-xs text-white/50">Level 4 Scholar</p>
                 </div>
               </div>
               <div className="pt-4 border-t border-white/10 flex justify-between">
                 <div className="text-center">
                   <p className="text-lg font-bold">{visitedIds.length}</p>
                   <p className="text-[10px] uppercase text-white/40">Spots</p>
                 </div>
                 <div className="text-center">
                   <p className="text-lg font-bold">12</p>
                   <p className="text-[10px] uppercase text-white/40">Stories</p>
                 </div>
                 <div className="text-center">
                   <p className="text-lg font-bold">850</p>
                   <p className="text-[10px] uppercase text-white/40">Points</p>
                 </div>
               </div>
            </div>

            <section className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-widest text-heritage-ink/40">Recent Highlights</h3>
              <div className="grid grid-cols-2 gap-4">
                 {[1, 2].map(i => (
                   <div key={i} className="aspect-square rounded-2xl bg-white border border-heritage-ink/5 overflow-hidden relative group">
                      <img src={SPOTS[i].image} alt="pic" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 group-active:bg-black/40 transition-colors" />
                      <Star className="absolute top-2 right-2 w-4 h-4 text-white fill-white" />
                   </div>
                 ))}
              </div>
            </section>

            <button 
              onClick={() => setShowSummary(true)}
              className="w-full border-2 border-heritage-teal text-heritage-teal py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-heritage-teal hover:text-white transition-colors"
            >
              <BookOpen className="w-5 h-5" /> View Travel Log
            </button>
          </motion.div>
        )}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white/95 backdrop-blur-xl border-t border-heritage-ink/5 pt-3 pb-8 px-8 z-[50]">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setActiveTab('explore')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'explore' ? 'text-heritage-red' : 'text-heritage-ink/30'}`}
          >
            <MapIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase">Explore</span>
          </button>
          <button 
            onClick={() => setActiveTab('routes')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'routes' ? 'text-heritage-red' : 'text-heritage-ink/30'}`}
          >
            <Navigation className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase">Routes</span>
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-heritage-red' : 'text-heritage-ink/30'}`}
          >
            <Award className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase">Heritage</span>
          </button>
        </div>
      </nav>

      {/* Floating CTA Overlay */}
      {activeTab === 'explore' && !selectedSpot && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute bottom-28 left-0 right-0 px-6 z-40 pointer-events-none"
        >
          <div className="bg-heritage-ink text-white p-4 rounded-2xl flex items-center justify-between shadow-xl shadow-black/20 pointer-events-auto">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <p className="text-[11px] font-bold">Nearest: Maple Bridge (20m)</p>
            </div>
            <button 
              onClick={() => setSelectedSpot(SPOTS[0])}
              className="bg-white text-heritage-ink px-4 py-2 rounded-lg text-[11px] font-bold flex items-center gap-1"
            >
              START VISIT <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Overlays */}
      <AnimatePresence>
        {selectedSpot && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSpot(null)}
              className="fixed inset-0 bg-black/40 z-[55] backdrop-blur-[2px]"
            />
            <SpotDrawer 
              spot={selectedSpot} 
              onClose={() => setSelectedSpot(null)} 
              onVisit={handleVisitSpot}
            />
          </>
        )}
        {showSummary && (
          <VisitSummary visitedIds={visitedIds} onClose={() => setShowSummary(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
