'use client';

import { formatCurrency } from "@/lib/utils";
import { ArrowDownUp } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

export function Converter({ symbol, icon, priceList }: ConverterProps) {
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState('usd');
  const price = priceList[currency] ?? priceList.usd ?? 0;

  const converted = useMemo(() => amount * price, [amount, price]);

  return (
    <section id="converter">
      <h4>Converter</h4>
      <div className="panel">
        <div className="input-wrapper">
          <input
            className="input px-4"
            type="number"
            min="0"
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
          />
          <div className="coin-info pr-1">
            <Image src={icon} alt="" width={24} height={24} />
            <p>{symbol.toUpperCase()}</p>
          </div>
        </div>

        <div className="divider">
          <div className="line" />
          <ArrowDownUp className="icon" />
        </div>

        <div className="output-wrapper">
          <p>{formatCurrency(converted, currency.toUpperCase())}</p>
          <select
            className="select-trigger text-purple-100"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
          >
            {Object.keys(priceList).slice(0, 20).map((key) => (
              <option key={key} value={key}>{key.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
