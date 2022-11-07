import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data:{
      name: 'User 1',
      email: 'user1@gmail.com',
      avatarUrl: 'https://github.com/WalliceCariasPerussio.png'
    }
  })

  const poll = await prisma.poll.create({
    data:{
      title:'Example Poll',
      code: 'BOL123',
      ownerId: user.id,

      participants:{
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-08T12:00:00.690Z',
      firstTeamCountryCode:'DE',
      secondTeamCountryCode: 'BR'
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-08T12:00:00.690Z',
      firstTeamCountryCode:'BR',
      secondTeamCountryCode: 'AR',

      guesses:{
        create:{
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant:{
            connect:{
              userId_pollId: {
                userId: user.id,
                pollId: poll.id
              }
            }
          }
        }
      }
    }
  })
}

main()