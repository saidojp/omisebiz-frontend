# OmiseBiz Frontend

A modern, centralized platform for managing restaurant profiles and generating stunning public landing pages. Designed for restaurant owners to easily manage their digital presence.

## 🌟 Overview

OmiseBiz serves as a single source of truth for restaurant data. It allows owners to manage multiple locations, menus, operating hours, and media from one dashboard, automatically generating SEO-optimized public websites for each restaurant.

## 🚀 Key Features (MVP)

- **Owner Dashboard**: A comprehensive control panel to manage all your restaurant listings.
- **Restaurant Management**:
  - Detailed profile editing (Contacts, Address, Map Location).
  - Operating Hours management with break times.
  - Rich attribute selection (Amenities, Payment methods, etc.).
- **Visual Content**:
  - Image Gallery (Interior, Exterior, Food, Team).
  - Menu management (Digital menu items & Featured Dish).
- **Public Landing Pages**:
  - Automatically generated at `/r/[slug]`.
  - Modern, responsive design.
  - SEO-optimized metadata.
- **Public Directory**: Browse all published restaurants in the system.
- **Authentication**: Secure login/registration for business owners.

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn UI, Material UI
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Networking**: Axios

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- Backend API running (default: port 4000)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd omisebiz-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000/api
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

# OmiseBiz フロントエンド

レストランのプロフィールを一元管理し、魅力的な公開ランディングページを生成する最新のプラットフォームです。飲食店のオーナーがデジタルプレゼンスを簡単に管理できるように設計されています。

## 🌟 概要

OmiseBizは、レストランデータの「信頼できる唯一の情報源（Single Source of Truth）」として機能します。オーナーは1つのダッシュボードから複数の店舗、メニュー、営業時間、メディアを管理でき、各レストランのSEO最適化された公開ウェブサイトを自動的に生成します。

## 🚀 主な機能 (MVP)

- **オーナーダッシュボード**: すべてのレストランリストを管理するための包括的なコントロールパネル。
- **レストラン管理**:
  - 詳細なプロフィール編集（連絡先、住所、地図上の位置）。
  - 休憩時間を含む営業時間の管理。
  - 豊富な属性選択（アメニティ、支払い方法など）。
- **ビジュアルコンテンツ**:
  - 画像ギャラリー（内観、外観、料理、チーム）。
  - メニュー管理（デジタルメニュー項目＆おすすめ料理）。
- **公開ランディングページ**:
  - `/r/[slug]` で自動生成されます。
  - モダンでレスポンシブなデザイン。
  - SEO最適化されたメタデータ。
- **公開ディレクトリ**: システム内のすべての公開レストランを閲覧可能。
- **認証**: ビジネスオーナー向けの安全なログイン/登録機能。

## � 技術スタック

- **フレームワーク**: Next.js 14+ (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS, Shadcn UI, Material UI
- **状態管理**: Zustand
- **フォーム**: React Hook Form + Zod
- **通信**: Axios

## � 始め方

### 前提条件
- Node.js 18以上
- バックエンドAPIが稼働していること（デフォルト: ポート4000）

### インストール

1. **リポジトリのクローン**
   ```bash
   git clone <repo-url>
   cd omisebiz-frontend
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   ```

3. **環境設定**
   `.env.local` ファイルを作成します:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000/api
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認してください。
