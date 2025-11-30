'use client';
import { useEffect } from 'react';
import { Select, SelectItem } from '@nextui-org/react';

import { Busseat } from '@/entities';
import { Tripseat } from '@/entities';

export default function SelectSeat({
  seats,
  defaultSeat,
  selected,
  onSelectionChange,
}: {
  seats?: Tripseat[];
  defaultSeat?: string;
  selected?: string;
  onSelectionChange?: (id: string | undefined) => void;
}) {
  if (!seats || seats.length === 0) {
    return <div>No hay asientos disponibles para este viaje.</div>;
  }
  const selectedKeys = selected ? new Set([selected]) : undefined;

  return (
    <Select
      label="Seat"
      name="seat"
      defaultSelectedKeys={defaultSeat ? [defaultSeat] : undefined}
      selectedKeys={selectedKeys as any}
      onSelectionChange={(keys: any) => {
        const first = keys && Array.from(keys)[0];
        onSelectionChange?.(first);
      }}
    >
      {seats.map((seat) => {
        // busSeat may be either the Busseat object or just an id string depending on API shape
        const seatNumber = typeof seat.busSeat === 'string' ? seat.busSeat : (seat.busSeat as Busseat)?.seatNumber;
        return (
          <SelectItem key={seat.tripSeatId} value={seat.tripSeatId} isDisabled={seat.status !== 'free'}>
            {seatNumber ?? seat.tripSeatId}
          </SelectItem>
        );
      })}
    </Select>
  );
}