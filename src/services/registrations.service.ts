import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RegistrationsService {
  constructor(private prisma: PrismaService) {}

  async registerForEvent(eventId: number, userId: number) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId, ativo: true },
    });

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    const existingRegistration = await this.prisma.registros.findUnique({
      where: {
        userId_eventId: {
          userId,
          eventId,
        },
      },
    });

    if (existingRegistration) {
      throw new ConflictException('Você já está inscrito neste evento');
    }

    return this.prisma.registros.create({
      data: {
        userId,
        eventId,
        status: 'CONFIRMADO',
        createdAt: new Date(),
      },
      include: {
        event: true,
        user: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
    });
  }

  async getUserRegistrations(userId: number) {
    return this.prisma.registros.findMany({
      where: { userId },
      include: {
        event: {
          include: {
            creator: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async cancelRegistration(registrationId: string, userId: number) {
    const registration = await this.prisma.registros.findUnique({
      where: { id: registrationId },
    });

    if (!registration) {
      throw new NotFoundException('Inscrição não encontrada');
    }

    if (registration.userId !== userId) {
      throw new ConflictException('Você não tem permissão para cancelar esta inscrição');
    }

    return this.prisma.registros.update({
      where: { id: registrationId },
      data: { status: 'CANCELADO' },
      include: {
        event: true,
      },
    });
  }
}