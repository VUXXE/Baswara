"use client";
import { useState } from "react";
import { WeddingData } from "@/lib/types";

export default function GiftSection({ data }: { data: WeddingData }) {
  const [copied, setCopied] = useState<string | null>(null);

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <section className="inv-section">
      <p className="inv-section-label">Wedding Gift</p>
      <h2 className="inv-section-title">Amplop <em>Digital</em></h2>
      <p className="inv-section-sub">Doa restu Anda merupakan karunia terbesar bagi kami. Namun jika ingin memberikan tanda kasih, silakan melalui:</p>

      <div className="inv-gift-cards">
        {data.gift.banks.map((b) => (
          <div className="inv-gift-card" key={b.bank}>
            <div>
              <p className="inv-gift-bank">{b.bank}</p>
              <p className="inv-gift-name">{b.accountName}</p>
              <p className="inv-gift-number">{b.accountNumber}</p>
            </div>
            <button
              className={`inv-copy-btn${copied === b.accountNumber ? " copied" : ""}`}
              onClick={() => copy(b.accountNumber, b.accountNumber)}
            >
              {copied === b.accountNumber ? "✓ Tersalin" : "Salin"}
            </button>
          </div>
        ))}
      </div>

      <div className="inv-gift-address">
        <div>
          <p className="inv-gift-addr-label">Alamat Pengiriman</p>
          <p className="inv-gift-addr-text">{data.gift.address}</p>
        </div>
        <button
          className={`inv-copy-btn${copied === "addr" ? " copied" : ""}`}
          onClick={() => copy(data.gift.address, "addr")}
        >
          {copied === "addr" ? "✓ Tersalin" : "Salin"}
        </button>
      </div>
    </section>
  );
}
