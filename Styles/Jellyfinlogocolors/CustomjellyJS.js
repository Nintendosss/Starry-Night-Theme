function waitForElement(els, func, timeout = 100) {
  const queries = els.map((el) => document.querySelector(el));
  if (queries.every((a) => a)) {
    func(queries);
  } else if (timeout > 0) {
    setTimeout(waitForElement, 300, els, func, --timeout);
  } else {
    console.log('[StarryNight] Elementos não encontrados:', els);
  }
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

waitForElement(['body'], ([body]) => {
  console.log("[StarryNight] Iniciando fundo estrelado...");

  const oldContainer = document.querySelector('.starrynight-bg-container');
  if (oldContainer) {
    console.log("[StarryNight] Removendo container antigo");
    oldContainer.remove();
  }

  const backgroundContainer = document.createElement('div');
  backgroundContainer.className = 'starrynight-bg-container';


  const hour = new Date().getHours();
  let gradient;

  if (hour >= 6 && hour < 12) {

    gradient = 'linear-gradient(100deg, #9b5ee0 0%, #2534b8 100%)';
  } else if (hour >= 12 && hour < 18) {
   
    gradient = 'linear-gradient(120deg, #9b5ee0 0%, #2534b8 100%)';
  } else if (hour >= 18 && hour < 20) {

    gradient = 'linear-gradient(150deg, #9b5ee0 0%, #2534b8 100%)';
  } else {
    gradient = 'linear-gradient(180deg, #9b5ee0 0%, #2534b8 100%)';
  }

  backgroundContainer.style.background = gradient;
  backgroundContainer.style.transition = 'background 2s ease';

  body.appendChild(backgroundContainer);

  // Adiciona estrelas
  const canvasSize = window.innerWidth * window.innerHeight;
  const starsFraction = canvasSize / 4000;
  for (let i = 0; i < starsFraction; i++) {
    const size = Math.random() < 0.5 ? 1 : 2;
    const star = document.createElement('div');

    star.style.position = 'absolute';
    star.style.left = `${random(0, 99)}%`;
    star.style.top = `${random(0, 99)}%`;
    star.style.opacity = random(0.5, 1);
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.background = 'white';
    star.style.borderRadius = '50%';

    if (Math.random() < 0.2) {
      const animNum = Math.floor(Math.random() * 4) + 1;
      star.style.setProperty("animation", `twinkle${animNum} 5s infinite`, "important");
    }

    backgroundContainer.appendChild(star);
  }

  // Adiciona estrelas cadentes
  for (let i = 0; i < 4; i++) {
    const shootingstar = document.createElement('span');
    shootingstar.className = 'shootingstar';

    if (Math.random() < 0.75) {
      shootingstar.style.top = '-4px';
      shootingstar.style.right = `${random(0, 90)}%`;
    } else {
      shootingstar.style.top = `${random(0, 50)}%`;
      shootingstar.style.right = '-4px';
    }

    shootingstar.style.position = 'absolute';
    shootingstar.style.width = '2px';
    shootingstar.style.height = '80px';
    shootingstar.style.background = 'linear-gradient(white, transparent)';
    shootingstar.style.borderRadius = '2px';
    shootingstar.style.transform = 'rotate(45deg)';
    shootingstar.style.animationName = 'shoot';
    shootingstar.style.animationTimingFunction = 'ease-out';
    shootingstar.style.animationDuration = `${Math.floor(Math.random() * 3) + 3}s`;
    shootingstar.style.animationDelay = `${Math.floor(Math.random() * 7)}s`;
    shootingstar.style.animationIterationCount = 'infinite';

    backgroundContainer.appendChild(shootingstar);

    shootingstar.addEventListener('animationend', () => {
      if (Math.random() < 0.75) {
        shootingstar.style.top = '-4px';
        shootingstar.style.right = `${random(0, 90)}%`;
      } else {
        shootingstar.style.top = `${random(0, 50)}%`;
        shootingstar.style.right = '-4px';
      }
      shootingstar.style.animation = 'none';
      void shootingstar.offsetWidth;
      shootingstar.style.animation = '';
      shootingstar.style.setProperty("animation-duration", `${Math.floor(Math.random() * 4) + 3}s`, "important");
    });
  }

  console.log("[StarryNight] Fundo estrelado aplicado!");
});
