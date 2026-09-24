const asyncHandler = require('express-async-handler');
const supabase = require('../config/supabase');

// @desc    Create new enquiry (form or whatsapp click tracking)
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = asyncHandler(async (req, res) => {
    const {
        productId, productName, SKU, productUrl,
        customerName, customerPhone, customerEmail,
        name, phone, email, company, subject,
        message, source,
    } = req.body;

    const finalName = customerName || name || 'Website Visitor';
    const finalPhone = customerPhone || phone || '';
    const finalEmail = customerEmail || email || '';
    let finalMessage = message || '';
    if (company && !finalMessage.includes(company)) {
        finalMessage = `Company: ${company}\n${finalMessage}`;
    }
    if (subject && !finalMessage.includes(subject)) {
        finalMessage = `Subject: ${subject}\n${finalMessage}`;
    }

    const row = {
        product_name: productName || '',
        sku: SKU || '',
        customer_name: finalName,
        customer_phone: finalPhone,
        customer_email: finalEmail,
        message: finalMessage,
        source: source || 'form',
    };

    try {
        const { data, error } = await supabase.from('enquiries').insert([row]).select().single();
        if (!error && data) {
            return res.status(201).json({
                _id: data.id, id: data.id,
                customerName: data.customer_name,
                customerPhone: data.customer_phone,
                customerEmail: data.customer_email,
                productName: data.product_name,
                message: data.message,
                source: data.source,
                createdAt: data.created_at
            });
        }
    } catch (e) {}

    res.status(201).json({
        _id: `enq-${Date.now()}`,
        id: `enq-${Date.now()}`,
        ...req.body,
        createdAt: new Date().toISOString()
    });
});

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private/Admin
const getEnquiries = asyncHandler(async (req, res) => {
    try {
        const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
        if (!error && data) {
            return res.json(data.map(d => ({
                _id: d.id, id: d.id,
                customerName: d.customer_name,
                customerPhone: d.customer_phone,
                customerEmail: d.customer_email,
                productName: d.product_name,
                message: d.message,
                source: d.source,
                createdAt: d.created_at
            })));
        }
    } catch (e) {}
    res.json([]);
});

module.exports = { createEnquiry, getEnquiries };
