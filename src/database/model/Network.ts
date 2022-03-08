import { Schema, model, Document } from 'mongoose';
import User from './User';



export enum INDUSTRIES {
  ADVERTISING = 'ADVERTISING',
  MARKETING = 'MARKETING',
  TECHNOLOGY = 'TECHNOLOGY',
  HEALTH = 'HEALTH',
  FOOD = 'FOOD',
  ENTERTAINEMENT = 'ENTERTAINEMENT',
  PRODUCTION = 'PRODUCTION'
}


export enum ANNUEL_REVENUE {
  $0_10K = '$0 - $10K',
  $10K_25K = '$10K - $25K',
  $25K_50K = '$25K - $50K',
  $50K_100K = '$50K - $100K',
  $100k_plus = '$+100k',
}


export enum EMPLOYEES_NUM {
  _0_10 = '0 - 10',
  _10_25 = '10 - 25',
  _25_100 = '25 - 100',
  _100_500 = '100 - 500',
  _1000_plus = '+1000',
}



export default interface Network extends Document {
  name: string;
  createdBy: User;
  createdAt: Date;
  industry: INDUSTRIES;
  annual_revenue?: ANNUEL_REVENUE;
  employees_num?: EMPLOYEES_NUM;
  updatedBy?: User;
  updatedAt?: Date;
}


const schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      maxlength: 200
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      index: true
    },
    createdAt: {
      type: Date,
      required: true
    },
    updatedAt: {
      type: Date,
      required: false
    },
    industry: {
      type: Schema.Types.String,
      required: true,
      enum: [
        INDUSTRIES.ADVERTISING, 
        INDUSTRIES.ENTERTAINEMENT, 
        INDUSTRIES.FOOD, 
        INDUSTRIES.HEALTH, 
        INDUSTRIES.MARKETING, 
        INDUSTRIES.PRODUCTION, 
        INDUSTRIES.TECHNOLOGY
      ]
    },
    annual_revenue: {
      type: Schema.Types.String,
      required: false,
      enum: [
        ANNUEL_REVENUE.$0_10K, 
        ANNUEL_REVENUE.$10K_25K, 
        ANNUEL_REVENUE.$25K_50K, 
        ANNUEL_REVENUE.$50K_100K, 
        ANNUEL_REVENUE.$100k_plus
      ]
    },
    employees_num: {
      type: Schema.Types.String,
      required: false,
      enum: [
        EMPLOYEES_NUM._0_10, 
        EMPLOYEES_NUM._10_25, 
        EMPLOYEES_NUM._25_100, 
        EMPLOYEES_NUM._100_500, 
        EMPLOYEES_NUM._1000_plus
      ]
    },
  },
  {
    versionKey: false,
  },
);


const DOCUMENT_NAME = 'Network';
const COLLECTION_NAME = 'networks';


export const NetworkModel = model<Network>(DOCUMENT_NAME, schema, COLLECTION_NAME);
