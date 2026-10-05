import { useState } from "react";
import Reveal from "../components/Reveal";
import Fx from "../components/Fx";
import { Flora } from "../components/Ornaments";
import { weddingData as d } from "../data/weddingData";

const CopyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="8" y="8" width="11" height="11" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m5 12 4 4L19 6" />
  </svg>
);

const GiftIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="9" width="18" height="12" rx="2" />
    <path d="M12 9v12M3 13h18M12 9H7.5a2.5 2.5 0 1 1 0-5C10 4 12 9 12 9Z" />
    <path d="M12 9h4.5a2.5 2.5 0 1 0 0-5C14 4 12 9 12 9Z" />
  </svg>
);

const MapPinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

function AccountCard({ account, index }) {
  const [copied, setCopied] = useState(false);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(account.number);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      // Fallback untuk browser yang tidak mengizinkan clipboard API
      const textarea = document.createElement("textarea");
      textarea.value = account.number;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand("copy");
        setCopied(true);

        window.setTimeout(() => {
          setCopied(false);
        }, 1800);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  return (
    <Fx
      className="gift-account"
      from={index % 2 === 0 ? "left" : "right"}
      delay={index * 0.12}
      duration={0.9}
    >
      <div className="gift-account-top">
        <div className="gift-bank-logo">
          <img src={account.logo} alt={`Logo ${account.bank}`} />
        </div>
        <div className="gift-bank-label">REKENING</div>
      </div>

      <div className="gift-account-body">
        <div className="gift-account-number">{account.number}</div>

        <div className="gift-account-name">a.n. {account.name}</div>

        <button
          type="button"
          className={`gift-copy${copied ? " copied" : ""}`}
          onClick={copyNumber}
          aria-label={`Salin nomor rekening ${account.bank}`}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span>{copied ? "Tersalin" : "Salin Nomor"}</span>
        </button>
      </div>
    </Fx>
  );
}

export default function Gift() {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const copyAddress = async () => {
    const text = `${d.gift.shipping.recipient}\n${d.gift.shipping.address}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(true);

      window.setTimeout(() => {
        setCopiedAddress(false);
      }, 1800);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand("copy");
        setCopiedAddress(true);

        window.setTimeout(() => {
          setCopiedAddress(false);
        }, 1800);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  return (
    <Reveal id="gift" className="batik-soft gift-section">
      <Flora corner="tr" />
      <Flora corner="bl" />

      <div className="wrap gift-wrap">
        <Fx className="label center" from="down">
          TANDA KASIH
        </Fx>

        <Fx as="h2" className="script sec-title gift-title" delay={0.05}>
          Kado Pernikahan
        </Fx>

        <Fx className="gift-intro" from="up" delay={0.1}>
          <p>
            Doa dan kehadiran Anda merupakan hadiah terindah bagi kami. Namun
            apabila ingin memberikan tanda kasih, kami dengan senang hati
            menerimanya melalui pilihan berikut.
          </p>
        </Fx>

        <div className="gift-ornament" aria-hidden="true">
          <span />
          <GiftIcon />
          <span />
        </div>

        <div className="gift-accounts">
          {d.gift.accounts.map((account, index) => (
            <AccountCard
              key={`${account.bank}-${account.number}`}
              account={account}
              index={index}
            />
          ))}
        </div>

        <Fx className="gift-shipping" from="up" delay={0.25} duration={0.9}>
          <div className="gift-shipping-icon">
            <MapPinIcon />
          </div>

          <div className="gift-shipping-content">
            <div className="label">KIRIM KADO</div>

            <h3>Alamat Pengiriman</h3>

            <div className="gift-recipient">{d.gift.shipping.recipient}</div>

            <p>{d.gift.shipping.address}</p>

            <button
              type="button"
              className={`gift-copy gift-copy-address${
                copiedAddress ? " copied" : ""
              }`}
              onClick={copyAddress}
            >
              {copiedAddress ? <CheckIcon /> : <CopyIcon />}
              <span>{copiedAddress ? "Alamat Tersalin" : "Salin Alamat"}</span>
            </button>
          </div>
        </Fx>

        <Fx className="gift-note" from="fade" delay={0.35}>
          <span>
            Terima kasih atas perhatian dan kasih sayang yang diberikan kepada
            kami.
          </span>
        </Fx>
      </div>
    </Reveal>
  );
}
