document.addEventListener("DOMContentLoaded", () => {
  // HERO SLIDER
  const slides = [
    {
      title: "Haz crecer tus sueños con espacios impecables",
      subtitle: "Confía en nosotros para cuidar cada detalle de tus lugares de trabajo",
      text: "Generamos ambientes limpios y agradables que inspiran creatividad y mejoran tu desempeño.",
      images: [
        "https://images.pexels.com/photos/9462626/pexels-photo-9462626.jpeg",
        "https://images.pexels.com/photos/9462614/pexels-photo-9462614.jpeg",
        "https://images.pexels.com/photos/9462737/pexels-photo-9462737.jpeg"
      ]
    },
    {
      title: "Calidad Garantizada para tu espacio",
      subtitle: "Profesionales dedicados a tu bienestar",
      text: "Ofrecemos soluciones de limpieza adaptadas a tus necesidades y a tu hogar.",
      images: [
        "https://images.pexels.com/photos/9462206/pexels-photo-9462206.jpeg",
        "https://images.pexels.com/photos/9462665/pexels-photo-9462665.jpeg",
        "https://images.pexels.com/photos/9462192/pexels-photo-9462192.jpeg"
      ]
    },
    {
      title: "Ambientes seguros y agradables",
      subtitle: "Nos adaptamos a tus necesidades",
      text: "Cuidamos cada detalle para brindar bienestar y confianza.",
      images: [
        "https://images.pexels.com/photos/9462614/pexels-photo-9462614.jpeg",
        "https://images.pexels.com/photos/6466489/pexels-photo-6466489.jpeg",
        "https://images.pexels.com/photos/6466478/pexels-photo-6466478.jpeg"
      ]
    }
  ];
  
  let currentIndex = 0;
  let intervalId;
  
  function showSlide(idx) {
    const slide = slides[idx];
    document.getElementById('heroTitle').textContent = slide.title;
    document.getElementById('heroSubtitle').textContent = slide.subtitle;
    document.getElementById('heroText').textContent = slide.text;
    document.getElementById('circleImg1').src = slide.images[0];
    document.getElementById('circleImg2').src = slide.images[1];
    document.getElementById('circleImg3').src = slide.images[2];
  }
  
  function startInterval() {
    stopInterval();
    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }, 10000);
  }
  
  function stopInterval() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
  
  document.getElementById('nextSlide').onclick = function () {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
    startInterval();
  };
  document.getElementById('prevSlide').onclick = function () {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
    startInterval();
  };
  document.getElementById('hero').addEventListener('mouseenter', stopInterval);
  document.getElementById('hero').addEventListener('mouseleave', startInterval);
  showSlide(0);
  startInterval();
  
  // MODAL CONDICIONES
  function openModal() {
    document.getElementById("popup").classList.remove("hidden");
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    document.getElementById("popup").classList.add("hidden");
    document.body.style.overflow = '';
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
  document.getElementById("popup").addEventListener("click", function (e) {
    if (e.target === this) closeModal();
  });
  
  // CARRITO, PRODUCTOS Y POPUP
  const productos = {
    "Paquete Básico": {
      precio: 90000,
      descripcion: "Limpieza general de áreas comunes, pisos, baños y cocina (4 horas de servicio)"
    },
    "Paquete Plus+": {
      precio: 150000,
      descripcion: "Incluye los servicios del paquete básico más limpieza profunda"
    },
    "Paquete Gold": {
      precio: 200000,
      descripcion: "Limpieza completa, detallada y profunda. Incluye todos los servicios del paquete plus+"
    }
  };
  
  const cart = [];
  function addToCart(plan) {
    cart.push(plan);
    actualizarCantidadCarrito();
    updateCartModal();
  }
  function actualizarCantidadCarrito() {
    document.getElementById("cartQty").innerText = cart.length;
  }
  function updateCartModal() {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = "";
    let total = 0;
    cart.forEach((item, idx) => {
      total += productos[item].precio;
      const li = document.createElement("li");
      li.className = "flex items-start gap-2 border-b py-2";
      const check = document.createElement("input");
      check.type = "checkbox";
      check.name = "selectedCart";
      check.value = idx;
      check.className = "mt-1";
      li.appendChild(check);
      const info = document.createElement("div");
      info.className = "flex-1";
      info.innerHTML = `<span class="font-semibold">${item}</span>
        <div class="text-xs text-gray-600">${productos[item].descripcion}</div>
        <div class="text-green-custom font-bold">$${productos[item].precio.toLocaleString("es-CO")}</div>`;
      li.appendChild(info);
      cartList.appendChild(li);
    });
    document.getElementById("cartTotal").innerText = "$" + total.toLocaleString("es-CO");
  }
  function removeSelected() {
    const selected = Array.from(document.querySelectorAll("[name='selectedCart']:checked"))
      .map(el => parseInt(el.value));
    selected.sort((a, b) => b - a).forEach(i => cart.splice(i, 1));
    actualizarCantidadCarrito();
    updateCartModal();
  }
  function comprarSeleccionados() {
    const selected = Array.from(document.querySelectorAll("[name='selectedCart']:checked"))
      .map(el => parseInt(el.value));
    if (selected.length === 0) {
      alert("Por favor selecciona al menos un producto para comprar.");
      return;
    }
    let productosComprados = selected.map(i => cart[i]);
    let total = productosComprados.reduce((sum, item) => sum + productos[item].precio, 0);
    alert("¡Compra realizada!\nProductos: " + productosComprados.join(", ") + "\nTotal: $" + total.toLocaleString("es-CO"));
    selected.sort((a, b) => b - a).forEach(i => cart.splice(i, 1));
    actualizarCantidadCarrito();
    updateCartModal();
  }
  function toggleCart() {
    const cartModal = document.getElementById("cartModal");
    cartModal.classList.toggle("hidden");
    if (!cartModal.classList.contains("hidden")) {
      document.body.style.overflow = 'hidden';
      updateCartModal();
    } else {
      document.body.style.overflow = '';
    }
  }
  
  // TÉRMINOS Y CONDICIONES POPUP
  const openPopup = document.getElementById('popup');
  const closePopup = document.getElementById('closePopup');
  const popup = document.getElementById('popup');
  openPopup.addEventListener('click', () => {
    popup.classList.add('show');
  });
  closePopup.addEventListener('click', () => {
    popup.classList.remove('show');
  });
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.remove('show');
    }
  });
  
  // CHATBOT
  const openChatBtn = document.getElementById('openChatBtn');
  const chatModal = document.getElementById('chatModal');
  const closeChatBtn = document.getElementById('closeChatBtn');
  const chatHistory = document.getElementById('chatHistory');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  
  // Mostrar chat al cargar e inicializar saludo
  chatModal.classList.remove('scale-0', 'opacity-0');
  chatModal.classList.add('scale-100', 'opacity-100');
  addMessage("¡Hola! proximamente podre ayudarte con tus inquietudes sobre nuestros servicios de limpieza.", false);
  
  openChatBtn.addEventListener('click', () => {
    chatModal.classList.remove('scale-0', 'opacity-0');
    chatModal.classList.add('scale-100', 'opacity-100');
  });
  closeChatBtn.addEventListener('click', () => {
    chatModal.classList.remove('scale-100', 'opacity-100');
    chatModal.classList.add('scale-0', 'opacity-0');
  });
  function addMessage(message, fromUser = true) {
    const msg = document.createElement('div');
    msg.textContent = message;
    msg.className = fromUser ? 'text-right text-gray-800 mb-2' : 'text-left text-gray-600 mb-2 italic';
    chatHistory.appendChild(msg);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }
  function botReply(userMessage) {
    const msg = userMessage.toLowerCase();
    if (msg.includes("hola") || msg.includes("buenas")) {
      return "¡Hola! proximamente podre ayudarte con tus inquietudes sobre nuestros servicios de limpieza.";
    }
    if (msg.includes("precio") || msg.includes("cuánto cuesta")) {
      return "¡Hola! proximamente podre ayudarte con tus inquietudes sobre nuestros servicios de limpieza.";
    }
    if (msg.includes("pagos") || msg.includes("pago")) {
      return "¡Hola! proximamente podre ayudarte con tus inquietudes sobre nuestros servicios de limpieza.";
    }
    if (msg.includes("contacto") || msg.includes("whatsapp")) {
      return "¡Hola! proximamente podre ayudarte con tus inquietudes sobre nuestros servicios de limpieza.";
    }
    if (msg.includes("horario") || msg.includes("agenda")) {
      return "¡Hola! proximamente podre ayudarte con tus inquietudes sobre nuestros servicios de limpieza.";
    }
    if (msg.includes("gracias")) {
      return "¡Hola! proximamente podre ayudarte con tus inquietudes sobre nuestros servicios de limpieza.";
    }
    return "¡Hola! proximamente podre ayudarte con tus inquietudes sobre nuestros servicios de limpieza.";
  }
  sendBtn.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message.length > 0) {
      addMessage(message, true);
      setTimeout(() => {
        const reply = botReply(message);
        addMessage(reply, false);
      }, 700);
      chatInput.value = '';
    }
  });
  
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  });
});
