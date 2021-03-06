/// <reference types="Cypress" />
import { UserGroupEnum } from '~/core/enums/user/user-group.enum';

import { cypress_addUser } from './addUser.cypress';
import { closeNotification } from '../notification.cypress';
import { CI_WAIT } from '../../../config/ci.config';

export function cypress_users(e2e = false): void {
  it('navigate to users', () => {
    cy.get('.Header-user').click();
    cy.wait(CI_WAIT.waitLong);
    cy.get('.mat-menu-item:nth-child(1)').click();
    cy.get('.mat-tab-link:nth-child(2)').click();
    cy.wait(CI_WAIT.waitLong);
  });

  it('add a registry admin user', () => {
    cypress_addUser(UserGroupEnum.REGISTRY, e2e);
  });
  closeNotification();

  it('add a territory admin user', () => {
    cypress_addUser(UserGroupEnum.TERRITORY, e2e);
  });
  closeNotification();

  it('add a operator admin user', () => {
    cypress_addUser(UserGroupEnum.OPERATOR, e2e);
  });

  closeNotification();
}
