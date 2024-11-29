import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Crie uma senha hashada
  const plainPassword = '12345678';
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  // Crie o usuário com a senha hashada
  const user = await prisma.user.create({
    data: {
      email: 'viniciusbeserra1341@gmail.com',
      password: hashedPassword, // Salve a senha já hashada
    },
  });

  console.log('Usuário criado:', user);

  // Crie uma tarefa associada ao novo usuário
  const task = await prisma.task.create({
    data: {
      title: 'Tarefa inicial do Vinicius',
      description:
        'Esta é uma tarefa de exemplo associada ao usuário Vinicius.',
      status: 'TO_DO', // Substitua pelo valor correto do enum, se necessário
      userId: user.id, // Associando a task ao usuário
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
