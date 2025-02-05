export interface CodeItem {
    name: string;
    code: string;
}

export enum FormRequestType {
    ForestRequest = "forestRequest",
    UnitTypeRequest = "unitTypeRequest",
    UnitNumberRequest = "unitNumberRequest",
}

export interface dbItem {
    forest: string,
    unitType: string,
    unitNumber: string
}

export interface FormData {
    RequestType: string,
    forest?: string,
    unitType?: string,
    unitNumber?: string,
}