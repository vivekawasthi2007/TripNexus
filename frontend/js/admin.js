// Super Admin & Travel Agent Operations (Differentiator #5)
function broadcastDisruptionEvent() {
    const carrier = document.getElementById('broadcastCarrier').value || 'Vande Bharat Express';
    const type = document.getElementById('broadcastType').value;
    const banner = document.getElementById('disruptionBanner');
    const text = document.getElementById('disruptionText');

    if (banner) banner.style.display = 'flex';
    if (text) {
        text.innerText = `?? Broadcast Alert: ${carrier} reported ${type.toUpperCase()}. Affected travelers receive real-time updates via Kafka topic "travel.disruptions".`;
    }
    showToast(`Event emitted to Kafka topic "travel.disruptions"!`, "warning");
}

function publishAgentPackage() {
    const name = document.getElementById('pkgName').value;
    const base = parseInt(document.getElementById('pkgBaseCost').value);
    const markup = parseInt(document.getElementById('pkgMarkup').value);

    if (!name || isNaN(base) || isNaN(markup)) {
        showToast("Please fill in package name, base cost, and agent markup", "warning");
        return;
    }

    const total = base + markup;
    catalogDatabase.packages.push({
        id: 'PKG-' + Date.now(),
        name: name,
        type: 'package',
        location: 'Custom Agent Tour',
        duration: 'Custom Itinerary',
        price: total,
        ecoCo2: 85,
        ecoTier: 'Certified',
        rating: 5.0,
        tag: 'B2B Exclusive',
        refundable: true,
        amenities: 'Custom flights, 5-Star Stay, VIP Transfers'
    });

    document.getElementById('pkgName').value = '';
    document.getElementById('pkgBaseCost').value = '';
    document.getElementById('pkgMarkup').value = '';

    showToast(`Package "${name}" published to live catalog at ?${total.toLocaleString()}! Commission: ?${markup.toLocaleString()}`, "success");
    switchMainTab('explore');
    setSearchCategory('packages');
}
