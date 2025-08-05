// Initialize the page with jQuery
$(document).ready(function() {
    console.log('DOM Content Loaded - Initializing TypesRacer...');
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        console.log('Lucide icons initialized');
    }
    
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
    
    // ESC key to close modals
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('.modal-overlay').addClass('hidden').removeClass('flex');
        }
    });
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

function setupInputHandling() {
    console.log('Input handling setup completed');
    
    // Focus on text display for keyboard input
    $('#text-display').focus();
    
    // Handle keyboard input
    $(document).on('keydown', function(e) {
        // Prevent ESC from affecting text input when not in modal
        if (e.key === 'Escape' && !$('.modal-overlay').is(':visible')) {
            e.preventDefault();
            // Restart functionality
            console.log('Restart triggered');
            generateWords();
            return;
        }
        
        // Only handle typing when game area is focused and no modal is open
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
    overallStartTime: null
};

function generateWords() {
    console.log('Generating words...');
    
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
        // For normal mode, use 200 words
        gameState.words = shuffledWords.slice(0, 20);
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
                
                if (isCurrentWord) {
                    // Current word with character highlighting
                    html += '<span class="word current-word">';
                    for (let charIndex = 0; charIndex < word.length; charIndex++) {
                        const char = word[charIndex];
                        if (charIndex < gameState.currentCharIndex) {
                            html += `<span class="correct-char">${char}</span>`;
                        } else if (charIndex === gameState.currentCharIndex) {
                            html += `<span class="current-char cursor-blink">${char}</span>`;
                        } else {
                            html += `<span class="upcoming-char">${char}</span>`;
                        }
                    }
                    html += '</span>';
                } else if (wordIndex < gameState.currentWordIndex) {
                    // Completed words
                    html += `<span class="word completed-word text-green-400">${word}</span>`;
                } else {
                    // Upcoming words
                    html += `<span class="word upcoming-word text-gray-400">${word}</span>`;
                }
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
    
    gameState.totalChars++;
    updateStatsDisplay();
    displayWords();
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
                    <h2 class="text-3xl font-bold text-blue-400 mb-2">Test Completed!</h2>
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
    
    // Initialize Lucide icons for the new elements
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Allow manual restart with ESC key only (no auto-restart)
    $(document).on('keydown.results', function(e) {
        if (e.key === 'Escape') {
            $(document).off('keydown.results');
            $('#stats-display').show(); // Show stats display again
            generateWords(); // Manual restart
        }
    });
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