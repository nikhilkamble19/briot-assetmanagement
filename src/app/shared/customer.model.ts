export class Customer {

  constructor(
    public customer_id: string,
    public account_number: string,
    public customer_name: string,
    public epc: string,
    public attena_id: string,
    public firstseen_timestamp_utc: string,
    public lastseen_timestamp_utc: string,
    public tag_seen_count: number,
    public created: Date,
    public update: Date
  ) {  }
}