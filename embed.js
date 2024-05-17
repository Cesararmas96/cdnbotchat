function getPlaceHolderInitials(name) {
    const [firstName, lastName] = name.split(" ");
  
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    return firstName.substring(0, 2).toUpperCase();
  }
  
  /**
   * @description - This function will toggle the window of the chatbot on desktop
   * And will open the chatbot on another tab on mobile
   * @returns {void}
   */
  function toggleChatbot() {
    console.log(window.innerWidth);
    if (window.innerWidth < 768) {
      return window.open(Zaia.AgentURL, "_blank");
    }
    const container = document.querySelector("#chatbot-container");
    container.classList.toggle("chatbot-container-closed");
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const head = document.querySelector("head");
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.zapgpt.com.br/style.css";
    head.appendChild(link);
  
    const chatBotContainer = document.createElement("div");
    chatBotContainer.id = "chatbot-container";
    chatBotContainer.classList.add("chatbot-container-closed");
  
    const chatBotIframe = document.createElement("iframe");
    chatBotIframe.src = Zaia.AgentURL;
    chatBotIframe.id = "chatbot-iframe";
    chatBotContainer.appendChild(chatBotIframe);
  
    const chatBotFab = document.createElement("button");
    chatBotFab.id = "chatbot-fab";
    chatBotFab.classList.add("button-hidden");
  
    chatBotFab.addEventListener("click", toggleChatbot);
    document.body.appendChild(chatBotContainer);
    document.body.appendChild(chatBotFab);
  
    /** @description - Listen to iFrame Events to render the widget buttons */
    window.addEventListener("message", function (event) {
      if (event.data.type === "open-widget") {
        const chatbotContainer = document.querySelector("#chatbot-container");
        chatbotContainer?.classList.remove("chatbot-container-closed");
      }
  
      if (event.data.type === "close-widget") {
        const chatbotContainer = document.querySelector("#chatbot-container");
        chatbotContainer?.classList.toggle("chatbot-container-closed");
      }
  
      if (event.data.payload && event.data.type === "widget-data") {
        /**
         * @typedef {object} Message
         * @property {number} id
         * @property {string} pictureURL
         * @property {string} name
         */
        const payload = event.data.payload;
  
        /** @type {HTMLImageElement} */
        if (payload.pictureURL) {
          const chatBotFabIcon = document.createElement("img");
          chatBotFabIcon.src = payload.pictureURL;
          chatBotFabIcon.id = "chatbot-picture";
          chatBotFab.appendChild(chatBotFabIcon);
        } else {
          const placeholder = document.createElement("div")
          placeholder.id = "chatbot-placeholder";
          placeholder.innerText = getPlaceHolderInitials(payload.name);
          placeholder.style.background = 'linear-gradient(to right, #5D43DC, #8C2ACD)';
          placeholder.style.width = '60px';
          placeholder.style.height = '60px';
          placeholder.style.display = 'flex';
          placeholder.style.justifyContent = 'center';
          placeholder.style.alignItems = 'center';
          placeholder.style.fontWeight = '400';
          placeholder.style.fontSize = '20px';
          placeholder.style.color = '#ffffff';
          placeholder.style.backgroundImage = 'linear-gradient(to right, #5D43DC, #8C2ACD)';
          placeholder.style.borderRadius = '100%';
          chatBotFab.appendChild(placeholder);
        }
        document.querySelector("#chatbot-fab").classList.remove("button-hidden");
      }
    });
  });