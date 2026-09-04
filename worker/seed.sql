-- Seed data for SĀRI

-- Admin user (password: admin123 — bcrypt hash placeholder, replace with real hash)
INSERT INTO users (name, email, password_hash, role) VALUES
('Admin', 'admin@sari.com', '$2b$10$placeholder_replace_with_bcrypt_hash', 'admin');

-- Categories
INSERT INTO categories (name, slug, image, display_order, active) VALUES
('Silk Sarees', 'silk', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80', 1, 1),
('Kanchipuram', 'kanchipuram', 'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=800&q=80', 2, 1),
('Cotton Sarees', 'cotton', 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&q=80', 3, 1),
('Designer', 'designer', 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&q=80', 4, 1),
('Bridal', 'bridal', 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=800&q=80', 5, 1),
('Party Wear', 'party-wear', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 6, 1);

-- Products
INSERT INTO products (name, slug, category_id, price, sale_price, description, fabric, stock, featured, new_arrival, active) VALUES
('Ruby Zari Kanchipuram Silk', 'ruby-zari-kanchipuram-silk', 2, 18999, 14999, 'A timeless Kanchipuram silk saree woven with traditional zari craftsmanship and a contemporary colour story.', 'Pure Kanchipuram Silk', 3, 1, 1, 1),
('Ivory Temple Kanjivaram', 'ivory-temple-kanjivaram', 2, 22999, NULL, 'An ivory Kanjivaram with temple-border motifs in antique gold zari.', 'Pure Kanchipuram Silk', 5, 1, 0, 1),
('Midnight Banarasi Silk', 'midnight-banarasi-silk', 1, 12999, NULL, 'Deep navy Banarasi with silver brocade work. For the woman who makes silence look loud.', 'Pure Banarasi Silk', 8, 1, 1, 1),
('Blush Organza Designer', 'blush-organza-designer', 4, 8999, 6999, 'Sheer blush organza with hand-embroidered floral accents.', 'Pure Organza', 12, 0, 1, 1),
('Bridal Crimson Patola', 'bridal-crimson-patola', 5, 34999, NULL, 'Double-ikat Patola in bridal crimson. A rare weave that takes months to complete.', 'Pure Silk Patola', 2, 1, 0, 1),
('Emerald Chanderi Cotton', 'emerald-chanderi-cotton', 3, 4999, NULL, 'Lightweight emerald Chanderi cotton with gold buti.', 'Chanderi Cotton Silk', 20, 0, 1, 1),
('Gold Tissue Party Silk', 'gold-tissue-party-silk', 6, 9999, NULL, 'Tissue silk that catches every light in the room.', 'Tissue Silk', 7, 1, 1, 1),
('Sage Linen Handloom', 'sage-linen-handloom', 3, 3499, NULL, 'Breathable sage linen handloom. Effortlessly expensive.', 'Handloom Linen', 15, 0, 0, 1),
('Burgundy Benarasi Brocade', 'burgundy-benarasi-brocade', 1, 15999, NULL, 'Rich burgundy Banarasi with antique gold brocade.', 'Pure Banarasi Silk', 4, 1, 0, 1),
('Dusty Rose Georgette', 'dusty-rose-georgette', 4, 7499, NULL, 'Flowy georgette in dusty rose with subtle sequin embroidery.', 'Premium Georgette', 9, 0, 1, 1),
('Cobalt Blue Pochampally', 'cobalt-blue-pochampally', 1, 11999, NULL, 'Vibrant cobalt Pochampally ikat with geometric patterns.', 'Ikat Silk', 6, 0, 0, 1),
('Champagne Chiffon Embroidered', 'champagne-chiffon-embroidered', 6, 6999, 5499, 'Delicate champagne chiffon with cut-dana embroidery.', 'French Chiffon', 11, 0, 1, 1),
('Marigold Kanchi Pure Silk', 'marigold-kanchi-pure-silk', 2, 19999, NULL, 'Marigold Kanchipuram with peacock motifs in contrasting border.', 'Pure Kanchipuram Silk', 3, 0, 1, 1),
('Indigo Block Print Cotton', 'indigo-block-print-cotton', 3, 2999, NULL, 'Hand block-printed indigo cotton from Bagru.', 'Hand Block Print Cotton', 25, 0, 0, 1),
('Bridal Red Kanchi Silk', 'bridal-red-kanchi-silk', 5, 42999, NULL, 'The quintessential bridal Kanchipuram in vermilion red.', 'Pure Kanchipuram Silk with Heavy Zari', 1, 1, 0, 1),
('Teal Uppada Silk', 'teal-uppada-silk', 1, 13499, NULL, 'Lightweight Uppada silk in deep teal with intricate jaal pattern.', 'Pure Uppada Silk', 5, 0, 0, 1),
('Lavender Mysore Silk', 'lavender-mysore-silk', 1, 8499, NULL, 'Smooth-as-butter Mysore silk in soft lavender.', 'Pure Mysore Silk', 10, 0, 1, 1),
('Bridal Gold Tissue Kanchi', 'bridal-gold-tissue-kanchi', 5, 38999, NULL, 'Gold tissue Kanchipuram with contrast ruby border.', 'Tissue Kanchipuram Silk', 2, 0, 0, 1),
('Black Sequin Party Georgette', 'black-sequin-party-georgette', 6, 7999, NULL, 'All-over black sequin georgette. A little drama never hurt anyone.', 'Sequin Georgette', 6, 0, 1, 1),
('Forest Green Tussar Silk', 'forest-green-tussar-silk', 1, 9999, NULL, 'Rich forest green Tussar with kalamkari border.', 'Pure Tussar Silk', 7, 0, 0, 1);

-- Product images (product_id, url, display_order)
INSERT INTO product_images (product_id, url, display_order) VALUES
(1, 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=85', 0),
(1, 'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=1200&q=85', 1),
(2, 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=1200&q=85', 0),
(2, 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=1200&q=85', 1),
(3, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85', 0),
(3, 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=1200&q=85', 1),
(4, 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=85', 0),
(4, 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=85', 1),
(5, 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=1200&q=85', 0),
(5, 'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=1200&q=85', 1),
(6, 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=1200&q=85', 0),
(7, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85', 0),
(8, 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=1200&q=85', 0),
(9, 'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=1200&q=85', 0),
(10, 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=85', 0),
(15, 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=1200&q=85', 0);

-- Product colors
INSERT INTO product_colors (product_id, name, hex) VALUES
(1, 'Ruby', '#9B2335'), (1, 'Wine', '#722F37'), (1, 'Gold', '#A88955'),
(2, 'Ivory', '#F7F2EA'), (2, 'Gold', '#A88955'),
(3, 'Navy', '#1B2A4A'), (3, 'Silver', '#C0C0C0'),
(4, 'Blush', '#D8B8B0'), (4, 'Ivory', '#F7F2EA'),
(5, 'Crimson', '#DC143C'), (5, 'Gold', '#A88955'),
(6, 'Emerald', '#50C878'), (6, 'Gold', '#A88955'),
(7, 'Gold', '#A88955'), (7, 'Champagne', '#F7E7CE'),
(9, 'Burgundy', '#641F2B'), (9, 'Gold', '#A88955'),
(15, 'Vermilion', '#E34234'), (15, 'Gold', '#A88955');

-- Offers
INSERT INTO offers (code, type, value, min_order, start_date, end_date, usage_limit, active) VALUES
('SARI10', 'percentage', 10, 5000, '2025-09-01', '2025-09-30', 100, 1),
('BRIDAL500', 'fixed', 500, 20000, '2025-09-01', '2025-12-31', 50, 1),
('WELCOME20', 'percentage', 20, 3000, '2025-09-01', '2025-10-31', 200, 1);

-- Banners
INSERT INTO banners (image, heading, subtitle, cta_text, cta_link, active, display_order) VALUES
('https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&q=80', 'THE ART OF DRAPING', 'Timeless Indian craft. A little more attitude.', 'SHOP THE COLLECTION', '/shop', 1, 1),
('https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=1920&q=80', 'THE BRIDE DESERVES A LITTLE DRAMA', 'Bridal sarees for moments everyone remembers.', 'EXPLORE BRIDAL', '/shop?category=bridal', 1, 2);
