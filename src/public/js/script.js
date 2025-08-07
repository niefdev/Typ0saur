// Initialize the page with jQuery
$(document).ready(function() {
    console.log('DOM Content Loaded - Initializing TypesRacer...');
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        console.log('Lucide icons initialized');
    }
    
    // Load saved configuration from localStorage
    loadConfiguration();
    
    // Set up modal functionality
    setupModalHandlers();
    
    // Set up event listeners
    setupDifficultySelection();
    setupModeSelection();
    setupLanguageSelection();
    setupInputHandling();
    setupLeftMenuHandlers();
    
    // Generate initial words
    console.log('Generating initial words...');
    generateWords();
    
    // Handle window resize to recalculate word layout
    $(window).on('resize', function() {
        if (gameState.words.length > 0) {
            displayWords();
        }
    });
});

// Modal handlers setup
function setupModalHandlers() {
    // Language selector click
    $('#language-selector').on('click', function() {
        $('#language-modal').removeClass('hidden').addClass('flex');
        $('#language-modal input[type="text"]').val('').focus();
        $('#language-modal [data-language]').show();
    });
    
    // Difficulty selector click
    $('#difficulty-selector').on('click', function() {
        $('#difficulty-modal').removeClass('hidden').addClass('flex');
        $('#difficulty-modal input[type="text"]').val('').focus();
        $('#difficulty-modal [data-difficulty]').show();
    });
    
    // Mode selector click
    $('#mode-selector').on('click', function() {
        $('#mode-modal').removeClass('hidden').addClass('flex');
        $('#mode-modal input[type="text"]').val('').focus();
        $('#mode-modal [data-mode]').show();
    });
    
    // Close modal buttons
    $('.close-modal').on('click', function() {
        $('.modal-overlay').addClass('hidden').removeClass('flex');
    });
    
    // Close modal when clicking outside
    $('.modal-overlay').on('click', function(e) {
        if (e.target === this) {
            $(this).addClass('hidden').removeClass('flex');
        }
    });
    
    // Language selection
    $('[data-language]').on('click', function() {
        const language = $(this).data('language');
        const languageText = $(this).text().trim();
        
        // Update the selector text
        $('#language-selector').text(languageText);
        
        // Remove current selected state and add to clicked item
        $('[data-language]').removeClass('text-blue-400');
        $(this).addClass('text-blue-400');
        
        // Close modal
        $('#language-modal').addClass('hidden').removeClass('flex');
        
        // Save configuration
        saveConfiguration();
        
        // Regenerate words with new language
        generateWords();
        
        console.log('Language changed to:', language);
    });
    
    // Difficulty selection
    $('[data-difficulty]').on('click', function() {
        const difficulty = $(this).data('difficulty');
        const difficultyText = $(this).text().trim();
        
        // Update the selector text
        $('#difficulty-selector').text(difficultyText);
        
        // Remove current selected state and add to clicked item
        $('[data-difficulty]').removeClass('text-blue-400');
        $(this).addClass('text-blue-400');
        
        // Close modal
        $('#difficulty-modal').addClass('hidden').removeClass('flex');
        
        // Save configuration
        saveConfiguration();
        
        // Regenerate words with new difficulty (affects word count in normal mode)
        generateWords();
        
        console.log('Difficulty changed to:', difficulty);
    });
    
    // Mode selection
    $('[data-mode]').on('click', function() {
        const mode = $(this).data('mode');
        const modeText = $(this).text().trim();
        
        // Update the selector text
        $('#mode-selector').text(modeText);
        
        // Remove current selected state and add to clicked item
        $('[data-mode]').removeClass('text-blue-400');
        $(this).addClass('text-blue-400');
        
        // Close modal
        $('#mode-modal').addClass('hidden').removeClass('flex');
        
        // Save configuration
        saveConfiguration();
        
        // Regenerate words with new mode
        generateWords();
        
        console.log('Mode changed to:', mode);
    });
    
    // Search functionality for language modal
    $('#language-modal input[type="text"]').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        $('#language-modal [data-language]').each(function() {
            const languageText = $(this).text().toLowerCase();
            if (languageText.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    
    // Search functionality for difficulty modal
    $('#difficulty-modal input[type="text"]').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        $('#difficulty-modal [data-difficulty]').each(function() {
            const difficultyText = $(this).text().toLowerCase();
            if (difficultyText.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    
    // Search functionality for mode modal
    $('#mode-modal input[type="text"]').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        $('#mode-modal [data-mode]').each(function() {
            const modeText = $(this).text().toLowerCase();
            if (modeText.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    
    // ESC key to close modals - handled in setupInputHandling() to avoid conflicts
}

// Left menu navigation handlers
function setupLeftMenuHandlers() {
    // Menu items
    const menuItems = ['#profile-menu', '#leaderboard-menu', '#play-menu'];
    
    menuItems.forEach(menuId => {
        $(menuId).on('click', function() {
            // Remove active state from all menu items
            menuItems.forEach(id => {
                $(id).removeClass('bg-black/20 text-white').addClass('text-gray-300');
            });
            
            // Add active state to clicked menu item
            $(this).removeClass('text-gray-300').addClass('bg-black/20 text-white');
            
            // Get menu type
            const menuType = menuId.replace('#', '').replace('-menu', '');
            console.log('Menu changed to:', menuType);
            
            // Here you can add specific logic for each menu
            switch(menuType) {
                case 'profile':
                    // Handle profile menu logic
                    break;
                case 'leaderboard':
                    // Handle leaderboard menu logic
                    break;
                case 'play':
                    // Handle play menu logic (default)
                    break;
            }
        });
    });
}

// Placeholder functions (to be implemented)
function setupDifficultySelection() {
    console.log('Difficulty selection setup completed');
}

function setupModeSelection() {
    console.log('Mode selection setup completed');
}

function setupLanguageSelection() {
    console.log('Language selection setup completed');
}

// Configuration management with localStorage
function saveConfiguration() {
    const config = {
        mode: $('#mode-selector').text().toLowerCase(),
        difficulty: $('#difficulty-selector').text().toLowerCase(),
        language: $('#language-selector').text().toLowerCase()
    };
    
    localStorage.setItem('typ0saur-config', JSON.stringify(config));
    console.log('Configuration saved:', config);
}

function loadConfiguration() {
    try {
        const savedConfig = localStorage.getItem('typ0saur-config');
        if (savedConfig) {
            const config = JSON.parse(savedConfig);
            console.log('Loading saved configuration:', config);
            
            // Update selectors with saved configuration
            if (config.mode) {
                const modeText = config.mode.charAt(0).toUpperCase() + config.mode.slice(1);
                $('#mode-selector').text(modeText);
                // Update the selected state in modal
                $('[data-mode]').removeClass('text-blue-400');
                $(`[data-mode="${config.mode}"]`).addClass('text-blue-400');
            }
            
            if (config.difficulty) {
                const difficultyText = config.difficulty.charAt(0).toUpperCase() + config.difficulty.slice(1);
                $('#difficulty-selector').text(difficultyText);
                // Update the selected state in modal
                $('[data-difficulty]').removeClass('text-blue-400');
                $(`[data-difficulty="${config.difficulty}"]`).addClass('text-blue-400');
            }
            
            if (config.language) {
                const languageMap = {
                    'indonesia': 'Indonesia',
                    'english': 'English'
                };
                const languageText = languageMap[config.language] || 'Indonesia';
                $('#language-selector').text(languageText);
                // Update the selected state in modal
                $('[data-language]').removeClass('text-blue-400');
                const languageKey = config.language === 'indonesia' ? 'indonesian' : 'english';
                $(`[data-language="${languageKey}"]`).addClass('text-blue-400');
            }
        }
    } catch (error) {
        console.error('Error loading configuration:', error);
    }
}

// Get word count based on difficulty
function getWordCountByDifficulty() {
    const difficulty = getCurrentDifficulty();
    switch (difficulty) {
        case 'easy': return 50;
        case 'medium': return 75;
        case 'hard': return 100;
        default: return 75; // default to medium
    }
}

function setupInputHandling() {
    console.log('Input handling setup completed');
    
    // Focus on text display for keyboard input
    $('#text-display').focus();
    
    // Handle keyboard input
    $(document).on('keydown', function(e) {
        console.log('🎯 KEY EVENT:', e.key, 'Target:', e.target.tagName);
        
        // Check if we're in a special end-game state using JavaScript variables
        const isResultsActive = gameState.isResultsActive;
        const isGameOverActive = gameState.isGameOverActive;
        
        console.log('🔍 STATE CHECK - Results:', isResultsActive, 'GameOver:', isGameOverActive);
        
        // If in results or game over screen, only handle ESC and block all other keys
        if (isResultsActive || isGameOverActive) {
            console.log('🚫 KEY BLOCKED:', e.key, 'isResultsActive:', isResultsActive, 'isGameOverActive:', isGameOverActive);
            if (e.key === 'Escape') {
                e.preventDefault();
                // Clear JavaScript state variables instead of CSS classes
                gameState.isResultsActive = false;
                gameState.isGameOverActive = false;
                // Restart functionality
                console.log('Restart triggered from end screen');
                generateWords();
            }
            // Block all other keys when in end screens
            e.preventDefault();
            return;
        }
        
        // Handle ESC key for modals and restart
        if (e.key === 'Escape') {
            e.preventDefault();
            // If modal is open, close it
            if ($('.modal-overlay').is(':visible')) {
                $('.modal-overlay').addClass('hidden').removeClass('flex');
            } else {
                // Otherwise restart game
                console.log('Restart triggered');
                generateWords();
            }
            return;
        }
        
        // Only handle typing when game area is focused, no modal is open, and words are loaded
        if (!$('.modal-overlay').is(':visible') && gameState.words.length > 0) {
            // Handle space for word completion
            if (e.key === ' ') {
                e.preventDefault();
                // Only allow space if current word is completed
                const currentWord = gameState.words[gameState.currentWordIndex];
                if (gameState.currentCharIndex >= currentWord.length) {
                    gameState.currentWordIndex++;
                    gameState.currentCharIndex = 0;
                    gameState.completedWords++; // Increment completed words counter
                    
                    // For endless mode, generate more words if needed
                    if (gameState.mode === 'endless' && gameState.currentWordIndex >= gameState.words.length - 50) {
                        addMoreWordsEndless();
                    }
                    
                    checkScroll();
                    displayWords();
                    updateStatsDisplay();
                }
                return;
            }
            
            // Handle backspace
            if (e.key === 'Backspace') {
                e.preventDefault();
                if (gameState.currentCharIndex > 0) {
                    gameState.currentCharIndex--;
                } else if (gameState.currentWordIndex > 0) {
                    // Go back to previous word
                    gameState.currentWordIndex--;
                    gameState.currentCharIndex = gameState.words[gameState.currentWordIndex].length;
                }
                displayWords();
                return;
            }
            
            // Handle printable characters
            if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
                e.preventDefault();
                handleKeyInput(e.key);
            }
        }
    });
    
    // Make text display focusable and focus it
    $('#text-display').attr('tabindex', '0').focus();
    
    // Refocus when clicked
    $('#text-display').on('click', function() {
        $(this).focus();
    });
}

const wordPools = {
    english: [
        "the", "be", "to", "of", "and", "a", "in", "that", "have", "i", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
        "this", "but", "his", "by", "from", "they", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out",
        "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take", "people", "into", "year",
        "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use",
        "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us", "is", "water", "been",
        "call", "who", "oil", "sit", "now", "find", "long", "down", "day", "did", "get", "has", "him", "his", "how", "man", "new", "now", "old", "see",
        "two", "way", "who", "boy", "did", "its", "let", "put", "say", "she", "too", "use", "her", "may", "why", "ask", "men", "run", "try", "got",
        "sun", "set", "hot", "let", "say", "yes", "yet", "you", "are", "car", "far", "sea", "eye", "off", "own", "under", "last", "might", "us", "great",
        "where", "much", "every", "right", "still", "should", "never", "each", "life", "why", "ask", "went", "men", "read", "need", "land", "different", "home", "move", "try",
        "kind", "hand", "picture", "again", "change", "off", "play", "spell", "air", "away", "animal", "house", "point", "page", "letter", "mother", "answer", "found", "study", "still"
    ],
    indonesian: [
        "yang", "dan", "di", "itu", "dengan", "untuk", "dari", "pada", "ke", "adalah", "dalam", "tidak", "akan", "ada", "juga", "atau", "saya", "ini", "dia", "sudah",
        "dapat", "mereka", "telah", "menjadi", "lebih", "bisa", "harus", "oleh", "karena", "jika", "kita", "seperti", "hanya", "semua", "banyak", "tetapi", "sangat", "namun", "masih", "setelah",
        "waktu", "tahun", "orang", "kata", "hari", "rumah", "hidup", "dunia", "negara", "Indonesia", "Jakarta", "besar", "kecil", "baik", "buruk", "putih", "hitam", "merah", "biru", "hijau",
        "makan", "minum", "tidur", "bangun", "pergi", "datang", "lihat", "dengar", "bicara", "tulis", "baca", "belajar", "kerja", "main", "jalan", "lari", "duduk", "berdiri", "ambil", "beri",
        "pagi", "siang", "sore", "malam", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu", "januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", "september",
        "oktober", "november", "desember", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "seratus", "seribu", "jutaan", "milyar", "triliun", "bagus", "jelek",
        "cepat", "lambat", "tinggi", "rendah", "jauh", "dekat", "panas", "dingin", "hangat", "sejuk", "terang", "gelap", "mudah", "susah", "gampang", "sulit", "senang", "sedih", "marah", "takut",
        "berani", "penakut", "pintar", "bodoh", "rajin", "malas", "sabar", "buru", "ramah", "galak", "sopan", "kasar", "halus", "kotor", "bersih", "sehat", "sakit", "kuat", "lemah", "cantik",
        "jelek", "ganteng", "buruk", "rupa", "wajah", "mata", "hidung", "mulut", "telinga", "rambut", "kepala", "leher", "bahu", "lengan", "tangan", "jari", "kuku", "dada", "perut", "punggung",
        "kaki", "lutut", "betis", "tumit", "jempol", "kelingking", "tengah", "manis", "telunjuk", "ibu", "ayah", "anak", "kakak", "adik", "nenek", "kakek", "paman", "bibi", "sepupu", "keponakan"
    ]
};

// Game state
let gameState = {
    words: [],
    currentWordIndex: 0,
    currentCharIndex: 0,
    correctChars: 0,
    totalChars: 0,
    totalCorrectChars: 0,
    completedWords: 0, // Track completed words
    startTime: null,
    isGameActive: false,
    currentRow: 0,
    mode: 'normal',
    // For endless mode tracking
    recentWPMData: [], // Store WPM data for last minute
    recentAccuracyData: [], // Store accuracy data for last minute
    overallStartTime: null,
    // Game state variables for input blocking
    isResultsActive: false,
    isGameOverActive: false,
    // Monster system
    monster: {
        isActive: false,
        currentWordIndex: 0, // Index of word being eaten - start from first word
        currentCharIndex: 0, // Index of character being eaten - start from first character
        speed: 200, // milliseconds between each character consumption (will be set based on difficulty)
        intervalId: null,
        eatenChars: new Set(), // Track eaten characters: "wordIndex-charIndex"
        activationTimeoutId: null, // Timeout ID for delayed activation
        delayStarted: false, // Track if the 10-second delay has been started
        animatingChars: new Map(), // Track animating characters with their timeouts
        randomCharPool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
    }
};

function generateWords() {
    console.log('Generating words...');
    
    // Clear JavaScript state variables instead of CSS classes
    gameState.isResultsActive = false;
    gameState.isGameOverActive = false;
    
    // Get current language from selector
    const currentLanguageText = $('#language-selector').text().toLowerCase();
    let languageKey = currentLanguageText === 'indonesia' ? 'indonesian' : 'english';
    
    // Get current mode
    const currentMode = $('#mode-selector').text().toLowerCase();
    gameState.mode = currentMode;
    
    // Get word pool for selected language
    const wordPool = [...wordPools[languageKey]]; // Create copy
    
    // Shuffle and select words based on mode
    const shuffledWords = wordPool.sort(() => Math.random() - 0.5);
    if (currentMode === 'endless') {
        // For endless mode, use all available words
        gameState.words = shuffledWords;
    } else {
        // For normal mode, use word count based on difficulty
        const wordCount = getWordCountByDifficulty();
        gameState.words = shuffledWords.slice(0, wordCount);
    }
    
    // Reset game state
    gameState.currentWordIndex = 0;
    gameState.currentCharIndex = 0;
    gameState.correctChars = 0;
    gameState.totalChars = 0;
    gameState.totalCorrectChars = 0;
    gameState.completedWords = 0;
    gameState.startTime = null;
    gameState.isGameActive = false;
    gameState.currentRow = 0;
    gameState.recentWPMData = [];
    gameState.recentAccuracyData = [];
    gameState.overallStartTime = null;
    gameState.visibleStartWordIndex = 0; // Reset scroll position
    
    // Reset monster state
    resetMonster();
    
    // Show stats display and footer again when restarting
    $('#stats-display').show();
    $('footer').show();
    
    // Display words immediately
    setTimeout(() => {
        displayWords();
        updateStatsDisplay();
    }, 100);
}

function updateStatsDisplay() {
    const currentMode = gameState.mode;
    let html = '';
    
    if (currentMode === 'endless') {
        // Endless mode stats
        const totalTyped = gameState.completedWords;
        const overallWPM = calculateOverallWPM();
        const overallAccuracy = calculateOverallAccuracy();
        const recentWPM = calculateRecentWPM();
        const recentAccuracy = calculateRecentAccuracy();
        
        html = `
            <div class="flex justify-center items-center space-x-6 text-sm text-gray-300">
                <span>Words: <span class="text-white">${totalTyped}</span></span>
                <span>Avg WPM: <span class="text-yellow-400">${overallWPM}</span></span>
                <span>Avg Accuracy: <span class="text-green-400">${overallAccuracy}%</span></span>
                <span>WPM (1m): <span class="text-yellow-300">${recentWPM}</span></span>
                <span>Accuracy (1m): <span class="text-green-300">${recentAccuracy}%</span></span>
            </div>
        `;
    } else {
        // Normal mode stats
        const totalWords = gameState.words.length;
        const completedWords = gameState.completedWords;
        
        html = `
            <div class="flex justify-center items-center text-sm text-gray-300">
                <span><span class="text-white">${completedWords}</span>/<span class="text-gray-400">${totalWords}</span></span>
            </div>
        `;
    }
    
    $('#stats-display').html(html);
}

function calculateOverallWPM() {
    if (!gameState.overallStartTime) return 0;
    const timeElapsed = (Date.now() - gameState.overallStartTime) / 1000 / 60;
    return Math.round((gameState.totalCorrectChars / 5) / timeElapsed) || 0;
}

function calculateOverallAccuracy() {
    if (gameState.totalChars === 0) return 100;
    return Math.round((gameState.totalCorrectChars / gameState.totalChars) * 100);
}

function calculateRecentWPM() {
    const oneMinuteAgo = Date.now() - 60000;
    const recentData = gameState.recentWPMData.filter(data => data.timestamp > oneMinuteAgo);
    if (recentData.length === 0) return 0;
    
    const totalChars = recentData.reduce((sum, data) => sum + data.chars, 0);
    return Math.round((totalChars / 5)) || 0;
}

function calculateRecentAccuracy() {
    const oneMinuteAgo = Date.now() - 60000;
    const recentData = gameState.recentAccuracyData.filter(data => data.timestamp > oneMinuteAgo);
    if (recentData.length === 0) return 100;
    
    const totalCorrect = recentData.reduce((sum, data) => sum + data.correct, 0);
    const totalTotal = recentData.reduce((sum, data) => sum + data.total, 0);
    return Math.round((totalCorrect / totalTotal) * 100) || 100;
}

function displayWords() {
    if (!gameState.words.length) {
        $('#text-display').html('<p class="text-gray-400">Loading words...</p>');
        return;
    }

    // Get real measurements from the actual container
    const container = $('#text-display');
    
    // Safety check: make sure container exists
    if (!container.length || !container[0]) {
        console.error('Text display container not found');
        return;
    }
    
    // Wait for DOM to be fully rendered
    const containerRect = container[0].getBoundingClientRect();
    const containerStyles = window.getComputedStyle(container[0]);
    
    // Get exact dimensions
    const totalWidth = containerRect.width;
    const paddingLeft = parseInt(containerStyles.paddingLeft, 10) || 0;
    const paddingRight = parseInt(containerStyles.paddingRight, 10) || 0;
    const borderLeft = parseInt(containerStyles.borderLeftWidth, 10) || 0;
    const borderRight = parseInt(containerStyles.borderRightWidth, 10) || 0;
    
    // Calculate actual available width with ultra minimal safety margin for maximum space usage
    const safetyMargin = 1; // Ultra minimal margin - almost no margin for maximum space utilization
    const availableWidth = totalWidth - paddingLeft - paddingRight - borderLeft - borderRight - safetyMargin;
    
    console.log('Real container width:', totalWidth);
    console.log('Padding left:', paddingLeft, 'Padding right:', paddingRight);
    console.log('Available width for text:', availableWidth);
    
    // Create a real test element in the actual container to get precise measurements
    const $realTest = $('<div class="text-row">').css({
        'visibility': 'hidden',
        'position': 'absolute',
        'top': '-9999px',
        'width': 'auto',
        'white-space': 'nowrap'
    }).appendTo(container);
    
    // Function to measure word width precisely
    function measureWordWidth(wordHtml) {
        $realTest.html(wordHtml);
        
        // Safety check for test element
        if (!$realTest[0]) {
            console.error('Real test element not found');
            return 100; // Fallback width
        }
        
        const width = $realTest[0].getBoundingClientRect().width;
        return width;
    }
    
    // Measure space width with minimal spacing  
    const spaceWidth = measureWordWidth('<span class="word">&nbsp;</span>') * 0.4; // Use minimal space for maximum efficiency
    
    // Calculate word layout with current word always in middle row (row 1)
    const layout = calculateWordLayout(availableWidth, spaceWidth, $realTest);
    
    let html = '';
    for (let row = 0; row < 3; row++) {
        html += '<div class="text-row">';
        
        if (layout[row] && layout[row].length > 0) {
            for (let i = 0; i < layout[row].length; i++) {
                const wordIndex = layout[row][i];
                
                // Safety check: ensure wordIndex is valid
                if (wordIndex === undefined || wordIndex === null || wordIndex >= gameState.words.length) {
                    console.warn('Invalid word index:', wordIndex);
                    continue;
                }
                
                const word = gameState.words[wordIndex];
                if (!word) {
                    console.warn('Word not found at index:', wordIndex);
                    continue;
                }
                
                const isCurrentWord = wordIndex === gameState.currentWordIndex;
                
                // Generate word HTML based on character state
                html += '<span class="word">';
                for (let charIndex = 0; charIndex < word.length; charIndex++) {
                    const char = word[charIndex];
                    const charKey = `${wordIndex}-${charIndex}`;
                    
                    // Check if this character is eaten by monster
                    if (gameState.monster.eatenChars.has(charKey)) {
                        // Check if character is animating
                        const animationData = gameState.monster.animatingChars.get(charKey);
                        const displayChar = animationData ? animationData.currentChar : char;
                        html += `<span class="eaten-char" data-char-key="${charKey}">${displayChar}</span>`;
                    }
                    // Check if this is the current typing position
                    else if (isCurrentWord && charIndex === gameState.currentCharIndex) {
                        html += `<span class="current-char cursor-blink">${char}</span>`;
                    }
                    // Check if this character has been typed correctly
                    else if (isCurrentWord && charIndex < gameState.currentCharIndex) {
                        html += `<span class="correct-char">${char}</span>`;
                    }
                    // Check if this word is completed
                    else if (wordIndex < gameState.currentWordIndex) {
                        html += `<span class="correct-char">${char}</span>`;
                    }
                    // Regular upcoming character
                    else {
                        html += `<span class="upcoming-char">${char}</span>`;
                    }
                }
                html += '</span>';
            }
        }
        
        html += '</div>';
    }
    
    $realTest.remove();
    $('#text-display').html(html);
    console.log('Words displayed with stable 3-row layout');
}

function calculateWordLayout(availableWidth, spaceWidth, $testElement) {
    const layout = [[], [], []]; // 3 rows
    
    // Safety check: ensure we have words
    if (!gameState.words || gameState.words.length === 0) {
        console.error('No words available for layout calculation');
        return layout;
    }
    
    // Safety check: ensure currentWordIndex is valid
    if (gameState.currentWordIndex >= gameState.words.length) {
        console.error('Current word index out of bounds');
        return layout;
    }
    
    // Function to measure word width accurately
    function measureWord(wordIndex) {
        const word = gameState.words[wordIndex];
        const isCurrentWord = wordIndex === gameState.currentWordIndex;
        
        let wordHtml = '';
        if (isCurrentWord) {
            wordHtml = '<span class="word current-word">';
            for (let charIndex = 0; charIndex < word.length; charIndex++) {
                const char = word[charIndex];
                if (charIndex < gameState.currentCharIndex) {
                    wordHtml += `<span class="correct-char">${char}</span>`;
                } else if (charIndex === gameState.currentCharIndex) {
                    wordHtml += `<span class="current-char cursor-blink">${char}</span>`;
                } else {
                    wordHtml += `<span class="upcoming-char">${char}</span>`;
                }
            }
            wordHtml += '</span>';
        } else if (wordIndex < gameState.currentWordIndex) {
            wordHtml = `<span class="word completed-word text-green-400">${word}</span>`;
        } else {
            wordHtml = `<span class="word upcoming-word text-gray-400">${word}</span>`;
        }
        
        $testElement.html(wordHtml);
        
        // Safety check for test element
        if (!$testElement[0]) {
            console.error('Test element not found');
            return word.length * 12 + spaceWidth; // Fallback estimate
        }
        
        return $testElement[0].getBoundingClientRect().width + spaceWidth;
    }
    
    // Create stable scrolling layout that doesn't jump
    // Keep track of which word should be at the start of visible area
    if (!gameState.visibleStartWordIndex) {
        gameState.visibleStartWordIndex = 0;
    }
    
    // Check if current word is still visible
    let needScroll = false;
    let currentWordRow = -1;
    
    // First, calculate layout from current visible start
    let wordIndex = gameState.visibleStartWordIndex;
    let currentRow = 0;
    let currentRowWidth = 0;
    
    while (wordIndex < gameState.words.length && currentRow < 3) {
        const wordWidth = measureWord(wordIndex);
        
        // Track which row current word is in
        if (wordIndex === gameState.currentWordIndex) {
            currentWordRow = currentRow;
        }
        
        // Check if word fits in current row
        if (currentRowWidth + wordWidth <= availableWidth) {
            layout[currentRow].push(wordIndex);
            currentRowWidth += wordWidth;
            wordIndex++;
        } else {
            // Move to next row
            if (currentRow < 2) {
                currentRow++;
                currentRowWidth = 0;
                // Don't increment wordIndex, try the same word in new row
            } else {
                // All 3 rows filled, stop
                break;
            }
        }
    }
    
    // Natural scrolling logic:
    // - If current word is not visible (currentWordRow === -1), scroll to show it  
    // - If current word reaches row 2 (last row), do natural scroll (shift up one row)
    if (currentWordRow === -1) {
        // Current word not visible, scroll to show it
        gameState.visibleStartWordIndex = Math.max(0, gameState.currentWordIndex - 10);
        needScroll = true;
    } else if (currentWordRow >= 2) {
        // Current word is in last row, do natural scroll
        // Calculate how many words to skip (first row worth of words)
        const wordsToSkip = layout[0].length > 0 ? layout[0].length : 1;
        gameState.visibleStartWordIndex = Math.min(
            gameState.visibleStartWordIndex + wordsToSkip,
            gameState.words.length - 1
        );
        needScroll = true;
    }
    
    if (needScroll) {
        // Recalculate layout after scroll
        layout[0] = [];
        layout[1] = [];
        layout[2] = [];
        
        wordIndex = gameState.visibleStartWordIndex;
        currentRow = 0;
        currentRowWidth = 0;
        
        while (wordIndex < gameState.words.length && currentRow < 3) {
            const wordWidth = measureWord(wordIndex);
            
            if (currentRowWidth + wordWidth <= availableWidth) {
                layout[currentRow].push(wordIndex);
                currentRowWidth += wordWidth;
                wordIndex++;
            } else {
                if (currentRow < 2) {
                    currentRow++;
                    currentRowWidth = 0;
                } else {
                    break;
                }
            }
        }
    }
    
    return layout; // Return the layout array
}

function handleKeyInput(char) {
    if (!gameState.isGameActive) {
        gameState.isGameActive = true;
        gameState.startTime = Date.now();
        if (!gameState.overallStartTime) {
            gameState.overallStartTime = Date.now();
        }
        
        // Activate monster when game starts
        checkMonsterActivation();
    }
    
    const currentWord = gameState.words[gameState.currentWordIndex];
    
    // Only allow correct characters - no progression if wrong
    if (char === currentWord[gameState.currentCharIndex]) {
        gameState.currentCharIndex++;
        gameState.correctChars++;
        gameState.totalCorrectChars++;
        
        // Track for endless mode recent stats
        if (gameState.mode === 'endless') {
            const now = Date.now();
            gameState.recentWPMData.push({
                timestamp: now,
                chars: 1
            });
            gameState.recentAccuracyData.push({
                timestamp: now,
                correct: 1,
                total: 1
            });
        }
        
        // Check if word is completed
        if (gameState.currentCharIndex >= currentWord.length) {
            // Move to next word
            gameState.currentWordIndex++;
            gameState.currentCharIndex = 0;
            gameState.completedWords++; // Increment completed words counter
            
            // Check if game is finished (all words completed)
            if (gameState.currentWordIndex >= gameState.words.length) {
                // Game finished!
                gameState.isGameActive = false;
                showGameResults();
                return;
            }
            
            // For endless mode, generate more words if needed
            if (gameState.mode === 'endless' && gameState.currentWordIndex >= gameState.words.length - 50) {
                addMoreWordsEndless();
            }
            
            // Check if we need to scroll (keep cursor in row 2)
            checkScroll();
            
            // Check if we should activate monster
            checkMonsterActivation();
        }
    } else {
        // Wrong character - track for stats but don't progress
        if (gameState.mode === 'endless') {
            const now = Date.now();
            gameState.recentAccuracyData.push({
                timestamp: now,
                correct: 0,
                total: 1
            });
        }
    }
    
    // Only update display if game is still active
    if (gameState.isGameActive) {
        gameState.totalChars++;
        updateStatsDisplay();
        displayWords();
    }
}

function addMoreWordsEndless() {
    // Add more shuffled words for endless mode
    const currentLanguageText = $('#language-selector').text().toLowerCase();
    let languageKey = currentLanguageText === 'indonesia' ? 'indonesian' : 'english';
    const wordPool = [...wordPools[languageKey]];
    const shuffledWords = wordPool.sort(() => Math.random() - 0.5);
    gameState.words.push(...shuffledWords);
}

function checkScroll() {
    // The word layout system automatically handles keeping the current word in row 1 (middle row)
    // No manual scrolling needed as calculateWordLayout() ensures proper positioning
    console.log('Current word positioning handled by layout calculation');
}

function showGameResults() {
    // Stop monster when game completes
    stopMonster();
    
    // Calculate final stats
    const timeElapsed = (Date.now() - gameState.startTime) / 1000; // in seconds
    const finalWPM = Math.round((gameState.totalCorrectChars / 5) / (timeElapsed / 60));
    const finalAccuracy = Math.round((gameState.totalCorrectChars / gameState.totalChars) * 100);
    const wordsCompleted = gameState.completedWords;
    const timeInMinutes = Math.floor(timeElapsed / 60);
    const timeInSeconds = Math.round(timeElapsed % 60);
    
    // Hide the stats display (n/n counter) and footer when showing results
    $('#stats-display').hide();
    $('footer').hide();
    
    // Create attractive inline results display that matches game theme exactly
    const resultsHtml = `
        <div class="flex items-center justify-center min-h-[200px] w-full">
            <div class="text-center max-w-2xl w-full px-8">
                <!-- Header with game theme colors -->
                <div class="mb-8 animate-fadeIn">
                    <div class="w-16 h-16 bg-blue-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <i data-lucide="trophy" class="w-8 h-8 text-gray-900"></i>
                    </div>
                    <h2 class="text-3xl font-bold text-blue-400 mb-2">Completed!</h2>
                    <p class="text-gray-300">${getPerformanceMessage(finalWPM, finalAccuracy)}</p>
                </div>
                
                <!-- Stats Grid with game theme -->
                <div class="grid grid-cols-2 gap-4 mb-6 max-w-md mx-auto">
                    <!-- WPM -->
                    <div class="bg-gray-800/50 border border-gray-600 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-blue-400 mb-1">${finalWPM}</div>
                        <div class="text-xs text-gray-400 uppercase tracking-wide">WPM</div>
                    </div>
                    
                    <!-- Accuracy -->
                    <div class="bg-gray-800/50 border border-gray-600 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-green-400 mb-1">${finalAccuracy}%</div>
                        <div class="text-xs text-gray-400 uppercase tracking-wide">Accuracy</div>
                    </div>
                    
                    <!-- Words -->
                    <div class="bg-gray-800/50 border border-gray-600 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-white mb-1">${wordsCompleted}</div>
                        <div class="text-xs text-gray-400 uppercase tracking-wide">Words</div>
                    </div>
                    
                    <!-- Time -->
                    <div class="bg-gray-800/50 border border-gray-600 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-gray-300 mb-1">${timeInMinutes}:${timeInSeconds.toString().padStart(2, '0')}</div>
                        <div class="text-xs text-gray-400 uppercase tracking-wide">Time</div>
                    </div>
                </div>
                
                <!-- Performance Badge -->
                <div class="mb-6">
                    <div class="inline-block px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg">
                        <span class="text-sm font-semibold ${getPerformanceColor(finalWPM, finalAccuracy)}">
                            ${getPerformanceBadge(finalWPM, finalAccuracy)}
                        </span>
                    </div>
                </div>
                
                <!-- Manual restart instruction only -->
                <div class="text-gray-400 text-sm">
                    <p>Press <kbd class="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs">ESC</kbd> to play again</p>
                </div>
            </div>
        </div>
    `;
    
    // Replace the text display content with results
    $('#text-display').html(resultsHtml);
    
    // Set JavaScript state variable instead of CSS class
    gameState.isResultsActive = true;
    
    // Initialize Lucide icons for the new elements
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Remove any existing result handlers to prevent conflicts
    $(document).off('keydown.results');
}

function getPerformanceMessage(wpm, accuracy) {
    if (wpm >= 80 && accuracy >= 95) {
        return "Lightning Fast & Accurate!";
    } else if (wpm >= 60 && accuracy >= 90) {
        return "Excellent Performance!";
    } else if (wpm >= 40 && accuracy >= 85) {
        return "Great Job!";
    } else if (wpm >= 25 && accuracy >= 80) {
        return "Good Progress!";
    } else {
        return "Keep Practicing!";
    }
}

function getPerformanceBadge(wpm, accuracy) {
    if (wpm >= 80 && accuracy >= 95) {
        return "LEGENDARY TYPING MASTER";
    } else if (wpm >= 60 && accuracy >= 90) {
        return "SPEED DEMON";
    } else if (wpm >= 40 && accuracy >= 85) {
        return "TYPING PRO";
    } else if (wpm >= 25 && accuracy >= 80) {
        return "SOLID TYPIST";
    } else {
        return "RISING TALENT";
    }
}

function getPerformanceColor(wpm, accuracy) {
    if (wpm >= 80 && accuracy >= 95) {
        return "text-yellow-400"; // Gold
    } else if (wpm >= 60 && accuracy >= 90) {
        return "text-green-400"; // Green
    } else if (wpm >= 40 && accuracy >= 85) {
        return "text-blue-400"; // Blue
    } else if (wpm >= 25 && accuracy >= 80) {
        return "text-purple-400"; // Purple
    } else {
        return "text-gray-400"; // Gray
    }
}

// ===== MONSTER SYSTEM =====

// Get current difficulty setting
function getCurrentDifficulty() {
    const difficultyText = $('#difficulty-selector').text().toLowerCase();
    if (difficultyText.includes('easy')) return 'easy';
    if (difficultyText.includes('medium')) return 'medium';
    if (difficultyText.includes('hard')) return 'hard';
    return 'medium'; // default
}

// Get monster speed based on difficulty
function getMonsterSpeed(difficulty) {
    switch (difficulty) {
        case 'easy': return 300;
        case 'medium': return 200;
        case 'hard': return 100;
        default: return 200;
    }
}

// Get random character from pool
function getRandomChar() {
    const pool = gameState.monster.randomCharPool;
    return pool[Math.floor(Math.random() * pool.length)];
}

// Start character animation for eaten character
function startCharacterAnimation(charKey, originalChar) {
    if (gameState.monster.animatingChars.has(charKey)) {
        return; // Already animating
    }
    
    const animationData = {
        originalChar: originalChar,
        currentChar: originalChar,
        isTransitioning: true,
        timeouts: []
    };
    
    gameState.monster.animatingChars.set(charKey, animationData);
    
    // Phase 1: 300ms transition to red with random character changes
    let changeCount = 0;
    const maxChanges = 8; // Number of character changes during 300ms
    const changeInterval = 300 / maxChanges; // ~37.5ms per change
    
    const changeCharacter = () => {
        if (changeCount < maxChanges) {
            animationData.currentChar = getRandomChar();
            updateCharacterDisplay(charKey, animationData.currentChar, true);
            
            changeCount++;
            const timeoutId = setTimeout(changeCharacter, changeInterval);
            animationData.timeouts.push(timeoutId);
        } else {
            // Phase 1 complete - now red and stable
            animationData.isTransitioning = false;
            animationData.currentChar = getRandomChar();
            updateCharacterDisplay(charKey, animationData.currentChar, false);
            
            // Phase 2: Random pause between 500ms-3000ms, then continue random changes
            const pauseDuration = 500 + Math.random() * 2500; // 500ms to 3000ms
            const pauseTimeoutId = setTimeout(() => {
                startRandomChangeCycle(charKey);
            }, pauseDuration);
            animationData.timeouts.push(pauseTimeoutId);
        }
    };
    
    changeCharacter();
}

// Continue random character changes after pause
function startRandomChangeCycle(charKey) {
    const animationData = gameState.monster.animatingChars.get(charKey);
    if (!animationData) return;
    
    const changeCharacter = () => {
        if (gameState.monster.animatingChars.has(charKey)) {
            animationData.currentChar = getRandomChar();
            updateCharacterDisplay(charKey, animationData.currentChar, false);
            
            // Random pause between changes (500ms-3000ms)
            const pauseDuration = 500 + Math.random() * 2500;
            const timeoutId = setTimeout(changeCharacter, pauseDuration);
            animationData.timeouts.push(timeoutId);
        }
    };
    
    changeCharacter();
}

// Update character display in DOM
function updateCharacterDisplay(charKey, newChar, isTransitioning) {
    const selector = `[data-char-key="${charKey}"]`;
    const charElement = document.querySelector(selector);
    
    if (charElement) {
        charElement.textContent = newChar;
        if (isTransitioning) {
            charElement.style.transition = 'color 300ms ease, background-color 300ms ease';
        }
    }
}

// Stop character animation
function stopCharacterAnimation(charKey) {
    const animationData = gameState.monster.animatingChars.get(charKey);
    if (animationData) {
        // Clear all timeouts
        animationData.timeouts.forEach(timeoutId => clearTimeout(timeoutId));
        gameState.monster.animatingChars.delete(charKey);
    }
}

// Reset monster to initial state
function resetMonster() {
    if (gameState.monster.intervalId) {
        clearInterval(gameState.monster.intervalId);
    }
    
    if (gameState.monster.activationTimeoutId) {
        clearTimeout(gameState.monster.activationTimeoutId);
    }
    
    // Clear all character animations
    gameState.monster.animatingChars.forEach((animationData, charKey) => {
        stopCharacterAnimation(charKey);
    });
    
    gameState.monster = {
        isActive: false,
        currentWordIndex: 0, // Start from first word
        currentCharIndex: 0, // Start from first character
        speed: 200, // milliseconds between each character consumption (will be set based on difficulty)
        intervalId: null,
        eatenChars: new Set(),
        activationTimeoutId: null,
        delayStarted: false,
        animatingChars: new Map(),
        randomCharPool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
    };
    
    // Remove eaten styling from all characters
    const textContainer = document.getElementById('textContainer');
    if (textContainer) {
        const allChars = textContainer.querySelectorAll('.eaten-char');
        allChars.forEach(char => {
            char.classList.remove('eaten-char');
        });
    }
    
    console.log('Monster reset');
}

// Activate monster immediately when called (after 10-second delay)
function activateMonster() {
    if (gameState.monster.isActive) {
        return;
    }
    
    console.log('🦖 Typ0saur activated! The 10-second grace period is over. Starting to chase from the beginning...');
    gameState.monster.isActive = true;
    
    // Set monster speed based on current difficulty
    const difficulty = getCurrentDifficulty();
    gameState.monster.speed = getMonsterSpeed(difficulty);
    console.log(`🦖 Monster speed set to ${gameState.monster.speed}ms for ${difficulty} difficulty`);
    
    // Start monster from the first word, first character
    gameState.monster.currentWordIndex = 0;
    gameState.monster.currentCharIndex = 0;
    
    // Start the monster eating loop
    startMonsterEating();
}

// Start the monster eating process
function startMonsterEating() {
    if (gameState.monster.intervalId) {
        clearInterval(gameState.monster.intervalId);
    }
    
    gameState.monster.intervalId = setInterval(() => {
        eatNextCharacter();
    }, gameState.monster.speed);
}

// Monster eats the next character
function eatNextCharacter() {
    if (!gameState.monster.isActive) {
        return;
    }
    
    // Check if we've reached the player
    if (gameState.monster.currentWordIndex >= gameState.currentWordIndex) {
        if (gameState.monster.currentWordIndex === gameState.currentWordIndex) {
            // Same word, check character position
            if (gameState.monster.currentCharIndex >= gameState.currentCharIndex) {
                // Monster caught the player!
                gameOver();
                return;
            }
        } else {
            // Monster is ahead of or at the player's word - caught!
            gameOver();
            return;
        }
    }
    
    // Eat current character
    const charKey = `${gameState.monster.currentWordIndex}-${gameState.monster.currentCharIndex}`;
    const originalChar = gameState.words[gameState.monster.currentWordIndex][gameState.monster.currentCharIndex];
    
    gameState.monster.eatenChars.add(charKey);
    
    // Start character animation
    startCharacterAnimation(charKey, originalChar);
    
    console.log(`🦖 Typ0saur ate character ${gameState.monster.currentCharIndex} of word ${gameState.monster.currentWordIndex}: "${originalChar}"`);
    
    // Move to next character
    moveMonsterToNextCharacter();
    
    // Update display only if game is still active
    if (gameState.isGameActive) {
        displayWords();
    }
}

// Move monster to the next character to eat (moving forward)
function moveMonsterToNextCharacter() {
    const currentWord = gameState.words[gameState.monster.currentWordIndex];
    
    if (gameState.monster.currentCharIndex < currentWord.length - 1) {
        // Move to next character in same word
        gameState.monster.currentCharIndex++;
    } else {
        // Move to next word
        gameState.monster.currentWordIndex++;
        
        if (gameState.monster.currentWordIndex < gameState.words.length) {
            // Set to first character of next word
            gameState.monster.currentCharIndex = 0;
        } else {
            // No more words to eat, stop monster
            stopMonster();
        }
    }
}

// Stop monster
function stopMonster() {
    if (gameState.monster.intervalId) {
        clearInterval(gameState.monster.intervalId);
        gameState.monster.intervalId = null;
    }
    
    if (gameState.monster.activationTimeoutId) {
        clearTimeout(gameState.monster.activationTimeoutId);
        gameState.monster.activationTimeoutId = null;
    }
    
    // Clear all character animations
    gameState.monster.animatingChars.forEach((animationData, charKey) => {
        stopCharacterAnimation(charKey);
    });
    
    gameState.monster.isActive = false;
    gameState.monster.delayStarted = false;
    console.log('🦖 Monster stopped');
}

// Game over when monster catches player
function gameOver() {
    console.log('💀 GAME OVER! Monster caught you!');
    stopMonster();
    gameState.isGameActive = false;
    
    // Hide stats and footer
    $('#stats-display').hide();
    $('footer').hide();
    
    // Calculate stats for endless mode
    let statsHtml = '';
    if (gameState.mode === 'endless') {
        const timeElapsed = (Date.now() - gameState.startTime) / 1000; // in seconds
        const finalWPM = Math.round((gameState.totalCorrectChars / 5) / (timeElapsed / 60));
        const finalAccuracy = Math.round((gameState.totalCorrectChars / gameState.totalChars) * 100) || 0;
        const wordsCompleted = gameState.completedWords;
        const timeInMinutes = Math.floor(timeElapsed / 60);
        const timeInSeconds = Math.round(timeElapsed % 60);
        
        statsHtml = `
            <!-- Stats Grid for endless mode -->
            <div class="grid grid-cols-2 gap-4 mb-6 max-w-md mx-auto">
                <!-- WPM -->
                <div class="bg-gray-800/50 border border-gray-600 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold text-blue-400 mb-1">${finalWPM}</div>
                    <div class="text-xs text-gray-400 uppercase tracking-wide">WPM</div>
                </div>
                
                <!-- Accuracy -->
                <div class="bg-gray-800/50 border border-gray-600 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold text-green-400 mb-1">${finalAccuracy}%</div>
                    <div class="text-xs text-gray-400 uppercase tracking-wide">Accuracy</div>
                </div>
                
                <!-- Words -->
                <div class="bg-gray-800/50 border border-gray-600 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold text-white mb-1">${wordsCompleted}</div>
                    <div class="text-xs text-gray-400 uppercase tracking-wide">Words</div>
                </div>
                
                <!-- Time -->
                <div class="bg-gray-800/50 border border-gray-600 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold text-gray-300 mb-1">${timeInMinutes}:${timeInSeconds.toString().padStart(2, '0')}</div>
                    <div class="text-xs text-gray-400 uppercase tracking-wide">Time</div>
                </div>
            </div>
        `;
    }
    
    // Show game over screen
    const gameOverHtml = `
        <div class="flex items-center justify-center min-h-[200px] w-full">
            <div class="text-center max-w-2xl w-full px-8">
                <div class="mb-8 animate-fadeIn">
                    <div class="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span class="text-2xl">🦖</span>
                    </div>
                    <h2 class="text-3xl font-bold text-red-400 mb-2">Monster Caught You!</h2>
                    <p class="text-gray-300">The Typ0saur was too fast! Try to type faster next time.</p>
                </div>
                
                ${statsHtml}
                
                <div class="mb-6">
                    <div class="inline-block px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg">
                        <span class="text-sm font-semibold text-red-400">
                            EATEN BY TYP0SAUR
                        </span>
                    </div>
                </div>
                
                <div class="text-gray-400 text-sm">
                    <p>Press <kbd class="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs">ESC</kbd> to restart</p>
                </div>
            </div>
        </div>
    `;
    
    $('#text-display').html(gameOverHtml);
    
    // Set JavaScript state variable instead of CSS class
    gameState.isGameOverActive = true;
    console.log('🦖 Game over state activated, gameState.isGameOverActive:', gameState.isGameOverActive);
    
    // Remove any existing game over handlers to prevent conflicts
    $(document).off('keydown.gameover');
}

// Check if we should activate monster (call this when game starts)
function checkMonsterActivation() {
    // Only start the 10-second delay if game is active and delay hasn't been started yet
    if (gameState.isGameActive && !gameState.monster.delayStarted && !gameState.monster.isActive) {
        gameState.monster.delayStarted = true;
        
        console.log('🦖 Typ0saur will activate in 10 seconds...');
        
        // Set timeout to activate monster after 10 seconds
        gameState.monster.activationTimeoutId = setTimeout(() => {
            if (gameState.isGameActive) { // Check if game is still active
                activateMonster();
            }
        }, 10000); // 10 seconds delay
    }
}