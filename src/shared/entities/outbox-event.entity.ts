import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('outbox_events')
export class OutboxEventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column('jsonb')
  payload: any;

  @Column({ default: false })
  processed: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
