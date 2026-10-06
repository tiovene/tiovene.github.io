// =========================================================
// INTERATIVIDADE - SITE TIO VENÉ
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      menuToggle.classList.toggle("active");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.classList.remove("active");
      });
    });
  }

  // 2. Navbar Scroll Glow
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.style.background = "rgba(10, 14, 23, 0.92)";
      navbar.style.padding = "0.75rem 0";
    } else {
      navbar.style.background = "rgba(10, 14, 23, 0.7)";
      navbar.style.padding = "1rem 0";
    }
  });

  // 3. Mini Desafio Interativo do Tio Vené
  const optionBtns = document.querySelectorAll(".option-btn");
  const feedbackEl = document.getElementById("challenge-feedback");

  optionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isCorrect = btn.getAttribute("data-correct") === "true";

      optionBtns.forEach((b) => {
        b.classList.remove("correct", "wrong");
        b.disabled = true;
      });

      if (isCorrect) {
        btn.classList.add("correct");
        feedbackEl.innerHTML = `
          <div style="color: #34d399; text-align: center; animation: fadeIn 0.4s ease;">
            🎉 <strong>ACERTOU EM CHEIO!</strong> O padrão é <em>(anterior &times; 2) + 1</em>: <code>(31 &times; 2) + 1 = 63</code>.<br>
            <span style="font-size: 0.9rem; color: #a7f3d0;">Você tem faro de medalhista olímpico! Que tal aprender mais desafios como esse com o Tio Vené?</span>
          </div>
        `;
        launchConfetti();
      } else {
        btn.classList.add("wrong");
        feedbackEl.innerHTML = `
          <div style="color: #f87171; text-align: center; animation: fadeIn 0.4s ease;">
            ❌ <strong>Quase lá!</strong> Observe: 3 &rarr; 7 (dobra e soma 1), 7 &rarr; 15, 15 &rarr; 31...<br>
            <button id="retry-btn" style="margin-top: 8px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 4px 12px; border-radius: 99px; cursor: pointer; font-size: 0.85rem;">Tentar novamente 🔄</button>
          </div>
        `;

        const retryBtn = document.getElementById("retry-btn");
        if (retryBtn) {
          retryBtn.addEventListener("click", () => {
            optionBtns.forEach((b) => {
              b.classList.remove("correct", "wrong");
              b.disabled = false;
            });
            feedbackEl.innerHTML = "";
          });
        }
      }
    });
  });

  // 4. FAQ Accordion
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isActive = item.classList.contains("active");

      // Fecha outros itens
      document.querySelectorAll(".accordion-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
      });

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // 5. Efeito de confetes animados simples e leve
  function launchConfetti() {
    const emojis = ["🏆", "✨", "🚀", "💡", "⭐", "🎉"];
    const container = document.body;

    for (let i = 0; i < 28; i++) {
      const confetti = document.createElement("div");
      confetti.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      confetti.style.position = "fixed";
      confetti.style.left = Math.random() * 95 + "vw";
      confetti.style.top = "-40px";
      confetti.style.fontSize = Math.random() * 20 + 20 + "px";
      confetti.style.pointerEvents = "none";
      confetti.style.zIndex = "9999";
      confetti.style.transition = "transform 2.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 2.5s ease";

      container.appendChild(confetti);

      requestAnimationFrame(() => {
        const xOffset = (Math.random() - 0.5) * 300;
        const yOffset = window.innerHeight + 100;
        const rotation = Math.random() * 720 - 360;
        confetti.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`;
        confetti.style.opacity = "0";
      });

      setTimeout(() => {
        confetti.remove();
      }, 2600);
    }
  }
});
