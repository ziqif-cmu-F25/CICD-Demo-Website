// ============================================================
// 🎯 STUDENT: MODIFY THESE TWO VARIABLES ONLY!
// ============================================================

// Replace "YOUR_ID_HERE" with suggested vid ID
// Change the video ID to: "https://www.youtube.com/embed/VlTo9Z94XQ0?si=bg3tArR73knMfnKP";
const studentVidID = "https://www.youtube.com/embed/VlTo9Z94XQ0?si=bg3tArR73knMfnKP"

// Enter the view count of your chosen video (must be a non-negative integer)
// Example: If your video has 1,000,000 views, enter 1000000
// Change the view count to: 8_600_000
const studentViewCount = 8600000;

// ============================================================
// 🚫 DO NOT MODIFY BELOW THIS LINE
// ============================================================

// The legendary Saxophone Seal's stats
const SEAL_VIDEO_ID = "G6zPvkP5u6Q";
const SEAL_VIEW_COUNT = 10_000_000; // 10M views - the legend!

// DOM Elements
const studentVideoIframe = document.getElementById("student-video");
const studentViewsDisplay = document.getElementById("student-views");
const sealViewsDisplay = document.getElementById("seal-views");
const studentProgress = document.getElementById("student-progress");
const sealProgress = document.getElementById("seal-progress");
const studentPercent = document.getElementById("student-percent");
const sealPercent = document.getElementById("seal-percent");
const messageText = document.getElementById("message-text");

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Extract clean 11-character YouTube video ID from various formats
// Handles: full URLs, embed URLs with ?si= params, short URLs, or just the ID
function extractVideoID(input) {
    if (!input || input === "YOUR_ID_HERE") return null;
    
    // Remove whitespace
    input = input.trim();
    
    // Pattern to match YouTube video IDs (11 chars: alphanumeric, dash, underscore)
    const idPattern = /^[a-zA-Z0-9_-]{11}$/;
    
    // If it's already a clean 11-char ID, return it
    if (idPattern.test(input)) {
        return input;
    }
    
    // Try to extract ID from various URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,      // youtube.com/watch?v=ID
        /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,        // youtube.com/embed/ID
        /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,                  // youtu.be/ID
        /^([a-zA-Z0-9_-]{11})(?:\?|&|$)/                       // ID?si=... or ID&...
    ];
    
    for (const pattern of patterns) {
        const match = input.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    
    return null;
}

// Check if student has uploaded a valid video (returns cleaned ID or null)
function getValidVideoID(id) {
    return extractVideoID(id);
}

// Calculate progress percentages - bars meet in the middle
function calculateProgress(studentViews, sealViews) {
    const total = studentViews + sealViews;
    if (total === 0) return { student: 50, seal: 50, studentPct: 0, sealPct: 0 };
    
    // Direct percentage of total - bars will meet in the middle
    const studentPct = (studentViews / total) * 100;
    const sealPct = (sealViews / total) * 100;
    
    return {
        student: studentPct,  // Width from left
        seal: sealPct,        // Width from right
        studentPct: Math.round(studentPct),
        sealPct: Math.round(sealPct)
    };
}

// Get message based on comparison
function getMessage(studentViews, sealViews, hasValidVideo) {
    if (!hasValidVideo) {
        return {
            text: "🎬 You haven't uploaded your video yet! Edit script.js to challenge the Seal!",
            class: "text-yellow-300"
        };
    }
    
    if (studentViews === 0) {
        return {
            text: "📊 Your video has 0 views? Update the view count in script.js!",
            class: "text-orange-300"
        };
    }
    
    const ratio = studentViews / sealViews;
    
    if (ratio > 1) {
        return {
            text: "🏆 INCREDIBLE! Your favorite video has MORE views than the Saxophone Seal! You have great taste!",
            class: "text-green-400"
        };
    } else if (ratio > 0.5) {
        return {
            text: "🔥 Impressive! Your video is giving the Seal some serious competition!",
            class: "text-blue-400"
        };
    } else if (ratio > 0.1) {
        return {
            text: "💪 Not bad! Your video is putting up a good fight against the legend!",
            class: "text-indigo-300"
        };
    } else {
        return {
            text: "🦭 The Saxophone Seal remains the undisputed champion... for now!",
            class: "text-purple-300"
        };
    }
}

// Initialize the page
function init() {
    // Extract clean video ID (handles URLs with ?si= params, etc.)
    const cleanVideoID = getValidVideoID(studentVidID);
    const hasValidVideo = cleanVideoID !== null;
    
    // Set up student video iframe
    if (hasValidVideo) {
        studentVideoIframe.src = `https://www.youtube.com/embed/${cleanVideoID}`;
    } else {
        // Show placeholder message
        studentVideoIframe.parentElement.innerHTML = `
            <div class="w-full h-full flex items-center justify-center bg-indigo-950/80">
                <div class="text-center p-6">
                    <span class="text-6xl mb-4 block">🎬</span>
                    <p class="text-indigo-300 text-lg">Your video goes here!</p>
                    <p class="text-indigo-400 text-sm mt-2">Edit <code class="text-yellow-300">script.js</code> to add your video</p>
                </div>
            </div>
        `;
    }
    
    // Update view counts display
    studentViewsDisplay.textContent = formatNumber(studentViewCount);
    sealViewsDisplay.textContent = formatNumber(SEAL_VIEW_COUNT);
    
    // Calculate and animate progress bars
    const progress = calculateProgress(studentViewCount, SEAL_VIEW_COUNT);
    
    // Delay animation for effect
    setTimeout(() => {
        studentProgress.style.width = `${progress.student}%`;
        sealProgress.style.width = `${progress.seal}%`;
        
        studentPercent.textContent = `${progress.studentPct}%`;
        sealPercent.textContent = `${progress.sealPct}%`;
    }, 500);
    
    // Set status message
    const message = getMessage(studentViewCount, SEAL_VIEW_COUNT, hasValidVideo);
    messageText.textContent = message.text;
    messageText.className = `text-lg font-medium ${message.class}`;
}

// Run on page load
document.addEventListener("DOMContentLoaded", init);
