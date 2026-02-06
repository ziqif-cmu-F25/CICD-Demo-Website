#!/usr/bin/env node
/**
 * CI Validation Script
 * Validates studentVidID and studentViewCount in script.js
 * 
 * Accepts multiple YouTube URL formats:
 * - Just the ID: dQw4w9WgXcQ
 * - ID with params: dQw4w9WgXcQ?si=abc123
 * - Watch URL: https://youtube.com/watch?v=dQw4w9WgXcQ
 * - Embed URL: https://youtube.com/embed/dQw4w9WgXcQ?si=abc123
 * - Short URL: https://youtu.be/dQw4w9WgXcQ
 */

const fs = require('fs');
const path = require('path');

// Read script.js
const scriptPath = path.join(__dirname, 'script.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

console.log('🎬 Validating student submission...');
console.log('==================================\n');

// Extract studentVidID value (handles quoted strings)
const vidIdMatch = scriptContent.match(/const\s+studentVidID\s*=\s*["']([^"']+)["']/);
const rawVidId = vidIdMatch ? vidIdMatch[1] : null;

// Extract studentViewCount value (handles underscores like 1_000_000)
const viewCountMatch = scriptContent.match(/const\s+studentViewCount\s*=\s*([0-9_]+)/);
const rawViewCount = viewCountMatch ? viewCountMatch[1].replace(/_/g, '') : null;

console.log(`📹 Found raw studentVidID: '${rawVidId}'`);

/**
 * Extract clean 11-character YouTube video ID from various formats
 */
function extractVideoID(input) {
    if (!input || input === 'YOUR_ID_HERE') return null;
    
    input = input.trim();
    
    // YouTube video ID pattern: exactly 11 chars of alphanumeric, dash, underscore
    const idPattern = /^[a-zA-Z0-9_-]{11}$/;
    
    // If it's already a clean 11-char ID, return it
    if (idPattern.test(input)) {
        return input;
    }
    
    // Try to extract ID from various URL formats
    const patterns = [
        // youtube.com/watch?v=ID or youtube.com/watch?v=ID&other_params
        /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
        // youtube.com/embed/ID or youtube.com/embed/ID?si=...
        /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        // youtu.be/ID or youtu.be/ID?si=...
        /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
        // ID?si=... or ID&... (ID followed by query params)
        /^([a-zA-Z0-9_-]{11})(?:\?|&)/
    ];
    
    for (const pattern of patterns) {
        const match = input.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    
    return null;
}

// Validation
let valid = true;
let cleanId = null;

// Validate studentVidID
if (!rawVidId) {
    console.log('❌ ERROR: studentVidID not found or empty!');
    valid = false;
} else if (rawVidId === 'YOUR_ID_HERE') {
    console.log("❌ ERROR: studentVidID is still set to placeholder 'YOUR_ID_HERE'!");
    console.log('   Please replace it with your YouTube video ID.');
    valid = false;
} else {
    cleanId = extractVideoID(rawVidId);
    if (!cleanId) {
        console.log('❌ ERROR: Could not extract a valid 11-character YouTube ID!');
        console.log(`   Raw value: '${rawVidId}'`);
        console.log('');
        console.log('   Accepted formats:');
        console.log('   - Just the ID: dQw4w9WgXcQ');
        console.log('   - With params: dQw4w9WgXcQ?si=abc123');
        console.log('   - Watch URL: https://youtube.com/watch?v=dQw4w9WgXcQ');
        console.log('   - Embed URL: https://youtube.com/embed/dQw4w9WgXcQ?si=abc123');
        console.log('   - Short URL: https://youtu.be/dQw4w9WgXcQ');
        valid = false;
    } else {
        console.log(`🔍 Extracted clean ID: '${cleanId}'`);
        console.log(`✅ studentVidID is valid (11 characters: ${cleanId})`);
    }
}

console.log('');

// Validate studentViewCount
console.log(`👀 Found studentViewCount: '${rawViewCount}'`);

if (!rawViewCount) {
    console.log('❌ ERROR: studentViewCount not found or not a valid number!');
    valid = false;
} else if (!/^[0-9]+$/.test(rawViewCount)) {
    console.log('❌ ERROR: studentViewCount must be a non-negative integer!');
    console.log(`   Current value: '${rawViewCount}'`);
    valid = false;
} else {
    console.log(`✅ studentViewCount is valid (non-negative integer: ${rawViewCount})`);
}

console.log('');
console.log('==================================');

if (valid) {
    console.log('🎉 All validations passed! Ready for deployment!');
    console.log('');
    console.log('🦭 May your video challenge the Saxophone Seal! 🦭');
    process.exit(0);
} else {
    console.log('💥 Validation failed! Please fix the errors above.');
    console.log('');
    console.log('📝 Quick Fix Guide:');
    console.log('   1. Open script.js');
    console.log('   2. Find your favorite YouTube video');
    console.log('   3. Copy the embed URL or video ID');
    console.log("   4. Replace 'YOUR_ID_HERE' with your video ID/URL");
    console.log("   5. Update studentViewCount with the video's view count");
    console.log('   6. Commit and push again!');
    process.exit(1);
}
