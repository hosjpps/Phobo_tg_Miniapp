import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { PageWrapper } from '@/components/layout/Layout';
import { OrderCard, EmptyOrders } from '@/components/order';
import { useOrders } from '@/hooks';

type TabType = 'active' | 'history';

export default function Orders() {
  const [activeTab, setActiveTab] = useState<TabType>('active');
  const { activeOrders, orderHistory, goToOrderDetail, repeatOrder } = useOrders();

  const orders = activeTab === 'active' ? activeOrders : orderHistory;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Мои заказы" />

      {/* Tabs */}
      <div className="px-4 pt-2 pb-4">
        <div className="flex bg-neutral rounded-xl p-1">
          {(['active', 'history'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors
                ${activeTab === tab
                  ? 'bg-white text-text shadow-sm'
                  : 'text-text-light'
                }
              `}
            >
              {tab === 'active' ? 'Активные' : 'История'}
              {tab === 'active' && activeOrders.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-primary text-white text-xs rounded-full">
                  {activeOrders.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <PageWrapper className="pt-0">
        <AnimatePresence mode="wait">
          {orders.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptyOrders />
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === 'active' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === 'active' ? 20 : -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onClick={() => goToOrderDetail(order.id)}
                  onRepeat={activeTab === 'history' ? () => repeatOrder(order.id) : undefined}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </PageWrapper>
    </div>
  );
}
