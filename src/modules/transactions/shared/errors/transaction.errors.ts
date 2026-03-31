import { Errors } from '../../../../shared/errors/app.error';

export const TransactionErrors = {
  NotFound: (id?: string) => Errors.NotFound(id ? `Transaction ${id} not found` : 'Transaction not found'),
};
