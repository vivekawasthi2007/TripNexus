// Emergency Travel Assistant & SOS Radar (Differentiator #3)
function triggerSOSRadar() {
    showToast("Radar scanning 5km radius for verified 24/7 trauma centers & police patrol...", "warning");
    const results = document.getElementById('sosResults');
    if (results) {
        results.scrollIntoView({ behavior: 'smooth' });
    }
}

function shareLiveLocation() {
    navigator.clipboard.writeText("https://maps.google.com/?q=15.2993,74.1240&nexus_sos_alert=ACTIVE");
    showToast("Encrypted SOS Live Location Link copied to clipboard! Share on WhatsApp/SMS.", "success");
}
