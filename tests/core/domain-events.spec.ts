import { AggregateRoot } from '@/core/entities/aggregate-root'

class CustomAggregate extends AggregateRoot<null> {
  static create () {
    const aggregate = new CustomAggregate(null)

    return aggregate
  }
}
