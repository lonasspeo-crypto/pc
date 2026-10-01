(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/CheckoutForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CheckoutForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PaymentSimulator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/PaymentSimulator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$payment$2d$methods$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/payment-methods.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const CART_STORAGE_KEY = 'gila-komputer-cart';
const shippingOptions = {
    regular: {
        label: 'Regular',
        description: '2-4 hari kerja',
        fee: 25000
    },
    express: {
        label: 'Express',
        description: '1-2 hari kerja',
        fee: 50000
    }
};
const categoryLabels = {
    ewallet: 'E-Wallet',
    bank: 'Transfer Bank',
    'virtual-account': 'Virtual Account'
};
const formatPrice = (value)=>`Rp ${value.toLocaleString('id-ID')}`;
function CheckoutForm() {
    _s();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [shippingMethod, setShippingMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('regular');
    const [paymentMethod, setPaymentMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [order, setOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        customerName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: ''
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutForm.useEffect": ()=>{
            // Pulihkan sesi pembayaran yang belum tuntas setelah refresh halaman.
            try {
                const storedOrder = window.localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PaymentSimulator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAYMENT_STORAGE_KEY"]);
                if (storedOrder) {
                    const parsed = JSON.parse(storedOrder);
                    if (parsed?.orderNumber && parsed?.paymentMethodCode) setOrder(parsed);
                }
            } catch  {}
            const storedItems = window.localStorage.getItem(CART_STORAGE_KEY);
            if (storedItems) {
                try {
                    const parsedItems = JSON.parse(storedItems);
                    if (Array.isArray(parsedItems)) window.setTimeout({
                        "CheckoutForm.useEffect": ()=>setItems(parsedItems)
                    }["CheckoutForm.useEffect"], 0);
                } catch  {
                    window.localStorage.removeItem(CART_STORAGE_KEY);
                }
            }
        }
    }["CheckoutForm.useEffect"], []);
    const subtotal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CheckoutForm.useMemo[subtotal]": ()=>items.reduce({
                "CheckoutForm.useMemo[subtotal]": (sum, item)=>sum + item.price * item.quantity
            }["CheckoutForm.useMemo[subtotal]"], 0)
    }["CheckoutForm.useMemo[subtotal]"], [
        items
    ]);
    const shippingFee = shippingOptions[shippingMethod].fee;
    const total = subtotal + shippingFee;
    const updateField = (field, value)=>setForm((current)=>({
                ...current,
                [field]: value
            }));
    const groupedMethods = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CheckoutForm.useMemo[groupedMethods]": ()=>{
            const groups = {
                ewallet: [],
                bank: [],
                'virtual-account': []
            };
            for (const method of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$payment$2d$methods$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["paymentMethods"])groups[method.category].push(method);
            return groups;
        }
    }["CheckoutForm.useMemo[groupedMethods]"], []);
    const clearStoredOrder = ()=>{
        window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PaymentSimulator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAYMENT_STORAGE_KEY"]);
        setOrder(null);
    };
    const submitOrder = async (event)=>{
        event.preventDefault();
        setError('');
        if (!paymentMethod) {
            setError('Pilih metode pembayaran terlebih dahulu.');
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...form,
                    shippingMethod,
                    paymentMethod,
                    items: items.map((item)=>({
                            productId: Number(item.id),
                            quantity: item.quantity
                        }))
                })
            });
            const result = await response.json();
            if (!response.ok || !result.order) throw new Error(result.error ?? 'Order tidak dapat dibuat.');
            window.localStorage.removeItem(CART_STORAGE_KEY);
            window.dispatchEvent(new CustomEvent('gila:cart-updated', {
                detail: {
                    items: []
                }
            }));
            setItems([]);
            const placed = {
                orderNumber: result.order.orderNumber,
                total: result.order.total,
                paymentMethodCode: result.order.paymentMethod ?? paymentMethod
            };
            window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PaymentSimulator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAYMENT_STORAGE_KEY"], JSON.stringify(placed));
            setOrder(placed);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : 'Terjadi kesalahan. Silakan coba lagi.');
        } finally{
            setIsSubmitting(false);
        }
    };
    if (order) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "checkout-payment-stage",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PaymentSimulator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    order: order,
                    onDone: clearStoredOrder
                }, order.orderNumber, false, {
                    fileName: "[project]/components/CheckoutForm.tsx",
                    lineNumber: 97,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "checkout-payment-back",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/products",
                        className: "text-link",
                        children: "← Kembali ke katalog"
                    }, void 0, false, {
                        fileName: "[project]/components/CheckoutForm.tsx",
                        lineNumber: 98,
                        columnNumber: 44
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/CheckoutForm.tsx",
                    lineNumber: 98,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/CheckoutForm.tsx",
            lineNumber: 96,
            columnNumber: 12
        }, this);
    }
    if (!items.length) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "checkout-empty",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "eyebrow",
                children: "Keranjang kosong"
            }, void 0, false, {
                fileName: "[project]/components/CheckoutForm.tsx",
                lineNumber: 102,
                columnNumber: 65
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: [
                    "Belum ada",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                        fileName: "[project]/components/CheckoutForm.tsx",
                        lineNumber: 102,
                        columnNumber: 121
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                        children: "yang berangkat."
                    }, void 0, false, {
                        fileName: "[project]/components/CheckoutForm.tsx",
                        lineNumber: 102,
                        columnNumber: 127
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CheckoutForm.tsx",
                lineNumber: 102,
                columnNumber: 108
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Tambahkan komponen ke keranjang sebelum melanjutkan ke checkout."
            }, void 0, false, {
                fileName: "[project]/components/CheckoutForm.tsx",
                lineNumber: 102,
                columnNumber: 156
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/products",
                className: "button button-dark",
                children: [
                    "Pilih komponen ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "↗"
                    }, void 0, false, {
                        fileName: "[project]/components/CheckoutForm.tsx",
                        lineNumber: 102,
                        columnNumber: 296
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CheckoutForm.tsx",
                lineNumber: 102,
                columnNumber: 227
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CheckoutForm.tsx",
        lineNumber: 102,
        columnNumber: 29
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        className: "checkout-layout",
        onSubmit: submitOrder,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "checkout-fields",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "checkout-section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "checkout-section-heading",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "01"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CheckoutForm.tsx",
                                        lineNumber: 106,
                                        columnNumber: 87
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "eyebrow",
                                                children: "Data customer"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CheckoutForm.tsx",
                                                lineNumber: 106,
                                                columnNumber: 107
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: [
                                                    "Siapa yang",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/components/CheckoutForm.tsx",
                                                        lineNumber: 106,
                                                        columnNumber: 161
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                        children: "memesan?"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CheckoutForm.tsx",
                                                        lineNumber: 106,
                                                        columnNumber: 167
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/CheckoutForm.tsx",
                                                lineNumber: 106,
                                                columnNumber: 147
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CheckoutForm.tsx",
                                        lineNumber: 106,
                                        columnNumber: 102
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CheckoutForm.tsx",
                                lineNumber: 106,
                                columnNumber: 45
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "checkout-field-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: [
                                            "Nama lengkap",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                required: true,
                                                value: form.customerName,
                                                onChange: (event)=>updateField('customerName', event.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/components/CheckoutForm.tsx",
                                                lineNumber: 106,
                                                columnNumber: 257
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CheckoutForm.tsx",
                                        lineNumber: 106,
                                        columnNumber: 238
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: [
                                            "Email",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                required: true,
                                                type: "email",
                                                value: form.email,
                                                onChange: (event)=>updateField('email', event.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/components/CheckoutForm.tsx",
                                                lineNumber: 106,
                                                columnNumber: 391
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CheckoutForm.tsx",
                                        lineNumber: 106,
                                        columnNumber: 379
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: [
                                            "Nomor telepon",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                required: true,
                                                type: "tel",
                                                value: form.phone,
                                                onChange: (event)=>updateField('phone', event.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/components/CheckoutForm.tsx",
                                                lineNumber: 106,
                                                columnNumber: 532
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CheckoutForm.tsx",
                                        lineNumber: 106,
                                        columnNumber: 512
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CheckoutForm.tsx",
                                lineNumber: 106,
                                columnNumber: 201
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CheckoutForm.tsx",
                        lineNumber: 106,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "checkout-section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "checkout-section-heading",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "02"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CheckoutForm.tsx",
                                        lineNumber: 107,
                                        columnNumber: 87
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "eyebrow",
                                                children: "Alamat pengiriman"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CheckoutForm.tsx",
                                                lineNumber: 107,
                                                columnNumber: 107
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: [
                                                    "Ke mana",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/components/CheckoutForm.tsx",
                                                        lineNumber: 107,
                                                        columnNumber: 162
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                        children: "kami antar?"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CheckoutForm.tsx",
                                                        lineNumber: 107,
                                                        columnNumber: 168
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/CheckoutForm.tsx",
                                                lineNumber: 107,
                                                columnNumber: 151
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CheckoutForm.tsx",
                                        lineNumber: 107,
                                        columnNumber: 102
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CheckoutForm.tsx",
                                lineNumber: 107,
                                columnNumber: 45
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "checkout-field-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "field-wide",
                                        children: [
                                            "Alamat lengkap",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                required: true,
                                                rows: 3,
                                                value: form.address,
                                                onChange: (event)=>updateField('address', event.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/components/CheckoutForm.tsx",
                                                lineNumber: 107,
                                                columnNumber: 286
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CheckoutForm.tsx",
                                        lineNumber: 107,
                                        columnNumber: 242
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: [
                                            "Kota",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                required: true,
                                                value: form.city,
                                                onChange: (event)=>updateField('city', event.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/components/CheckoutForm.tsx",
                                                lineNumber: 107,
                                                columnNumber: 421
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CheckoutForm.tsx",
                                        lineNumber: 107,
                                        columnNumber: 410
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: [
                                            "Kode pos",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                required: true,
                                                inputMode: "numeric",
                                                value: form.postalCode,
                                                onChange: (event)=>updateField('postalCode', event.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/components/CheckoutForm.tsx",
                                                lineNumber: 107,
                                                columnNumber: 542
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CheckoutForm.tsx",
                                        lineNumber: 107,
                                        columnNumber: 527
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CheckoutForm.tsx",
                                lineNumber: 107,
                                columnNumber: 205
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CheckoutForm.tsx",
                        lineNumber: 107,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "checkout-section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "checkout-section-heading",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "03"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CheckoutForm.tsx",
                                        lineNumber: 108,
                                        columnNumber: 87
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "eyebrow",
                                                children: "Metode pengiriman"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CheckoutForm.tsx",
                                                lineNumber: 108,
                                                columnNumber: 107
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: [
                                                    "Pilih cara",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/components/CheckoutForm.tsx",
                                                        lineNumber: 108,
                                                        columnNumber: 165
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                        children: "sampainya."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CheckoutForm.tsx",
                                                        lineNumber: 108,
                                                        columnNumber: 171
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/CheckoutForm.tsx",
                                                lineNumber: 108,
                                                columnNumber: 151
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CheckoutForm.tsx",
                                        lineNumber: 108,
                                        columnNumber: 102
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CheckoutForm.tsx",
                                lineNumber: 108,
                                columnNumber: 45
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "shipping-options",
                                children: Object.entries(shippingOptions).map(([value, option])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: shippingMethod === value ? 'shipping-option is-active' : 'shipping-option',
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                name: "shipping",
                                                value: value,
                                                checked: shippingMethod === value,
                                                onChange: ()=>setShippingMethod(value)
                                            }, void 0, false, {
                                                fileName: "[project]/components/CheckoutForm.tsx",
                                                lineNumber: 108,
                                                columnNumber: 405
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: option.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CheckoutForm.tsx",
                                                        lineNumber: 108,
                                                        columnNumber: 558
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                        children: option.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CheckoutForm.tsx",
                                                        lineNumber: 108,
                                                        columnNumber: 589
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/CheckoutForm.tsx",
                                                lineNumber: 108,
                                                columnNumber: 552
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: formatPrice(option.fee)
                                            }, void 0, false, {
                                                fileName: "[project]/components/CheckoutForm.tsx",
                                                lineNumber: 108,
                                                columnNumber: 631
                                            }, this)
                                        ]
                                    }, value, true, {
                                        fileName: "[project]/components/CheckoutForm.tsx",
                                        lineNumber: 108,
                                        columnNumber: 299
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutForm.tsx",
                                lineNumber: 108,
                                columnNumber: 207
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CheckoutForm.tsx",
                        lineNumber: 108,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "checkout-section checkout-payment-section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "checkout-section-heading",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "04"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CheckoutForm.tsx",
                                        lineNumber: 109,
                                        columnNumber: 112
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "eyebrow",
                                                children: "Metode pembayaran · simulasi"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CheckoutForm.tsx",
                                                lineNumber: 109,
                                                columnNumber: 132
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: [
                                                    "Bayar lewat",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/components/CheckoutForm.tsx",
                                                        lineNumber: 109,
                                                        columnNumber: 202
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                        children: "mana?"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CheckoutForm.tsx",
                                                        lineNumber: 109,
                                                        columnNumber: 208
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/CheckoutForm.tsx",
                                                lineNumber: 109,
                                                columnNumber: 187
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CheckoutForm.tsx",
                                        lineNumber: 109,
                                        columnNumber: 127
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CheckoutForm.tsx",
                                lineNumber: 109,
                                columnNumber: 70
                            }, this),
                            Object.entries(groupedMethods).map(([category, methods])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "payment-group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "payment-group-label",
                                            children: categoryLabels[category]
                                        }, void 0, false, {
                                            fileName: "[project]/components/CheckoutForm.tsx",
                                            lineNumber: 111,
                                            columnNumber: 11
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "payment-options",
                                            children: methods.map((method)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: paymentMethod === method.code ? 'payment-option is-active' : 'payment-option',
                                                    style: {
                                                        ['--pay-accent']: method.color
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            name: "payment",
                                                            value: method.code,
                                                            checked: paymentMethod === method.code,
                                                            onChange: ()=>setPaymentMethod(method.code)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/CheckoutForm.tsx",
                                                            lineNumber: 113,
                                                            columnNumber: 13
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "payment-option-icon",
                                                            "aria-hidden": true,
                                                            children: method.icon
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/CheckoutForm.tsx",
                                                            lineNumber: 114,
                                                            columnNumber: 13
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "payment-option-text",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: method.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/CheckoutForm.tsx",
                                                                    lineNumber: 115,
                                                                    columnNumber: 51
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                                    children: method.description
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/CheckoutForm.tsx",
                                                                    lineNumber: 115,
                                                                    columnNumber: 81
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/CheckoutForm.tsx",
                                                            lineNumber: 115,
                                                            columnNumber: 13
                                                        }, this)
                                                    ]
                                                }, method.code, true, {
                                                    fileName: "[project]/components/CheckoutForm.tsx",
                                                    lineNumber: 112,
                                                    columnNumber: 69
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/CheckoutForm.tsx",
                                            lineNumber: 112,
                                            columnNumber: 11
                                        }, this)
                                    ]
                                }, category, true, {
                                    fileName: "[project]/components/CheckoutForm.tsx",
                                    lineNumber: 110,
                                    columnNumber: 70
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "payment-sim-badge",
                                children: "🧪 Mode simulasi — tidak ada transaksi uang sungguhan."
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutForm.tsx",
                                lineNumber: 118,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CheckoutForm.tsx",
                        lineNumber: 109,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CheckoutForm.tsx",
                lineNumber: 105,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "checkout-summary",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "eyebrow",
                        children: "Ringkasan order"
                    }, void 0, false, {
                        fileName: "[project]/components/CheckoutForm.tsx",
                        lineNumber: 121,
                        columnNumber: 41
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "checkout-summary-items",
                        children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            item.name,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                children: [
                                                    item.quantity,
                                                    " × ",
                                                    formatPrice(item.price)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/CheckoutForm.tsx",
                                                lineNumber: 121,
                                                columnNumber: 180
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CheckoutForm.tsx",
                                        lineNumber: 121,
                                        columnNumber: 163
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: formatPrice(item.price * item.quantity)
                                    }, void 0, false, {
                                        fileName: "[project]/components/CheckoutForm.tsx",
                                        lineNumber: 121,
                                        columnNumber: 245
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/components/CheckoutForm.tsx",
                                lineNumber: 121,
                                columnNumber: 144
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/CheckoutForm.tsx",
                        lineNumber: 121,
                        columnNumber: 83
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "checkout-summary-line",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Subtotal"
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutForm.tsx",
                                lineNumber: 121,
                                columnNumber: 356
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: formatPrice(subtotal)
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutForm.tsx",
                                lineNumber: 121,
                                columnNumber: 377
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CheckoutForm.tsx",
                        lineNumber: 121,
                        columnNumber: 317
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "checkout-summary-line",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Ongkir"
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutForm.tsx",
                                lineNumber: 121,
                                columnNumber: 462
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: formatPrice(shippingFee)
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutForm.tsx",
                                lineNumber: 121,
                                columnNumber: 481
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CheckoutForm.tsx",
                        lineNumber: 121,
                        columnNumber: 423
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "checkout-total",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Total"
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutForm.tsx",
                                lineNumber: 121,
                                columnNumber: 562
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$payment$2d$methods$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIDR"])(total)
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutForm.tsx",
                                lineNumber: 121,
                                columnNumber: 580
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CheckoutForm.tsx",
                        lineNumber: 121,
                        columnNumber: 530
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "checkout-error",
                        role: "alert",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/CheckoutForm.tsx",
                        lineNumber: 121,
                        columnNumber: 631
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "button button-dark",
                        type: "submit",
                        disabled: isSubmitting,
                        children: [
                            isSubmitting ? 'Menyimpan...' : 'Buat pesanan & bayar',
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "↗"
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutForm.tsx",
                                lineNumber: 121,
                                columnNumber: 820
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CheckoutForm.tsx",
                        lineNumber: 121,
                        columnNumber: 686
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CheckoutForm.tsx",
                lineNumber: 121,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CheckoutForm.tsx",
        lineNumber: 104,
        columnNumber: 10
    }, this);
}
_s(CheckoutForm, "3JTC4hIATuvZ4/jclFiRBKSf2ms=");
_c = CheckoutForm;
var _c;
__turbopack_context__.k.register(_c, "CheckoutForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/PaymentSimulator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PAYMENT_STORAGE_KEY",
    ()=>PAYMENT_STORAGE_KEY,
    "default",
    ()=>PaymentSimulator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$payment$2d$methods$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/payment-methods.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const PAYMENT_STORAGE_KEY = 'gila-komputer-last-payment';
function PaymentSimulator({ order, onDone }) {
    _s();
    const method = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$payment$2d$methods$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findPaymentMethod"])(order.paymentMethodCode);
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('instruction');
    const [secondsLeft, setSecondsLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(15 * 60) // batas bayar ala gateway: 15 menit
    ;
    const [paymentRef, setPaymentRef] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PaymentSimulator.useEffect": ()=>{
            if (phase !== 'instruction') return;
            const timer = window.setInterval({
                "PaymentSimulator.useEffect.timer": ()=>setSecondsLeft({
                        "PaymentSimulator.useEffect.timer": (current)=>Math.max(0, current - 1)
                    }["PaymentSimulator.useEffect.timer"])
            }["PaymentSimulator.useEffect.timer"], 1000);
            return ({
                "PaymentSimulator.useEffect": ()=>window.clearInterval(timer)
            })["PaymentSimulator.useEffect"];
        }
    }["PaymentSimulator.useEffect"], [
        phase
    ]);
    if (!method) return null;
    const instructions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$payment$2d$methods$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaymentInstructions"])(method, order.orderNumber).map((line)=>line.label === 'Jumlah' ? {
            ...line,
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$payment$2d$methods$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIDR"])(order.total)
        } : line);
    const countdown = `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`;
    const confirmPayment = async ()=>{
        setPhase('processing');
        setError('');
        try {
            const response = await fetch('/api/orders/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderNumber: order.orderNumber
                })
            });
            const result = await response.json();
            if (!response.ok || !result.order) throw new Error(result.error ?? 'Pembayaran gagal diproses.');
            setPaymentRef(result.order.paymentRef);
            setPhase('success');
            onDone?.();
        } catch (payError) {
            setError(payError instanceof Error ? payError.message : 'Pembayaran gagal diproses.');
            setPhase('failed');
        }
    };
    const cancelOrder = async ()=>{
        setError('');
        try {
            const response = await fetch('/api/orders/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderNumber: order.orderNumber,
                    action: 'cancel'
                })
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error ?? 'Pesanan tidak dapat dibatalkan.');
            onDone?.();
        } catch (cancelError) {
            setError(cancelError instanceof Error ? cancelError.message : 'Pesanan tidak dapat dibatalkan.');
        }
    };
    if (phase === 'processing' || phase === 'success') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "payment-sim",
            style: {
                ['--pay-accent']: method.color
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `payment-status ${phase === 'processing' ? 'is-processing' : 'is-success'}`,
                children: [
                    phase === 'processing' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "payment-spinner",
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/components/PaymentSimulator.tsx",
                        lineNumber: 60,
                        columnNumber: 35
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "payment-check",
                        children: "✓"
                    }, void 0, false, {
                        fileName: "[project]/components/PaymentSimulator.tsx",
                        lineNumber: 60,
                        columnNumber: 86
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "eyebrow",
                        children: phase === 'processing' ? 'Menghubungkan ke simulator' : 'Pembayaran berhasil'
                    }, void 0, false, {
                        fileName: "[project]/components/PaymentSimulator.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: phase === 'processing' ? `Memverifikasi via ${method.name}…` : `${method.name} terkonfirmasi`
                    }, void 0, false, {
                        fileName: "[project]/components/PaymentSimulator.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    phase === 'processing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                        children: "Ini hanya simulasi — tidak ada uang sungguhan yang bergerak."
                    }, void 0, false, {
                        fileName: "[project]/components/PaymentSimulator.tsx",
                        lineNumber: 63,
                        columnNumber: 36
                    }, this),
                    phase === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "payment-receipt",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Order"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PaymentSimulator.tsx",
                                        lineNumber: 65,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: order.orderNumber
                                    }, void 0, false, {
                                        fileName: "[project]/components/PaymentSimulator.tsx",
                                        lineNumber: 65,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PaymentSimulator.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Metode"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PaymentSimulator.tsx",
                                        lineNumber: 66,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: [
                                            method.icon,
                                            " ",
                                            method.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/PaymentSimulator.tsx",
                                        lineNumber: 66,
                                        columnNumber: 34
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PaymentSimulator.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Referensi"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PaymentSimulator.tsx",
                                        lineNumber: 67,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: paymentRef
                                    }, void 0, false, {
                                        fileName: "[project]/components/PaymentSimulator.tsx",
                                        lineNumber: 67,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PaymentSimulator.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Total"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PaymentSimulator.tsx",
                                        lineNumber: 68,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$payment$2d$methods$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIDR"])(order.total)
                                    }, void 0, false, {
                                        fileName: "[project]/components/PaymentSimulator.tsx",
                                        lineNumber: 68,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PaymentSimulator.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PaymentSimulator.tsx",
                        lineNumber: 64,
                        columnNumber: 33
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PaymentSimulator.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/PaymentSimulator.tsx",
            lineNumber: 58,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "payment-sim",
        style: {
            ['--pay-accent']: method.color
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "payment-sim-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: [
                                    method.category === 'ewallet' ? 'E-Wallet' : method.category === 'bank' ? 'Transfer Bank' : 'Virtual Account',
                                    " · Mode Simulasi"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PaymentSimulator.tsx",
                                lineNumber: 77,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: [
                                    method.icon,
                                    " Bayar dengan ",
                                    method.name
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PaymentSimulator.tsx",
                                lineNumber: 78,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PaymentSimulator.tsx",
                        lineNumber: 76,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "payment-countdown",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                children: "Bayar dalam"
                            }, void 0, false, {
                                fileName: "[project]/components/PaymentSimulator.tsx",
                                lineNumber: 80,
                                columnNumber: 42
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: secondsLeft > 0 ? countdown : 'KEDALUWARSA'
                            }, void 0, false, {
                                fileName: "[project]/components/PaymentSimulator.tsx",
                                lineNumber: 80,
                                columnNumber: 68
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PaymentSimulator.tsx",
                        lineNumber: 80,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PaymentSimulator.tsx",
                lineNumber: 75,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "payment-amount",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Jumlah tagihan"
                    }, void 0, false, {
                        fileName: "[project]/components/PaymentSimulator.tsx",
                        lineNumber: 82,
                        columnNumber: 37
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$payment$2d$methods$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIDR"])(order.total)
                    }, void 0, false, {
                        fileName: "[project]/components/PaymentSimulator.tsx",
                        lineNumber: 82,
                        columnNumber: 64
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PaymentSimulator.tsx",
                lineNumber: 82,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "payment-instructions",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Nomor pesanan"
                            }, void 0, false, {
                                fileName: "[project]/components/PaymentSimulator.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: order.orderNumber
                            }, void 0, false, {
                                fileName: "[project]/components/PaymentSimulator.tsx",
                                lineNumber: 84,
                                columnNumber: 37
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PaymentSimulator.tsx",
                        lineNumber: 84,
                        columnNumber: 7
                    }, this),
                    instructions.map((line)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: line.label
                                }, void 0, false, {
                                    fileName: "[project]/components/PaymentSimulator.tsx",
                                    lineNumber: 85,
                                    columnNumber: 56
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: line.value
                                }, void 0, false, {
                                    fileName: "[project]/components/PaymentSimulator.tsx",
                                    lineNumber: 85,
                                    columnNumber: 81
                                }, this)
                            ]
                        }, line.label, true, {
                            fileName: "[project]/components/PaymentSimulator.tsx",
                            lineNumber: 85,
                            columnNumber: 35
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/PaymentSimulator.tsx",
                lineNumber: 83,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "payment-note",
                children: "⚠️ Simulator-only: tombol di bawah langsung menandai pesanan lunas tanpa memotong saldo/rekening mana pun."
            }, void 0, false, {
                fileName: "[project]/components/PaymentSimulator.tsx",
                lineNumber: 87,
                columnNumber: 5
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "checkout-error",
                role: "alert",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/PaymentSimulator.tsx",
                lineNumber: 88,
                columnNumber: 15
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "payment-actions",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "button button-dark payment-pay",
                        type: "button",
                        onClick: confirmPayment,
                        disabled: secondsLeft === 0,
                        children: [
                            "Saya sudah bayar — verifikasi ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "↗"
                            }, void 0, false, {
                                fileName: "[project]/components/PaymentSimulator.tsx",
                                lineNumber: 90,
                                columnNumber: 156
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PaymentSimulator.tsx",
                        lineNumber: 90,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "payment-cancel",
                        type: "button",
                        onClick: cancelOrder,
                        children: "Batalkan pesanan"
                    }, void 0, false, {
                        fileName: "[project]/components/PaymentSimulator.tsx",
                        lineNumber: 91,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PaymentSimulator.tsx",
                lineNumber: 89,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/PaymentSimulator.tsx",
        lineNumber: 74,
        columnNumber: 10
    }, this);
}
_s(PaymentSimulator, "+7d1nN4oggE+Q+33sRsRfsIAiys=");
_c = PaymentSimulator;
;
var _c;
__turbopack_context__.k.register(_c, "PaymentSimulator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/payment-methods.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Katalog metode pembayaran untuk SIMULASI (tidak terhubung ke gateway sungguhan).
__turbopack_context__.s([
    "findPaymentMethod",
    ()=>findPaymentMethod,
    "formatIDR",
    ()=>formatIDR,
    "getPaymentInstructions",
    ()=>getPaymentInstructions,
    "paymentMethods",
    ()=>paymentMethods
]);
const paymentMethods = [
    // ---- E-Wallet ----
    {
        code: 'gopay',
        name: 'GoPay',
        category: 'ewallet',
        description: 'Bayar via saldo GoPay',
        color: '#00aed6',
        icon: '📲'
    },
    {
        code: 'ovo',
        name: 'OVO',
        category: 'ewallet',
        description: 'Bayar via saldo OVO',
        color: '#4c3494',
        icon: '💜'
    },
    {
        code: 'dana',
        name: 'DANA',
        category: 'ewallet',
        description: 'Bayar via saldo DANA',
        color: '#1189d6',
        icon: '💙'
    },
    {
        code: 'shopeepay',
        name: 'ShopeePay',
        category: 'ewallet',
        description: 'Bayar via saldo ShopeePay',
        color: '#ee4d2d',
        icon: '🧡'
    },
    {
        code: 'linkaja',
        name: 'LinkAja',
        category: 'ewallet',
        description: 'Bayar via saldo LinkAja',
        color: '#e4002b',
        icon: '❤️'
    },
    // ---- Transfer Bank ----
    {
        code: 'bca',
        name: 'BCA',
        category: 'bank',
        description: 'Transfer manual ke rekening BCA',
        color: '#0060af',
        icon: '🏦'
    },
    {
        code: 'bni',
        name: 'BNI',
        category: 'bank',
        description: 'Transfer manual ke rekening BNI',
        color: '#f26722',
        icon: '🏦'
    },
    {
        code: 'mandiri',
        name: 'Mandiri',
        category: 'bank',
        description: 'Transfer manual ke rekening Mandiri',
        color: '#003a70',
        icon: '🏦'
    },
    // ---- Virtual Account ----
    {
        code: 'bca-va',
        name: 'BCA Virtual Account',
        category: 'virtual-account',
        description: 'VA otomatis terverifikasi',
        color: '#0060af',
        icon: '🔢'
    },
    {
        code: 'mandiri-va',
        name: 'Mandiri Virtual Account',
        category: 'virtual-account',
        description: 'VA otomatis terverifikasi',
        color: '#003a70',
        icon: '🔢'
    }
];
const findPaymentMethod = (code)=>paymentMethods.find((method)=>method.code === code);
const formatIDR = (value)=>`Rp${value.toLocaleString('id-ID')}`;
// Nomor rekening/merchant "dummy" — murni untuk tampilan simulasi.
const dummyAccount = (prefix, seed)=>{
    let hash = 0;
    for (const char of seed)hash = hash * 31 + char.charCodeAt(0) >>> 0;
    const digits = Array.from({
        length: 10
    }, (_, index)=>String((hash >> index * 2) % 10)).join('');
    return `${prefix}-${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8)}`;
};
function getPaymentInstructions(method, orderNumber) {
    switch(method.category){
        case 'ewallet':
            return [
                {
                    label: 'Nomor tujuan',
                    value: dummyAccount('08xx', method.code + orderNumber)
                },
                {
                    label: 'Atas nama',
                    value: 'GILA KOMPUTER PC'
                },
                {
                    label: 'Jumlah',
                    value: ''
                }
            ];
        case 'bank':
            return [
                {
                    label: 'Nomor rekening',
                    value: dummyAccount(method.code.toUpperCase(), method.code + orderNumber)
                },
                {
                    label: 'Atas nama',
                    value: 'PT GILA KOMPUTER INDONESIA'
                },
                {
                    label: 'Jumlah',
                    value: ''
                }
            ];
        case 'virtual-account':
            return [
                {
                    label: 'Virtual Account',
                    value: `${method.code === 'bca-va' ? '3901' : '8950'}${orderNumber.replace(/\D/g, '').slice(-10)}`
                },
                {
                    label: 'Jumlah',
                    value: ''
                }
            ];
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0rdvcn8._.js.map