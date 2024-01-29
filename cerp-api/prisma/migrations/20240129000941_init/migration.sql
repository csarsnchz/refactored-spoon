-- CreateTable
CREATE TABLE "tiponegocio" (
    "codtiponegocio" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "tenant" (
    "tenant" TEXT NOT NULL PRIMARY KEY,
    "std" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "codtiponegocio" TEXT NOT NULL,
    "nomcomercial" TEXT NOT NULL,
    "nombprofesional" TEXT NOT NULL,
    "desctenant" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "counter" INTEGER NOT NULL DEFAULT 0,
    "tenant" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tiponegocio_codtiponegocio_key" ON "tiponegocio"("codtiponegocio");

-- CreateIndex
CREATE UNIQUE INDEX "tiponegocio_nombre_key" ON "tiponegocio"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "tenant_tenant_key" ON "tenant"("tenant");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
