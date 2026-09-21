// Group Trip & Split Payment Management (Differentiator #2)
function renderGroupMembers() {
    const list = document.getElementById('groupMembersList');
    if (!list) return;

    const paidCount = groupMembers.filter(m => m.paid).length;
    const totalAmount = groupMembers.reduce((sum, m) => sum + m.amount, 0);
    const collectedAmount = groupMembers.filter(m => m.paid).reduce((sum, m) => sum + m.amount, 0);
    const percent = Math.round((collectedAmount / totalAmount) * 100);

    const progressBar = document.getElementById('groupProgressBar');
    const progressPercent = document.getElementById('groupProgressPercent');

    if (progressBar) progressBar.style.width = percent + '%';
    if (progressPercent) progressPercent.innerText = `${percent}% Collected (?${collectedAmount.toLocaleString()} / ?${totalAmount.toLocaleString()})`;

    list.innerHTML = groupMembers.map(m => `
        <tr class="hover:bg-white/[0.02] transition">
            <td class="py-3 px-2 font-bold text-white flex items-center space-x-2">
                <div class="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 font-bold text-xs">${m.name[0]}</div>
                <div>
                    <span>${m.name}</span>
                    <p class="text-[9px] text-slate-400 font-normal">${m.role}</p>
                </div>
            </td>
            <td class="py-3 px-2 font-mono font-bold text-slate-200">?${m.amount.toLocaleString()}</td>
            <td class="py-3 px-2">
                ${m.paid ? 
                    `<span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] px-2.5 py-0.5 rounded-full font-bold">PAID ?</span>` :
                    `<span class="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] px-2.5 py-0.5 rounded-full font-bold">PENDING ?</span>`}
            </td>
            <td class="py-3 px-2 text-right">
                ${!m.paid ? 
                    `<button onclick="toggleMemberPaid(${m.id})" class="px-2.5 py-1 bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 rounded-lg text-[10px] font-bold mr-1">Mark Paid</button>
                     <button onclick="showToast('Payment reminder dispatched via SMS to ${m.name}!', 'info')" class="px-2.5 py-1 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-[10px] font-bold">Remind ??</button>` :
                    `<span class="text-slate-500 text-[11px]"><i class="fa-solid fa-circle-check text-emerald-500 mr-1"></i>Settled</span>`}
            </td>
        </tr>
    `).join('');
}

function toggleMemberPaid(id) {
    const member = groupMembers.find(m => m.id === id);
    if (member) {
        member.paid = true;
        renderGroupMembers();
        showToast(`Payment of ?${member.amount} confirmed for ${member.name}!`, "success");
    }
}

function simulateAddMember() {
    const name = prompt("Enter Friend's Name to invite to Goa Group Trip:");
    if (name) {
        groupMembers.push({ id: Date.now(), name: name, role: 'Traveler', amount: 7000, paid: false });
        renderGroupMembers();
        showToast(`Added ${name} to group trip ledger!`, "success");
    }
}

function copyGroupInviteCode() {
    navigator.clipboard.writeText("https://tripnexus.com/join/TRIP-702");
    showToast("Group Trip Invite Link (TRIP-702) copied to clipboard! Share with friends.", "success");
}

function addToGroupTrip(itemName, price) {
    showToast(`Added "${itemName}" (?${price.toLocaleString()}) to Goa Group Split Bill!`, "success");
}
