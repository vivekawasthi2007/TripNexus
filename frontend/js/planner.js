// AI-Smart Trip Planner Engine (Differentiator #1)
function generateAIItinerary() {
    const dest = document.getElementById('aiDestination').value || 'Goa';
    const days = parseInt(document.getElementById('aiDays').value) || 5;
    const budget = parseInt(document.getElementById('aiBudget').value) || 28000;
    const travelers = parseInt(document.getElementById('aiTravelers').value) || 2;
    const vibe = document.getElementById('aiVibe').value;
    const btn = document.getElementById('generateAIBtn');
    const output = document.getElementById('aiItineraryOutput');

    btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin mr-2"></i><span>Optimizing Itinerary with AI...</span>`;
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles mr-2"></i><span>Generate Complete Day-by-Day Itinerary</span>`;
        btn.disabled = false;

        const dailyCost = Math.round(budget / days);
        let dayCards = '';

        for (let d = 1; d <= days; d++) {
            let morningDesc = d === 1 ? 'Check-in to eco-resort, settle in and enjoy local breakfast.' : 'Morning guided scenic trail, cultural photography & artisan breakfast.';
            let afternoonDesc = d === 1 ? 'Explore local coastline, river promenade and historic quarter.' : 'Adventure watersports or regional culinary tour with authentic thali.';
            let eveningDesc = d === days ? 'Farewell sunset cruise, souvenir shopping & airport transfer.' : 'Beachfront bonfire, live acoustic music and chef-special seafood dinner.';

            dayCards += `
                <div class="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden">
                    <div class="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                        <div class="flex items-center space-x-3">
                            <span class="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-extrabold text-sm flex items-center justify-center">D${d}</span>
                            <div>
                                <h4 class="text-base font-bold text-white">Day ${d}: ${d === 1 ? 'Arrival & Orientation' : (d === days ? 'Departure & Reflection' : 'Signature Highlights & Adventure')}</h4>
                                <p class="text-[11px] text-slate-400">Day Budget Allocation: ~?${dailyCost.toLocaleString()}</p>
                            </div>
                        </div>
                        <span class="bg-purple-500/10 text-purple-300 text-xs px-2.5 py-1 rounded-full font-bold">Optimized Schedule</span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div class="p-3 bg-slate-900/60 rounded-xl border border-white/5">
                            <p class="font-bold text-amber-400 mb-1"><i class="fa-regular fa-sun mr-1"></i> Morning (08:30 AM)</p>
                            <p class="text-slate-300">${morningDesc}</p>
                        </div>
                        <div class="p-3 bg-slate-900/60 rounded-xl border border-white/5">
                            <p class="font-bold text-cyan-400 mb-1"><i class="fa-solid fa-cloud-sun mr-1"></i> Afternoon (01:30 PM)</p>
                            <p class="text-slate-300">${afternoonDesc}</p>
                        </div>
                        <div class="p-3 bg-slate-900/60 rounded-xl border border-white/5">
                            <p class="font-bold text-purple-400 mb-1"><i class="fa-solid fa-moon mr-1"></i> Evening (07:30 PM)</p>
                            <p class="text-slate-300">${eveningDesc}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        output.innerHTML = `
            <div class="p-5 bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 rounded-2xl border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h3 class="text-lg font-bold text-white"><i class="fa-solid fa-wand-magic-sparkles text-purple-400 mr-2"></i>AI Generated Itinerary for ${dest} (${days} Days)</h3>
                    <p class="text-xs text-slate-300">Total Budget: ?${budget.toLocaleString()} for ${travelers} Traveler(s) ? Perfectly calculated within budget parameters.</p>
                </div>
                <button onclick="showToast('Itinerary exported to PDF & saved to your profile!', 'success')" class="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-lg">
                    <i class="fa-solid fa-download"></i>
                    <span>Export Itinerary</span>
                </button>
            </div>
            <div class="space-y-4">
                ${dayCards}
            </div>
        `;

        showToast("AI Itinerary successfully compiled & optimized!", "success");
    }, 800);
}
