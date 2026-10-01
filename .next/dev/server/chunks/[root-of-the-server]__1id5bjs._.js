module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/app/api/orders/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$payment$2d$methods$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/payment-methods.ts [app-route] (ecmascript)");
;
;
;
const shippingFees = {
    regular: 25000,
    express: 50000
};
const isValidEmail = (email)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
async function POST(request) {
    let body;
    try {
        body = await request.json();
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Data checkout tidak valid.'
        }, {
            status: 400
        });
    }
    const requiredFields = [
        body.customerName,
        body.email,
        body.phone,
        body.address,
        body.city,
        body.postalCode
    ];
    if (requiredFields.some((value)=>typeof value !== 'string' || !value.trim()) || !isValidEmail(body.email)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Lengkapi data customer dengan format yang benar.'
        }, {
            status: 400
        });
    }
    if (!body.items?.length || ![
        'regular',
        'express'
    ].includes(body.shippingMethod)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Keranjang atau metode pengiriman tidak valid.'
        }, {
            status: 400
        });
    }
    const paymentMethod = typeof body.paymentMethod === 'string' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$payment$2d$methods$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findPaymentMethod"])(body.paymentMethod.trim().toLowerCase()) : undefined;
    if (!paymentMethod) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Metode pembayaran tidak dikenali.'
        }, {
            status: 400
        });
    }
    const requestedItems = body.items.map((item)=>({
            productId: Number(item.productId),
            quantity: Number(item.quantity)
        }));
    if (requestedItems.some((item)=>!Number.isInteger(item.productId) || !Number.isInteger(item.quantity) || item.quantity < 1)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Jumlah produk tidak valid.'
        }, {
            status: 400
        });
    }
    const itemMap = new Map();
    for (const item of requestedItems)itemMap.set(item.productId, (itemMap.get(item.productId) ?? 0) + item.quantity);
    const productIds = [
        ...itemMap.keys()
    ];
    try {
        const order = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (transaction)=>{
            const products = await transaction.product.findMany({
                where: {
                    id: {
                        in: productIds
                    },
                    status: 'ACTIVE'
                }
            });
            if (products.length !== productIds.length) throw new Error('Salah satu produk sudah tidak tersedia.');
            const orderItems = products.map((product)=>{
                const quantity = itemMap.get(product.id) ?? 0;
                if (product.stock < quantity) throw new Error(`Stok ${product.name} tidak mencukupi.`);
                return {
                    productId: product.id,
                    name: product.name,
                    quantity,
                    unitPrice: product.price
                };
            });
            const subtotal = orderItems.reduce((sum, item)=>sum + item.unitPrice * item.quantity, 0);
            const shippingFee = shippingFees[body.shippingMethod];
            const orderNumber = `GK-${Date.now()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
            for (const item of orderItems){
                const updated = await transaction.product.updateMany({
                    where: {
                        id: item.productId,
                        stock: {
                            gte: item.quantity
                        },
                        status: 'ACTIVE'
                    },
                    data: {
                        stock: {
                            decrement: item.quantity
                        }
                    }
                });
                if (updated.count !== 1) throw new Error(`Stok ${item.name} baru saja berubah. Silakan coba lagi.`);
            }
            return transaction.order.create({
                data: {
                    orderNumber,
                    customerName: body.customerName.trim(),
                    email: body.email.trim().toLowerCase(),
                    phone: body.phone.trim(),
                    address: body.address.trim(),
                    city: body.city.trim(),
                    postalCode: body.postalCode.trim(),
                    shippingMethod: body.shippingMethod,
                    shippingFee,
                    subtotal,
                    total: subtotal + shippingFee,
                    paymentMethod: paymentMethod.code,
                    items: {
                        create: orderItems
                    }
                },
                include: {
                    items: true
                }
            });
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            order: {
                id: order.id,
                orderNumber: order.orderNumber,
                total: order.total,
                status: order.status,
                paymentMethod: order.paymentMethod
            }
        }, {
            status: 201
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Order tidak dapat dibuat.';
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: message
        }, {
            status: 400
        });
    }
}
}),
"[project]/lib/payment-methods.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1id5bjs._.js.map