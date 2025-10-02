-- ============================================
-- USERS
-- ============================================
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(191) NOT NULL,
  email VARCHAR(191) NOT NULL UNIQUE,
  email_verified_at TIMESTAMP NULL,
  foto VARCHAR(300),
  password VARCHAR(191) NOT NULL,
  remember_token VARCHAR(100),
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  status SMALLINT DEFAULT 1
);

-- ============================================
-- ROLES
-- ============================================
CREATE TABLE roles (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(191) NOT NULL,
  guard_name VARCHAR(191) NOT NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  UNIQUE(name, guard_name)
);

-- ============================================
-- PERMISSIONS
-- ============================================
CREATE TABLE permissions (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(191) NOT NULL,
  guard_name VARCHAR(191) NOT NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  UNIQUE(name, guard_name)
);

-- ============================================
-- RELACIONES DE ROLES Y PERMISOS
-- ============================================
CREATE TABLE role_has_permissions (
  permission_id BIGINT NOT NULL,
  role_id BIGINT NOT NULL,
  PRIMARY KEY (permission_id, role_id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE model_has_roles (
  role_id BIGINT NOT NULL,
  model_type VARCHAR(191) NOT NULL,
  model_id BIGINT NOT NULL,
  PRIMARY KEY (role_id, model_id, model_type),
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE model_has_permissions (
  permission_id BIGINT NOT NULL,
  model_type VARCHAR(191) NOT NULL,
  model_id BIGINT NOT NULL,
  PRIMARY KEY (permission_id, model_id, model_type),
  FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- ============================================
-- CONTRATOS
-- ============================================
CREATE TABLE contratos (
  id_contrato BIGSERIAL PRIMARY KEY,
  tipoContrato VARCHAR(60) NOT NULL
);

-- ============================================
-- DOCENTES
-- ============================================
CREATE TABLE docentes (
  id_docente BIGSERIAL PRIMARY KEY,
  id_usuario BIGINT REFERENCES users(id) ON DELETE CASCADE,
  id_contrato BIGINT NOT NULL REFERENCES contratos(id_contrato) ON DELETE CASCADE,
  nombre VARCHAR(60) NOT NULL,
  apellido_p VARCHAR(20) NOT NULL,
  apellido_m VARCHAR(20) NOT NULL,
  rfc_empleado VARCHAR(13) NOT NULL,
  cedula VARCHAR(14) NOT NULL,
  genero VARCHAR(10) NOT NULL,
  correo VARCHAR(60) NOT NULL,
  telefono VARCHAR(10) NOT NULL,
  hora_entrada TIME NOT NULL,
  hora_salida TIME NOT NULL,
  horas_clase INTEGER NOT NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  status SMALLINT DEFAULT 1
);

-- ============================================
-- MATERIAS
-- ============================================
CREATE TABLE materias (
  id_materia BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(60) NOT NULL,
  clave VARCHAR(10) NOT NULL,
  carrera VARCHAR(50) NOT NULL,
  creditos INTEGER NOT NULL,
  horas_practicas INTEGER NOT NULL,
  horas_teoricas INTEGER NOT NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  status SMALLINT DEFAULT 1
);

-- ============================================
-- GRUPOS
-- ============================================
CREATE TABLE grupos (
  id_grupo BIGSERIAL PRIMARY KEY,
  id_docente BIGINT NOT NULL REFERENCES docentes(id_docente) ON DELETE CASCADE,
  id_materia BIGINT NOT NULL REFERENCES materias(id_materia) ON DELETE CASCADE,
  nombre VARCHAR(10) NOT NULL,
  periodo VARCHAR(20) NOT NULL,
  aula VARCHAR(5) NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  status SMALLINT DEFAULT 1
);

-- ============================================
-- CATEGORIA EVIDENCIAS
-- ============================================
CREATE TABLE categoria_evidencias (
  id_categoria BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(60) NOT NULL,
  descripcion TEXT NOT NULL
);

-- ============================================
-- EVIDENCIAS
-- ============================================
CREATE TABLE evidencias (
  id_evidencia BIGSERIAL PRIMARY KEY,
  estatus SMALLINT NOT NULL,
  descripcion TEXT NOT NULL,
  no_intentos INTEGER NOT NULL DEFAULT 3,
  id_categoria BIGINT NOT NULL REFERENCES categoria_evidencias(id_categoria) ON DELETE CASCADE,
  periodo VARCHAR(45),
  noArchivosPermitidos INTEGER NOT NULL DEFAULT 1,
  fecha_asignada TIMESTAMP,
  fecha_entrega TIMESTAMP,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

-- ============================================
-- EVIDENCIA GRUPOS
-- ============================================
CREATE TABLE evidencia_grupos (
  idEG BIGSERIAL PRIMARY KEY,
  id_evidencia BIGINT NOT NULL REFERENCES evidencias(id_evidencia) ON DELETE CASCADE,
  id_grupo BIGINT NOT NULL REFERENCES grupos(id_grupo) ON DELETE CASCADE,
  observacion TEXT,
  estatus INTEGER DEFAULT 0,
  intento INTEGER DEFAULT 0,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  comentarios TEXT
);

-- ============================================
-- ARCHIVOS
-- ============================================
CREATE TABLE archivos (
  id_archivo BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL,
  extension VARCHAR(10) NOT NULL,
  url TEXT NOT NULL,
  fecha_carga TIMESTAMP NOT NULL,
  peso_mb INTEGER,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

-- ============================================
-- ARCHIVO EVIDENCIAS
-- ============================================
CREATE TABLE archivo_evidencias (
  idAE BIGSERIAL PRIMARY KEY,
  id_evidencia BIGINT NOT NULL REFERENCES evidencia_grupos(idEG) ON DELETE CASCADE,
  id_archivo BIGINT NOT NULL REFERENCES archivos(id_archivo) ON DELETE CASCADE,
  observacion TEXT,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);