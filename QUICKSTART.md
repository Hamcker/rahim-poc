# راهنمای سریع شروع کار

این راهنما مراحل سریع برای راه‌اندازی پروژه را شرح می‌دهد.

## پیش‌نیازها
- Node.js 18+
- Docker (برای SQL Server)

## مراحل راه‌اندازی

### 1. نصب وابستگی‌ها
```bash
# در ریشه پروژه
npm run install:all
```

### 2. راه‌اندازی دیتابیس
```bash
# استفاده از Docker Compose
docker-compose up -d
```

### 3. تنظیمات محیط

#### Backend
```bash
cd backend
cp .env.example .env
# فایل .env را ویرایش کنید (در صورت نیاز)
```

#### Frontend
```bash
cd frontend
cp .env.example .env
# فایل .env را ویرایش کنید (در صورت نیاز)
```

### 4. اجرای برنامه

در دو ترمینال جداگانه:

**ترمینال 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**ترمینال 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. دسترسی به برنامه
مرورگر خود را باز کنید و به آدرس زیر بروید:
```
http://localhost:5173
```

## دستورات مفید

### ساخت برای Production
```bash
# در ریشه پروژه
npm run build:all
```

### توقف دیتابیس
```bash
docker-compose down
```

### مشاهده لاگ‌های دیتابیس
```bash
docker-compose logs -f sqlserver
```

## رفع مشکل

### خطای اتصال به دیتابیس
1. مطمئن شوید Docker در حال اجرا است
2. وضعیت container را بررسی کنید: `docker-compose ps`
3. لاگ‌ها را بررسی کنید: `docker-compose logs sqlserver`

### پورت در حال استفاده
اگر پورت 3000 یا 5173 در حال استفاده است:
- Backend: متغیر `PORT` را در `.env` تغییر دهید
- Frontend: از پارامتر `--port` استفاده کنید: `npm run dev -- --port 3001`
