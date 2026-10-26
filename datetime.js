// ===== CURRENT DATE AND TIME =====

function updateDateTime() {
    const now = new Date();

    // Format the date: October 18, 2026
    const formattedDate = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    // Format the time: 10:45:30 AM
    const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });

    // Display the date and time on the webpage
    document.getElementById("current-date").textContent =
        formattedDate;

    document.getElementById("current-time").textContent =
        formattedTime;
}

// Display immediately when the page loads
updateDateTime();

// Update every second
setInterval(updateDateTime, 1000);