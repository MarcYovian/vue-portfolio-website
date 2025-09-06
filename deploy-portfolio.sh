#!/bin/bash

# Hentikan skrip jika ada perintah yang gagal
set -e

# Ganti dengan path absolut ke folder proyek Anda
PROJECT_DIR="/var/www/portfolio-vue"

echo "🚀 Memulai proses deployment..."

# Masuk ke direktori proyek
cd $PROJECT_DIR

# 1. Tarik perubahan terbaru dari branch 'main'
echo "🚚 Menarik kode terbaru dari Git..."
git pull origin main

# 2. Install atau update dependencies
echo "📦 Menginstall dependencies..."
npm install

# 3. Build ulang proyek Vue.js
echo "🏗️ Membangun proyek untuk production..."
npm run build

echo "✅ Deployment selesai!"