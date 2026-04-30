-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS aqualub_db;
USE aqualub_db;

-- Tabla de Diagnósticos (Plantillas)
CREATE TABLE IF NOT EXISTS templateDiagnostico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Preguntas
CREATE TABLE IF NOT EXISTS templatePregunta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    template_diagnostico_id INT,
    pregunta TEXT NOT NULL,
    tipo ENUM('abierta', 'multiple', 'booleana') NOT NULL,
    opciones JSON, -- Para compatibilidad con el modelo anterior
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (template_diagnostico_id) REFERENCES templateDiagnostico(id) ON DELETE CASCADE
);

-- Tabla de Opciones (Para preguntas de opción múltiple)
CREATE TABLE IF NOT EXISTS templateOpcion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    template_pregunta_id INT NOT NULL,
    opcion VARCHAR(255) NOT NULL,
    valor INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (template_pregunta_id) REFERENCES templatePregunta(id) ON DELETE CASCADE
);

-- Datos de prueba (Opcional)
-- INSERT INTO templateDiagnostico (nombre, descripcion) VALUES ('Diagnóstico Energético', 'Evaluación inicial de consumo');
