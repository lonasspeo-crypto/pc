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
"[project]/app/api/orders/pay/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
// ============================================================================
// SIMULASI PAYMENT GATEWAY — TIDAK terhubung ke provider sungguhan.
// Alur: order dibuat (PENDING) -> client memanggil endpoint ini untuk
// "membayar" -> status berubah ke PAID + paymentRef + paidAt.
// Untuk integrasi asli, ganti bagian ini dengan webhook/callback Midtrans/Xendit.
// ============================================================================
const randomHex = (bytes)=>Array.from({
        length: bytes
    }, ()=>Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
async function POST(request) {
    let body;
    try {
        body = await request.json();
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Data pembayaran tidak valid.'
        }, {
            status: 400
        });
    }
    const orderNumber = typeof body.orderNumber === 'string' ? body.orderNumber.trim() : '';
    const action = body.action === 'cancel' ? 'cancel' : 'pay' // default: bayar
    ;
    if (!orderNumber) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Nomor pesanan wajib diisi.'
    }, {
        status: 400
    });
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (transaction)=>{
            const order = await transaction.order.findUnique({
                where: {
                    orderNumber
                },
                include: {
                    items: true
                }
            });
            if (!order) throw new Error('Pesanan tidak ditemukan.');
            if (order.status !== 'PENDING') throw new Error(`Pesanan sudah ${order.status.toLowerCase()} dan tidak dapat diubah.`);
            if (action === 'cancel') {
                // Kembalikan stok karena pesanan dibatalkan sebelum dibayar.
                for (const item of order.items){
                    await transaction.product.update({
                        where: {
                            id: item.productId
                        },
                        data: {
                            stock: {
                                increment: item.quantity
                            }
                        }
                    });
                }
                return transaction.order.update({
                    where: {
                        id: order.id
                    },
                    data: {
                        status: 'CANCELLED'
                    }
                });
            }
            const method = order.paymentMethod ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$payment$2d$methods$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findPaymentMethod"])(order.paymentMethod) : undefined;
            if (!method) throw new Error('Metode pembayaran pada pesanan tidak dikenali.');
            // ---- Di sinilah simulasi terjadi ----
            // Gateway asli: buat billing token / VA number lalu tunggu webhook `settlement`.
            // Simulasi: langsung dianggap sukses dengan nomor referensi acak.
            const paymentRef = `${method.code.toUpperCase().replace(/[^A-Z0-9]/g, '')}-${randomHex(8).toUpperCase()}`;
            return transaction.order.update({
                where: {
                    id: order.id
                },
                data: {
                    status: 'PAID',
                    paymentRef,
                    paidAt: new Date()
                }
            });
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            order: {
                orderNumber: result.orderNumber,
                status: result.status,
                total: result.total,
                paymentMethod: result.paymentMethod,
                paymentRef: result.paymentRef,
                paidAt: result.paidAt
            }
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Pembayaran gagal diproses.';
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

//# sourceMappingURL=%5Broot-of-the-server%5D__0s6hexp._.js.map