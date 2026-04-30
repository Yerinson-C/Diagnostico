import { TemplateDiagnosticoRepository } from './repositories/templateDiagnostico.repository';
import { pool } from './config/db';

async function verify() {
  const repository = new TemplateDiagnosticoRepository();
  
  try {
    // 1. Buscamos todos los diagnósticos para tomar el ID del primero
    const diagnosticos = await repository.findAll();
    
    if (diagnosticos.length === 0) {
      console.log('No hay diagnósticos en la base de datos.');
      return;
    }

    const firstId = diagnosticos[0].id!;
    console.log(`--- Verificando Diagnóstico ID: ${firstId} ---`);

    // 2. Ejecutamos la consulta anidada
    const detailedDiagnostico = await repository.findByIdWithPreguntas(firstId);

    if (detailedDiagnostico) {
      console.log('Detalles encontrados:');
      console.log(JSON.stringify(detailedDiagnostico, null, 2));
      
      if (detailedDiagnostico.preguntas && detailedDiagnostico.preguntas.length > 0) {
        console.log(`\n✅ Éxito: Se encontraron ${detailedDiagnostico.preguntas.length} preguntas anidadas.`);
        
        const hasOptions = detailedDiagnostico.preguntas.some(p => p.opciones_detalladas && p.opciones_detalladas.length > 0);
        if (hasOptions) {
          console.log('✅ Éxito: Las preguntas también incluyen sus opciones detalladas.');
        } else {
          console.log('⚠️ Aviso: Las preguntas no tienen opciones detalladas (o no se encontraron).');
        }
      } else {
        console.log('\n❌ Error: No se encontraron preguntas anidadas para este diagnóstico.');
      }
    } else {
      console.log('❌ Error: No se pudo encontrar el diagnóstico con detalles.');
    }

  } catch (error) {
    console.error('Error durante la verificación:', error);
  } finally {
    await pool.end();
  }
}

verify();
