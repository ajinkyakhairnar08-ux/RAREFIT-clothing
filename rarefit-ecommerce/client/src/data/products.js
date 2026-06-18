// Helper function to generate random price
const generatePrice = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Categories and their subcategories
const categoriesConfig = [
  { name: 'Sunglasses', image: '/sunglasses.png', subcategories: ['Aviator', 'Wayfarer', 'Round', 'Sports', 'Retro'] },
  { name: 'Caps', image: '/caps.png', subcategories: ['Snapback', 'Baseball', 'Trucker', 'Dad Hat', 'Beanie'] },
  { name: 'Watches', image: '/watches.png', subcategories: ['Minimalist', 'Chronograph', 'Digital', 'Analog', 'Smart'] },
  { name: 'Shirts', image: '/shirts.png', subcategories: ['Oversized', 'Normal T-Shirt', 'Relax Fit', 'Aesthetic GenZ'] },
  { name: 'Pants', image: '/pants.png', subcategories: ['Track Pants', 'Oversized', 'Straight Fit', 'Baggy', 'Baggy Track Pant', 'Shorts', 'Jeans', 'Short Jeans'] },
  { name: 'Shoes', image: '/shoes.png', subcategories: ['Sneakers', 'High-Tops', 'Slip-ons', 'Running', 'Casual Boots'] }
];

const adjectives = ['Premium', 'Essential', 'Classic', 'Modern', 'Vintage', 'Aesthetic', 'Sleek', 'Urban', 'Minimal', 'Signature'];

const generateProducts = (count) => {
  const productsList = [];
  for (let i = 1; i <= count; i++) {
    const categoryObj = categoriesConfig[Math.floor(Math.random() * categoriesConfig.length)];
    const subcategory = categoryObj.subcategories[Math.floor(Math.random() * categoryObj.subcategories.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    
    productsList.push({
      id: i,
      name: `${adjective} ${subcategory} ${categoryObj.name}`,
      price: generatePrice(500, 10000),
      category: categoryObj.name,
      subcategory: subcategory,
      image: categoryObj.image, // Removed hardcoded localhost URL for robust deployment
      description: `Elevate your style with our ${adjective.toLowerCase()} ${subcategory.toLowerCase()} ${categoryObj.name.toLowerCase()}. Crafted for the modern aesthetic.`
    });
  }
  return productsList;
};

// Generate 200 Mock Products
export const products = generateProducts(200);
