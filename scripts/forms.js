// QUESTIONS FUNCTION

// QUESTION DOWNLOAD
const handleQuestionFormSubmit = () => {
    const questionForm = document.getElementById('questionForm');
    questionForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // getting questions from list
        const questions = [];
        for (let i = 1; i <= 56; i++) {
            const questionInput = document.getElementById(`question${i}`);
            questions.push(questionInput.value);
        }
        //console.log(questions)
        // Creating string, every question on her own line
        const questionsText = questions.join('\n');

        // Creating new blob
        const blob = new Blob([questionsText], { type:'text/plain'});

        // Creating URL object URL to download
        const url = URL.createObjectURL(blob);

        // Creating link to download file
        const a = document.createElement('a');
        a.href = url;
        a.download = 'questions.txt'; // File name
        a.click();

        // Release URL object
        URL.revokeObjectURL(url);
    });
}


// LOADING QUESTIONS FROM A FILE
var questions = []; // Declaring a global field for questions





// SETUP FUNCTIONS
// Form processing function in settings
function handleDataFormSettings(formId, redirectURL) {
    const form = document.querySelector(formId);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const fileInput = document.getElementById('fileInput');
        const player1Name = document.getElementById('name1').value;
        const player1Color = document.getElementById('player1Color').value;
        const player2Name = document.getElementById('name2').value;
        const player2Color = document.getElementById('player2Color').value;
        const time = document.getElementById('timer').value;

        // Get questions from file if selected
        let questions = [];
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                const fileContent = e.target.result;
                questions = fileContent.split('\n');

                // Saving questions to localStorage
                localStorage.setItem('questions', JSON.stringify(questions));
            };

            reader.readAsText(file);
        }

        // Storing other data in localStorage
        const playerData = {
            player1Name: player1Name,
            player1Color: player1Color,
            player2Name: player2Name,
            player2Color: player2Color,
            timeNumber: time
        };

        const json = JSON.stringify(playerData);
        localStorage.setItem('playerData', json);

        window.location.href = redirectURL;
    });
}


// AZ-quiz FUNCTIONS
// Features to display player names, player colors and time
const displayPlayerNamesAndTimeOnPage = () => {
    // Loading data from LocalStorage
    const jsonPlayerData = localStorage.getItem('playerData');

    // If data is available, process it
    if (jsonPlayerData) {
        const playerData = JSON.parse(jsonPlayerData);

        var stPlayerName = playerData.player1Name;
        var stPlayerColor = playerData.player1Color;
        var ndPlayerName = playerData.player2Name;
        var ndPlayerColor = playerData.player2Color;
        var timeSet = playerData.timeNumber;

        document.querySelector('#player1Name span').textContent = stPlayerName;
        document.querySelector('#p1Color').classList.add(stPlayerColor);
        document.querySelector('#colorP1Hexagon').classList.add(stPlayerColor);
        //console.log(stPlayerColor)
        
        document.querySelector('#player2Name span').textContent = ndPlayerName;
        document.querySelector('#p2Color').classList.add(ndPlayerColor);
        document.querySelector('#colorP2Hexagon').classList.add(ndPlayerColor);
        document.querySelector('#timerDisplay').textContent = timeSet;
        //console.log(colorP1Hexagon.classList)
    }
};



// COLOR ASSIGNMENT
const player1ColorSelect = document.getElementById('player1Color');
const player2ColorSelect = document.getElementById('player2Color');

if (player1ColorSelect && player2ColorSelect) {
    const hideSelectedColor = (select, selectedColor) => {
        const options = select.options;
        for (let i = 0; i < options.length; i++) {
            const optionColorClass = options[i].className;
            if (optionColorClass === selectedColor) {
                options[i].style.display = 'none';
            } else {
                options[i].style.display = 'block';
            }
        }
    };

    const colorSelectChangeHandler = (playerColorSelect, otherPlayerColorSelect) => {
        const selectedOption = playerColorSelect.options[playerColorSelect.selectedIndex];
        const selectedColorClass = selectedOption.className;

        hideSelectedColor(otherPlayerColorSelect, selectedColorClass);

        // Adding the selected color class to select
        playerColorSelect.className = '';
        playerColorSelect.classList.add(selectedColorClass);
    };

    player1ColorSelect.addEventListener('change', () => {
        colorSelectChangeHandler(player1ColorSelect, player2ColorSelect);
    });

    player2ColorSelect.addEventListener('change', () => {
        colorSelectChangeHandler(player2ColorSelect, player1ColorSelect);
    });

    // Called at start if colors are selected on page load
    const initialSelectedOption1 = player1ColorSelect.options[player1ColorSelect.selectedIndex];
    if (initialSelectedOption1) {
        const initialSelectedColorClass1 = initialSelectedOption1.className;
        hideSelectedColor(player2ColorSelect, initialSelectedColorClass1);
        player1ColorSelect.classList.add(initialSelectedColorClass1);
    }

    const initialSelectedOption2 = player2ColorSelect.options[player2ColorSelect.selectedIndex];
    if (initialSelectedOption2) {
        const initialSelectedColorClass2 = initialSelectedOption2.className;
        hideSelectedColor(player1ColorSelect, initialSelectedColorClass2);
        player2ColorSelect.classList.add(initialSelectedColorClass2);
    }
}