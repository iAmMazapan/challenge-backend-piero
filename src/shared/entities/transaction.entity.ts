import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TransactionType } from '../../modules/transactions/shared/enums';
import { TransactionStatus } from '../enums';

const numericTransformer = {
  to: (value: number | null) => value,
  from: (value: string | number | null) => (value === null ? null : Number(value)),
};

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'account_id' })
  accountId: string;

  @Column('numeric', { transformer: numericTransformer })
  amount: number;

  @Column()
  currency: string;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column({ type: 'enum', enum: TransactionStatus })
  status: TransactionStatus;

  @Column('text', { name: 'external_reference', nullable: true })
  externalReference: string | null;

  @Column('numeric', { name: 'igv_amount', transformer: numericTransformer })
  igvAmount: number;

  @Column('numeric', { name: 'total_amount', transformer: numericTransformer })
  totalAmount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
