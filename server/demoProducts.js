// Usage:
//   npm run demo:add     -> insert the demo products (safe to run again, no duplicates)
//   npm run demo:remove  -> delete every demo product (SKU starting with DEMO-)
require('dotenv').config();
const { seedDemoProducts, deleteDemoProducts } = require('./services/demoProducts');

const action = process.argv[2];

(async () => {
    try {
        if (action === 'add') {
            const count = await seedDemoProducts();
            console.log(`Added/updated ${count} demo products.`);
        } else if (action === 'remove') {
            const count = await deleteDemoProducts();
            console.log(`Deleted ${count} demo products.`);
        } else {
            console.log('Usage: node demoProducts.js add|remove');
            process.exit(1);
        }
        process.exit(0);
    } catch (err) {
        console.error('Failed:', err.message);
        process.exit(1);
    }
})();
