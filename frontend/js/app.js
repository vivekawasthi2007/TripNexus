// TripNexus - Enterprise Distributed Travel Operating System
// Main Frontend Controller & State Orchestrator

// In-memory confirmed bookings state
let userBookings = [
    {
        pnr: "NX-749210",
        title: "IndiGo 6E-204 (DEL -> GOI)",
        type: "flight",
        seat: "12F (Window)",
        date: "24 Oct 2026",
        departure: "06:15 AM - New Delhi (DEL)",
        arrival: "08:45 AM - Goa (GOI)",
        passenger: "Vivek Awasthi",
        amount: 4850,
        status: "CONFIRMED",
        carbonOffset: "118 kg CO2 (Offset Certified)"
    }
];

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
    updateWalletDisplay();
    switchRole("customer");
    setSearchCategory("flights");
    renderGroupMembers();
});

// Toast notification helper
function showToast(message, type) {
    if (!type) type = "info";
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const colors = {
        success: "border-emerald-500/40 bg-emerald-950/80 text-emerald-200 shadow-emerald-500/10",
        warning: "border-amber-500/40 bg-amber-950/80 text-amber-200 shadow-amber-500/10",
        danger: "border-rose-500/40 bg-rose-950/80 text-rose-200 shadow-rose-500/10",
        info: "border-cyan-500/40 bg-cyan-950/80 text-cyan-200 shadow-cyan-500/10"
    };

    const icons = {
        success: "fa-circle-check text-emerald-400",
        warning: "fa-triangle-exclamation text-amber-400",
        danger: "fa-circle-xmark text-rose-400",
        info: "fa-circle-info text-cyan-400"
    };

    const toast = document.createElement("div");
    const colorClass = colors[type] || colors.info;
    const iconClass = icons[type] || icons.info;

    toast.className = "flex items-center space-x-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-xl text-xs font-semibold transform transition-all duration-300 translate-y-2 opacity-0 " + colorClass;
    toast.innerHTML = '<i class="fa-solid ' + iconClass + ' text-base"></i><span>' + message + '</span><button onclick="this.parentElement.remove()" class="ml-auto text-slate-400 hover:text-white pl-2"><i class="fa-solid fa-xmark"></i></button>';

    container.appendChild(toast);
    requestAnimationFrame(() => {
        toast.classList.remove("translate-y-2", "opacity-0");
    });

    setTimeout(() => {
        toast.classList.add("opacity-0", "translate-y-2");
        setTimeout(() => {
            if (toast.parentElement) toast.remove();
        }, 300);
    }, 4000);
}

// Update displayed wallet balance
function updateWalletDisplay() {
    const el = document.getElementById("walletBalanceNav");
    const modalEl = document.getElementById("walletBalanceModal");
    const formatted = "Rs." + appState.walletBalance.toLocaleString();
    if (el) el.innerText = formatted;
    if (modalEl) modalEl.innerText = formatted;
}

// Role Switcher (Customer vs Travel Agent vs Super Admin)
function switchRole(role) {
    appState.activeRole = role;
    const roleBadge = document.getElementById("currentRoleBadge");
    const agentTab = document.getElementById("tab-agent");
    const adminTab = document.getElementById("tab-admin");

    document.querySelectorAll(".role-btn").forEach(btn => {
        btn.classList.remove("bg-cyan-500", "text-slate-950", "font-bold");
        btn.classList.add("text-slate-400");
    });

    const activeBtn = document.getElementById("role-btn-" + role);
    if (activeBtn) {
        activeBtn.classList.add("bg-cyan-500", "text-slate-950", "font-bold");
        activeBtn.classList.remove("text-slate-400");
    }

    if (roleBadge) {
        if (role === "customer") {
            roleBadge.className = "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30";
            roleBadge.innerText = "Customer Mode";
            if (agentTab) agentTab.classList.add("hidden");
            if (adminTab) adminTab.classList.add("hidden");
        } else if (role === "agent") {
            roleBadge.className = "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30";
            roleBadge.innerText = "B2B Agent Mode";
            if (agentTab) agentTab.classList.remove("hidden");
            if (adminTab) adminTab.classList.add("hidden");
            switchMainTab("agent");
        } else if (role === "admin") {
            roleBadge.className = "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-300 border border-rose-500/30";
            roleBadge.innerText = "Super Admin Mode";
            if (agentTab) agentTab.classList.remove("hidden");
            if (adminTab) adminTab.classList.remove("hidden");
            switchMainTab("admin");
        }
    }

    showToast("Switched active view to: " + role.toUpperCase() + " Portal", "info");
}

// Navigation Tab Switcher
function switchMainTab(tabName) {
    const tabs = ["explore", "planner", "groups", "safety", "agent", "admin", "mybookings"];
    tabs.forEach(t => {
        const sec = document.getElementById("section-" + t);
        const navBtn = document.getElementById("nav-tab-" + t);
        if (sec) {
            sec.classList.add("hidden");
        }
        if (navBtn) {
            navBtn.classList.remove("border-cyan-400", "text-cyan-400", "bg-cyan-500/10");
            navBtn.classList.add("text-slate-400", "border-transparent");
        }
    });

    const activeSec = document.getElementById("section-" + tabName);
    const activeNav = document.getElementById("nav-tab-" + tabName);
    if (activeSec) activeSec.classList.remove("hidden");
    if (activeNav) {
        activeNav.classList.add("border-cyan-400", "text-cyan-400", "bg-cyan-500/10");
        activeNav.classList.remove("text-slate-400", "border-transparent");
    }

    if (tabName === "mybookings") {
        renderMyBookings();
    }
    if (tabName === "groups") {
        renderGroupMembers();
    }
}

// Search Category Filter (Flights / Hotels / Trains / Buses / Packages)
function setSearchCategory(category) {
    appState.currentSearchCategory = category;

    document.querySelectorAll(".cat-tab-btn").forEach(btn => {
        btn.classList.remove("bg-cyan-500/20", "text-cyan-300", "border-cyan-500/40");
        btn.classList.add("text-slate-400", "border-transparent");
    });

    const activeBtn = document.getElementById("cat-btn-" + category);
    if (activeBtn) {
        activeBtn.classList.add("bg-cyan-500/20", "text-cyan-300", "border-cyan-500/40");
        activeBtn.classList.remove("text-slate-400", "border-transparent");
    }

    const originLabel = document.getElementById("searchOriginLabel");
    const destLabel = document.getElementById("searchDestLabel");
    const originInput = document.getElementById("searchOrigin");
    const destInput = document.getElementById("searchDest");

    if (category === "hotels") {
        if (originLabel) originLabel.innerText = "Destination City / Area";
        if (destLabel) destLabel.innerText = "Hotel Grade / Brand";
        if (originInput) originInput.value = "Goa, India";
        if (destInput) destInput.value = "5-Star Beach Resorts";
    } else if (category === "packages") {
        if (originLabel) originLabel.innerText = "Tour Region";
        if (destLabel) destLabel.innerText = "Theme / Experience";
        if (originInput) originInput.value = "Goa";
        if (destInput) destInput.value = "Adventure & Eco-Tour";
    } else {
        if (originLabel) originLabel.innerText = "Departure City";
        if (destLabel) destLabel.innerText = "Arrival City";
        if (originInput) originInput.value = "New Delhi (DEL)";
        if (destInput) destInput.value = "Goa (GOI)";
    }

    executeSearch();
}

// Find item helper
function findCatalogItem(id) {
    const cats = ["flights", "hotels", "trains", "buses", "packages"];
    for (let c of cats) {
        let arr = catalogDatabase[c] || [];
        let it = arr.find(x => x.id === id);
        if (it) return it;
    }
    return null;
}

// Helper to add item to group split
function addToGroupById(id) {
    const item = findCatalogItem(id);
    if (item) {
        addToGroupTrip(item.name, item.price);
    }
}

// Render search results & live Eco-Comparator
function executeSearch() {
    const container = document.getElementById("searchResultsContainer");
    if (!container) return;

    const items = catalogDatabase[appState.currentSearchCategory] || [];
    const ecoWidget = document.getElementById("ecoComparatorWidget");

    if (ecoWidget) {
        ecoWidget.innerHTML = '<div class="glass-panel p-5 rounded-2xl border border-emerald-500/30 relative overflow-hidden mb-6">' +
            '<div class="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>' +
            '<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">' +
                '<div>' +
                    '<div class="flex items-center space-x-2">' +
                        '<span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-500/30">' +
                            '<i class="fa-solid fa-leaf mr-1"></i> Eco-Nexus Footprint Comparator' +
                        '</span>' +
                        '<span class="text-xs text-slate-400">Route: New Delhi -> Goa</span>' +
                    '</div>' +
                    '<h4 class="text-sm font-bold text-white mt-1.5">Comparative Multi-Modal Carbon Emissions (per passenger)</h4>' +
                    '<p class="text-xs text-slate-400">Choose electric trains to reduce your trip carbon impact by up to 88%.</p>' +
                '</div>' +
                '<div class="grid grid-cols-3 gap-3">' +
                    '<div class="p-2.5 rounded-xl bg-slate-900/80 border border-rose-500/20 text-center">' +
                        '<i class="fa-solid fa-plane text-rose-400 text-xs"></i>' +
                        '<div class="text-xs font-extrabold text-white mt-0.5">122 kg</div>' +
                        '<span class="text-[9px] text-slate-400">Flight Avg CO2</span>' +
                    '</div>' +
                    '<div class="p-2.5 rounded-xl bg-slate-900/80 border border-emerald-500/40 text-center relative overflow-hidden">' +
                        '<div class="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[8px] font-black px-1.5 py-0.2 rounded-bl">-88%</div>' +
                        '<i class="fa-solid fa-train text-emerald-400 text-xs"></i>' +
                        '<div class="text-xs font-extrabold text-emerald-400 mt-0.5">14.5 kg</div>' +
                        '<span class="text-[9px] text-emerald-300/80">Green Train</span>' +
                    '</div>' +
                    '<div class="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-center">' +
                        '<i class="fa-solid fa-bus text-cyan-400 text-xs"></i>' +
                        '<div class="text-xs font-extrabold text-white mt-0.5">25.0 kg</div>' +
                        '<span class="text-[9px] text-slate-400">EV Bus</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    container.innerHTML = items.map(item => {
        let detailsHtml = "";
        if (item.type === "flight") {
            detailsHtml = '<div class="flex items-center space-x-4 text-xs text-slate-300 mb-4">' +
                '<div><span class="text-white font-bold text-sm">' + item.dep + '</span> <span class="text-[10px] text-slate-400 block">' + item.from + '</span></div>' +
                '<div class="flex-1 text-center border-b border-dashed border-white/20 pb-1 relative">' +
                    '<span class="text-[10px] text-slate-400">' + item.duration + '</span>' +
                    '<i class="fa-solid fa-plane text-cyan-400 text-xs mx-1"></i>' +
                    '<span class="text-[9px] text-emerald-400 font-bold block">Non-Stop</span>' +
                '</div>' +
                '<div><span class="text-white font-bold text-sm">' + item.arr + '</span> <span class="text-[10px] text-slate-400 block">' + item.to + '</span></div>' +
            '</div>';
        } else if (item.type === "hotel") {
            detailsHtml = '<p class="text-xs text-slate-300 mb-1"><i class="fa-solid fa-location-dot text-rose-400 mr-1.5"></i>' + item.location + '</p>' +
                '<p class="text-[11px] text-slate-400 mb-4"><i class="fa-solid fa-bell-concierge text-amber-400 mr-1.5"></i>' + item.amenities + '</p>';
        } else if (item.type === "train" || item.type === "bus") {
            const icon = item.type === "train" ? "fa-train text-emerald-400" : "fa-bus text-cyan-400";
            detailsHtml = '<div class="flex items-center space-x-4 text-xs text-slate-300 mb-4">' +
                '<div><span class="text-white font-bold">' + item.dep + '</span> <span class="text-[10px] text-slate-400 block">' + item.from + '</span></div>' +
                '<div class="flex-1 text-center border-b border-dashed border-white/20 pb-1">' +
                    '<span class="text-[10px] text-slate-400">' + item.duration + '</span>' +
                    '<i class="fa-solid ' + icon + ' text-xs mx-1"></i>' +
                '</div>' +
                '<div><span class="text-white font-bold">' + item.arr + '</span> <span class="text-[10px] text-slate-400 block">' + item.to + '</span></div>' +
            '</div>';
        } else if (item.type === "package") {
            detailsHtml = '<p class="text-xs text-slate-300 mb-1"><i class="fa-solid fa-map-location-dot text-indigo-400 mr-1.5"></i>' + item.location + ' - <span class="text-cyan-400 font-bold">' + item.duration + '</span></p>' +
                '<p class="text-[11px] text-slate-400 mb-4"><i class="fa-solid fa-star text-amber-400 mr-1.5"></i>' + item.amenities + '</p>';
        }

        const co2Color = item.ecoCo2 < 30 ? "bg-emerald-400" : "bg-amber-400";
        const co2TextColor = item.ecoCo2 < 30 ? "text-emerald-300" : "text-slate-300";

        return '<div class="glass-panel rounded-2xl p-5 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/5 group flex flex-col justify-between">' +
            '<div>' +
                '<div class="flex items-start justify-between mb-3">' +
                    '<div>' +
                        '<div class="flex items-center space-x-2">' +
                            '<span class="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-white/5 border border-white/10 text-white">' + (item.tag || "Verified") + '</span>' +
                            '<span class="flex items-center text-amber-400 text-xs font-bold">' +
                                '<i class="fa-solid fa-star text-[10px] mr-1"></i>' + item.rating +
                            '</span>' +
                        '</div>' +
                        '<h3 class="text-base font-extrabold text-white mt-1 group-hover:text-cyan-400 transition">' + item.name + '</h3>' +
                    '</div>' +
                    '<div class="text-right">' +
                        '<span class="text-[10px] text-slate-400 block">Starting from</span>' +
                        '<span class="text-xl font-black text-white font-mono">Rs.' + item.price.toLocaleString() + '</span>' +
                        '<span class="text-[10px] text-emerald-400 block font-semibold">' + (item.refundable ? "Free Cancellation" : "Non-Refundable") + '</span>' +
                    '</div>' +
                '</div>' +
                detailsHtml +
            '</div>' +
            '<div class="pt-3 border-t border-white/10 flex items-center justify-between mt-auto">' +
                '<div class="flex items-center space-x-1.5">' +
                    '<span class="w-2 h-2 rounded-full ' + co2Color + '"></span>' +
                    '<span class="text-[11px] font-semibold ' + co2TextColor + '">' +
                        item.ecoCo2 + ' kg CO2 - <span class="text-[10px] text-slate-400">' + item.ecoTier + '</span>' +
                    '</span>' +
                '</div>' +
                '<div class="flex items-center space-x-2">' +
                    '<button data-id="' + item.id + '" title="Add to Group Trip Split Ledger" class="btn-add-group p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 text-xs transition border border-white/5">' +
                        '<i class="fa-solid fa-user-group"></i>' +
                    '</button>' +
                    '<button data-id="' + item.id + '" class="btn-book-now px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs transition shadow-lg shadow-cyan-500/20">' +
                        'Book Now' +
                    '</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    }).join("");
}

// Booking Modal Controls
function openBookingModal(itemId) {
    const item = findCatalogItem(itemId);
    if (!item) return;

    appState.selectedItemForBooking = item;
    const modal = document.getElementById("bookingModal");
    const summary = document.getElementById("bookingModalSummary");

    const tax = Math.round(item.price * 0.05);
    const total = item.price + tax;
    const routeText = item.from ? (item.from + " -> " + item.to) : (item.location || "Custom Tour");

    if (summary) {
        summary.innerHTML = '<div class="p-4 rounded-xl bg-slate-900/80 border border-white/10 mb-4">' +
            '<div class="flex items-center justify-between mb-2">' +
                '<span class="text-xs text-cyan-400 font-bold uppercase tracking-wider">' + item.type.toUpperCase() + ' BOOKING</span>' +
                '<span class="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">100% Guaranteed</span>' +
            '</div>' +
            '<h3 class="text-base font-bold text-white">' + item.name + '</h3>' +
            '<p class="text-xs text-slate-400">' + routeText + '</p>' +
            '<div class="mt-3 pt-3 border-t border-white/10 text-xs space-y-1 text-slate-300">' +
                '<div class="flex justify-between">' +
                    '<span>Base Fare</span>' +
                    '<span class="font-mono">Rs.' + item.price.toLocaleString() + '</span>' +
                '</div>' +
                '<div class="flex justify-between">' +
                    '<span>GST & Airport/Infra Taxes (5%)</span>' +
                    '<span class="font-mono">Rs.' + tax.toLocaleString() + '</span>' +
                '</div>' +
                '<div class="flex justify-between font-bold text-white text-sm pt-1 border-t border-white/10">' +
                    '<span>Total Payable</span>' +
                    '<span class="font-mono text-cyan-400 font-black">Rs.' + total.toLocaleString() + '</span>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    if (modal) {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    }
}

function closeBookingModal() {
    const modal = document.getElementById("bookingModal");
    if (modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    }
}

function selectPaymentMethod(method) {
    appState.selectedPaymentMethod = method;
    document.querySelectorAll(".pay-option").forEach(opt => {
        opt.classList.remove("border-cyan-400", "bg-cyan-500/10");
        opt.classList.add("border-white/10");
    });

    const activeOpt = document.getElementById("pay-opt-" + method);
    if (activeOpt) {
        activeOpt.classList.add("border-cyan-400", "bg-cyan-500/10");
        activeOpt.classList.remove("border-white/10");
    }
}

function confirmBooking() {
    const item = appState.selectedItemForBooking;
    if (!item) return;

    const total = Math.round(item.price * 1.05);

    if (appState.selectedPaymentMethod === "wallet") {
        if (appState.walletBalance < total) {
            showToast("Insufficient Nexus Wallet balance! Please top-up or select UPI.", "danger");
            return;
        }
        appState.walletBalance -= total;
        updateWalletDisplay();
    }

    const randomPnr = "NX-" + Math.floor(100000 + Math.random() * 900000);
    const newBooking = {
        pnr: randomPnr,
        title: item.name,
        type: item.type,
        seat: item.type === "flight" ? "14A (Window)" : (item.type === "train" ? "Coach B3 - Berth 24" : "Reserved Deluxe"),
        date: "28 Oct 2026",
        departure: item.from ? ((item.dep || "08:00 AM") + " - " + item.from) : (item.location || "Check-in: 02:00 PM"),
        arrival: item.to ? ((item.arr || "11:00 AM") + " - " + item.to) : "Check-out: 11:00 AM",
        passenger: "Vivek Awasthi",
        amount: total,
        status: "CONFIRMED",
        carbonOffset: (item.ecoCo2 || 45) + " kg CO2 (Certified by GreenNexus)"
    };

    userBookings.unshift(newBooking);
    closeBookingModal();
    showToast("Payment of Rs." + total.toLocaleString() + " Verified! PNR: " + randomPnr, "success");
    openTicketModal(newBooking);
}

// Digital Boarding Pass / Ticket Modal
function openTicketModal(booking) {
    const modal = document.getElementById("ticketModal");
    const content = document.getElementById("ticketModalContent");
    if (!modal || !content) return;

    content.innerHTML = '<div class="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl">' +
        '<div class="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>' +
        '<div class="flex items-center justify-between border-b border-white/10 pb-4 mb-6">' +
            '<div class="flex items-center space-x-3">' +
                '<div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-lg">' +
                    '<i class="fa-solid fa-compass"></i>' +
                '</div>' +
                '<div>' +
                    '<h3 class="font-extrabold text-base tracking-wide">TRIPNEXUS DIGITAL BOARDING PASS</h3>' +
                    '<p class="text-[10px] text-cyan-400 font-mono font-bold tracking-widest">AMADEUS & IATA COMPLIANT</p>' +
                '</div>' +
            '</div>' +
            '<div class="text-right">' +
                '<span class="text-[10px] text-slate-400 block uppercase">Booking Reference</span>' +
                '<span class="text-base font-black font-mono text-cyan-400 tracking-wider">' + booking.pnr + '</span>' +
            '</div>' +
        '</div>' +
        '<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-xs">' +
            '<div>' +
                '<span class="text-slate-400 block text-[10px] uppercase">Passenger</span>' +
                '<span class="font-bold text-white text-sm">' + booking.passenger + '</span>' +
            '</div>' +
            '<div>' +
                '<span class="text-slate-400 block text-[10px] uppercase">Assigned Seat/Room</span>' +
                '<span class="font-bold text-amber-400 text-sm font-mono">' + booking.seat + '</span>' +
            '</div>' +
            '<div>' +
                '<span class="text-slate-400 block text-[10px] uppercase">Travel Date</span>' +
                '<span class="font-bold text-white text-sm">' + booking.date + '</span>' +
            '</div>' +
            '<div>' +
                '<span class="text-slate-400 block text-[10px] uppercase">Status</span>' +
                '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">' +
                    '<i class="fa-solid fa-circle-check mr-1"></i> ' + booking.status +
                '</span>' +
            '</div>' +
        '</div>' +
        '<div class="p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-6">' +
            '<div class="text-xs text-cyan-400 font-bold mb-2">' + booking.title + '</div>' +
            '<div class="flex flex-col sm:flex-row justify-between text-xs text-slate-300 gap-2">' +
                '<div><i class="fa-solid fa-arrow-up-from-bracket text-emerald-400 mr-1.5"></i><span class="font-bold text-white">DEP:</span> ' + booking.departure + '</div>' +
                '<div><i class="fa-solid fa-arrow-down-to-bracket text-cyan-400 mr-1.5"></i><span class="font-bold text-white">ARR:</span> ' + booking.arrival + '</div>' +
            '</div>' +
        '</div>' +
        '<div class="flex flex-col sm:flex-row items-center justify-between border-t border-dashed border-white/20 pt-4 gap-4">' +
            '<div class="text-left">' +
                '<span class="text-[10px] text-emerald-400 font-bold block"><i class="fa-solid fa-leaf mr-1"></i>' + booking.carbonOffset + '</span>' +
                '<p class="text-[10px] text-slate-500">Show this digital QR pass at security checkpoint or hotel front desk.</p>' +
            '</div>' +
            '<div class="flex items-center space-x-3 bg-white p-2 rounded-xl text-slate-950">' +
                '<div class="w-12 h-12 flex items-center justify-center font-black text-2xl">' +
                    '<i class="fa-solid fa-qrcode text-3xl"></i>' +
                '</div>' +
                '<div class="text-left text-[9px] font-mono leading-tight">' +
                    '<p class="font-bold">SECURE PASS</p>' +
                    '<p>' + booking.pnr + '</p>' +
                    '<p>VERIFIED ?</p>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';

    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function closeTicketModal() {
    const modal = document.getElementById("ticketModal");
    if (modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    }
}

// View pass by PNR
function viewBookingPass(pnr) {
    const b = userBookings.find(x => x.pnr === pnr);
    if (b) openTicketModal(b);
}

// Claim Instant Refund on Disrupted Travel
function claimDisruptionRefund() {
    const refundAmt = 4850;
    appState.walletBalance += refundAmt;
    updateWalletDisplay();

    const banner = document.getElementById("disruptionBanner");
    if (banner) banner.style.display = "none";

    showToast("Rs." + refundAmt.toLocaleString() + " credited back to Nexus Wallet! 100% Auto-Refund Complete.", "success");
}

// Render Confirmed User Bookings Tab
function renderMyBookings() {
    const container = document.getElementById("myBookingsList");
    if (!container) return;

    if (userBookings.length === 0) {
        container.innerHTML = '<div class="glass-panel rounded-2xl p-12 text-center border border-white/10">' +
            '<i class="fa-solid fa-suitcase-rolling text-4xl text-slate-600 mb-3"></i>' +
            '<h4 class="text-base font-bold text-white">No active trips yet</h4>' +
            '<p class="text-xs text-slate-400 mt-1">Book your next flight, luxury stay, or eco-rail adventure!</p>' +
            '<button class="btn-switch-explore mt-4 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl transition">' +
                'Explore Inventory' +
            '</button>' +
        '</div>';
        return;
    }

    container.innerHTML = userBookings.map(b => {
        return '<div class="glass-panel rounded-2xl p-5 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">' +
            '<div class="space-y-1">' +
                '<div class="flex items-center space-x-2">' +
                    '<span class="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-cyan-500/20 text-cyan-300 font-mono">' + b.pnr + '</span>' +
                    '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">' + b.status + '</span>' +
                    '<span class="text-xs text-slate-400">' + b.date + '</span>' +
                '</div>' +
                '<h4 class="text-base font-extrabold text-white">' + b.title + '</h4>' +
                '<p class="text-xs text-slate-300">' + b.departure + ' -> ' + b.arrival + '</p>' +
                '<p class="text-[10px] text-emerald-400"><i class="fa-solid fa-leaf mr-1"></i>' + b.carbonOffset + '</p>' +
            '</div>' +
            '<div class="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-white/10">' +
                '<div class="text-right mr-2">' +
                    '<span class="text-[10px] text-slate-400 block">Total Paid</span>' +
                    '<span class="text-base font-bold text-white font-mono">Rs.' + b.amount.toLocaleString() + '</span>' +
                '</div>' +
                '<button data-pnr="' + b.pnr + '" class="btn-view-pass px-3.5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 text-xs font-bold transition flex items-center space-x-1.5">' +
                    '<i class="fa-solid fa-ticket"></i>' +
                    '<span>View Pass</span>' +
                '</button>' +
            '</div>' +
        '</div>';
    }).join("");
}

// Event delegation for booking & group buttons
document.addEventListener("click", function(e) {
    const exploreBtn = e.target.closest(".btn-switch-explore");
    if (exploreBtn) {
        switchMainTab("explore");
        return;
    }
    const bookBtn = e.target.closest(".btn-book-now");
    if (bookBtn) {
        const id = bookBtn.getAttribute("data-id");
        openBookingModal(id);
        return;
    }
    const groupBtn = e.target.closest(".btn-add-group");
    if (groupBtn) {
        const id = groupBtn.getAttribute("data-id");
        addToGroupById(id);
        return;
    }
    const passBtn = e.target.closest(".btn-view-pass");
    if (passBtn) {
        const pnr = passBtn.getAttribute("data-pnr");
        viewBookingPass(pnr);
        return;
    }
});
