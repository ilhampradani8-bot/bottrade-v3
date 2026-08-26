# BitTrade V3 - AssemblyScript (WebAssembly Engine) Trading & Research Platform

![BitTrade V3 Wasm](https://img.shields.io/badge/BitTrade-v3.0--Wasm-purple.svg)
![AssemblyScript](https://img.shields.io/badge/AssemblyScript-Strict--TS-blue.svg)
![WebAssembly](https://img.shields.io/badge/WebAssembly-bytecode-orange.svg)

`bittrade-v3` adalah generasi ke-3 platform perdagangan kripto otomatis dan kerangka kerja penelitian kuantitatif multi-strategi. Berbeda dengan V2 (Rust), V3 menggunakan **AssemblyScript (dikompilasi ke WebAssembly / Wasm)** untuk kalkulasi matematis performa tinggi mendekati native (C/Rust) dengan kenyamanan sintaks TypeScript Strict Mode.

---

## 🏛️ Arsitektur Sistem (AssemblyScript Wasm Engine)

```
bittrade-v3/
├── package.json             # NPM Tooling & AssemblyScript Compiler (asc)
├── asconfig.json            # Konfigurasi Build Target Wasm (debug & release)
├── pyproject.toml           # Konfigurasi Environment Python Research
├── requirements.txt         # Paket Riset Kuantitatif (pandas, numpy, scipy, statsmodels)
├── README.md                # Dokumentasi & Panduan Proyek
├── .gitignore               # Aturan pemblokiran build cache & Wasm output
│
├── assembly/                # Core Math & Strategy Engine (AssemblyScript / Wasm)
│   ├── index.ts             # Exported Wasm functions (Entrypoint Compiler)
│   ├── indicators.ts        # Indikator Teknikal (EMA, Bollinger Bands, StdDev Volatility, VSR)
│   ├── strategies.ts        # Evaluasi Logika Strategi (Market Regime V3, SmartDCA, StatARB)
│   └── backtest.ts          # Loop Backtest Performa Tinggi di Wasm Memory
│
├── build/                   # Output Biner WebAssembly (Wasm)
│   ├── optimized.wasm       # Biner Wasm Terkompilasi (Release Target)
│   └── untouched.wasm       # Biner Wasm Debug Target
│
├── server/                  # Wasm Host Runtime & WebSockets API (TypeScript/Node.js)
│   ├── wasm_loader.ts       # Host Loader & Wasm Memory Instantiator
│   └── index.ts             # REST API Dashboard & Engine Monitor Server
│
├── research/                # Sandbox Penelitian Kuantitatif (Python)
│   └── analysis_template.py # Script Pengujian Kline, Volatilitas, & StatARB Cointegration
│
└── web-ui/                  # Dashboard Pemantauan UI Modern (Glassmorphism & Dark Mode)
    ├── index.html           # Dashboard Main UI
    ├── style.css            # Custom Styling
    └── app.js               # Frontend Controller
```

---

## ⚡ Mengapa AssemblyScript (WebAssembly)?

1. **Sintaks TypeScript Strict Mode**: Pengkodean strategi dan indikator 3x-5x lebih cepat daripada Rust, tanpa kompleksitas *borrow checker*.
2. **Kecepatan Near-Native**: Kode AssemblyScript dikompilasi langsung menjadi bytecode WebAssembly (`.wasm`) teroptimasi, dieksekusi dengan kecepatan matematis mendekati C/Rust.
3. **Strict Type Safety**: Mencegah *runtime error* dengan pengecekan tipe statis penuh (`f64`, `f32`, `i32`, `i64`).
4. **Sandboxed & Isolated Memory**: Logika kalkulasi berjalan terisolasi di dalam Wasm Linear Memory.

---

## 🚀 Panduan Memulai (Quick Start)

### 1. Build Biner WebAssembly (`.wasm`)
```bash
# Install dependensi
npm install

# Kompilasi AssemblyScript ke WebAssembly
npm run asbuild
```

### 2. Menguji Host Loader Wasm
```bash
npm run test:wasm
```

### 3. Menjalankan Server Dashboard & Engine Host
```bash
npm start
```

### 4. Menjalankan Python Quantitative Sandbox
```bash
python research/analysis_template.py
```
