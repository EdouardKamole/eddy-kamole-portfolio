// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', () => {
    // Sticky navbar behavior
    const navbar = document.querySelector('.navbar');

    // Add scroll event listener for sticky navbar and scrolled class
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Adjust this value based on when you want the effect to trigger
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialize EmailJS with your public key
    emailjs.init("i3ZSoMnIWI1x_CWAg");

   // Dark mode initialization
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

// Set the theme when the page loads
document.documentElement.setAttribute('data-theme', currentTheme);

// Update theme based on user's click
themeToggleBtn.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

});

// Enhanced Contact Form Handling with EmailJS
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;

    try {
        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            to_name: 'Portfolio Owner', // Customize this as needed
            reply_to: document.getElementById('email').value
        };

        // Send email using EmailJS
        const response = await emailjs.send(
            'service_0786244952',
            'template_o642uol',
            templateParams
        );

        if (response.status === 200) {
            // Show success message
            const successMessage = document.getElementById('success-message');
            successMessage.style.display = 'block';
            successMessage.textContent = 'Message sent successfully!';
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }

    } catch (error) {
        console.error('Error:', error);
        const errorMessage = document.getElementById('error-message') || document.createElement('div');
        errorMessage.id = 'error-message';
        errorMessage.style.color = 'red';
        errorMessage.textContent = 'Failed to send message. Please try again later.';
        contactForm.appendChild(errorMessage);
    } finally {
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
});

// Enhanced Chatbox Implementation



// Chatbox Styles
const styles = `
  #chatbox-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 350px;
    max-height: 500px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-family: Arial, sans-serif;
    display: none;
  }

  #chatbox-header {
    background: #1e3a8a;
    color: #ffffff;
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }

  #chatbox-body {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    background: #f0f9ff;
  }

  .chat-message {
    margin: 10px 0;
    display: flex;
    align-items: flex-start;
  }

  .chat-message.user {
    justify-content: flex-end;
  }

  .chat-message .message {
    max-width: 70%;
    padding: 10px;
    border-radius: 10px;
    background: #e0f2fe;
  }

  .chat-message.user .message {
    background: #1e3a8a;
    color: #ffffff;
  }

  #chatbox-input {
    display: flex;
    padding: 10px;
    background: #ffffff;
  }

  #chatbox-input input {
    flex: 1;
    padding: 10px;
    border: 1px solid #1e3a8a;
    border-radius: 5px;
    font-size: 16px;
  }

  #chatbox-input button {
    margin-left: 10px;
    padding: 10px 15px;
    background: #1e3a8a;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    color: #ffffff;
  }

  #chatbox-icon {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background: #1e3a8a;
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  #chatbox-icon img {
    width: 30px;
    height: 30px;
  }

  #voice-input-btn {
    margin-left: 10px;
    padding: 10px 15px;
    background: #10b981;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    color: #ffffff;
  }
`;

// Append the styles to the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// Chatbox HTML
const chatboxHTML = `
  <div id="chatbox-container">
    <div id="chatbox-header">Tech Wizard Chat</div>
    <div id="chatbox-body"></div>
    <div id="chatbox-input">
      <input type="text" id="chatbox-text" placeholder="Ask me anything..." />
      <button id="chatbox-send">Send</button>
      <button id="voice-input-btn">🎤</button>
    </div>
  </div>
  <div id="chatbox-icon">
    <img src="https://img.icons8.com/ios-glyphs/30/000000/chat--v1.png" alt="Chat Icon" />
  </div>
`;

document.body.insertAdjacentHTML("beforeend", chatboxHTML);

// Chatbox Functionality
const chatboxContainer = document.getElementById("chatbox-container");
const chatboxIcon = document.getElementById("chatbox-icon");
const chatboxHeader = document.getElementById("chatbox-header");
const chatboxBody = document.getElementById("chatbox-body");
const chatboxInput = document.getElementById("chatbox-text");
const chatboxSend = document.getElementById("chatbox-send");
const voiceInputBtn = document.getElementById("voice-input-btn");

// Toggle Chatbox Visibility
chatboxIcon.addEventListener("click", () => {
  chatboxContainer.style.display = "flex";
  chatboxIcon.style.display = "none";
});

chatboxHeader.addEventListener("click", () => {
  chatboxContainer.style.display = "none";
  chatboxIcon.style.display = "flex";
});

// Predefined Responses
const responses = {
  hello: "Hi there! I'm Eddy Kamole, also known as Tech Wizard. How can I assist you today?",
  "how are you": "i'm good what about you",
  "how is life": "life is good  can we pleas talk about eddy? how can i help you",
  "who is eddy": "Eddy Kamole is a 25-year-old Congolese software engineer with a degree in Computer Science. He has expertise in web development, app development, blockchain, machine learning, and artificial intelligence. Eddy is passionate about technology and innovation.",
  "who made you": "I was created by Eddy Kamole to demonstrate his technical expertise in AI, web, and software development.",
  "how can we get eddy": "You can connect with Eddy via his GitHub (EdouardKamole), LinkedIn, or email. Don't hesitate to reach out!",
  "how are you": "I'm just a bot, but I'm great! How about you?",
  "how's life": "Life's good for a chatbot—always here to help and learn!",
  "what's your purpose": "My purpose is to assist you with learning more about Eddy Kamole and to showcase his innovative projects in technology and development.",
  "tell me about eddy": "Eddy Kamole is a skilled software engineer with a degree in Computer Science. He has expertise in web development, mobile apps, blockchain, machine learning, and artificial intelligence. Eddy loves solving problems and building innovative solutions.",
  "where is eddy from": "Eddy is from the Democratic Republic of Congo.",
  "what is machine learning": "Machine learning is a subset of artificial intelligence (AI) where systems learn and improve from experience without being explicitly programmed. Eddy uses it in various applications to predict trends and optimize processes.",
  "what is artificial intelligence": "Artificial Intelligence (AI) is the simulation of human intelligence processes by machines. It includes learning, reasoning, and problem-solving. Eddy is actively working on AI projects and exploring how AI can impact different industries.",
  "what is blockchain": "Blockchain is a decentralized ledger technology that records transactions across many computers, making it tamper-proof. Eddy has experience building blockchain applications, including cryptocurrency-related solutions.",
  "what is web development": "Web development is the process of building websites and web applications. It involves technologies like HTML, CSS, JavaScript, and frameworks like React. Eddy specializes in front-end and back-end web development.",
  "what is app development": "App development involves creating software applications for mobile devices. Eddy has developed apps using technologies like Flutter, React Native, and Swift.",
  "what is the internet of things (iot)": "The Internet of Things (IoT) refers to the network of physical devices connected to the internet, enabling data exchange. Eddy is exploring IoT solutions for smart homes and businesses.",
  "what is cloud computing": "Cloud computing involves delivering computing services like storage, processing, and networking over the internet. Eddy has used cloud platforms like AWS and Azure in his projects.",
  "how do I start learning programming": "To start learning programming, begin with basic concepts like variables, loops, and functions. Eddy recommends learning languages like Python or JavaScript as a beginner.",
  default: "I'm not sure about that, but I’m here to help. Ask me anything else!. but can we talk about Eddy Kamole? How can I assist you?"
};

// Handle User Input
chatboxSend.addEventListener("click", () => handleUserInput(chatboxInput.value));
chatboxInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleUserInput(chatboxInput.value);
});

function handleUserInput(input) {
  const userInput = input.trim().toLowerCase();
  if (!userInput) return;

  addMessage(userInput, "user");
  chatboxInput.value = "";

  // Match response
  let botResponse = responses.default;
  for (const [key, value] of Object.entries(responses)) {
    if (userInput.includes(key)) {
      botResponse = value;
      break;
    }
  }

  addMessage(botResponse, "bot");
  speakResponse(botResponse);
}

// Add Message
function addMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message", sender);

  const messageText = document.createElement("div");
  messageText.classList.add("message");
  messageText.textContent = message;

  messageElement.appendChild(messageText);
  chatboxBody.appendChild(messageElement);
  chatboxBody.scrollTop = chatboxBody.scrollHeight;
}

// Text-to-Speech
function speakResponse(response) {
  const utterance = new SpeechSynthesisUtterance(response);
  utterance.lang = "en-US";
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
}

// Voice Recognition
const recognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
    ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    : null;

if (recognition) {
  recognition.continuous = false;
  recognition.interimResults = false;

  voiceInputBtn.addEventListener("click", () => {
    recognition.start();
  });

  recognition.onresult = (event) => {
    const voiceInput = event.results[0][0].transcript;
    addMessage(voiceInput, "user");
    handleUserInput(voiceInput);
  };

  recognition.onerror = () => {
    addMessage("Sorry, I didn't catch that. Try again!", "bot");
  };
} else {
  voiceInputBtn.style.display = "none";
}
