export interface UserQuery{
  propertyId?: string | number;
  query?:string;
}
export interface UserError{
    status:"ok" | "error";
    response?:string;
    error?:string
}
export interface UserResponse{
    status:"ok";
    response:string;
}
export type Intent = "SEO" | "GA4" | "MIXED" | "UNKNOWN";