document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartCount = document.getElementById('cart-count');

    // Enhance each figure with price and Add to cart button, and remove inline size attributes
    document.querySelectorAll('main figure').forEach((figure, index) => {
        const img = figure.querySelector('img');
        if (img) {
            img.removeAttribute('width');
            img.removeAttribute('height');
        }

        // Simple deterministic price so it doesn't change on every reload
        const base = 1.99 + (index % 20) * 0.75;
        const price = (Math.round(base * 100) / 100).toFixed(2);

        const meta = document.createElement('div');
        meta.className = 'product-meta';

        const priceEl = document.createElement('span');
        priceEl.className = 'price';
        priceEl.textContent = '£' + price;

        const btn = document.createElement('button');
        btn.className = 'add-to-cart';
        btn.textContent = 'Add to cart';

        btn.addEventListener('click', () => {
            const title = figure.querySelector('figcaption')?.textContent?.trim() || 'Item';
            cart.push({ title, price });
            cartCount.textContent = cart.length;
            btn.disabled = true;
            btn.textContent = 'Added';
            btn.classList.add('added');
            setTimeout(() => btn.classList.remove('added'), 300);
        });

        meta.appendChild(priceEl);
        meta.appendChild(btn);
        figure.appendChild(meta);
    });

    const cartBtn = document.getElementById('cart-btn');
    cartBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty.');
            return;
        }
        const lines = cart.map((it, i) => `${i + 1}. ${it.title} — £${it.price}`);
        alert(`Cart (${cart.length} items):\n\n` + lines.join('\n'));
    });
});
