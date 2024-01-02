// LOADING QUESTIONS FROM A FILE
var questions = []; // Declaring a global field for questions

const loadQuestionsFromLocalStorage = () => {
    const storedQuestions = localStorage.getItem('questions');
    
    // Checking if questions are available in localStorage
    if (storedQuestions) {
        // Parse JSON string into an array
        const parsedQuestions = JSON.parse(storedQuestions);
        
        //console.log(parsedQuestions);
        questions = parsedQuestions
        //console.log(questions)

        // Returning a loaded question
        return parsedQuestions;
    } else {
        // Return the default value or null if the questions are not available
        console.log('Otázky nebyly nalezeny v localStorage.');
        return null;
    }
};


// ROTATE HEXAGON
const hexagons = document.querySelectorAll('.hexagon');
const questionHexagon = document.querySelector('.bigHexagonContainer');
let selectedHexagon = null;

const rotateIn = (hexagon) => {
    hexagon.classList.add('animate__animated', 'animate__flipInY')
    resetTimer();
}

const rotateOut = (hexagon) => {
    hexagon.classList.add('animate__animated', 'animate__flipOutY')
    
}

hexagons.forEach(hexagon => {
    hexagon.addEventListener('click', () => {
        // Getting text from a small hexagon
        const hexagonNumber = hexagon.querySelector('span');
        if (hexagonNumber) {
            const hexagonNumberText = hexagonNumber.textContent;
            
            // Writing down the question number
            const questionNumber = document.querySelector('.questionNumber h2');
            const questionText = questionHexagon.querySelector("#questionText");

            if(hexagon.classList.contains('colorBlackHexagon')) {
                questionNumber.textContent = `Náhradní otázka: ${parseInt(hexagonNumberText)}`;
                selectedHexagon = hexagon;

                // Uploading spare question
                
                questionText.textContent = questions[parseInt(hexagonNumberText) + 27];
                //console.log(parseInt(hexagonNumberText) + 2)
                //console.log(questions[parseInt(hexagonNumberText) + 2])
            }
            else {
                questionNumber.textContent = `Otázka: ${parseInt(hexagonNumberText)}`;
                selectedHexagon = hexagon;

                // Uploading question

                questionText.textContent = questions[parseInt(hexagonNumberText) - 1]; 
            }
                       
            // Turning the hexagon away
            rotateOut(hexagon)
            hexagon.style.opacity = '0';

            // Display questionHexagon
            setTimeout(() => {
                questionHexagon.style.zIndex = '10';
                questionHexagon.style.opacity = '1';
                rotateIn(questionHexagon)
            }, 400);    
        }
    });
});

// Coloring hexagons
const colorHexagons = document.querySelectorAll('.colorHexagon');
colorHexagons.forEach(colorHexagon => {

    colorHexagon.addEventListener('click', () => {
        const jsonPlayerData = localStorage.getItem('playerData');
        var colorClass = colorHexagon.id;
        //Coloring hexagon
        selectedHexagon.className = ''
        
        if (jsonPlayerData) {
            const playerData = JSON.parse(jsonPlayerData);

            var stPlayerColor = playerData.player1Color;
            var ndPlayerColor = playerData.player2Color;

            if (colorHexagon.id === 'colorP1Hexagon') {
                colorClass = stPlayerColor;
                //console.log(colorClass)
            }
            else if (colorHexagon.id === 'colorP2Hexagon') {
                colorClass = ndPlayerColor;
            }
            else {colorClass = colorHexagon.id;}
        }

        selectedHexagon.classList.add('hexagon',`${colorClass}`)
        //console.log(selectedHexagon.classList)

        //turning the hexagon back
        setTimeout(() => {
            rotateIn(selectedHexagon)
            selectedHexagon.classList.remove('animate__flipOutY');
            selectedHexagon.style.opacity = '1';
        }, 400)

        //hiding questionHexagon
        rotateOut(questionHexagon)
        questionHexagon.classList.remove('animate__flipInY');
        setTimeout(() => {
            questionHexagon.classList.remove('animate__flipOutY');
            questionHexagon.style.zIndex = '-1';
            questionHexagon.style.opacity = '0';
        }, 1000);  
    });
});
