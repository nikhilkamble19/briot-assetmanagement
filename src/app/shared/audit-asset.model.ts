export class AuditAssetRecord {

  constructor(
    public Site: string,
    public Location: string,
    public subLocation: string,
    public Audit: any
  ) {  }
}