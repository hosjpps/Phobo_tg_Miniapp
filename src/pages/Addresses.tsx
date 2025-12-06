import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MapPin, Home, Building2, Trash2, Edit2, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Header } from '@/components/layout/Header';
import { PageWrapper } from '@/components/layout/Layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BottomSheet } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui';
import { useUserStore, useAddresses } from '@/store';
import { useBackButton, useHapticFeedback } from '@/hooks';
import { addressSchema, type AddressFormData } from '@/utils/validation';
import { ADDRESS_TYPES } from '@/constants/config';
import type { Address, AddressType } from '@/types';

export default function Addresses() {
  const navigate = useNavigate();
  const { impact } = useHapticFeedback();
  const addresses = useAddresses();
  const { addAddress, updateAddress, deleteAddress, setDefaultAddress } = useUserStore();

  const [showAddSheet, setShowAddSheet] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useBackButton(handleBack);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      type: 'home',
      isDefault: false,
    },
  });

  const selectedType = watch('type');

  const handleOpenAdd = () => {
    reset({ type: 'home', isDefault: false });
    setEditingAddress(null);
    setShowAddSheet(true);
  };

  const handleOpenEdit = (address: Address) => {
    setEditingAddress(address);
    reset({
      type: address.type,
      street: address.street,
      house: address.house,
      building: address.building,
      apartment: address.apartment,
      entrance: address.entrance,
      floor: address.floor,
      intercom: address.intercom,
      comment: address.comment,
      isDefault: address.isDefault,
    });
    setShowAddSheet(true);
  };

  const handleCloseSheet = () => {
    setShowAddSheet(false);
    setEditingAddress(null);
    reset();
  };

  const onSubmit = (data: AddressFormData) => {
    impact('medium');

    const addressData = {
      ...data,
      isDefault: data.isDefault ?? false,
    };

    if (editingAddress) {
      updateAddress(editingAddress.id, addressData);
    } else {
      addAddress(addressData);
    }

    handleCloseSheet();
  };

  const handleDelete = (id: string) => {
    impact('medium');
    deleteAddress(id);
  };

  const handleSetDefault = (id: string) => {
    impact('light');
    setDefaultAddress(id);
  };

  const getTypeIcon = (type: AddressType) => {
    switch (type) {
      case 'home':
        return <Home className="w-5 h-5" />;
      case 'work':
        return <Building2 className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: AddressType) => {
    return ADDRESS_TYPES.find((t) => t.id === type)?.label || 'Адрес';
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Мои адреса" showBack />

      <PageWrapper>
        {addresses.length === 0 ? (
          <EmptyState
            icon={MapPin}
            title="Нет сохраненных адресов"
            description="Добавьте адрес доставки для быстрого оформления заказов"
            actionLabel="Добавить адрес"
            onAction={handleOpenAdd}
          />
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {addresses.map((address) => (
                <motion.div
                  key={address.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                >
                  <Card>
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          address.isDefault
                            ? 'bg-primary/10 text-primary'
                            : 'bg-neutral text-text-light'
                        }`}
                      >
                        {getTypeIcon(address.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-text">
                            {getTypeLabel(address.type)}
                          </span>
                          {address.isDefault && (
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                              По умолчанию
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-text-light mt-0.5">
                          {address.street}, {address.house}
                          {address.apartment && `, кв. ${address.apartment}`}
                        </p>
                        {address.entrance && (
                          <p className="text-xs text-text-light mt-0.5">
                            Подъезд {address.entrance}
                            {address.floor && `, этаж ${address.floor}`}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-1">
                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefault(address.id)}
                            className="p-2 hover:bg-neutral rounded-lg text-text-light hover:text-success transition-colors"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenEdit(address)}
                          className="p-2 hover:bg-neutral rounded-lg text-text-light hover:text-primary transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(address.id)}
                          className="p-2 hover:bg-neutral rounded-lg text-text-light hover:text-error transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            <Button
              variant="outline"
              fullWidth
              icon={<Plus className="w-5 h-5" />}
              onClick={handleOpenAdd}
            >
              Добавить адрес
            </Button>
          </div>
        )}
      </PageWrapper>

      {/* Add/Edit Address Sheet */}
      <BottomSheet
        isOpen={showAddSheet}
        onClose={handleCloseSheet}
        title={editingAddress ? 'Редактировать адрес' : 'Новый адрес'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Address Type */}
          <div className="flex gap-2">
            {ADDRESS_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setValue('type', type.id as AddressType)}
                className={`
                  flex-1 py-3 px-2 rounded-xl text-center transition-colors
                  ${selectedType === type.id
                    ? 'bg-primary text-white'
                    : 'bg-neutral hover:bg-neutral-200 text-text'
                  }
                `}
              >
                <div className="text-lg mb-1">
                  {type.id === 'home' ? '🏠' : type.id === 'work' ? '🏢' : '📍'}
                </div>
                <div className="text-xs font-medium">{type.label}</div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Input
                {...register('street')}
                label="Улица"
                placeholder="ул. Ленина"
                error={errors.street?.message}
              />
            </div>
            <Input
              {...register('house')}
              label="Дом"
              placeholder="10"
              error={errors.house?.message}
            />
            <Input
              {...register('building')}
              label="Корпус"
              placeholder="1"
              error={errors.building?.message}
            />
            <Input
              {...register('apartment')}
              label="Квартира"
              placeholder="45"
              error={errors.apartment?.message}
            />
            <Input
              {...register('entrance')}
              label="Подъезд"
              placeholder="2"
              error={errors.entrance?.message}
            />
            <Input
              {...register('floor')}
              label="Этаж"
              placeholder="5"
              error={errors.floor?.message}
            />
            <Input
              {...register('intercom')}
              label="Домофон"
              placeholder="45"
              error={errors.intercom?.message}
            />
          </div>

          <Input
            {...register('comment')}
            label="Комментарий"
            placeholder="Код двери, ориентиры..."
            error={errors.comment?.message}
          />

          <Button type="submit" variant="primary" size="lg" fullWidth>
            {editingAddress ? 'Сохранить' : 'Добавить адрес'}
          </Button>
        </form>
      </BottomSheet>
    </div>
  );
}
