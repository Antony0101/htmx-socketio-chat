import { Document, Model } from 'mongoose';

// mongoose helper generic types

// internal types
type ExtractDoc<T> = T extends Model<infer U> ? U : never;
type ExtractI<T> = Pick<T, Exclude<keyof T, keyof Document>>;

// external types
export type ExtractEntity<T> = ExtractI<ExtractDoc<T>>;
export type ExtractDocument<T extends abstract new (...args: any) => any> = InstanceType<T>;