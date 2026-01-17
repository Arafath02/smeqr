
const urlParams = new URLSearchParams(window.location.search);
const client = urlParams.get("client");

// Fetch client JSON
//fetch(`/clients/${client}.json`)
fetch(`clients/${client}.json`)
  .then(response => {
    if (!response.ok) throw new Error("Client JSON not found");
    return response.json();
  })
  .then(data => {
    // Background color
    if (data.colors && data.colors.background) {
      document.body.style.backgroundColor = data.colors.background;
    }

    //Logo
    const logoContainer = document.getElementById("logo-container");
    if (data.logo) {
      const img = document.createElement("img");
      img.src = data.logo;
      img.alt = data.name + " Logo";
      logoContainer.appendChild(img);
    }

    //Header
    const headerEl = document.getElementById("header");
    headerEl.innerText = data.header || data.name;
    if (data.colors && data.colors.textColor) {
      headerEl.style.color = data.colors.textColor;
    }

    //Description
    const descContainer = document.getElementById("description-container");
    if (data.description) {
      descContainer.innerText = data.description;
    }
    if (data.colors && data.colors.textColor) {
      descContainer.style.color = data.colors.textColor;
    }

    //Buttons
    const buttonContainer = document.getElementById("button-container");
    data.links.forEach(link => {
      const btn = document.createElement("button");
      btn.innerText = link.label;

      if (data.colors) {
        if (data.colors.buttonBackground) btn.style.backgroundColor = data.colors.buttonBackground;
        if (data.colors.buttonText) btn.style.color = data.colors.buttonText;
        if (data.colors.buttonBorder) btn.style.borderColor = data.colors.buttonBorder;

        if (data.colors.buttonHover) {
          btn.addEventListener("mouseenter", () => btn.style.backgroundColor = data.colors.buttonHover);
          btn.addEventListener("mouseenter", () => btn.style.color = data.colors.buttonHoverText);
          btn.addEventListener("mouseleave", () => btn.style.color = data.colors.buttonText);
          btn.addEventListener("mouseleave", () => btn.style.backgroundColor = data.colors.buttonBackground);
        }
      }

      // Button click
      btn.onclick = () => {
        window.location.href = link.url;
      };

      buttonContainer.appendChild(btn);
    });
  })
  .catch(err => {
    console.error(err);
    const descContainer = document.getElementById("description-container");
    descContainer.innerText = "Client not found.";
  });

