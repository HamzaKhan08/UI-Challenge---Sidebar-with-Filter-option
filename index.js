// Mock Data
const properties = Array.from({ length: 100 }, (_, x) => ({
  id: x,
  type: x % 2 === 0 ? 'Apartment' : 'House',
  price: (x + 1) * 1000,
  name: `Property ${x + 1}`,
}));

// References to DOM elements
const sidebar = document.getElementById('sidebar');
const propertyList = document.getElementById('propertyList');
const filterApartment = document.getElementById('filterApartment');
const filterHouse = document.getElementById('filterHouse');
const priceRange = document.getElementById('priceRange');
const priceDisplay = document.getElementById('priceDisplay');

// State for filters
const filters = {
  types: [],
  maxPrice: 100000,
};

// Render Property List
function renderProperties() {
  // Filter properties based on filters
  const filteredProperties = properties.filter(
    (property) =>
      (filters.types.length === 0 || filters.types.includes(property.type)) &&
      property.price <= filters.maxPrice
  );

  // Update the DOM
  propertyList.innerHTML = filteredProperties
    .map(
      (property) => `
      <div class="property-card">
        <h3>${property.name}</h3>
        <p>Type: ${property.type}</p>
        <p>Price: $${property.price}</p>
      </div>
    `
    )
    .join('');
}

// Update Filters
filterApartment.addEventListener('change', () => {
  updateTypeFilter('Apartment', filterApartment.checked);
});

filterHouse.addEventListener('change', () => {
  updateTypeFilter('House', filterHouse.checked);
});

priceRange.addEventListener('input', () => {
  filters.maxPrice = Number(priceRange.value);
  priceDisplay.textContent = `Max Price: $${filters.maxPrice}`;
  renderProperties();
});

// Helper: Update Type Filters
function updateTypeFilter(type, isChecked) {
  if (isChecked) {
    filters.types.push(type);
  } else {
    filters.types = filters.types.filter((t) => t !== type);
  }
  renderProperties();
}

// Initial Render
renderProperties();
