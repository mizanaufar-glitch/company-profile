// Tune Street — pure JavaScript app

// ---------- State ----------
const state = {
  page: "home",
  cart: [],
  garage: {
    carId: "r34",
    paintId: "bayside",
    wheelId: "stock",
    bodykitId: "stock",
    wingId: "none",
  },
  catalogFilter: "all",
};

// ---------- DOM helpers ----------
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function showToast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => t.classList.remove("show"), 2200);
}

// ---------- Navigation ----------
function goTo(page) {
  state.page = page;
  $$(".page").forEach((p) => p.classList.remove("active"));
  $(`#page-${page}`)?.classList.add("active");
  $$(".nav-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.page === page);
  });
  if (page === "catalog") renderCatalog();
  if (page === "garage") renderGarage();
  if (page === "cart") renderCart();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------- Cart ----------
function updateCartBadge() {
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  $("#cart-count").textContent = count;
}

function addToCart(item) {
  const existing = state.cart.find((c) => c.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ ...item, qty: 1 });
  }
  updateCartBadge();
  showToast(`Added ${item.name} to cart`);
}

function removeFromCart(id) {
  state.cart = state.cart.filter((c) => c.id !== id);
  updateCartBadge();
  renderCart();
}

function clearCart() {
  state.cart = [];
  updateCartBadge();
  renderCart();
  showToast("Cart cleared");
}

function cartTotal() {
  return state.cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function renderCart() {
  const list = $("#cart-items");
  if (state.cart.length === 0) {
    list.innerHTML = `<div class="empty-cart">Your cart is empty.<br>Browse the catalog or build a car in the garage.</div>`;
    $("#cart-total").textContent = formatPrice(0);
    return;
  }
  list.innerHTML = state.cart
    .map(
      (item) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span>${item.qty > 1 ? `Qty: ${item.qty}` : ""} ${item.meta || ""}</span>
      </div>
      <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
      <button class="cart-item-remove" data-id="${item.id}" title="Remove">×</button>
    </div>
  `
    )
    .join("");
  $("#cart-total").textContent = formatPrice(cartTotal());

  list.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", () => removeFromCart(btn.dataset.id));
  });
}

// ---------- Catalog ----------
function renderCatalog() {
  const grid = $("#catalog-grid");
  const filtered =
    state.catalogFilter === "all"
      ? PARTS
      : PARTS.filter((p) => p.category === state.catalogFilter);

  grid.innerHTML = filtered
    .map(
      (p) => `
    <article class="card">
      <div class="card-visual">${p.emoji}</div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <div class="brand">${p.brand} · ${p.category}</div>
        <div class="card-footer">
          <span class="price">${formatPrice(p.price)}</span>
          <button class="btn small primary add-part" data-id="${p.id}">Add</button>
        </div>
      </div>
    </article>
  `
    )
    .join("");

  grid.querySelectorAll(".add-part").forEach((btn) => {
    btn.addEventListener("click", () => {
      const part = PARTS.find((p) => p.id === btn.dataset.id);
      if (part) addToCart({ id: part.id, name: part.name, price: part.price });
    });
  });
}

function renderHomeParts() {
  const grid = $("#home-parts");
  const featured = PARTS.slice(0, 4);
  grid.innerHTML = featured
    .map(
      (p) => `
    <article class="card">
      <div class="card-visual">${p.emoji}</div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <div class="brand">${p.brand}</div>
        <div class="card-footer">
          <span class="price">${formatPrice(p.price)}</span>
          <button class="btn small primary add-part" data-id="${p.id}">Add</button>
        </div>
      </div>
    </article>
  `
    )
    .join("");

  grid.querySelectorAll(".add-part").forEach((btn) => {
    btn.addEventListener("click", () => {
      const part = PARTS.find((p) => p.id === btn.dataset.id);
      if (part) addToCart({ id: part.id, name: part.name, price: part.price });
    });
  });
}

function renderHomeCars() {
  const grid = $("#home-cars");
  grid.innerHTML = CARS.map(
    (c) => `
    <article class="card">
      <div class="card-visual">${c.emoji}</div>
      <div class="card-body">
        <h3>${c.name}</h3>
        <div class="brand">Starting from ${formatPrice(c.basePrice)}</div>
        <div class="card-footer">
          <button class="btn small primary go-garage" data-car="${c.id}">Customize</button>
        </div>
      </div>
    </article>
  `
  ).join("");

  grid.querySelectorAll(".go-garage").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.garage.carId = btn.dataset.car;
      goTo("garage");
    });
  });
}

// ---------- Garage ----------
function calcBuildPrice() {
  const car = CARS.find((c) => c.id === state.garage.carId);
  const wheel = WHEELS.find((w) => w.id === state.garage.wheelId);
  const kit = BODYKITS.find((b) => b.id === state.garage.bodykitId);
  const wing = WINGS.find((w) => w.id === state.garage.wingId);
  return (car?.basePrice || 0) + (wheel?.price || 0) + (kit?.price || 0) + (wing?.price || 0);
}

function applyGarageVisuals() {
  const paint = PAINTS.find((p) => p.id === state.garage.paintId);
  const wheel = WHEELS.find((w) => w.id === state.garage.wheelId);
  const kit = BODYKITS.find((b) => b.id === state.garage.bodykitId);
  const wing = WINGS.find((w) => w.id === state.garage.wingId);
  const car = CARS.find((c) => c.id === state.garage.carId);

  const body = $("#car-body");
  if (paint) {
    body.style.color = paint.color;
  }

  // wheels
  $$(".wheel").forEach((w) => {
    w.style.borderColor = wheel?.rimColor || "#555";
  });

  // body kit
  const front = $("#bodykit-front");
  const side = $("#bodykit-side");
  const hasKit = kit && kit.id !== "stock";
  front.classList.toggle("visible", hasKit);
  side.classList.toggle("visible", hasKit);

  // wing
  const wingEl = $("#car-wing");
  wingEl.classList.toggle("visible", wing && wing.id !== "none");
  wingEl.classList.toggle("big", wing && wing.id === "voltex");

  $("#car-label").textContent = car?.name || "";
  $("#build-price").textContent = formatPrice(calcBuildPrice());
}

function renderGarage() {
  // Car options
  const carOpts = $("#car-options");
  carOpts.innerHTML = CARS.map(
    (c) =>
      `<button class="option-btn ${state.garage.carId === c.id ? "active" : ""}" data-car="${c.id}">${c.short}</button>`
  ).join("");
  carOpts.querySelectorAll(".option-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.garage.carId = btn.dataset.car;
      renderGarage();
    });
  });

  // Paint
  const paintOpts = $("#paint-options");
  paintOpts.innerHTML = PAINTS.map(
    (p) =>
      `<button class="color-swatch ${state.garage.paintId === p.id ? "active" : ""}" style="background:${p.color}" data-paint="${p.id}" title="${p.name}"></button>`
  ).join("");
  paintOpts.querySelectorAll(".color-swatch").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.garage.paintId = btn.dataset.paint;
      renderGarage();
    });
  });

  // Wheels
  const wheelOpts = $("#wheel-options");
  wheelOpts.innerHTML = WHEELS.map(
    (w) =>
      `<button class="option-btn ${state.garage.wheelId === w.id ? "active" : ""}" data-wheel="${w.id}">${w.name}${w.price ? " · " + formatPrice(w.price) : ""}</button>`
  ).join("");
  wheelOpts.querySelectorAll(".option-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.garage.wheelId = btn.dataset.wheel;
      renderGarage();
    });
  });

  // Body kit
  const kitOpts = $("#bodykit-options");
  kitOpts.innerHTML = BODYKITS.map(
    (b) =>
      `<button class="option-btn ${state.garage.bodykitId === b.id ? "active" : ""}" data-kit="${b.id}">${b.name}${b.price ? " · " + formatPrice(b.price) : ""}</button>`
  ).join("");
  kitOpts.querySelectorAll(".option-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.garage.bodykitId = btn.dataset.kit;
      renderGarage();
    });
  });

  // Wing
  const wingOpts = $("#wing-options");
  wingOpts.innerHTML = WINGS.map(
    (w) =>
      `<button class="option-btn ${state.garage.wingId === w.id ? "active" : ""}" data-wing="${w.id}">${w.name}${w.price ? " · " + formatPrice(w.price) : ""}</button>`
  ).join("");
  wingOpts.querySelectorAll(".option-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.garage.wingId = btn.dataset.wing;
      renderGarage();
    });
  });

  applyGarageVisuals();
}

function addBuildToCart() {
  const car = CARS.find((c) => c.id === state.garage.carId);
  const paint = PAINTS.find((p) => p.id === state.garage.paintId);
  const wheel = WHEELS.find((w) => w.id === state.garage.wheelId);
  const kit = BODYKITS.find((b) => b.id === state.garage.bodykitId);
  const wing = WINGS.find((w) => w.id === state.garage.wingId);

  const parts = [paint?.name, wheel?.name, kit?.name, wing?.name]
    .filter(Boolean)
    .join(" · ");

  const id = `build-${state.garage.carId}-${Date.now()}`;
  addToCart({
    id,
    name: `${car.name} Build`,
    price: calcBuildPrice(),
    meta: parts,
  });
}

// ---------- Init ----------
function init() {
  // Nav clicks
  $$("[data-page]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const page = el.dataset.page;
      if (page) goTo(page);
    });
  });

  // Catalog filters
  $$(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.catalogFilter = btn.dataset.filter;
      $$(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderCatalog();
    });
  });

  // Cart actions
  $("#clear-cart")?.addEventListener("click", clearCart);
  $("#checkout-btn")?.addEventListener("click", () => {
    if (state.cart.length === 0) {
      showToast("Cart is empty");
      return;
    }
    showToast("Demo checkout — thank you!");
    clearCart();
  });

  $("#add-build-to-cart")?.addEventListener("click", addBuildToCart);

  // Initial render
  renderHomeCars();
  renderHomeParts();
  updateCartBadge();
  goTo("home");
}

document.addEventListener("DOMContentLoaded", init);
