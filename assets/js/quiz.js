document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const loginSection = document.getElementById("login-section");
  const registerSection = document.getElementById("register-section");
  const quizSection = document.getElementById("quiz-section");
  const quizContainer = document.getElementById("quiz-form");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const resultDiv = document.getElementById("result");
  const showRegisterBtn = document.getElementById("show-register");

  // Quiz state
  let currentQuestionIndex = 0;
  let userAnswers = [];

  // Questions
  const questions = [
    {
      question: "1. Which SQL statement is used to retrieve data?",
      options: ["GET", "SELECT", "RETRIEVE"],
      correctAnswer: "SELECT"
    },
    {
      question: "2. What does the 'GROUP BY' clause do in SQL?",
      options: [
        "Filters rows by condition",
        "Orders the result set",
        "Groups rows with same values for aggregate functions"
      ],
      correctAnswer: "Groups rows with same values for aggregate functions"
    },
    {
      question: "3. Which SQL keyword is used to avoid duplicate values in results?",
      options: ["UNIQUE", "DISTINCT", "FILTER"],
      correctAnswer: "DISTINCT"
    },
    {
      question: "4. What is the result of a LEFT JOIN if there’s no match in the right table?",
      options: [
        "No rows are returned",
        "NULL values in columns from right table",
        "Error is thrown"
      ],
      correctAnswer: "NULL values in columns from right table"
    },
    {
      question: "5. Which of the following best describes a primary key?",
      options: [
        "A field that uniquely identifies a row and can be null",
        "A field that uniquely identifies a row and cannot be null",
        "A field that can store duplicate values"
      ],
      correctAnswer: "A field that uniquely identifies a row and cannot be null"
    }
  ];

  const defaultImage = "assets/img/quizqbg.webp";

  // Show registration form
  showRegisterBtn.addEventListener("click", () => {
    loginSection.classList.add("d-none");
    registerSection.classList.remove("d-none");
  });

  // Handle registration
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value;

    if (name && email && password) {
      localStorage.setItem("quizUserName", name);
      localStorage.setItem("quizUserEmail", email);
      localStorage.setItem("quizUserPassword", password);

      alert("Successfully Registered! Please login.");
      registerForm.reset();
      registerSection.classList.add("d-none");
      loginSection.classList.remove("d-none");
    } else {
      alert("Please fill all the fields.");
    }
  });

  // Handle login
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const userpass = document.getElementById("userpass").value;
    const storedEmail = localStorage.getItem("quizUserEmail");
    const storedPassword = localStorage.getItem("quizUserPassword");

    if (username === storedEmail && userpass === storedPassword) {
      loginSection.classList.add("d-none");
      quizSection.classList.remove("d-none");
      showQuestion(currentQuestionIndex);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  });

  // Render a single question
  function showQuestion(index) {
    const q = questions[index];
    quizContainer.innerHTML = `
      <div class="mb-3">
        <label class="form-label fw-bold">${q.question}</label>
        <img src="${defaultImage}" alt="Question Image" class="img-fluid my-3 rounded" style="max-height: 300px;">
        ${q.options
          .map(
            (opt, i) => `
              <div class="form-check">
                <input class="form-check-input" type="radio" name="question" id="option${i}" value="${opt}">
                <label class="form-check-label" for="option${i}">${opt}</label>
              </div>
            `
          )
          .join("")}
        <button id="next-btn" type="button" class="btn btn-primary mt-3">
          ${index === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    `;

    // Next or Submit button logic
    document.getElementById("next-btn").addEventListener("click", () => {
      const selected = document.querySelector('input[name="question"]:checked');
      if (!selected) {
        alert("Please select an answer.");
        return;
      }

      userAnswers.push(selected.value);
      currentQuestionIndex++;

      if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
      } else {
        showResult();
      }
    });
  }

  // Show quiz result and breakdown
  function showResult() {
    let score = 0;
    let resultHTML = `
      <div class="p-4 rounded" style="background-color: #f8f9fa;">
        <h3 class="mb-4">🎉 Quiz Summary</h3>
    `;

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const userAnswer = userAnswers[i];
      const correctAnswer = question.correctAnswer;
      const isCorrect = userAnswer === correctAnswer;

      resultHTML += `
        <div class="mb-4 p-3 border rounded" style="background-color: #fff;">
          <p style="color: black;"><strong>Q${i + 1}:</strong> ${question.question}</p>
          ${question.options
            .map((opt) => {
              const isUserSelected = userAnswer === opt;
              const isCorrectOption = opt === correctAnswer;

              let labelStyle = "color: black;";
              if (isCorrectOption && isUserSelected) {
                labelStyle = "color: green; font-weight: bold;";
              } else if (isCorrectOption) {
                labelStyle = "color: green;";
              } else if (isUserSelected) {
                labelStyle = "color: red;";
              }

              return `
                <div class="form-check">
                  <input class="form-check-input" type="radio" disabled ${isUserSelected ? "checked" : ""}>
                  <label class="form-check-label" style="${labelStyle}">
                    ${opt} ${isCorrectOption ? "✅" : ""}
                  </label>
                </div>
              `;
            })
            .join("")}
        </div>
      `;

      if (isCorrect) score++;
    }

    resultHTML += `
        <h4 class="mt-4">Your Score: ${score} / ${questions.length}</h4>
        <button id="restart-btn" class="btn btn-success mt-3">Restart Quiz</button>
        <button id="logout-btn" class="btn btn-danger mt-3 ms-2">Logout</button>
      </div>
    `;

    quizContainer.classList.add("d-none");
    resultDiv.innerHTML = resultHTML;

    // Confetti celebration
    if (typeof confetti === "function") {
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 }
      });
    }

    // Restart logic
    document.getElementById("restart-btn").addEventListener("click", () => {
      userAnswers = [];
      currentQuestionIndex = 0;
      resultDiv.innerHTML = "";
      quizContainer.classList.remove("d-none");
      showQuestion(currentQuestionIndex);
    });

    // Logout logic
    document.getElementById("logout-btn").addEventListener("click", () => {
      resultDiv.innerHTML = "";
      quizContainer.classList.add("d-none");
      loginSection.classList.remove("d-none");
    });
  }
});
