import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const plainPassword = 'wopus2024';
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  const user = await prisma.user.create({
    data: {
      email: 'admWopus@gmail.com',
      password: hashedPassword,
    },
  });

  console.log('Usuário criado:', user);

  const task = await prisma.task.create({
    data: {
      title: 'Tarefa inicial do Vinicius',
      description:
        'Esta é uma tarefa de exemplo associada ao usuário Vinicius.',
      status: 'PENDENTE',
      userId: user.id,
    },
  });

  console.log('Tarefa criada:', task);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
