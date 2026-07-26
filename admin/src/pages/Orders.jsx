import { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import { getOrders, updateCoreStatus } from '../api/orders'

const CORE_STATUSES = ['PENDING', 'RETURNED', 'INSPECTED', 'REFUNDED', 'REJECTED']

function Orders() {
    const [orders, setOrders] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        getOrders()
            .then(data => setOrders(data))
            .catch(err => setError(err.message))
    }, [])

    const handleCoreStatusChange = async (orderId, itemId, coreStatus) => {
        try {
            await updateCoreStatus(orderId, itemId, coreStatus)
            setOrders(orders.map(order =>
                order.id === orderId
                    ? { ...order, items: order.items.map(item => item.id === itemId ? { ...item, coreStatus } : item) }
                    : order
            ))
        } catch (err) {
            setError(err.message)
        }
    }

    const CoreStatusSelect = ({ order, item, className }) => (
        item.coreCharge ? (
            <select
                value={item.coreStatus}
                onChange={(e) => handleCoreStatusChange(order.id, item.id, e.target.value)}
                className={className}
            >
                {CORE_STATUSES.map(status => (
                    <option key={status} value={status}>{status}</option>
                ))}
            </select>
        ) : (
            <span className="text-gray-500 text-sm">—</span>
        )
    )

    return (
        <div>
            <Nav />
            <div className="max-w-6xl mx-auto p-4 sm:p-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6">Orders</h1>
                {error && <p className="text-red-400 mb-4">{error}</p>}
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order.id} className="bg-gray-800 rounded-xl overflow-hidden">
                            <div className="px-4 sm:px-6 py-4 bg-gray-700/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                    <div className="font-semibold">
                                        {order.user.name} <span className="text-gray-400 font-normal">({order.user.email})</span>
                                    </div>
                                    {order.user.company && <div className="text-sm text-gray-400">{order.user.company}</div>}
                                </div>
                                <div className="sm:text-right">
                                    <div className="font-bold">${order.total}</div>
                                    <div className="text-xs text-gray-400">{order.status}</div>
                                </div>
                            </div>

                            {/* Item list — small screens only */}
                            <div className="md:hidden divide-y divide-gray-700">
                                {order.items.map(item => (
                                    <div key={item.id} className="px-4 py-3">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <div>
                                                <div className="text-sm text-blue-400">{item.partNumber}</div>
                                                <div>{item.description}</div>
                                            </div>
                                            <div className="text-right text-sm text-gray-300 shrink-0">
                                                {item.quantity} × ${item.unitPrice}
                                            </div>
                                        </div>
                                        {item.coreCharge && (
                                            <div className="flex items-center justify-between gap-2 mt-2">
                                                <span className="text-xs text-gray-400">Core charge: ${item.coreCharge}</span>
                                                <CoreStatusSelect
                                                    order={order}
                                                    item={item}
                                                    className="bg-gray-900 border border-gray-600 rounded-lg px-2 py-1 text-white text-xs"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Item table — md and up */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="text-sm text-gray-400">
                                        <tr>
                                            <th className="px-6 py-2">Part Number</th>
                                            <th className="px-6 py-2">Description</th>
                                            <th className="px-6 py-2">Qty</th>
                                            <th className="px-6 py-2">Unit Price</th>
                                            <th className="px-6 py-2">Core Charge</th>
                                            <th className="px-6 py-2">Core Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {order.items.map(item => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-3 text-blue-400">{item.partNumber}</td>
                                                <td className="px-6 py-3">{item.description}</td>
                                                <td className="px-6 py-3">{item.quantity}</td>
                                                <td className="px-6 py-3">${item.unitPrice}</td>
                                                <td className="px-6 py-3 text-gray-400">{item.coreCharge ? `$${item.coreCharge}` : '—'}</td>
                                                <td className="px-6 py-3">
                                                    <CoreStatusSelect
                                                        order={order}
                                                        item={item}
                                                        className="bg-gray-900 border border-gray-600 rounded-lg px-2 py-1 text-white text-sm"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Orders
