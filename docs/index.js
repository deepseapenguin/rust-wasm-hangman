import init, { get_word } from "./rust_wasm_hangman.js";
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
window.onload = function () {
  init().then(function () {
    var context;
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
      'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
      't', 'u', 'v', 'w', 'x', 'y', 'z'];

    var guess;             // Geuss
    var geusses = [];      // Stored geusses
    var lives;             // Lives
    var myStickman
    // Get elements
    var showLives = document.getElementById("mylives");

    var list
    var correct
    var letters
    var max = 5;
    var attempt = []

    // create alphabet ul
    var buttons = function () {
      var myButtons = document.getElementById('buttons');
      letters = document.createElement('ul');

      for (var i = 0; i < alphabet.length; i++) {
        letters.id = 'alphabet';
        list = document.createElement('li');
        list.id = 'letter';
        list.innerHTML = alphabet[i];
        check();
        myButtons.appendChild(letters);
        letters.appendChild(list);
      }
    }




    // Create geusses ul
    var result = function () {
      var wordHolder = document.getElementById('hold');
      correct = document.createElement('ul');
      max = getRndInteger(5, 7);
      wordHolder.innerHTML = "";
      attempt = []
      for (var i = 0; i < max; i++) {
        correct.setAttribute('id', 'my-word');
        guess = document.createElement('li');
        guess.setAttribute('class', 'guess');

        guess.innerHTML = "_";


        geusses.push(guess);
        wordHolder.appendChild(correct);
        correct.appendChild(guess);
      }
    }

    // Show lives
    var comments = function () {
      if (lives === 0) {
        showLives.innerHTML = "Game Over";
        let word = get_word(attempt.join(''), max).trim().split(" ");
        var wordHolder = document.getElementById('hold');
        correct.parentNode.removeChild(correct);
        correct = document.createElement('ul');

        geusses = []
        for (var i = 0; i < max; i++) {
          correct.setAttribute('id', 'my-word');
          guess = document.createElement('li');
          guess.setAttribute('class', 'guess');

          guess.innerHTML = word[i];


          geusses.push(guess);
          wordHolder.appendChild(correct);
          correct.appendChild(guess);
        }
      } else if (lives > 0) {
        showLives.innerHTML = "You have " + lives + " lives";
      }
    }

    // Animate man
    var animate = function () {
      var drawMe = lives;
      drawArray[drawMe]();
    }


    // Hangman
    var canvas = function () {

      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.strokeStyle = "#fff";
      context.lineWidth = 2;
      frame1()
      frame2()
      frame3()
      frame4()
    };

    var head = function () {
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI * 2, true);
      context.stroke();
    }

    var draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {

      context.moveTo($pathFromx, $pathFromy);
      context.lineTo($pathTox, $pathToy);
      context.stroke();
    }

    var frame1 = function () {
      draw(0, 150, 150, 150);
    };

    var frame2 = function () {
      draw(10, 0, 10, 600);
    };

    var frame3 = function () {
      draw(0, 5, 70, 5);
    };

    var frame4 = function () {
      draw(60, 5, 60, 15);
    };

    var torso = function () {
      draw(60, 36, 60, 70);
    };

    var rightArm = function () {
      draw(60, 46, 100, 50);
    };

    var leftArm = function () {
      draw(60, 46, 20, 50);
    };

    var rightLeg = function () {
      draw(60, 70, 100, 100);
    };

    var leftLeg = function () {
      draw(60, 70, 20, 100);
    };

    var drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];


    // OnClick Function
    var check = function () {
      list.onclick = function () {
        if (lives > 0) {
          if (!this.classList.contains("active")) {
            this.setAttribute("class", "active");
            lives -= 1;
            attempt.push(this.innerHTML)
            comments();
            animate();
          }
        }

      }
    }


    // Play
    var play = function () {



      buttons();

      geusses = [];
      lives = 6;
      result();
      comments();
      canvas();
    }

    play();

    document.getElementById('reset').onclick = function () {
      correct.parentNode.removeChild(correct);
      letters.parentNode.removeChild(letters);
      context.clearRect(0, 0, 400, 400);
      play();
    }
  })
}