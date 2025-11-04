import { useCallback, useMemo, useState } from "react";
import { getRandomArrayItem } from "@/shared/lib/get-random-array-item";

export function useItemsGenerator<T>(items: T[]) {
  if (items.length === 0) {
    throw new Error("Initial array cannot be empty");
  }

  const initialItems = useMemo(() => [...items], [items]);
  const [remainingItems, setRemainingItems] = useState<T[]>(() => [...items]);
  const [targetItem, setTargetItem] = useState<T | null>(() => getRandomArrayItem(items));

  /** Элементы, которые уже отработаны */
  const completedItems = useMemo(() => {
    return initialItems.filter((item) => !remainingItems.includes(item));
  }, [initialItems, remainingItems]);

  /** Прогресс: количество найденных элементов / общее количество */
  const progress = useMemo(
    () => (initialItems.length === 0 ? 0 : completedItems.length / initialItems.length),
    [completedItems, initialItems.length],
  );

  const updateTargetItem = useCallback((remainingItems: T[]) => {
    const newTargetItem = getRandomArrayItem(remainingItems);
    setTargetItem(newTargetItem);

    return newTargetItem;
  }, []);

  /** Удалить элемент из remaining */
  const removeItem = useCallback(
    (itemToRemove: T) => {
      const newRemaining = remainingItems.filter((item) => item !== itemToRemove);
      setRemainingItems((prev) => prev.filter((item) => item !== itemToRemove));

      return newRemaining;
    },
    [remainingItems],
  );

  /** Добавить N новых элементов из initialItems, которых ещё нет в remaining */
  const addRandomItems = useCallback(
    (count: number = 3) => {
      setRemainingItems((prev) => {
        const available = initialItems.filter((i) => !prev.includes(i));
        const addCount = Math.min(count, available.length);
        const newItems: T[] = [];

        for (let i = 0; i < addCount; i++) {
          const index = Math.floor(Math.random() * available.length);
          newItems.push(available[index]);
          available.splice(index, 1);
        }

        return [...prev, ...newItems];
      });
    },
    [initialItems],
  );

  /** Сбросить состояние к исходному */
  const reset = useCallback(() => {
    setRemainingItems([...initialItems]);
  }, [initialItems]);

  return {
    initialItems,
    remainingItems,
    completedItems,
    removeItem,
    addRandomItems,
    updateTargetItem,
    targetItem,
    reset,
    progress,
  };
}
