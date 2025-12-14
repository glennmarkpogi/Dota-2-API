const API = "https://api.opendota.com/api/heroStats";
const ABILITIES_API = "https://api.opendota.com/api/constants/hero_abilities";
const ALL_ABILITIES_API = "https://api.opendota.com/api/constants/abilities";

const container = document.getElementById("hero-container");
const searchInput = document.getElementById("hero-search");
const filterBtns = document.querySelectorAll(".filter-btn");

// Modal Elements
const modal = document.getElementById("hero-modal");
const closeModalBtn = document.querySelector(".close-modal");
const modalImg = document.getElementById("modal-hero-img");
const modalName = document.getElementById("modal-hero-name");
const modalAttr = document.getElementById("modal-hero-attr");
const modalRoles = document.getElementById("modal-hero-roles");
const modalStr = document.getElementById("modal-str");
const modalAgi = document.getElementById("modal-agi");
const modalInt = document.getElementById("modal-int");
const modalAttack = document.getElementById("modal-attack");
const modalSpeed = document.getElementById("modal-speed");
const modalAbilities = document.getElementById("modal-hero-abilities");

// Tooltip Elements
const tooltip = document.getElementById("ability-tooltip");
const tooltipTitle = document.getElementById("tooltip-title");
const tooltipDesc = document.getElementById("tooltip-desc");

let heroes = [];
let heroAbilitiesMap = {};
let allAbilities = {};
let currentFilter = "*";

// ATTRIBUTE MAPPING
const ATTR_MAP = {
  str: { name: "Strength", color: "#ec3d06" },
  agi: { name: "Agility", color: "#26e030" },
  int: { name: "Intelligence", color: "#00d9ff" },
  all: { name: "Universal", color: "#c288f0" }
};

// FETCH DATA
async function fetchData() {
  try {
    const [heroesRes, abilitiesRes, allAbilitiesRes] = await Promise.all([
      fetch(API),
      fetch(ABILITIES_API),
      fetch(ALL_ABILITIES_API)
    ]);

    if (!heroesRes.ok || !abilitiesRes.ok || !allAbilitiesRes.ok) throw new Error("Failed to fetch data");

    heroes = await heroesRes.json();
    heroAbilitiesMap = await abilitiesRes.json();
    allAbilities = await allAbilitiesRes.json();

    renderHeroes(heroes);
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p style='text-align:center; width:100%;'>Failed to load heroes. Please try again later.</p>";
  }
}

// RENDER HERO LIST
function renderHeroes(data) {
  container.innerHTML = "";
  
  // Sort alphabetically by default
  const sorted = [...data].sort((a, b) => a.localized_name.localeCompare(b.localized_name));

  sorted.forEach(hero => {
    const template = document
      .getElementById("hero-card-template")
      .content.cloneNode(true);

    const card = template.querySelector(".hero-card");
    
    // Add attribute class for styling
    const attrKey = hero.primary_attr;
    card.classList.add(`attr-${attrKey}`);

    // Name
    template.querySelector(".hero-name").innerText = hero.localized_name;

    // Image
    const mainImg = getHeroImage(hero);
    const imgEl = template.querySelector(".hero-main-img");
    imgEl.src = mainImg;
    imgEl.alt = hero.localized_name;

    // Attribute Badge
    const badge = template.querySelector(".hero-attr-badge");
    badge.style.backgroundColor = ATTR_MAP[attrKey]?.color || "#ccc";
    badge.title = ATTR_MAP[attrKey]?.name || attrKey;

    // Attack Type
    template.querySelector(".hero-attack-type").innerText = hero.attack_type;

    // Roles
    const rolesDiv = template.querySelector(".hero-roles");
    if (hero.roles) {
      hero.roles.forEach(role => {
        const span = document.createElement("span");
        span.className = "role-tag";
        span.innerText = role;
        rolesDiv.appendChild(span);
      });
    }

    // Stats
    template.querySelector(".val-str").innerText = hero.base_str + " + " + hero.str_gain.toFixed(1);
    template.querySelector(".val-agi").innerText = hero.base_agi + " + " + hero.agi_gain.toFixed(1);
    template.querySelector(".val-int").innerText = hero.base_int + " + " + hero.int_gain.toFixed(1);

    // CLICK EVENT FOR MODAL
    card.addEventListener("click", () => openModal(hero));

    container.appendChild(template);
  });
}

// OPEN MODAL
function openModal(hero) {
  modalImg.src = getHeroImage(hero);
  modalName.innerText = hero.localized_name;
  modalAttr.innerText = ATTR_MAP[hero.primary_attr]?.name || hero.primary_attr;
  modalAttr.style.color = ATTR_MAP[hero.primary_attr]?.color || "#fff";

  // Roles
  modalRoles.innerHTML = "";
  hero.roles.forEach(role => {
    const span = document.createElement("span");
    span.className = "role-tag";
    span.innerText = role;
    modalRoles.appendChild(span);
  });

  // Stats
  modalStr.innerText = `${hero.base_str} + ${hero.str_gain.toFixed(1)}`;
  modalAgi.innerText = `${hero.base_agi} + ${hero.agi_gain.toFixed(1)}`;
  modalInt.innerText = `${hero.base_int} + ${hero.int_gain.toFixed(1)}`;
  
  modalAttack.innerText = `${hero.base_attack_min} - ${hero.base_attack_max}`;
  modalSpeed.innerText = hero.move_speed;

  // Abilities
  modalAbilities.innerHTML = "";
  const abilities = heroAbilitiesMap[hero.name]?.abilities || [];
  
  abilities.forEach(abilityName => {
    if (abilityName === "generic_hidden") return; // Skip hidden slots
    
    const abilityData = allAbilities[abilityName];
    const img = document.createElement("img");
    img.src = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${abilityName}.png`;
    img.className = "ability-img";
    img.alt = abilityName;
    img.onerror = () => img.style.display = "none"; // Hide if image fails
    
    // Tooltip Events
    img.addEventListener("mouseenter", (e) => {
      const name = abilityData?.dname || abilityName.replace(/_/g, " ");
      const desc = abilityData?.desc || "No description available.";
      
      tooltipTitle.innerText = name;
      tooltipDesc.innerText = desc;
      tooltip.classList.remove("hidden");
      moveTooltip(e);
    });

    img.addEventListener("mousemove", moveTooltip);

    img.addEventListener("mouseleave", () => {
      tooltip.classList.add("hidden");
    });

    modalAbilities.appendChild(img);
  });

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function moveTooltip(e) {
  const x = e.clientX;
  const y = e.clientY;
  
  // Offset to avoid cursor covering tooltip
  tooltip.style.left = `${x + 15}px`;
  tooltip.style.top = `${y - 10}px`;
}

// CLOSE MODAL
function closeModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});

// HERO MAIN IMAGE
function getHeroImage(hero) {
  // Use Valve's CDN for images as OpenDota API might not serve them directly
  return `https://cdn.cloudflare.steamstatic.com${hero.img}`;
}

// FILTER LOGIC
function applyFilters() {
  const term = searchInput.value.toLowerCase();
  
  const filtered = heroes.filter(hero => {
    // Text Search
    const matchesSearch = hero.localized_name.toLowerCase().includes(term);
    
    // Attribute Filter
    const matchesAttr = currentFilter === "*" || hero.primary_attr === currentFilter;

    return matchesSearch && matchesAttr;
  });

  renderHeroes(filtered);
}

// EVENT LISTENERS
searchInput.addEventListener("input", applyFilters);

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Update active state
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Update filter
    currentFilter = btn.dataset.filter;
    applyFilters();
  });
});

// INIT
fetchData();
