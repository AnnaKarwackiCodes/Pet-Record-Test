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
    date: string,
    vet: string,
}

interface AllergyInfo{
    name: string,
    reaction: string,
    severity: string,
    vet: string
}

interface LabInfo{
    name: string,
    dosage: string,
    instructions: string,
    vet: string
}

export type {PetInfo, VaccineInfo, AllergyInfo, LabInfo, VetInfo};