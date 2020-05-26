/* tslint:disable:variable-name*/
import { assignOrDeleteProperty } from '~/core/entities/utils';

import { BaseModel } from '~/core/entities/BaseModel';
import { FormModel } from '~/core/entities/IFormModel';
import { MapModel } from '~/core/entities/IMapModel';
import { Clone } from '~/core/entities/IClone';

import { Address } from '../shared/address';
import { Company } from '../shared/company';
import { Contacts } from '../shared/contacts';
import { Territory as TerritoryBaseEdit } from '../api/shared/territory/update.contract';
import { Contact } from '../shared/contact';

export enum TerritoryLevelEnum {
  Null = '',
  Town = 'town',
  Towngroup = 'towngroup',
  District = 'district',
  Megalopolis = 'megalopolis',
  Region = 'region',
  State = 'state',
  Country = 'country',
  Countrygroup = 'countrygroup',
  Other = 'other',
}

export const territoryLevelLabels = [
  [null, ''],
  [TerritoryLevelEnum.Town, 'Ville'],
  [TerritoryLevelEnum.Towngroup, 'Metropole'],
  [TerritoryLevelEnum.District, 'District'],
  [TerritoryLevelEnum.Megalopolis, 'Département'],
  [TerritoryLevelEnum.Region, 'Region'],
  [TerritoryLevelEnum.State, 'Etat'],
  [TerritoryLevelEnum.Country, 'Pays'],
  [TerritoryLevelEnum.Countrygroup, 'Group de pays'],
  [TerritoryLevelEnum.Other, 'Autre'],
];

export interface TerritoryBase extends TerritoryBaseEdit {
  // level: TerritoryLevelEnum;
  name: string;
  shortname?: string;
  company_id?: number;
  active?: boolean;
  // active_since?: Date;
  contacts?: Contacts;
  density?: number;
  geo?: any; // TODO : geography type
}

export class Territory extends BaseModel
  implements TerritoryBase, FormModel<TerritoryFormModel>, MapModel<Territory>, Clone<Territory> {
  level: TerritoryLevelEnum;
  name: string;
  shortname?: string;
  company_id?: number;
  company?: Company;
  active?: boolean;
  active_since?: Date;
  address: Address;
  // active_since?: Date;
  contacts?: Contacts;
  density?: number;
  geo?: any; // TODO : geography type

  constructor(base: Territory) {
    super(base);
  }

  clone(): Territory {
    return new Territory(this);
  }

  map(base: TerritoryBase): Territory {
    this.level = base.level as TerritoryLevelEnum;
    this.name = base.name;

    this.active = base.active === true;

    assignOrDeleteProperty(base, this, 'contacts', (data) => new Contacts(data.contacts));
    assignOrDeleteProperty(base, this, 'address', (data) => new Address(data.address));
    assignOrDeleteProperty(base, this, 'company', (data) => ({ ...data.company }));
    assignOrDeleteProperty(base, this, 'geo', (data) => ({ ...data.geo }));

    assignOrDeleteProperty(base, this, 'shortname');
    assignOrDeleteProperty(base, this, 'density');
    assignOrDeleteProperty(base, this, 'company_id');

    return this;
  }

  updateFromFormValues(formValues: TerritoryFormModel): void {
    // this.level = formValues.level;
    // this.level = TerritoryLevelEnum.Country;
    this.name = formValues.name;
    this.level = formValues.level !== undefined ? (formValues.level as TerritoryLevelEnum) : TerritoryLevelEnum.Country;
    this.active = formValues.active === true;
    assignOrDeleteProperty(formValues, this, 'contacts', (data) => new Contacts(data.contacts));
    assignOrDeleteProperty(formValues, this, 'address', (data) => new Address(data.address));

    if (formValues.shortname) this.shortname = formValues.shortname;
    else delete this.shortname;
    if (formValues.density !== undefined) this.density = formValues.density;
    else delete this.density;
    if (formValues.company_id !== undefined) this.company_id = formValues.company_id;
    else delete this.company_id;

    // assignOrDeleteProperty(formValues, this, 'shortname');
    // assignOrDeleteProperty(formValues, this, 'density');
    // assignOrDeleteProperty(formValues, this, 'company_id');

    console.log('updateFromFormValues', { ...formValues }, { ...this });
  }

  toFormValues(fullformMode = true): any {
    return fullformMode
      ? {
          name: this.name ? this.name : '',
          // level: this.level ? this.level : null,
          // active: this.active ? this.active : false,

          shortname: this.shortname ? this.shortname : '',
          active: !!this.active,
          level: this.level ? this.level : null,

          company: new Company(this.company).toFormValues(),
          contacts: new Contacts(this.contacts).toFormValues(),
          address: new Address(this.address).toFormValues(),
        }
      : {
          contacts: new Contacts(this.contacts).toFormValues(),
        };
  }
}

export interface TerritoryFormModel {
  name: string;
  // level: TerritoryLevelEnum;
  // active?: boolean;
  level: string;
  // siret: string;
  density?: number;
  shortname?: string;
  // insee?: string[];
  active?: boolean;
  company?: {
    siret: string;
    naf_entreprise: string; // tslint:disable-line variable-name
    nature_juridique: string; // tslint:disable-line variable-name
    rna: string;
    vat_intra: string; // tslint:disable-line variable-name};
  };
  company_id?: number;
  contacts?: { gdpr_dpo: Contact; gdpr_controller: Contact; technical: Contact };
  address?: Address;
  // public address?: Address;

  // public cgu?: CGU;
  // public coordinates?: any[];
}
/*
class Territory extends BaseModel implements Model, MapModel<Territory>, Clone<Territory> {
  public _id: number;
  public name: string;
  public siret: string;
  public shortname?: string;
  public insee?: string[];

  public company?: Company;
  public company_id?: number;

  public address?: Address;

  public contacts?: Contacts;

  public cgu?: CGU;
  public coordinates?: any[];

  constructor(data?: {
    _id?: number;
    name: string;
    siret: string;
    shortname?: string;
    acronym?: string;
    insee?: string[];
    children?: number[];
    company?: Company;
    company_id?: number;
    address?: Address;
    contacts?: Contacts;

    cgu?: CGU;
    coordinates?: any[];
  }) {
    super(data);
    if (!data) {
      this.name = '';
      this.siret = null;
    }
  }

  toFormValues(fullformMode = true): any {
    // TODO: keep it for later
    // const cgu = new CGU(this.cgu);
    // const formVal = cgu.toFormValues();

    const val: any = fullformMode
      ? {
          shortname: '',
          ...this,
          company: { ...new Company(this.company).toFormValues(), siret: this.siret },
          contacts: new Contacts(this.contacts).toFormValues(),
          address: new Address(this.address).toFormValues(),
        }
      : {
          contacts: new Contacts(this.contacts).toFormValues(),
        };

    delete val._id;
    delete val.siret;

    return val;
  }

  clone(): Territory {
    return new Territory(this);
  }

  map(data: any): Territory {
    super.map(data);
    this.updateFromFormValues(data);
    this._id = data._id;
    this.siret = data.siret; // override fromFormValues behaviour with siret (in company form group)
    this.name = data.name; // override fromFormValues behaviour with siret (in company form group)

    return this;
  }

  updateFromFormValues(formValues: any): void {
    assignOrDeleteProperties(formValues, this, ['name', 'coordinates', 'shortname', 'insee']);

    this.siret = formValues.company && formValues.company.siret ? formValues.company.siret : '';

    assignOrDeleteProperty(formValues, this, 'company', (data) => new Company(data.company));
    assignOrDeleteProperty(formValues, this, 'address', (data) => new Address(data.address));
    assignOrDeleteProperty(formValues, this, 'contacts', (data) => new Contacts(data.contacts));
    assignOrDeleteProperty(formValues, this, 'cgu', (data) => new CGU(data.cgu));
  }
}

export { Address, Bank, CGU, Company, Contacts, Territory };
*/
