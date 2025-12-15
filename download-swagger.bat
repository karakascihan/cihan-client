@echo off
REM ---------------------------------------------
REM 1️⃣ PowerShell ile Swagger JSON indir
REM ---------------------------------------------
echo 🔹 Swagger JSON indiriliyor...
powershell -Command "Invoke-WebRequest -Uri 'https://localhost:44321/swagger/v1/swagger.json' -OutFile 'swagger.json' -UseBasicParsing"
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Swagger JSON indirilemedi!
    pause
    exit /b 1
)
echo ✅ swagger.json oluşturuldu!

REM ---------------------------------------------
REM 2️⃣ NSwag ile TypeScript client generate et
REM ---------------------------------------------
echo 🔹 NSwag çalıştırılıyor...
"C:\Users\cihan.karakas\.dotnet\tools\nswag.exe" run nswag.json
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ NSwag çalıştırılamadı!
    pause
    exit /b 1
)
echo ✅ NSwag tamamlandı!

REM ---------------------------------------------
REM 3️⃣ Enum mapping script çalıştır
REM ---------------------------------------------
echo 🔹 Enum mapping script çalıştırılıyor...
node generate-enum-maps.js
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Enum mapping script çalıştırılamadı!
    pause
    exit /b 1
)
echo ✅ extra-enums.ts oluşturuldu!

pause
