const { PrismaClient } = require('@prisma/client');

async function checkDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Intentando conectar a la base de datos...');
    await prisma.$connect();
    console.log('✅ Conexión exitosa a la base de datos');

    // Verificar si hay eventos
    const eventCount = await prisma.event.count();
    console.log(`Número de eventos en la base de datos: ${eventCount}`);

    // Verificar si hay usuarios
    const userCount = await prisma.user.count();
    console.log(`Número de usuarios en la base de datos: ${userCount}`);

  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:');
    console.error('Mensaje:', error.message);
    console.error('Código:', error.code);
    
    if (error.code === 'P1001') {
      console.log('\nPosibles soluciones:');
      console.log('1. Verifica que PostgreSQL esté instalado y corriendo');
      console.log('2. Verifica que la base de datos "scape_events" exista');
      console.log('3. Verifica que las credenciales en el archivo .env sean correctas');
    }
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase(); 