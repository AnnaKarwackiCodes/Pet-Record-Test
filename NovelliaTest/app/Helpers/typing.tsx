interface PetInfo {
    name: string,
    type: string,
    breed: string,
    DOB: string,
    records: []
}

interface VetInfo {
    practiceName: string,
    phoneNumber: string,
    vetName: string
}

interface VaccineInfo{
    name: string,
    date: string
}

interface AllergyInfo{
    name: string,
    reaction: string,
    severity: string
}

interface LabInfo{
    name: string,
    dosage: string,
    instructions: string
}

export type {PetInfo, VaccineInfo, AllergyInfo, LabInfo, VetInfo};