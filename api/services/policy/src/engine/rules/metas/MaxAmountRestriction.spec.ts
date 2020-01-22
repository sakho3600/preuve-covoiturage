import chai from 'chai';
import { MaxAmountRestriction } from './MaxAmountRestriction';
import { ProcessableCampaign } from '../../ProcessableCampaign';
import { MetadataWrapper } from '../../MetadataWrapper';
import { faker } from '../../helpers/faker';

const meta = new MetadataWrapper(1, 'default', {});

const { expect } = chai;

const campaign = new ProcessableCampaign(
  [],
  [
    [
      {
        slug: 'max_amount_restriction',
        parameters: {
          amount: 10,
          period: 'day',
        },
      },
      {
        slug: 'fixed_amount_setter',
        parameters: 10,
      },
    ],
  ],
);

const uuid = 'uuid';

const trip = faker.trip([
  {
    is_driver: true,
    identity_uuid: uuid,
  },
]);

describe('Policy rule: max amount', () => {
  it('should increase meta data', async () => {
    const data = {
      trip,
      meta,
      result: 10,
      stack: [],
      person: trip.people[0],
    };
    await campaign.apply(data);

    const datetime = trip.people[0].datetime;
    const [day, month, year] = [datetime.getDate(), datetime.getMonth(), datetime.getFullYear()];
    expect(meta.get(`${MaxAmountRestriction.slug}.global.day.${day}-${month}-${year}`, null)).to.eq(10);
  });

  it('should return 0 if limit is reached', async () => {
    const data = {
      trip,
      meta,
      result: 0,
      stack: [],
      person: trip.people[0],
    };
    await campaign.apply(data);
    expect(data.result).to.eq(0);
  });
});
