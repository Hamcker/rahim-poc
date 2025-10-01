# پروژه مدیریت وظایف (Todo List)

یک پروژه Monorepo شامل فرانت‌اند React و بک‌اند NestJS برای مدیریت لیست وظایف با قابلیت‌های CRUD، صفحه‌بندی و فیلتر کردن.

## 📋 فهرست مطالب

- [معرفی پروژه](#معرفی-پروژه)
- [ویژگی‌ها](#ویژگیها)
- [ساختار پروژه](#ساختار-پروژه)
- [پیش‌نیازها](#پیشنیازها)
- [نصب و راه‌اندازی](#نصب-و-راهاندازی)
- [استفاده از پروژه](#استفاده-از-پروژه)
- [توضیحات فنی](#توضیحات-فنی)

## 🎯 معرفی پروژه

این پروژه یک سیستم مدیریت وظایف کامل است که با تکنولوژی‌های مدرن ساخته شده است. شما می‌توانید وظایف خود را ایجاد، ویرایش، حذف و مشاهده کنید. همچنین امکان جستجو، فیلتر کردن بر اساس وضعیت و اولویت، و صفحه‌بندی وجود دارد.

## ✨ ویژگی‌ها

### عملیات CRUD
- **ایجاد** وظایف جدید با عنوان، توضیحات، وضعیت و اولویت
- **مشاهده** لیست وظایف با صفحه‌بندی
- **ویرایش** وظایف موجود
- **حذف** وظایف

### فیلتر و جستجو
- جستجو در عنوان وظایف
- فیلتر بر اساس وضعیت (در انتظار، در حال انجام، انجام شده)
- فیلتر بر اساس اولویت (کم، متوسط، زیاد)

### صفحه‌بندی
- نمایش تعداد مشخصی وظیفه در هر صفحه
- قابلیت حرکت بین صفحات مختلف

### ستون‌های Todo
هر وظیفه شامل اطلاعات زیر است:
- **id**: شناسه یکتا
- **title**: عنوان وظیفه
- **description**: توضیحات وظیفه
- **status**: وضعیت (pending, in_progress, completed)
- **priority**: اولویت (low, medium, high)
- **createdAt**: تاریخ ایجاد
- **updatedAt**: تاریخ آخرین به‌روزرسانی

## 📁 ساختار پروژه

```
rahim-poc/
├── backend/                 # بک‌اند NestJS
│   ├── src/
│   │   ├── todos/          # ماژول مدیریت وظایف
│   │   │   ├── dto/        # Data Transfer Objects
│   │   │   ├── entities/   # Entity های TypeORM
│   │   │   ├── todos.controller.ts
│   │   │   ├── todos.service.ts
│   │   │   └── todos.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env.example        # نمونه فایل تنظیمات
│   └── package.json
│
├── frontend/               # فرانت‌اند React
│   ├── src/
│   │   ├── api/           # سرویس‌های API
│   │   ├── components/    # کامپوننت‌های UI
│   │   │   ├── ui/       # کامپوننت‌های shadcn/ui
│   │   │   └── todos/    # کامپوننت‌های مدیریت وظایف
│   │   ├── types/        # تایپ‌های TypeScript
│   │   ├── lib/          # توابع کمکی
│   │   └── App.tsx       # کامپوننت اصلی
│   ├── .env.example      # نمونه فایل تنظیمات
│   └── package.json
│
└── README.md             # این فایل
```

## 🔧 پیش‌نیازها

قبل از شروع، مطمئن شوید که موارد زیر را نصب کرده‌اید:

### نرم‌افزارهای مورد نیاز:
- **Node.js** (نسخه 18 یا بالاتر) - [دانلود](https://nodejs.org/)
- **npm** (به همراه Node.js نصب می‌شود)
- **SQL Server** - [دانلود](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
  - می‌توانید از SQL Server Express (رایگان) استفاده کنید
  - یا از Docker استفاده کنید (توضیحات در ادامه)

### بررسی نصب Node.js:
```bash
node --version
npm --version
```

## 🚀 نصب و راه‌اندازی

### 1. دانلود پروژه

```bash
git clone <repository-url>
cd rahim-poc
```

### 2. راه‌اندازی SQL Server

#### گزینه الف: استفاده از Docker (پیشنهادی)
```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourPassword123" \
  -p 1433:1433 --name sqlserver \
  -d mcr.microsoft.com/mssql/server:2022-latest
```

#### گزینه ب: نصب SQL Server به صورت محلی
1. SQL Server را از سایت مایکروسافت دانلود و نصب کنید
2. SQL Server Management Studio (SSMS) را نصب کنید (اختیاری اما پیشنهادی)
3. دیتابیس `TodoDB` را ایجاد کنید:
```sql
CREATE DATABASE TodoDB;
```

### 3. راه‌اندازی بک‌اند (Backend)

```bash
# ورود به پوشه بک‌اند
cd backend

# نصب وابستگی‌ها
npm install

# کپی فایل تنظیمات و ویرایش آن
cp .env.example .env

# ویرایش فایل .env و تنظیم اطلاعات دیتابیس
# nano .env یا با هر ویرایشگر دیگری

# اجرای پروژه
npm run start:dev
```

**نکته مهم**: فایل `.env` را ویرایش کنید و اطلاعات دیتابیس را وارد کنید:
```env
DB_HOST=localhost
DB_PORT=1433
DB_USERNAME=sa
DB_PASSWORD=YourPassword123
DB_DATABASE=TodoDB
PORT=3000
FRONTEND_URL=http://localhost:5173
```

بک‌اند روی آدرس `http://localhost:3000` اجرا می‌شود.

### 4. راه‌اندازی فرانت‌اند (Frontend)

ترمینال جدیدی باز کنید:

```bash
# ورود به پوشه فرانت‌اند
cd frontend

# نصب وابستگی‌ها
npm install

# کپی فایل تنظیمات
cp .env.example .env

# اجرای پروژه
npm run dev
```

فرانت‌اند روی آدرس `http://localhost:5173` اجرا می‌شود.

## 📖 استفاده از پروژه

### دسترسی به برنامه
1. بک‌اند را در یک ترمینال اجرا کنید: `cd backend && npm run start:dev`
2. فرانت‌اند را در ترمینال دیگری اجرا کنید: `cd frontend && npm run dev`
3. مرورگر خود را باز کنید و به آدرس `http://localhost:5173` بروید

### کار با برنامه

#### افزودن وظیفه جدید
1. روی دکمه "افزودن وظیفه" کلیک کنید
2. فرم را پر کنید:
   - **عنوان**: عنوان وظیفه (الزامی)
   - **توضیحات**: توضیحات تکمیلی (اختیاری)
   - **وضعیت**: در انتظار، در حال انجام، یا انجام شده
   - **اولویت**: کم، متوسط، یا زیاد
3. روی "ذخیره" کلیک کنید

#### ویرایش وظیفه
1. روی آیکون ویرایش (مداد) کنار هر وظیفه کلیک کنید
2. اطلاعات را ویرایش کنید
3. روی "ذخیره" کلیک کنید

#### حذف وظیفه
1. روی آیکون حذف (سطل زباله) کنار هر وظیفه کلیک کنید
2. حذف را تایید کنید

#### جستجو و فیلتر
- **جستجو**: در کادر جستجو عنوان مورد نظر را تایپ کنید
- **فیلتر وضعیت**: از منوی کشویی وضعیت، گزینه مورد نظر را انتخاب کنید
- **فیلتر اولویت**: از منوی کشویی اولویت، گزینه مورد نظر را انتخاب کنید
- **پاک کردن فیلترها**: روی دکمه "پاک کردن" کلیک کنید

#### صفحه‌بندی
- از دکمه‌های پایین صفحه برای حرکت بین صفحات استفاده کنید
- می‌توانید مستقیم روی شماره صفحه کلیک کنید

## 🔍 توضیحات فنی

### تکنولوژی‌های استفاده شده

#### بک‌اند (Backend)
- **NestJS**: فریم‌ورک Node.js برای ساخت برنامه‌های سمت سرور
- **TypeORM**: ORM برای کار با دیتابیس
- **SQL Server**: دیتابیس رابطه‌ای
- **TypeScript**: زبان برنامه‌نویسی
- **class-validator**: اعتبارسنجی داده‌ها
- **class-transformer**: تبدیل داده‌ها

#### فرانت‌اند (Frontend)
- **React**: کتابخانه UI
- **TypeScript**: زبان برنامه‌نویسی
- **Vite**: ابزار build و development
- **Tailwind CSS**: فریم‌ورک CSS
- **shadcn/ui**: کامپوننت‌های UI
- **Radix UI**: کامپوننت‌های قابل دسترسی
- **Axios**: کتابخانه HTTP client
- **Lucide React**: آیکون‌ها

### API Endpoints

بک‌اند API های زیر را ارائه می‌دهد:

- `GET /todos` - دریافت لیست وظایف (با پشتیبانی از pagination و filter)
  - Query params: `page`, `limit`, `search`, `status`, `priority`
- `GET /todos/:id` - دریافت یک وظیفه خاص
- `POST /todos` - ایجاد وظیفه جدید
- `PATCH /todos/:id` - به‌روزرسانی وظیفه
- `DELETE /todos/:id` - حذف وظیفه

### ساختار دیتابیس

جدول `todos`:
```sql
- id (int, primary key, auto increment)
- title (varchar(255), not null)
- description (text, nullable)
- status (varchar, enum: pending/in_progress/completed)
- priority (varchar, enum: low/medium/high)
- createdAt (datetime)
- updatedAt (datetime)
```

### دستورات مفید

#### Backend
```bash
cd backend

# اجرای در حالت development
npm run start:dev

# ساخت برای production
npm run build

# اجرای در حالت production
npm run start:prod
```

#### Frontend
```bash
cd frontend

# اجرای development server
npm run dev

# ساخت برای production
npm run build

# پیش‌نمایش build
npm run preview
```

## 🐛 رفع مشکلات رایج

### مشکل اتصال به دیتابیس
- مطمئن شوید SQL Server در حال اجرا است
- اطلاعات دیتابیس در فایل `.env` را بررسی کنید
- دیتابیس `TodoDB` را ایجاد کرده‌اید؟

### خطای CORS
- مطمئن شوید فرانت‌اند روی `http://localhost:5173` اجرا می‌شود
- تنظیمات CORS در `backend/src/main.ts` را بررسی کنید

### خطای نصب وابستگی‌ها
- نسخه Node.js را بررسی کنید (باید 18 یا بالاتر باشد)
- cache npm را پاک کنید: `npm cache clean --force`
- دوباره نصب کنید: `rm -rf node_modules package-lock.json && npm install`

## 📚 منابع آموزشی

- [مستندات NestJS](https://docs.nestjs.com/)
- [مستندات React](https://react.dev/)
- [مستندات Tailwind CSS](https://tailwindcss.com/docs)
- [مستندات TypeORM](https://typeorm.io/)
- [مستندات shadcn/ui](https://ui.shadcn.com/)

## 👨‍💻 برای توسعه‌دهندگان

اگر می‌خواهید به توسعه این پروژه کمک کنید:
1. پروژه را Fork کنید
2. یک branch جدید ایجاد کنید: `git checkout -b feature/amazing-feature`
3. تغییرات را commit کنید: `git commit -m 'Add some amazing feature'`
4. به branch خود push کنید: `git push origin feature/amazing-feature`
5. یک Pull Request باز کنید

---

**نکته**: این پروژه برای اهداف آموزشی و نمونه کار ساخته شده است. برای استفاده در محیط production، تنظیمات امنیتی و بهینه‌سازی‌های بیشتری نیاز است.
