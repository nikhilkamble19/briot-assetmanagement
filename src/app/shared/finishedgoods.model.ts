import { Part } from '../shared/part.model';

export class FinishedGood {

  public part = new Part('','','');
  public scanbarcode = '';
  public quantity = '';
  public picklist_id = '';
  public check = '';
  public eachPackQuantity = '';

  constructor(){  
  }
}