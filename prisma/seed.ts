import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Crear usuario de prueba
  const user = await prisma.user.create({
    data: {
      name: 'Usuario Demo',
      email: 'demo@example.com',
      password: 'password123', // En producción, esto debería estar hasheado
    },
  })

  // Crear algunos eventos de prueba
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: 'Conferencia de Tecnología',
        description: 'Una conferencia sobre las últimas tendencias tecnológicas',
        category: 'Tecnología',
        date: new Date('2024-07-15T10:00:00Z'),
        location: 'Centro de Convenciones',
        creatorId: user.id,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Workshop de Programación',
        description: 'Aprende programación desde cero',
        category: 'Educación',
        date: new Date('2024-08-01T14:00:00Z'),
        location: 'Universidad Central',
        creatorId: user.id,
      },
    }),
  ])

  console.log('Datos de prueba creados exitosamente')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 