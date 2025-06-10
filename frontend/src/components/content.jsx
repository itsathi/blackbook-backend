import React from 'react';

const products = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: `$${(Math.random() * 100 + 10).toFixed(2)}`,
    image: `https://picsum.photos/200/200?random=${i + 1}`,
}));

function Content() {
    return (
        <section style={{ padding: '2rem' }}>
            <h2>Random Products</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1.5rem',
                marginTop: '1rem'
            }}>
                {products.map(product => (
                    <div key={product.id} style={{
                        border: '1px solid #eee',
                        borderRadius: '8px',
                        padding: '1rem',
                        textAlign: 'center',
                        background: '#fafafa'
                    }}>
                        <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '4px' }} />
                        <h3 style={{ margin: '0.5rem 0' }}>{product.name}</h3>
                        <p style={{ color: '#555' }}>{product.price}</p>
                        <button style={{
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '4px',
                            background: '#007bff',
                            color: '#fff',
                            cursor: 'pointer'
                        }}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Content;