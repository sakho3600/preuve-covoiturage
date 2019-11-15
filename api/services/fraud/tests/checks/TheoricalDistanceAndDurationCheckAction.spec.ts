
import { describe } from 'mocha';
import { expect } from 'chai';
import { TheoricalDistanceAndDurationCheck as Check } from '../../src/engine/checks/TheoricalDistanceAndDurationCheckAction';

import { faker } from './faker';

describe(`Check: ${Check.key}`, async () => {
  beforeEach(async () => {
    await faker.up();
  });

  afterEach(async () => {
    await faker.down();
  });

  it('works', async () => {
    const check = faker.get(Check);
    const fakeData = faker.setData(check, { distance: 500, duration: 50 });

    const res = await check.handle(fakeData.acquisition_id);

    expect(res).to.have.all.keys(['meta', 'karma']);
    expect(res.meta).to.have.all.keys(['distance', 'duration']);
    expect(res.karma).to.be.closeTo(0, 15);
  });
});